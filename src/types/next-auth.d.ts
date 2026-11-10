import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      organisationId: string | null;
      branchId: string | null;
      mfaEnabled: boolean;
      theme: string;
      organisations: Array<{
        id: string;
        code: string;
        name: string;
        branches: number;
      }>;
      organisationName?: string;
      organisationCode?: string;
      firstName: string;
      lastName: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: string;
    organisationId: string | null;
    branchId: string | null;
    mfaEnabled: boolean;
    theme: string;
    organisations: Array<{
      id: string;
      code: string;
      name: string;
      branches: number;
    }>;
    firstName: string;
    lastName: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: string;
    organisationId: string | null;
    branchId: string | null;
    mfaEnabled: boolean;
    theme: string;
    organisations: Array<{
      id: string;
      code: string;
      name: string;
      branches: number;
    }>;
    firstName: string;
    lastName: string;
  }
}