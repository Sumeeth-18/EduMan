import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import { db } from '@/db';
import { users, organisations } from '@/db/schema';
import { eq, and } from 'drizzle-orm';
import { verifyPassword } from '@/lib/auth/password';
import { verifyTOTP } from '@/lib/auth/mfa';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  organisationCode: z.string().optional(),
  username: z.string().optional(),
  totpCode: z.string().optional(),
  rememberMe: z.boolean().optional(),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        organisationCode: { label: 'Organisation Code', type: 'text' },
        username: { label: 'Username', type: 'text' },
        totpCode: { label: '2FA Code', type: 'text' },
        rememberMe: { label: 'Remember me', type: 'checkbox' },
      },
      authorize: async (credentials) => {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) {
          throw new Error('Invalid credentials');
        }

        const { email, password, organisationCode, username, totpCode, rememberMe } = parsed.data;

        // Determine lookup strategy
        let user: any;
        if (organisationCode && username) {
          // Staff/Parent login: org code + username + password
          const org = await db.query.organisations.findFirst({
            where: eq(organisations.code, organisationCode.toUpperCase()),
          });
          if (!org || !org.isActive) {
            throw new Error('Invalid organisation');
          }
          user = await db.query.users.findFirst({
            where: and(
              eq(users.organisationId, org.id),
              eq(users.username, username),
              eq(users.isActive, true)
            ),
            with: { organisation: true },
          });
        } else if (email) {
          // Owner/Admin/Principal login: email + password
          user = await db.query.users.findFirst({
            where: and(
              eq(users.email, email.toLowerCase()),
              eq(users.isActive, true)
            ),
            with: { organisation: true },
          });
        }

        if (!user || !user.passwordHash) {
          throw new Error('Invalid credentials');
        }

        // Verify password
        const isValid = await verifyPassword(password, user.passwordHash);
        if (!isValid) {
          // Increment failed attempts
          await db.update(users)
            .set({
              failedLoginAttempts: (user.failedLoginAttempts || 0) + 1,
              lockedUntil: (user.failedLoginAttempts || 0) >= 4
                ? new Date(Date.now() + 15 * 60 * 1000)
                : null,
            })
            .where(eq(users.id, user.id));
          throw new Error('Invalid credentials');
        }

        // Check if locked
        if (user.lockedUntil && new Date(user.lockedUntil) > new Date()) {
          throw new Error('Account temporarily locked. Try again later.');
        }

        // Check MFA for privileged roles
        const requiresMFA = ['owner', 'admin', 'principal'].includes(user.role);
        if (requiresMFA && user.mfaEnabled) {
          if (!totpCode) {
            throw new Error('MFA_REQUIRED');
          }
          const isValidTOTP = await verifyTOTP(user.mfaSecret!, totpCode);
          if (!isValidTOTP) {
            throw new Error('Invalid 2FA code');
          }
        }

        // Check organisation membership if org code provided
        if (organisationCode && user.organisationId) {
          const org = await db.query.organisations.findFirst({
            where: eq(organisations.code, organisationCode.toUpperCase()),
          });
          if (!org || org.id !== user.organisationId) {
            throw new Error('Not authorised for this organisation');
          }
        }

        // Reset failed attempts on successful login
        await db.update(users)
          .set({
            failedLoginAttempts: 0,
            lockedUntil: null,
            lastLoginAt: new Date(),
          })
          .where(eq(users.id, user.id));

        // Fetch user's organisations (for owners who may have multiple)
        let userOrganisations: Array<{ id: string; code: string; name: string; branches: number }> = [];
        if (user.role === 'owner' || user.role === 'super_admin') {
          const orgs = await db.query.organisations.findMany({
            where: eq(organisations.id, user.organisationId!),
            columns: { id: true, code: true, name: true },
          });
          userOrganisations = orgs.map((o: any) => ({ ...o, branches: 0 }));
        } else if (user.organisationId) {
          const org = await db.query.organisations.findFirst({
            where: eq(organisations.id, user.organisationId),
            columns: { id: true, code: true, name: true },
          });
          if (org) userOrganisations = [{ ...org, branches: 0 }];
        }

        return {
          id: user.id,
          email: user.email,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          organisationId: user.organisationId,
          branchId: user.branchId,
          mfaEnabled: user.mfaEnabled,
          theme: user.theme,
          image: user.avatarUrl,
          organisations: userOrganisations,
        };
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'openid email profile',
          access_type: 'offline',
          prompt: 'consent',
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          email: profile.email,
          firstName: profile.given_name || '',
          lastName: profile.family_name || '',
          image: profile.picture,
          googleId: profile.sub,
          googleEmail: profile.email,
          role: 'parent',
          organisationId: null,
          branchId: null,
          mfaEnabled: false,
          theme: 'system',
          organisations: [],
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        // Check if user exists with this Google ID
        const existingUser = await db.query.users.findFirst({
          where: eq(users.googleId, account.providerAccountId),
        });

        if (existingUser) {
          // Update Google info
          await db.update(users)
            .set({
              googleEmail: profile?.email,
              lastLoginAt: new Date(),
            })
            .where(eq(users.id, existingUser.id));
          return true;
        }

        // Check if user exists with this email
        const emailUser = await db.query.users.findFirst({
          where: eq(users.email, profile?.email?.toLowerCase() || ''),
        });

        if (emailUser) {
          // Link Google account
          await db.update(users)
            .set({
              googleId: account.providerAccountId,
              googleEmail: profile?.email,
              lastLoginAt: new Date(),
            })
            .where(eq(users.id, emailUser.id));
          return true;
        }

        // New Google user - will need to complete registration
        return true;
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id as string;
        token.role = (user as any).role;
        token.organisationId = (user as any).organisationId;
        token.branchId = (user as any).branchId;
        token.mfaEnabled = (user as any).mfaEnabled;
        token.theme = (user as any).theme;
        token.organisations = (user as any).organisations;
        token.firstName = (user as any).firstName;
        token.lastName = (user as any).lastName;
      }
      if (trigger === 'update' && session) {
        token.theme = session.theme;
        if (session.organisationId) {
          token.organisationId = session.organisationId;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.organisationId = token.organisationId as string;
        session.user.branchId = token.branchId as string;
        session.user.mfaEnabled = token.mfaEnabled as boolean;
        session.user.theme = token.theme as string || 'system';
        session.user.organisations = token.organisations as Array<{ id: string; code: string; name: string; branches: number }>;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        // Add convenience fields for UI
        if (token.organisationId) {
          const org = token.organisations?.find((o: any) => o.id === token.organisationId);
          if (org) {
            session.user.organisationName = org.name;
            session.user.organisationCode = org.code;
          }
        }
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/dashboard`;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
    newUser: '/signup',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: 'eduman-session',
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 30 * 24 * 60 * 60,
      },
    },
    callbackUrl: {
      name: 'eduman-callback-url',
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 24 * 60 * 60,
      },
    },
    csrfToken: {
      name: 'eduman-csrf-token',
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 24 * 60 * 60,
      },
    },
  },
  events: {
    async signIn({ user, isNewUser }) {
      // Log audit event
    },
    async signOut() {
      // Log audit event
    },
  },
  debug: process.env.NODE_ENV === 'development',
});