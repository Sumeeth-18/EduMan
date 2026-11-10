# EduMan - Internal Requirements Summary

**Derived from:** EduMan_Complete_Product_Blueprint.pdf  
**Version:** 1.0  
**Date:** 2026-11-06

---

## Core Identity
- **Name:** EduMan. (with full stop)
- **Tagline:** Manage Every Student.
- **Logo:** Supplied registration-book icon (unchanged)
- **Colors:** Blue palette (7 shades, main #204E72) + Green palette (7 shades, main #3F6038)
- **Dark Mode:** Carbon black (#111111), NOT dark navy
- **Fonts:** Calistoga (logo), Inter (UI), Space Mono (IDs/codes)

---

## Architecture
- **Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + Drizzle ORM + PostgreSQL
- **Auth:** NextAuth.js v5 (credentials + Google OAuth + TOTP MFA)
- **Database:** Single PostgreSQL with `organization_id` on all tables + Row Level Security
- **Hosting:** Vercel (frontend) + Neon/Supabase (PostgreSQL, free tier)
- **File Storage:** Supabase Storage / S3-compatible (MinIO for local dev)
- **SMS:** Provider-abstracted (Twilio/Msg91/TextLocal compatible)
- **AI:** OpenAI-compatible API with per-org usage tracking
- **PWA:** next-pwa + Workbox
- **Background Jobs:** Inngest or pg_cron (scheduled reminders, reports)

---

## Multi-Tenancy Model
- One Owner → Multiple Organisations (institutes)
- Each org: unique code, name, logo, branches, academic sessions
- Complete data isolation via `organization_id` + RLS + app-layer checks
- Owner switches orgs via institute selector
- Cross-org access only when explicitly granted

---

## Roles (10 + Custom)
| Role | Primary Access |
|------|----------------|
| Super Admin | Platform, orgs, users, plans, system settings |
| Owner | Institutes, branches, staff, records, permissions |
| Admin | Authorised institute administration |
| Principal | Delegated operational (configurable MFA) |
| Manager | Delegated operational responsibilities |
| Teacher | Assigned batches: attendance, homework, marks, materials, parent queries |
| Parent | Linked children: attendance, fees, results, timetable, homework, materials, messages |
| Accountant | Fee records, external payments, outstanding, receipts, reports |
| Receptionist | Student directory, parent contacts, enquiries |
| Custom | Admin-defined permissions |

**Critical:** Students have NO login. Parents are account holders.

---

## Key Workflows

### Attendance (Teacher-Friendly)
1. Teacher opens register → all students default **Present**
2. Teacher marks **Absent**, **Late**, **Early Departure**
3. Teacher **reviews** register (visible all-present state)
4. Teacher **finalises** explicitly → only then confirmed
5. **Unreviewed registers NEVER auto-confirm**
6. Notifications sent ONLY after finalisation

### Fees (External Payments Only)
- Structures: course/batch/individual/custom
- Instalments, discounts, scholarships, fines
- Record: cash, UPI, bank transfer (manual entry)
- Partial payments → auto-calculate balance
- Overdue/outstanding calculation
- Receipts (downloadable)
- **Reminders: AI prepares 1 day before due → staff edit/approve → NO reminder if fully paid**

### SMS Communication
- **SMS only** (no WhatsApp)
- AI drafts with dynamic fields: `{{StudentName}}`, `{{ParentName}}`, `{{PendingAmount}}`, `{{DueDate}}`, `{{AttendanceStatus}}`, `{{BatchName}}`, `{{InstituteName}}`
- Per-recipient preview
- Staff edit → approve → send
- Statuses: draft, awaiting approval, scheduled, queued, sent, delivered, failed, retrying, manually resent
- Provider compliance (TRAI/DLT, sender ID registration)
- Transparent pricing (no unlimited promise)

---

## Modules Summary
1. **Student & Parent Management** - Profiles, custom fields, import/export, parent linking, SMS credentials
2. **Attendance** - All-present default, leave requests, reports, audit logs
3. **Fee Management** - Structures, payments, receipts, reports, reminder suppression
3. **Staff Management** - Profiles, assignments, leave, custom permissions (no payroll)
4. **Homework** - Teacher create/publish, parent view, batch/subject org, history (no submissions)
5. **Study Materials** - PDF upload, batch/subject org, parent download, permissions/limits
6. **Examinations** - Create, manual marks entry, calculate, publish, auto-notify, history/reports
7. **Timetable** - Schedules, rooms, teachers, breaks, holidays, admin-only edits, parent notifications
8. **Academic Calendar** - Events, holidays, exams, assignments, meetings
9. **Communication** - Announcements, direct/group messages, parent-teacher chat, attachments, emergency, enquiries, feedback/complaints
10. **Reports & Analytics** - Academic, financial, student progress, fee collection, teacher performance, global search, activity feed
11. **AI Assistant** - Permission-aware: SMS drafts, summaries, patterns, notices, homework help, how-to, reports
12. **Security & Audit** - Login, 2FA, sessions, RBAC, audit logs, daily backups (30-day), 30-day recycle bin
13. **Super Admin** - Org/user management, subscriptions (INR), platform analytics, plan approvals

---

## Legal & Privacy (DPDP Act 2023)
- **Privacy Policy** page: all required sections, placeholders for missing legal info
- **Terms of Use** page: all required sections, placeholders
- **Signup Consent:** Unchecked checkbox, exact wording: *"By clicking Continue, you agree to our Privacy Policy and Terms of Use."* Links clickable. Continue disabled until checked + valid fields. Backend enforcement. Store: user_id, consent_status, timestamp, policy_version, terms_version, registration_method.
- No invented company details, no false compliance claims
- Parental consent for children's data
- Data principal rights: access, correction, erasure, grievance
- Retention policies, 30-day recycle bin, backup alignment
- Breach detection & notification procedures
- Grievance officer placeholder

---

## Security Non-Negotiables (19 Areas + More)
1. Secure auth & recovery
2. MFA for Owner/Admin, configurable for Principal
3. Real Google OAuth 2.0/OIDC (PKCE)
4. Strict server-side RBAC
5. Multi-tenant isolation (DB + app layer)
6. Least privilege, restricted admin
7. Argon2id/bcrypt password hashing
8. Secure sessions, token expiry, revocation, logout
9. Input validation (Zod), sanitisation, output encoding
10. SQL injection prevention (Drizzle parameterized)
11. XSS prevention (React + CSP)
12. CSRF protection
13. Rate limiting, brute-force, abuse prevention
14. Encryption in transit (TLS 1.2+) & at rest
15. Secret management (env only, never frontend/Git/logs)
16. Tamper-resistant audit logs (append-only, hash-chained)
17. Daily backups (30-day), tested restore, 30-day recycle bin
18. Secure file uploads (validation, access control, signed URLs)
19. Security monitoring, vuln handling, incident response, privacy protection
+ IDOR prevention, privilege escalation prevention, cross-tenant leakage prevention
+ Account enumeration, credential stuffing, session theft protection
+ Secure headers (HSTS, CSP, X-Frame-Options), HTTPS, CORS, cookie config
+ No logging of passwords, tokens, sensitive student data
+ Safe defaults, deny-by-default
+ Dependency auditing (npm audit, Dependabot)
+ Server-side auth testing (not UI hiding)
+ Security checklist with statuses (this doc)

---

## Exclusions (Confirmed NOT Building)
- ❌ In-app payment gateway
- ❌ WhatsApp integration
- ❌ Student individual login
- ❌ Student homework submissions
- ❌ Salary/payroll
- ❌ Expense management
- ❌ Library management
- ❌ Transport management
- ❌ Inventory management
- ❌ Certificate generation
- ❌ Admission application workflow

---

## UI/UX Requirements
- Professional, minimal, modern, responsive
- Bottom navigation (mobile main sections)
- Fixed role-specific dashboards (no draggable widgets)
- Tables: sort, search, filter, paginate, column customize
- Light/dark mode per user (independent)
- Carbon black dark mode (#111111)
- Accessible contrast, keyboard nav, readable typography (WCAG AA)
- Clear loading/success/error/empty states
- Limited offline (PWA cached data, queued actions)

---

## Development Principles
- **₹0 Budget:** Only genuinely free tools/services
- **No paid APIs/deployments** without explicit approval
- **Incremental, focused tasks** - save progress frequently
- **Maintain tracking docs:** DEVELOPMENT_STATUS.md, SECURITY_CHECKLIST.md, PRIVACY_COMPLIANCE.md, REQUIREMENTS_TRACEABILITY.md
- **Test before declaring complete** - functional + security + privacy
- **Never mark Tested without evidence**
- **Fix critical/high vulns before production**
- **Legal review required before real users/data**

---

## Immediate Next Steps
1. Initialize Next.js 14 project with TypeScript, Tailwind, ESLint, Prettier
2. Configure Drizzle ORM with PostgreSQL schema (all entities from Section 23)
3. Set up NextAuth.js v5 with credentials + Google + TOTP MFA
4. Implement multi-tenancy middleware + RLS policies
5. Build design system (colors, typography, components, dark/light)
6. Create core layout (dashboard shells, bottom nav, institute switcher)
7. Implement signup with mandatory consent checkbox
8. Build Privacy Policy & Terms of Use pages
9. Begin module implementation: Student/Parent → Attendance → Fees → Staff → etc.