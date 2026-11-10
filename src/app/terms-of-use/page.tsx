import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileText, ArrowLeft, ExternalLink, Gavel, Building2, DollarSign, Lock, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Use | EduMan.",
  description: "EduMan Terms of Use - Terms and conditions for using the EduMan education management platform.",
  robots: "index, follow",
};

const lastUpdated = "November 6, 2026";
const version = process.env.NEXT_PUBLIC_TERMS_OF_USE_VERSION || "1.0";
const companyName = process.env.NEXT_PUBLIC_COMPANY_NAME || "[Your Company Name]";
const companyAddress = process.env.NEXT_PUBLIC_COMPANY_ADDRESS || "[Your Registered Address]";
const companyEmail = process.env.NEXT_PUBLIC_COMPANY_EMAIL || "[legal@yourcompany.com]";
const companyPhone = process.env.NEXT_PUBLIC_COMPANY_PHONE || "[+91-XXXXXXXXXX]";
const grievanceOfficerName = process.env.NEXT_PUBLIC_GRIEVANCE_OFFICER_NAME || "[Grievance Officer Name]";
const grievanceOfficerEmail = process.env.NEXT_PUBLIC_GRIEVANCE_OFFICER_EMAIL || "[grievance@yourcompany.com]";
const grievanceOfficerPhone = process.env.NEXT_PUBLIC_GRIEVANCE_OFFICER_PHONE || "[+91-XXXXXXXXXX]";

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-4">
          <Link href="/" className="inline-flex items-center gap-2 font-brand text-3xl text-primary mb-4">
            <span className="font-bold">EduMan.</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Terms of Use</h1>
          <p className="text-muted-foreground">
            Last updated: {lastUpdated} | Version: {version}
          </p>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            These Terms of Use ("Terms") govern your access to and use of the EduMan. platform ("Service"). By accessing or using the Service, you agree to be bound by these Terms. If you do not agree, do not use the Service.
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
                  This document contains placeholders (shown in <strong>square brackets</strong>) for company-specific information that must be completed by a qualified Indian legal professional before production deployment. <strong>This document does not constitute legal advice.</strong> EduMan recommends engaging a qualified lawyer to review and customise these terms for your specific operational context and regulatory requirements.
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
                <li><a href="#1-acceptance" className="hover:text-primary underline">1. Acceptance of Terms</a></li>
                <li><a href="#2-eligibility" className="hover:text-primary underline">2. Eligibility & Account Responsibilities</a></li>
                <li><a href="#3-roles-permissions" className="hover:text-primary underline">3. Roles & Permissions</a></li>
                <li><a href="#4-acceptable-use" className="hover:text-primary underline">4. Acceptable & Prohibited Use</a></li>
                <li><a href="#5-accuracy-ownership" className="hover:text-primary underline">5. Accuracy & Ownership of Records</a></li>
                <li><a href="#6-educational-data" className="hover:text-primary underline">6. Educational Data Responsibilities</a></li>
                <li><a href="#7-fee-collection" className="hover:text-primary underline">7. Manual External Fee Collection & Recording</a></li>
                <li><a href="#8-sms-ai" className="hover:text-primary underline">8. SMS & AI Limitations</a></li>
                <li><a href="#9-third-party" className="hover:text-primary underline">9. Third-Party Services</a></li>
                <li><a href="#10-subscription" className="hover:text-primary underline">10. Subscription & Payment Terms</a></li>
                <li><a href="#11-availability" className="hover:text-primary underline">11. Availability, Maintenance & Service Limitations</a></li>
                <li><a href="#12-suspension" className="hover:text-primary underline">12. Suspension & Termination</a></li>
                <li><a href="#13-ip" className="hover:text-primary underline">13. Intellectual Property</a></li>
                <li><a href="#14-liability" className="hover:text-primary underline">14. Liability & Dispute Resolution</a></li>
                <li><a href="#15-governing-law" className="hover:text-primary underline">15. Governing Law & Jurisdiction</a></li>
                <li><a href="#16-contact" className="hover:text-primary underline">16. Contact Information</a></li>
              </ol>
            </nav>
          </CardContent>
        </Card>

        {/* Sections */}
        <section id="1-acceptance" className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground">
            By creating an account, accessing, or using the EduMan. platform, you acknowledge that you have read, understood, and agree to be bound by these Terms, our Privacy Policy, and any additional guidelines or policies referenced herein. These Terms constitute a legally binding agreement between you and <strong>{companyName}</strong> ("Company", "we", "us", "our").
          </p>
          <p className="text-muted-foreground">
            We reserve the right to modify these Terms at any time. Material changes will be communicated via in-app notification and email. Continued use of the Service after changes constitutes acceptance. The current version is always available at <code>/terms-of-use</code>.
          </p>
        </section>

        <section id="2-eligibility" className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">2. Eligibility & Account Responsibilities</h2>

          <h3 className="text-xl font-semibold text-foreground">2.1 Eligibility</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>You must be at least 18 years old to create an Owner, Admin, Principal, Manager, Teacher, Accountant, or Receptionist account.</li>
            <li>Parent accounts may be created by authorised staff for parents/guardians of enrolled students.</li>
            <li>Students do not have individual login accounts.</li>
            <li>You must provide accurate, current, and complete registration information.</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground">2.2 Account Security</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>You are responsible for maintaining the confidentiality of your credentials (organisation code, username, password, MFA codes).</li>
            <li>You must not share your account with others or allow unauthorised access.</li>
            <li>Notify us immediately of any unauthorised use or security breach via the Grievance Officer.</li>
            <li>Owners and Admins must enable MFA. Principals may be required to enable MFA per organisation policy.</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground">2.3 Organisation Code</h3>
          <p className="text-muted-foreground">
            Each organisation receives a unique organisation code. Staff and parents must use this code along with their username and password to log in. The organisation code is not secret but must not be published publicly.
          </p>
        </section>

        <section id="3-roles-permissions" className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">3. Roles & Permissions</h2>
          <p className="text-muted-foreground">
            The Service implements role-based access control. Your permissions are determined by your assigned role:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="p-2">Role</th>
                  <th className="p-2">Primary Scope</th>
                  <th className="p-2">Login Method</th>
                </tr>
              </thead>
              <tbody className="border-t divide-y">
                <tr className="border-b"><td className="p-2 font-mono">Super Admin</td><td className="p-2">Platform, all organisations</td><td className="p-2">Email + MFA</td></tr>
                <tr className="border-b"><td className="p-2 font-mono">Owner</td><td className="p-2">Owned organisations</td><td className="p-2">Email + MFA / Google</td></tr>
                <tr className="border-b"><td className="p-2 font-mono">Admin</td><td className="p-2">Authorised institute</td><td className="p-2">Email + MFA / Google</td></tr>
                <tr className="border-b"><td className="p-2 font-mono">Principal</td><td className="p-2">Delegated operational</td><td className="p-2">Email + MFA(config) / Google</td></tr>
                <tr className="border-b"><td className="p-2 font-mono">Manager</td><td className="p-2">Delegated operational</td><td className="p-2">Org code + username</td></tr>
                <tr className="border-b"><td className="p-2 font-mono">Teacher</td><td className="p-2">Assigned batches</td><td className="p-2">Org code + username</td></tr>
                <tr className="border-b"><td className="p-2 font-mono">Parent</td><td className="p-2">Linked children</td><td className="p-2">Org code + username</td></tr>
                <tr className="border-b"><td className="p-2 font-mono">Accountant</td><td className="p-2">Financial records</td><td className="p-2">Org code + username</td></tr>
                <tr className="border-b"><td className="p-2 font-mono">Receptionist</td><td className="p-2">Front desk operations</td><td className="p-2">Org code + username</td></tr>
                <tr><td className="p-2 font-mono">Custom</td><td className="p-2">Admin-defined</td><td className="p-2">Org code + username</td></tr>
              </tbody>
            </table>
          </div>

          <p className="text-sm text-muted-foreground">
            <strong>Critical:</strong> Server-side authorisation is enforced on every API endpoint. Frontend UI hiding is not a security control. Cross-organisation data access is prohibited at the database and application layers.
          </p>
        </section>

        <section id="4-acceptable-use" className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">4. Acceptable & Prohibited Use</h2>

          <h3 className="text-xl font-semibold text-foreground">4.1 Acceptable Use</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Manage educational operations: students, staff, attendance, fees, exams, timetables, communications.</li>
            <li>Generate reports for internal decision-making and regulatory compliance.</li>
            <li>Communicate with parents, staff, and students via approved channels.</li>
            <li>Use AI-assisted features for drafting, summarisation, and analysis within your authorised scope.</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground">4.2 Prohibited Use</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Accessing or attempting to access data outside your authorised organisation or role.</li>
            <li>Sharing credentials, organisation codes, or bypassing authentication/MFA.</li>
            <li>Reverse engineering, decompiling, or attempting to extract source code.</li>
            <li>Automated scraping, crawling, or bulk data extraction without permission.</li>
            <li>Transmitting malware, viruses, or malicious code.</li>
            <li>Using the Service for illegal activities, harassment, or discrimination.</li>
            <li>Impersonating another user or organisation.</li>
            <li>Reselling or sublicensing the Service without a written agreement.</li>
            <li>Interfering with service availability, performance, or security.</li>
          </ul>
        </section>

        <section id="5-accuracy-ownership" className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">5. Accuracy & Ownership of Records</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li><strong>Data Ownership:</strong> Educational records belong to the respective organisation. EduMan is a data processor; organisations are data controllers.</li>
            <li><strong>Accuracy:</strong> Organisations are responsible for the accuracy of data entered. EduMan provides validation tools but does not verify content.</li>
            <li><strong>Audit Trail:</strong> All modifications are logged with user, timestamp, and before/after values.</li>
            <li><strong>Export:</strong> Organisations can export their data in standard formats (CSV, PDF) at any time.</li>
          </ul>
        </section>

        <section id="6-educational-data" className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">6. Educational Data Responsibilities</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Organisations must comply with applicable education regulations (state boards, CBSE, ICSE, etc.).</li>
            <li>Student data must be collected and processed only for legitimate educational purposes.</li>
            <li>Parental consent must be obtained for children's data per DPDP Act.</li>
            <li>Transfer certificates, mark sheets, and official documents remain the responsibility of the issuing organisation.</li>
            <li>EduMan does not generate certificates, transfer certificates, or official government documents.</li>
          </ul>
        </section>

        <section id="7-fee-collection" className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">7. Manual External Fee Collection & Recording</h2>
          <div className="p-4 rounded-lg border bg-amber-500/10">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-amber-500 mb-2">No Payment Gateway</h3>
                <p className="text-sm text-muted-foreground">
                  <strong>EduMan does not process payments.</strong> All fee payments are collected externally (cash, UPI, bank transfer, cheque, card at POS). Staff manually record payments in the system. EduMan provides receipt generation and tracking only.
                </p>
              </div>
            </div>
          </div>

          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Fee structures support instalments, discounts, scholarships, fines, and custom charges.</li>
            <li>Partial payments automatically calculate remaining balances.</li>
            <li>Receipts are generated for each payment with unique receipt numbers.</li>
            <li>Overdue and outstanding calculations are automated.</li>
            <li>Fee reminders are prepared by AI 1 day before due dates, require staff approval, and are NOT sent for fully paid fees.</li>
            <li>Organisations must reconcile recorded payments with actual bank statements regularly.</li>
          </ul>
        </section>

        <section id="8-sms-ai" className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">8. SMS & AI Limitations</h2>

          <h3 className="text-xl font-semibold text-foreground">8.1 SMS Communications</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li><strong>SMS Only:</strong> No WhatsApp, email, or push notification integrations for external messaging.</li>
            <li><strong>Delivery Not Guaranteed:</strong> SMS delivery depends on third-party providers and telecom networks. Statuses tracked: Draft → Approved → Queued → Sent → Delivered / Failed / Retrying.</li>
            <li><strong>TRAI/DLT Compliance:</strong> Organisations must register sender IDs and templates per TRAI regulations. EduMan provides the framework; compliance is the organisation's responsibility.</li>
            <li><strong>Costs:</strong> Per-SMS charges apply. No unlimited or free SMS promises. Organisations bear all costs.</li>
            <li><strong>Opt-Out:</strong> Parents can opt out of non-critical SMS. Critical alerts (emergency, attendance finalised) may still be sent.</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground">8.2 AI-Assisted Features</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li><strong>Opt-In:</strong> AI features are disabled by default at organisation level.</li>
            <li><strong>Human-in-the-Loop:</strong> AI drafts require explicit staff review and approval before use.</li>
            <li><strong>No Autonomous Actions:</strong> AI never sends messages, modifies records, or bypasses permissions.</li>
            <li><strong>Permission-Aware:</strong> AI only accesses data within the user's authorised scope.</li>
            <li><strong>Usage Limits:</strong> Per-organisation monthly limits apply. Additional usage may incur costs.</li>
            <li><strong>Provider:</strong> Configurable (OpenAI, Groq, Ollama, mock). Data sent to provider only on explicit invocation.</li>
          </ul>
        </section>

        <section id="9-third-party" className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">9. Third-Party Services</h2>
          <p className="text-muted-foreground">
            The Service integrates with or relies on the following third-party services. Your use of these integrations is subject to their respective terms:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li><strong>Cloud Hosting:</strong> Vercel, Neon, Supabase – infrastructure, database, storage.</li>
            <li><strong>Authentication:</strong> Google OAuth 2.0 – identity verification for eligible roles.</li>
            <li><strong>SMS Providers:</strong> Twilio, MSG91, TextLocal – SMS delivery.</li>
            <li><strong>AI Providers:</strong> OpenAI, Groq, Ollama – AI-assisted features.</li>
            <li><strong>Background Jobs:</strong> Inngest – scheduled tasks, retries.</li>
            <li><strong>Monitoring:</strong> Sentry (optional) – error tracking.</li>
          </ul>
          <p className="text-sm text-muted-foreground">
            We are not liable for third-party service outages, data breaches, or term changes. Organisations should review third-party terms independently.
          </p>
        </section>

        <section id="10-subscription" className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">10. Subscription & Payment Terms</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li><strong>Plans:</strong> Free, Starter, Professional, Enterprise, Custom (INR pricing).</li>
            <li><strong>Free Tier:</strong> Limited students, teachers, SMS, AI requests, storage. 30-day trial for paid features.</li>
            <li><strong>Billing:</strong> Monthly or yearly cycles. Auto-renewal unless cancelled.</li>
            <li><strong>Upgrades:</strong> Owner requests → Super Admin approval → Immediate provisioning.</li>
            <li><strong>Downgrades/Cancellation:</strong> Effective at period end. Data retained per retention policy.</li>
            <li><strong>Overages:</strong> SMS, AI, storage overages billed separately or blocked per plan limits.</li>
            <li><strong>Refunds:</strong> No refunds for partial periods except as required by law.</li>
            <li><strong>Cost Transparency:</strong> SMS, hosting, storage, AI costs disclosed. No hidden fees.</li>
          </ul>
        </section>

        <section id="11-availability" className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">11. Availability, Maintenance & Service Limitations</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li><strong>Uptime Target:</strong> 99.9% monthly (excluding scheduled maintenance).</li>
            <li><strong>Maintenance Windows:</strong> Scheduled during low-usage hours (typically 2-5 AM IST). Advance notice via in-app banner.</li>
            <li><strong>Emergency Maintenance:</strong> May occur without notice for critical security fixes.</li>
            <li><strong>Feature Limitations:</strong> Free tier has enforced limits. Paid tiers have soft limits with overage handling.</li>
            <li><strong>PWA/Offline:</strong> Limited offline access via PWA (cached data, queued actions). Full functionality requires internet.</li>
            <li><strong>Mobile Apps:</strong> Android app planned (shared backend). iOS not currently planned.</li>
          </ul>
        </section>

        <section id="12-suspension" className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">12. Suspension & Termination</h2>

          <h3 className="text-xl font-semibold text-foreground">12.1 By Organisation</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Organisations may cancel subscription at any time. Access continues until period end.</li>
            <li>Data export available before termination. 30-day grace period for data retrieval after cancellation.</li>
            <li>Account deletion requests processed per Privacy Policy (erasure rights, legal exceptions).</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground">12.2 By EduMan</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Material breach of these Terms (unremedied after 14 days' notice).</li>
            <li>Non-payment of fees (15 days past due).</li>
            <li>Illegal activity, security threats, or abuse of the Service.</li>
            <li>Extended inactivity (180+ days on Free tier).</li>
            <li>Regulatory or legal requirement.</li>
          </ul>

          <h3 className="text-xl font-semibold text-foreground">12.3 Effect of Termination</h3>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Immediate suspension of access (except data export during grace period).</li>
            <li>Data retained per backup/retention policies, then securely deleted.</li>
            <li>No liability for data loss post-termination if export not performed.</li>
          </ul>
        </section>

        <section id="13-ip" className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">13. Intellectual Property</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li><strong>EduMan IP:</strong> All rights to the platform, code, design, trademarks ("EduMan.", logo) remain with the Company.</li>
            <li><strong>Your Data:</strong> You retain all rights to data you submit. You grant us a licence to process it for Service delivery.</li>
            <li><strong>Feedback:</strong> Suggestions, bug reports, feedback become Company property without compensation.</li>
            <li><strong>No Licence:</strong> These Terms do not grant any licence to use Company trademarks or branding.</li>
          </ul>
        </section>

        <section id="14-liability" className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">14. Liability & Dispute Resolution</h2>

          <h3 className="text-xl font-semibold text-foreground">14.1 Disclaimer of Warranties</h3>
          <p className="text-sm text-muted-foreground">
            THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR UNINTERRUPTED/ERROR-FREE OPERATION.
          </p>

          <h3 className="text-xl font-semibold text-foreground">14.2 Limitation of Liability</h3>
          <p className="text-sm text-muted-foreground">
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, THE COMPANY SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF DATA, REVENUE, PROFITS, OR GOODWILL. TOTAL LIABILITY SHALL NOT EXCEED THE FEES PAID BY THE ORGANISATION IN THE 12 MONTHS PRECEDING THE CLAIM.
          </p>

          <h3 className="text-xl font-semibold text-foreground">14.3 Indemnification</h3>
          <p className="text-sm text-muted-foreground">
            You agree to indemnify and hold harmless the Company from claims arising from your use of the Service, violation of these Terms, or infringement of third-party rights.
          </p>

          <h3 className="text-xl font-semibold text-foreground">14.4 Dispute Resolution</h3>
          <p className="text-sm text-muted-foreground">
            Disputes shall be resolved through good-faith negotiation. Failing that, binding arbitration under the Arbitration and Conciliation Act, 1996, at [City], India, in English. [TO BE REVIEWED: Specific arbitration institution, seat, and language.]
          </p>
        </section>

        <section id="15-governing-law" className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">15. Governing Law & Jurisdiction</h2>
          <p className="text-muted-foreground">
            These Terms are governed by the laws of India. Subject to the arbitration clause above, the courts at [City], India shall have exclusive jurisdiction. [TO BE REVIEWED: Specific jurisdiction by legal counsel.]
          </p>
          <div className="p-4 rounded-lg border bg-muted/30">
            <p className="text-sm text-muted-foreground">
              <strong>Legal Review Required:</strong> The governing law, jurisdiction, and arbitration provisions must be reviewed and customised by qualified Indian legal counsel before production deployment.
            </p>
          </div>
        </section>

        <section id="16-contact" className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">16. Contact Information</h2>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Company</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>{companyName}</strong></p>
                <p>{companyAddress}</p>
                <p>Email: {companyEmail}</p>
                <p>Phone: {companyPhone}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Grievance Officer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p><strong>{grievanceOfficerName}</strong></p>
                <p>Email: {grievanceOfficerEmail}</p>
                <p>Phone: {grievanceOfficerPhone}</p>
              </CardContent>
            </Card>
          </div>

          <p className="text-sm text-muted-foreground">
            For legal notices, use the Grievance Officer email with subject "LEGAL NOTICE - EduMan".
          </p>
        </section>

        {/* Footer */}
        <footer className="border-t pt-8 text-center text-sm text-muted-foreground">
          <p>EduMan. Terms of Use v{version}</p>
          <p className="mt-2">
            <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link> | 
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