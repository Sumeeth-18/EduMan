import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { organisations, users, branches, academicYears, subscriptions, customRoles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { hashPassword, validatePasswordStrength } from "@/lib/auth/password";
import { generateTOTPSecret, generateBackupCodes } from "@/lib/auth/mfa";
import { generateOrganisationCode, generateStudentId, generateParentId } from "@/lib/utils";
import { z } from "zod";

const signupSchema = z.object({
  organisationName: z.string().min(2, "Organisation name must be at least 2 characters"),
  organisationCode: z.string().min(2).max(20).optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  consent: z.boolean().refine((val) => val === true, "Consent is required"),
  policyVersion: z.string(),
  termsVersion: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
      const errorMessage = parsed.error.issues[0]?.message || "Invalid input";
      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      );
    }

    const { organisationName, organisationCode, firstName, lastName, email, phone, password, consent, policyVersion, termsVersion } = parsed.data;

    // Validate password strength
    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.valid) {
      return NextResponse.json(
        { error: passwordValidation.errors.join(", ") },
        { status: 400 }
      );
    }

    // Enforce consent
    if (!consent) {
      return NextResponse.json(
        { error: "You must agree to the Privacy Policy and Terms of Use" },
        { status: 400 }
      );
    }

    // Check if organisation code already exists
    const code = organisationCode || generateOrganisationCode(organisationName);
    const existingOrg = await db.query.organisations.findFirst({
      where: eq(organisations.code, code.toUpperCase()),
    });

    if (existingOrg) {
      return NextResponse.json(
        { error: "Organisation code already exists. Please choose a different name." },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email.toLowerCase()),
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create organisation, owner user, default branch, academic year, subscription, and custom roles in a transaction
    const result = await db.transaction(async (tx) => {
      // Create organisation
      const [org] = await tx.insert(organisations).values({
        code: code.toUpperCase(),
        name: organisationName,
        email: email.toLowerCase(),
        phone,
        settings: {
          theme: "system",
          language: "en",
          timezone: "Asia/Kolkata",
        },
      }).returning();

      // Create default branch
      const [branch] = await tx.insert(branches).values({
        organisationId: org.id,
        code: "MAIN",
        name: "Main Branch",
        email: email.toLowerCase(),
        phone,
      }).returning();

      // Create current academic year
      const currentYear = new Date().getFullYear();
      const academicYearValues = {
        organisationId: org.id,
        name: `${currentYear}-${currentYear + 1}`,
        code: `${currentYear}-${currentYear + 1}`,
        startDate: `${currentYear}-04-01`,
        endDate: `${currentYear + 1}-03-31`,
        isCurrent: true,
        isActive: true,
      };
      const [academicYear] = await tx.insert(academicYears).values(academicYearValues).returning();

      // Create owner user
      const mfaSecret = generateTOTPSecret();
      const backupCodes = generateBackupCodes(10);

      const [owner] = await tx.insert(users).values({
        organisationId: org.id,
        branchId: branch.id,
        email: email.toLowerCase(),
        username: email.split("@")[0].toLowerCase(),
        passwordHash,
        firstName,
        lastName,
        phone,
        role: "owner",
        isActive: true,
        isVerified: true,
        mfaEnabled: true,
        mfaSecret,
        mfaBackupCodes: backupCodes,
        theme: "system",
        language: "en",
        timezone: "Asia/Kolkata",
      }).returning();

      // Create default custom roles
      const defaultRoles = [
        {
          organisationId: org.id,
          name: "Teacher",
          description: "Standard teacher permissions",
          permissions: [
            "attendance:create",
            "attendance:view",
            "homework:create",
            "homework:view",
            "marks:create",
            "marks:view",
            "materials:create",
            "materials:view",
            "timetable:view",
            "students:view",
            "parents:view",
          ],
          isSystem: true,
        },
        {
          organisationId: org.id,
          name: "Accountant",
          description: "Fee management permissions",
          permissions: [
            "fees:create",
            "fees:view",
            "fees:edit",
            "payments:create",
            "payments:view",
            "receipts:create",
            "receipts:view",
            "reports:financial",
            "students:view",
            "parents:view",
          ],
          isSystem: true,
        },
        {
          organisationId: org.id,
          name: "Receptionist",
          description: "Front desk permissions",
          permissions: [
            "students:view",
            "students:create",
            "parents:view",
            "parents:create",
            "enquiries:create",
            "enquiries:view",
            "attendance:view",
            "timetable:view",
            "announcements:view",
          ],
          isSystem: true,
        },
        {
          organisationId: org.id,
          name: "Manager",
          description: "Operational management permissions",
          permissions: [
            "attendance:create",
            "attendance:view",
            "attendance:finalise",
            "homework:create",
            "homework:view",
            "marks:create",
            "marks:view",
            "materials:create",
            "materials:view",
            "timetable:create",
            "timetable:view",
            "students:view",
            "students:create",
            "students:edit",
            "parents:view",
            "parents:create",
            "fees:view",
            "reports:academic",
            "announcements:create",
            "announcements:view",
            "messages:create",
            "messages:view",
            "messages:approve",
          ],
          isSystem: true,
        },
      ];

      await tx.insert(customRoles).values(defaultRoles);

      // Create free subscription
      await tx.insert(subscriptions).values({
        organisationId: org.id,
        plan: "free",
        status: "trial",
        trialEndsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days trial
        limits: {
          students: 50,
          teachers: 5,
          smsPerMonth: 100,
          aiRequestsPerMonth: 50,
          storageMB: 100,
        },
      });

      // Log audit event for organisation creation
      await tx.insert(customRoles).values({
        organisationId: org.id,
        name: "Audit: Organisation Created",
        description: "System audit log entry",
        permissions: [],
        isSystem: true,
      });

      return { org, owner, branch, academicYear, mfaSecret, backupCodes };
    });

    // Log consent record (in production, this would go to a consent_logs table)
    console.log("CONSENT_RECORDED:", {
      userId: result.owner.id,
      organisationId: result.org.id,
      consentStatus: "granted",
      timestamp: new Date().toISOString(),
      policyVersion,
      termsVersion,
      registrationMethod: "email_password",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    return NextResponse.json({
      success: true,
      organisation: {
        id: result.org.id,
        code: result.org.code,
        name: result.org.name,
      },
      owner: {
        id: result.owner.id,
        email: result.owner.email,
        firstName: result.owner.firstName,
        lastName: result.owner.lastName,
      },
      mfaSetup: {
        secret: result.mfaSecret,
        backupCodes: result.backupCodes,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}