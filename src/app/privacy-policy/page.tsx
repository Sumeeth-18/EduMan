import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, FileText, ArrowLeft, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | EduMan.",
  description: "EduMan Privacy Policy - How we collect, use, and protect your personal data in compliance with the Digital Personal Data Protection Act, 2023.",
  robots: "index, follow",
};

const lastUpdated = "November 6, 2026";
const version = process.env.NEXT_PUBLIC_PRIVACY_POLICY_VERSION || "1.0";
const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || "[Your Company Name]";
const companyAddress = process.env.NEXT_PUBLIC_COMPANY_ADDRESS || "[Your Registered Address]";
const companyEmail = process.env.NEXT_PUBLIC_COMPANY_EMAIL || "[legal@yourcompany.com]";
const companyPhone = process.env.NEXT_PUBLIC_COMPANY_PHONE || "[+91-XXXXXXXXXX]";
const grievanceOfficerName = process.env.NEXT_PUBLIC_GRIEVANCE_OFFICER_NAME || "[Grievance Officer Name]";
const grievanceOfficerEmail = process.env.NEXT_PUBLIC_GRIEVANCE_OFFICER_EMAIL || "[grievance@yourcompany.com]";
const grievanceOfficerPhone = process.env.NEXT_PUBLIC_GRIEVANCE_OFFICER_PHONE || "[+91-XXXXXXXXXX]";
const dpoEmail = process.env.NEXT_PUBLIC_DATA_PROTECTION_OFFICER_EMAIL || "[dpo@yourcompany.com]";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-4">
          <Link href="/" className="inline-flex items-center gap-2 font-brand text-3xl text-primary mb-4">
            <span className="font-bold">EduMan.</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Last updated: {lastUpdated} | Version: {version}
          </p>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            This Privacy Policy explains how <strong>EduMan.</strong> ("we", "us", "our") collects, uses, discloses, and safeguards your information when you use our education management platform. Please read this policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access or use the Service.
          </p>
        </header>

        {/* Important Notice */}
        <Card className="border-blue-500/30 bg-blue-500/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Shield className="h-6 w-6 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-blue-500 mb-2">Important Legal Notice</h3>
                <p className="text-sm text-muted-foreground">
                  This document contains placeholders (shown in <strong>square brackets</strong>) for company-specific information that must be completed by a qualified Indian legal professional before production deployment. <strong>This document does not constitute legal advice.</strong> EduMan recommends engaging a qualified privacy lawyer to review and customise this policy for your specific operational context and regulatory requirements under the Digital Personal Data Protection Act, 2023 (DPDP Act).
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table of Contents */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Table of Contents</CardTitle>
          </CardHeader>
          <CardContent>
            <nav className="space-y-2 text-sm">
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li><a href="#1-introduction" className="hover:text-primary underline">1. Introduction</a></li>
                <li><a href="#2-information-we-collect" className="hover:text-primary underline">2. Information We Collect</a></li>
                <li><a href="#3-purposes-of-processing" className="hover:text-primary underline">3. Purposes of Processing & Lawful Basis</a></li>
                <li><a href="#4-data-storage-and-security" className="hover:text-primary underline">4. Data Storage, Hosting & Security Practices</a></li>
                <li><a href="#5-third-party-processors" className="hover:text-primary underline">5. Third-Party Processors & Integrations</a></li>
                <li><a href="#6-google-authentication" className="hover:text-primary underline">6. Google Authentication Data Handling</a></li>
                <li><a href="#7-ai-processing" className="hover:text-primary underline">7. AI Processing & External AI Providers</a></li>
                <li><a href="#8-sms-services" className="hover:text-primary underline">8. SMS Services & Limitations</a></li>
                <li><a href="#9-cookies-and-sessions" className="hover:text-primary underline">9. Cookies, Sessions & Device Information</a></li>
                <li><a href="#10-retention-deletion-backup" className="hover:text-primary underline">10. Retention, Deletion & Backup Policies</a></li>
                <li><a href="#11-your-rights" className="hover:text-primary underline">11. Your Rights & Request Procedures</a></li>
                <li><a href="#12-childrens-data" className="hover:text-primary underline">12. Children's Data & Guardian Consent</a></li>
                <li><a href="#13-security-incidents" className="hover:text-primary underline">13. Security Incidents & Grievance Redressal</a></li>
                <li><a href="#14-contact" className="hover:text-primary underline">14. Contact & Grievance Officer Details</a></li>
                <li><a href="#15-changes" className="hover:text-primary underline">15. Changes to This Policy</a></li>
              </ol>
            </nav>
          </CardContent>
        </Card>

        {/* Sections */}
        <section id="1-introduction" className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">1. Introduction</h2>
          <p className="text-muted-foreground">
            EduMan. is an education management platform designed for individual tutors, tuition centres, coaching institutes, and multi-centre educational organisations. We are committed to protecting your personal data in accordance with the Digital Personal Data Protection Act, 2023 (DPDP Act) and other applicable Indian data protection laws.
          </p>
          <p className="text-muted-foreground">
            This policy applies to all users of the Service, including organisation owners, administrators, principals, managers, teachers, accountants, receptionists, parents, and students whose data is processed through the platform.
          </p>
          <div className="p-4 rounded-lg bg-muted/50 border">
            <p className="text-sm text-muted-foreground">
              <strong>Data Controller:</strong> {companyName}, {companyAddress}. Contact: {companyEmail}, {companyPhone}.
            </p>
          </div>
        </section>

        <section id="2-information-we-collect" className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">2. Information We Collect</h2>

          <h3 className="text-xl font-semibold text-foreground">2.1 Account & Profile Information</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li><strong>Owners, Admins, Principals, Managers, Teachers, Accountants, Receptionists:</strong> Name, email, phone, username, password hash, role, organisation affiliation, branch assignment, profile photo, date of birth, gender, MFA secret, backup codes, theme preference, language, timezone.</li>
            <li><strong>Parents:</strong> Name, email, phone, alternate phone, username, password hash, organisation affiliation, occupation, company name, annual income, address, Aadhaar number (encrypted), photo, preferred language, SMS/WhatsApp opt-in preferences.</li>
            <li><strong>Students (no direct login):</strong> Name, gender, date of birth, blood group, photo, address, Aadhaar number (encrypted), UDISEnumber, previous school/class, admission date, medical info, emergency contacts, custom fields.</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground">2.2 Educational Records</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Attendance records (status, late/early minutes, remarks)</li>
            <li>Fee structures, student fees, discounts, scholarships, fines, payment history, receipts</li>
            <li>Homework assignments, study materials, examination schedules, marks, results</li>
            <li>Timetables, calendar events, leave requests</li>
            <li>Documents (ID proofs, certificates, medical records, etc.)</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground">2.3 Communication Data</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Messages (SMS and in-app): content, recipients, delivery status, timestamps</li>
            <li>Announcements, notifications, parent-teacher communications</li>
            <li>Enquiries, feedback, complaints</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground">2.4 Technical & Usage Data</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>IP address, browser/device information, operating system</li>
            <li>Login timestamps, session data, failed login attempts</li>
            <li>Audit logs: actions performed, entity changes, metadata</li>
            <li>AI usage: prompts, token counts, estimated costs (aggregated)</li>
          </ul>
        </section>

        <section id="3-purposes-of-processing" className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">3. Purposes of Processing & Lawful Basis</h2>
          <p className="text-muted-foreground">
            We process personal data for the following purposes, each with an identified lawful basis under the DPDP Act:
          </p>

          <div className="space-y-4">
            <div className="p-4 rounded-lg border bg-muted/30">
              <h4 className="font-medium text-foreground mb-2">Account Management & Authentication</h4>
              <p className="text-sm text-muted-foreground">
                <strong>Purpose:</strong> Create and manage user accounts, authenticate users, enable MFA, recover accounts.<br />
                <strong>Lawful Basis:</strong> Contract performance (Terms of Use), Legitimate interest (security).
              </p>
            </div>

            <div className="p-4 rounded-lg border bg-muted/30">
              <h4 className="font-medium text-foreground mb-2">Educational Operations</h4>
              <p className="text-sm text-muted-foreground">
                <strong>Purpose:</strong> Student enrolment, attendance tracking, fee management, examinations, homework, timetables, study materials.<br />
                <strong>Lawful Basis:</strong> Contract performance, Legitimate interest (educational administration), Legal obligation (education regulations).
              </p>
            </div>

            <div className="p-4 rounded-lg border bg-muted/30">
              <h4 className="font-medium text-foreground mb-2">Communication & Notifications</h4>
              <p className="text-sm text-muted-foreground">
                <strong>Purpose:</strong> Send SMS/in-app notifications for attendance, fees, exams, announcements, emergencies.<br />
                <strong>Lawful Basis:</strong> Consent (SMS opt-in), Legitimate interest (operational communications), Contract performance.
              </p>
            </div>

            <div className="p-4 rounded-lg border bg-muted/30">
              <h4 className="font-medium text-foreground mb-2">Analytics & Reporting</h4>
              <p className="text-sm text-muted-foreground">
                <strong>Purpose:</strong> Generate academic, financial, and operational reports for authorised roles.<br />
                <strong>Lawful Basis:</strong> Legitimate interest (institutional management), Contract performance.
              </p>
            </div>

            <div className="p-4 rounded-lg border bg-muted/30">
              <h4 className="font-medium text-foreground mb-2">AI-Assisted Features</h4>
              <p className="text-sm text-muted-foreground">
                <strong>Purpose:</strong> Draft messages, summarise reports, identify patterns, assist with homework preparation.<br />
                <strong>Lawful Basis:</strong> Consent (AI feature opt-in), Legitimate interest (product improvement).
              </p>
            </div>

            <div className="p-4 rounded-lg border bg-muted/30">
              <h4 className="font-medium text-foreground mb-2">Security & Compliance</h4>
              <p className="text-sm text-muted-foreground">
                <strong>Purpose:</strong> Audit logging, fraud prevention, abuse detection, legal compliance, backup/recovery.<br />
                <strong>Lawful Basis:</strong> Legal obligation, Legitimate interest (security).
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            <strong>No Secondary Use:</strong> We do not use personal data for purposes beyond those disclosed above without obtaining additional consent. We do not sell, rent, or monetise personal data. We do not use personal data for advertising, profiling, or AI training without explicit consent.
          </p>
        </section>

        <section id="4-data-storage-and-security" className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">4. Data Storage, Hosting & Security Practices</h2>

          <h3 className="text-xl font-semibold text-foreground">4.1 Hosting Infrastructure</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li><strong>Application Hosting:</strong> Vercel (US/EU regions) – SOC 2 Type II, ISO 27001 certified</li>
            <li><strong>Database:</strong> Neon / Supabase PostgreSQL (US/EU/APAC regions) – SOC 2, ISO 27001, encryption at rest</li>
            <li><strong>File Storage:</strong> Supabase Storage / S3-compatible (configurable) – encryption at rest, signed URLs</li>
            <li><strong>Background Jobs:</strong> Inngest (US/EU) – SOC 2</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground">4.2 Security Measures</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Encryption in transit (TLS 1.2+) and at rest (AES-256)</li>
            <li>Row-level security (RLS) policies enforcing organisation-level isolation</li>
            <li>Argon2id/bcrypt password hashing with configurable cost factors</li>
            <li>TOTP-based MFA for privileged roles (mandatory for Owners/Admins)</li>
            <li>Secure session management with HttpOnly, SameSite=Lax cookies</li>
            <li>Rate limiting, brute-force protection, CSRF protection</li>
            <li>Content Security Policy (CSP), HSTS, secure headers</li>
            <li>Input validation (Zod), output encoding, SQL injection prevention via Drizzle ORM</li>
            <li>Tamper-resistant audit logs with hash chaining</li>
            <li>Automated daily backups with 30-day retention, point-in-time recovery</li>
            <li>30-day recycle bin for soft-deleted records</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground">4.3 Cross-Border Transfers</h3>
          <p className="text-muted-foreground">
            Our hosting providers may process data in regions outside India. We rely on the providers' standard contractual clauses and adequacy decisions where applicable. [TO BE REVIEWED: Specific transfer mechanisms and adequacy decisions must be documented by legal counsel.]
          </p>
        </section>

        <section id="5-third-party-processors" className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">5. Third-Party Processors & Integrations</h2>
          <p className="text-muted-foreground">
            We engage the following categories of data processors. Data Processing Agreements (DPAs) are in place or being negotiated:
          </p>

          <div className="space-y-3">
            <div className="p-4 rounded-lg border bg-muted/30">
              <h4 className="font-medium text-foreground">Cloud Hosting & Database</h4>
              <p className="text-sm text-muted-foreground">Vercel, Neon, Supabase – hosting, database, edge functions, storage.</p>
            </div>
            <div className="p-4 rounded-lg border bg-muted/30">
              <h4 className="font-medium text-foreground">SMS Providers</h4>
              <p className="text-sm text-muted-foreground">Twilio, MSG91, TextLocal (configurable) – SMS delivery for notifications. Subject to TRAI/DLT compliance.</p>
            </div>
            <div className="p-4 rounded-lg border bg-muted/30">
              <h4 className="font-medium text-foreground">AI Providers</h4>
              <p className="text-sm text-muted-foreground">OpenAI, Groq, Ollama (configurable) – AI-assisted features. Data sent only when user invokes AI features.</p>
            </div>
            <div className="p-4 rounded-lg border bg-muted/30">
              <h4 className="font-medium text-foreground">Authentication</h4>
              <p className="text-sm text-muted-foreground">Google OAuth 2.0 / OIDC – identity verification for eligible roles.</p>
            </div>
            <div className="p-4 rounded-lg border bg-muted/30">
              <h4 className="font-medium text-foreground">Monitoring</h4>
              <p className="text-sm text-muted-foreground">Sentry (optional) – error tracking and performance monitoring.</p>
            </div>
            <div className="p-4 rounded-lg border bg-muted/30">
              <h4 className="font-medium text-foreground">Background Jobs</h4>
              <p className="text-sm text-muted-foreground">Inngest – scheduled reminders, report generation, retry handling.</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            <strong>Sub-processors:</strong> Our processors may engage sub-processors. We require notification of material changes. [TO BE REVIEWED: Specific sub-processor lists and notification procedures.]
          </p>
        </section>

        <section id="6-google-authentication" className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">6. Google Authentication Data Handling</h2>
          <p className="text-muted-foreground">
            Eligible roles (Owners, Admins, Principals) may sign in using Google OAuth 2.0 / OpenID Connect.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li><strong>Data Received:</strong> Google ID (sub), email, verified email status, name, profile picture.</li>
            <li><strong>Usage:</strong> Authentication only. We do not access Gmail, Drive, Contacts, or other Google services.</li>
            <li><strong>Account Linking:</strong> Verified Google emails are linked to existing EduMan accounts only after email verification.</li>
            <li><strong>Storage:</strong> Google ID and email stored in encrypted database fields. Profile picture URL stored for avatar display.</li>
            <li><strong>Revocation:</strong> Users can unlink Google accounts from settings. Revocation deletes the Google ID from our records.</li>
            <li><strong>Compliance:</strong> Google's privacy policy applies to data processed by Google during authentication.</li>
          </ul>
        </section>

        <section id="7-ai-processing" className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">7. AI Processing & External AI Providers</h2>
          <p className="text-muted-foreground">
            EduMan includes optional AI-assisted features (message drafting, report summarisation, pattern analysis, homework assistance, how-to guidance). These features:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Are opt-in at the organisation level (configurable in settings)</li>
            <li>Send only the minimum necessary context to the AI provider</li>
            <li>Do not send sensitive personal data (Aadhaar, medical info, passwords) to AI providers</li>
            <li>Track usage per organisation for cost control and limit enforcement</li>
            <li>Require explicit user confirmation before sending AI-generated content</li>
            <li>Never autonomously send messages, modify records, or bypass permissions</li>
          </ul>
          <p className="text-sm text-muted-foreground">
            AI Provider: Configurable (OpenAI, Groq, Ollama, or mock). [TO BE REVIEWED: Specific provider DPA terms and data handling commitments.]
          </p>
        </section>

        <section id="8-sms-services" className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">8. SMS Services & Limitations</h2>
          <p className="text-muted-foreground">
            SMS is the only external messaging channel. WhatsApp is not supported.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li><strong>Delivery:</strong> Best-effort via configured provider (Twilio, MSG91, TextLocal). No guaranteed delivery.</li>
            <li><strong>Compliance:</strong> Sender ID registration, DLT compliance, template registration per TRAI regulations.</li>
            <li><strong>Costs:</strong> Per-SMS charges apply. No unlimited promises. Organisations bear all SMS costs.</li>
            <li><strong>Status Tracking:</strong> Draft → Awaiting Approval → Approved → Scheduled → Queued → Sent → Delivered / Failed / Retrying / Manually Resent.</li>
            <li><strong>Opt-out:</strong> Parents can opt out of SMS communications. Opt-out respected for non-critical messages.</li>
            <li><strong>No Spoofing:</strong> Only verified sender IDs and compliant routes used.</li>
          </ul>
        </section>

        <section id="9-cookies-and-sessions" className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">9. Cookies, Sessions & Device Information</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li><strong>Session Cookies:</strong> HttpOnly, Secure, SameSite=Lax, 30-day expiry (configurable). No third-party cookies.</li>
            <li><strong>CSRF Tokens:</strong> Double-submit cookie pattern for state-changing operations.</li>
            <li><strong>Theme Preference:</strong> Stored in localStorage (light/dark/system).</li>
            <li><strong>Device Info:</strong> IP address, user agent logged for audit and security purposes.</li>
            <li><strong>Analytics:</strong> Optional (disabled by default). No Google Analytics, no tracking pixels unless explicitly enabled.</li>
          </ul>
        </section>

        <section id="10-retention-deletion-backup" className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">10. Retention, Deletion & Backup Policies</h2>

          <h3 className="text-xl font-semibold text-foreground">10.1 Retention Schedules</h3>
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="p-2">Data Category</th>
                <th className="p-2">Retention Period</th>
                <th className="p-2">Basis</th>
              </tr>
            </thead>
            <tbody className="border-t">
              <tr className="border-b">
                <td className="p-2">Account & profile data</td>
                <td className="p-2">Duration of account + 1 year</td>
                <td className="p-2">Contract, legal obligation</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Educational records (attendance, fees, marks)</td>
                <td className="p-2">7 years after student departure</td>
                <td className="p-2">Education regulations, legal obligation</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Communication logs (SMS, in-app)</td>
                <td className="p-2">3 years</td>
                <td className="p-2">Contract, dispute resolution</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Audit logs</td>
                <td className="p-2">1 year (configurable up to 7 years)</td>
                <td className="p-2">Security, legal obligation</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">AI usage logs</td>
                <td className="p-2">1 year</td>
                <td className="p-2">Cost tracking, legitimate interest</td>
              </tr>
              <tr className="border-b">
                <td className="p-2">Consent records</td>
                <td className="p-2">Duration of account + 7 years</td>
                <td className="p-2">DPDP Act, legal obligation</td>
              </tr>
            </tbody>
          </table>

          <h3 className="text-xl font-semibold text-foreground">10.2 Deletion & Recycle Bin</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Soft delete: Records moved to recycle bin, retained for 30 days, restorable by authorised admins.</li>
            <li>Hard delete: After 30 days in recycle bin, or upon verified erasure request (subject to legal exceptions).</li>
            <li>Backup deletion: Erasure requests propagated to backups within 30 days (aligned with backup retention).</li>
            <li>Legal hold: Records under legal hold excluded from automated deletion.</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground">10.3 Backups</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Daily automated backups (provider-managed)</li>
            <li>30-day retention with point-in-time recovery</li>
            <li>Manual backup trigger available for authorised admins</li>
            <li>Restoration procedures tested quarterly</li>
          </ul>
        </section>

        <section id="11-your-rights" className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">11. Your Rights (DPDP Act Sections 11-14)</h2>
          <p className="text-muted-foreground">
            As a Data Principal, you have the following rights:
          </p>

          <div className="space-y-4">
            <div className="p-4 rounded-lg border bg-muted/30">
              <h4 className="font-medium text-foreground mb-2">Right to Access (Section 11)</h4>
              <p className="text-sm text-muted-foreground">Request a copy of your personal data and processing details. Available via account settings or by contacting the Grievance Officer.</p>
            </div>
            <div className="p-4 rounded-lg border bg-muted/30">
              <h4 className="font-medium text-foreground mb-2">Right to Correction (Section 12)</h4>
              <p className="text-sm text-muted-foreground">Rectify inaccurate or incomplete data. Profile data editable in settings; educational records via authorised staff.</p>
            </div>
            <div className="p-4 rounded-lg border bg-muted/30">
              <h4 className="font-medium text-foreground mb-2">Right to Erasure (Section 12)</h4>
              <p className="text-sm text-muted-foreground">Request deletion of your data. Subject to legal exceptions (e.g., education records retention, legal holds). Initiated via Grievance Officer.</p>
            </div>
            <div className="p-4 rounded-lg border bg-muted/30">
              <h4 className="font-medium text-foreground mb-2">Right to Grievance Redressal (Section 13)</h4>
              <p className="text-sm text-muted-foreground">Lodge complaints via the in-app feedback/complaint module or contact the Grievance Officer directly.</p>
            </div>
            <div className="p-4 rounded-lg border bg-muted/30">
              <h4 className="font-medium text-foreground mb-2">Right to Nominate (Section 14)</h4>
              <p className="text-sm text-muted-foreground">Nominate a digital representative to exercise rights on your behalf in case of death or incapacity.</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            <strong>Response Timeline:</strong> We acknowledge requests within 72 hours and respond within 30 days (extendable by 30 days with notice).
          </p>
        </section>

        <section id="12-childrens-data" className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">12. Children's Data & Guardian Consent</h2>
          <p className="text-muted-foreground">
            Students are typically minors (under 18). We implement enhanced protections:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Age identification via date of birth field</li>
            <li>Parental/guardian consent required for account creation (via parent account linkage)</li>
            <li>No direct student logins – parents are account holders</li>
            <li>No profiling, targeted advertising, or behavioural tracking of children</li>
            <li>Enhanced access controls: teachers see only assigned students; parents see only linked children</li>
            <li>Data minimisation: only education-necessary data collected</li>
          </ul>
        </section>

        <section id="13-security-incidents" className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">13. Security Incidents & Grievance Redressal</h2>

          <h3 className="text-xl font-semibold text-foreground">13.1 Breach Detection & Notification</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Monitoring: Failed logins, privilege escalation, anomalous access patterns, data exfiltration attempts</li>
            <li>Escalation: Defined severity levels (P0-P3) with response SLAs</li>
            <li>Data Protection Board notification: Within 72 hours of becoming aware of a breach (DPDP Act)</li>
            <li>Affected Data Principal notification: Without undue delay where high risk to rights</li>
            <li>Breach register maintained with incident details, impact assessment, remediation</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground">13.2 Grievance Redressal</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>In-app complaint/feedback module accessible to all users</li>
            <li>Grievance Officer: {grievanceOfficerName} – {grievanceOfficerEmail} – {grievanceOfficerPhone}</li>
            <li>Acknowledgment within 72 hours, resolution within 30 days (extendable)</li>
            <li>Escalation to Data Protection Board if unsatisfied</li>
          </ul>
        </section>

        <section id="14-contact" className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">14. Contact & Grievance Officer Details</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Data Controller</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>Company:</strong> {companyName}</p>
                <p><strong>Address:</strong> {companyAddress}</p>
                <p><strong>Email:</strong> {companyEmail}</p>
                <p><strong>Phone:</strong> {companyPhone}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Grievance Officer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>Name:</strong> {grievanceOfficerName}</p>
                <p><strong>Email:</strong> {grievanceOfficerEmail}</p>
                <p><strong>Phone:</strong> {grievanceOfficerPhone}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Data Protection Officer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>Email:</strong> {dpoEmail}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">General Inquiries</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>Email:</strong> {companyEmail}</p>
                <p><strong>In-App:</strong> Feedback/Complaints module</p>
              </CardContent>
            </Card>
          </div>

          <p className="text-sm text-muted-foreground">
            [PLACEHOLDER: The above contact details must be replaced with actual verified information before production deployment.]
          </p>
        </section>

        <section id="15-changes" className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">15. Changes to This Policy</h2>
          <p className="text-muted-foreground">
            We may update this Privacy Policy to reflect changes in our practices, legal requirements, or service features. Material changes will be communicated via:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>In-app notification to all active users</li>
            <li>Email to registered email addresses</li>
            <li>Prominent notice on the login and signup pages</li>
            <li>Renewed consent required for material changes affecting processing purposes</li>
          </ul>
          <p className="text-muted-foreground">
            Previous versions archived and accessible upon request. Current version: {version} ({lastUpdated}).
          </p>
        </section>

        {/* Footer */}
        <footer className="border-t pt-8 text-center text-sm text-muted-foreground">
          <p>EduMan. Privacy Policy v{version}</p>
          <p className="mt-2">
            <Link href="/terms-of-use" className="text-primary hover:underline">Terms of Use</Link> | 
            <Link href="/" className="text-primary hover:underline">Home</Link>
          </p>
          <p className="mt-4 text-xs">
            <strong>Disclaimer:</strong> This document contains placeholders for legal review. Engage qualified Indian legal counsel before production use.
          </p>
        </footer>
      </div>
    </div>
  );
}