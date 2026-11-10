# EduMan Requirements Traceability Checklist

**Source:** EduMan_Complete_Product_Blueprint.pdf  
**Version:** 1.0  
**Last Updated:** 2026-11-06  
**Status Legend:** 🔴 Not Started | 🟡 In Progress | 🟢 Implemented | ✅ Tested | ⚠️ Needs Attention

---

## Product Overview & Brand Identity (Blueprint Sections 1-4)

| Req ID | Requirement | Blueprint Ref | Status | Implementation Notes |
|--------|-------------|---------------|--------|---------------------|
| BR-001 | Application name: "EduMan." (with full stop) | Sec 3, Instructions | 🔴 | Override PDF's "EduMan" |
| BR-002 | Tagline: "Manage Every Student." | Sec 3 | 🔴 | |
| BR-003 | Logo: supplied registration-book icon, unchanged | Sec 3, Instructions | 🔴 | Use provided PNG/SVG |
| BR-004 | Blue palette (7 shades) + Green palette (7 shades) | Sec 3 | 🔴 | Exact hex values |
| BR-005 | Light mode: white bg (#FFFFFF), Dark mode: carbon black (#111111) | Sec 3 | 🔴 | NOT dark navy |
| BR-006 | Typography: Calistoga (logo), Inter (UI), Space Mono (IDs/codes) | Sec 3 | 🔴 | |
| BR-007 | Responsive web + PWA + Android + Desktop (Win/Mac/Linux) | Sec 4 | 🔴 | Shared backend |
| BR-008 | Mobile/tablet/desktop adaptive interface | Sec 4 | 🔴 | |

---

## Multi-Institute Organisation Model (Section 5)

| Req ID | Requirement | Blueprint Ref | Status | Implementation Notes |
|--------|-------------|---------------|--------|---------------------|
| MI-001 | One owner → multiple institute workspaces | Sec 5 | 🔴 | |
| MI-002 | Auto-generated unique organisation code per institute | Sec 5 | 🔴 | |
| MI-003 | Institute: name, logo, contact, branches, academic sessions | Sec 5 | 🔴 | |
| MI-004 | All data institute-specific (students, staff, courses, batches, attendance, fees, timetables, announcements, documents) | Sec 5 | 🔴 | |
| MI-005 | Owner institute switcher | Sec 5 | 🔴 | |
| MI-006 | Cross-institute access only when explicitly granted | Sec 5 | 🔴 | |
| MI-007 | Backend + database enforced isolation (not UI-only) | Sec 5 | 🔴 | Critical security |

---

## User Roles & Account Rules (Section 6)

| Req ID | Requirement | Blueprint Ref | Status | Implementation Notes |
|--------|-------------|---------------|--------|---------------------|
| UR-001 | Roles: Super Admin, Owner, Admin, Principal, Manager, Teacher, Parent, Accountant, Receptionist, Custom | Sec 6 | 🔴 | |
| UR-002 | Students: no individual login | Sec 6 | 🔴 | |
| UR-003 | Parents: account holders for linked students | Sec 6 | 🔴 | |
| UR-004 | Only owners/admins create/edit student profiles | Sec 6 | 🔴 | |
| UR-005 | Parents view-only (no edit student records) | Sec 6 | 🔴 | |
| UR-006 | Teachers access only assigned students/batches | Sec 6 | 🔴 | |
| UR-007 | Fixed simple dashboards per role | Sec 6 | 🔴 | |
| UR-008 | Server-side permission checks on every protected action | Sec 6 | 🔴 | Critical |

---

## Dashboards & Navigation (Section 7)

| Req ID | Requirement | Blueprint Ref | Status | Implementation Notes |
|--------|-------------|---------------|--------|---------------------|
| DN-001 | Owner dashboard: students, staff, institutes, branches, attendance, fees, exams, announcements, reports, institute switcher | Sec 7 | 🔴 | |
| DN-002 | Admin dashboard: students, parents, teachers, attendance, fees, timetables, reports, communication, settings | Sec 7 | 🔴 | |
| DN-003 | Teacher dashboard: assigned batches/students, attendance, timetable, homework, exams, marks, materials, parent queries | Sec 7 | 🔴 | |
| DN-004 | Parent dashboard: linked children, attendance, fees, history, receipts, timetable, results, homework, materials, messages | Sec 7 | 🔴 | |
| DN-005 | Accountant dashboard: fee records, external payment entry, outstanding balances, receipts, collection reports | Sec 7 | 🔴 | |
| DN-006 | Receptionist dashboard: student directory, parent contacts, enquiries, permitted student actions | Sec 7 | 🔴 | |
| DN-007 | Bottom navigation bar for main sections | Sec 7 | 🔴 | Mobile-first |
| DN-008 | Fixed dashboards (no draggable widgets) | Sec 7 | 🔴 | |
| DN-009 | Tables: search, sort, filter, paginate, column customize | Sec 7 | 🔴 | |

---

## Student & Parent Management (Section 8)

| Req ID | Requirement | Blueprint Ref | Status | Implementation Notes |
|--------|-------------|---------------|--------|---------------------|
| SP-001 | Create student profiles with custom fields | Sec 8 | 🔴 | |
| SP-002 | Auto-generate unique student IDs & org codes | Sec 8 | 🔴 | Space Mono font |
| SP-003 | Parent details, contacts, course/batch assignments, academic history, documents | Sec 8 | 🔴 | |
| SP-004 | Student → multiple courses & batches simultaneously | Sec 8 | 🔴 | |
| SP-005 | Import/export Excel/CSV for students & teachers | Sec 8 | 🔴 | |
| SP-006 | Customisable import templates & required columns | Sec 8 | 🔴 | |
| SP-007 | Create parent accounts, link to students | Sec 8 | 🔴 | |
| SP-008 | Send parent credentials via SMS (secure delivery) | Sec 8 | 🔴 | |
| SP-009 | Parent view: attendance, fees, results, timetable, homework, materials, announcements, communication | Sec 8 | 🔴 | |

---

## Attendance Management (Section 9)

| Req ID | Requirement | Blueprint Ref | Status | Implementation Notes |
|--------|-------------|---------------|--------|---------------------|
| AT-001 | Default: all students Present when register opened | Sec 9 | 🔴 | |
| AT-002 | Teacher marks absentees, late arrivals, early departures | Sec 9 | 🔴 | |
| AT-003 | Teacher reviews & explicitly finalises register | Sec 9 | 🔴 | Critical: no auto-confirm |
| AT-004 | Unreviewed register NEVER auto-confirms | Sec 9 | 🔴 | Critical |
| AT-005 | Manual attendance with all-present default | Sec 9 | 🔴 | |
| AT-006 | Late arrivals & early departures | Sec 9 | 🔴 | |
| AT-007 | Student leave requests & approvals | Sec 9 | 🔴 | |
| AT-008 | Permission-based access (owner, admin, teacher) | Sec 9 | 🔴 | |
| AT-009 | Daily/weekly/monthly/yearly reports (student & batch) | Sec 9 | 🔴 | |
| AT-010 | Attendance history & audit logs | Sec 9 | 🔴 | |
| AT-011 | Daily attendance summary for parents | Sec 9 | 🔴 | |
| AT-012 | Attendance notifications ONLY after teacher finalises | Sec 9 | 🔴 | |

---

## Fee Management (Section 10)

| Req ID | Requirement | Blueprint Ref | Status | Implementation Notes |
|--------|-------------|---------------|--------|---------------------|
| FM-001 | No in-app payment gateway (external only) | Sec 10, 25 | 🔴 | |
| FM-002 | Course/batch/individual/custom fee structures | Sec 10 | 🔴 | |
| FM-003 | Instalments, discounts, scholarships, fines, custom charges | Sec 10 | 🔴 | |
| FM-004 | Record cash, UPI, bank transfer, other external payments | Sec 10 | 🔴 | |
| FM-005 | Partial payments & remaining balance calculation | Sec 10 | 🔴 | |
| FM-006 | Overdue & outstanding fee calculation | Sec 10 | 🔴 | |
| FM-007 | Payment history & downloadable receipts | Sec 10 | 🔴 | |
| FM-008 | Monthly fee collection & pending payment reports | Sec 10 | 🔴 | |
| FM-009 | Stop reminders when fully paid | Sec 10 | 🔴 | |

---

## SMS & In-App Communication (Section 11)

| Req ID | Requirement | Blueprint Ref | Status | Implementation Notes |
|--------|-------------|---------------|--------|---------------------|
| SM-001 | SMS only (no WhatsApp) | Sec 11, 25 | 🔴 | |
| SM-002 | Message types: fee reminders, attendance, announcements, exam results, timetable changes, account setup, admin notifications | Sec 11 | 🔴 | |
| SM-003 | AI message editor with dynamic fields | Sec 11 | 🔴 | {{StudentName}}, {{ParentName}}, etc. |
| SM-004 | Staff edit full text, insert fields, select recipients, preview each | Sec 11 | 🔴 | |
| SM-005 | Search/filter student list, select one/multiple | Sec 11 | 🔴 | |
| SM-006 | Resolve linked parent & permitted contact per student | Sec 11 | 🔴 | |
| SM-007 | Personalised drafts & per-recipient preview | Sec 11 | 🔴 | |
| SM-008 | Authorised staff edit & approve | Sec 11 | 🔴 | |
| SM-009 | Approved sender arrangement (compliant) | Sec 11 | 🔴 | TRAI/DLT |
| SM-010 | Record every message & delivery status | Sec 11 | 🔴 | |
| SM-011 | Fee reminder: AI prepares 1 day before due date | Sec 11 | 🔴 | |
| SM-012 | Fee reminder: include student, parent, amount, due date, institute | Sec 11 | 🔴 | |
| SM-013 | Staff edit/approve draft | Sec 11 | 🔴 | |
| SM-014 | Institute settings: individual approval vs approved template | Sec 11 | 🔴 | |
| SM-015 | Recalculate outstanding after payment recorded | Sec 11 | 🔴 | |
| SM-016 | NO fee reminder if fully paid | Sec 11 | 🔴 | Critical |
| SM-017 | Attendance notification: after teacher finalises register | Sec 11 | 🔴 | |
| SM-018 | SMS provider compliance (sender ID, verified routes, device-based) | Sec 11 | 🔴 | No spoofing |
| SM-019 | Message statuses: draft, awaiting approval, scheduled, queued, sent, delivered, failed, retrying, manually resent | Sec 11 | 🔴 | |
| SM-020 | Transparent SMS charges & limits (no unlimited promise) | Sec 11 | 🔴 | |

---

## Staff Management (Section 12)

| Req ID | Requirement | Blueprint Ref | Status | Implementation Notes |
|--------|-------------|---------------|--------|---------------------|
| ST-001 | Teacher/staff profiles, contacts, documents | Sec 12 | 🔴 | |
| ST-002 | Roles, departments, qualifications, subjects | Sec 12 | 🔴 | |
| ST-003 | Assigned batches & classes | Sec 12 | 🔴 | |
| ST-004 | Staff leave requests & admin approval/rejection | Sec 12 | 🔴 | |
| ST-005 | Custom permissions | Sec 12 | 🔴 | |
| ST-006 | NO salary/payroll module | Sec 12, 25 | 🔴 | |

---

## Homework & Study Materials (Section 13)

| Req ID | Requirement | Blueprint Ref | Status | Implementation Notes |
|--------|-------------|---------------|--------|---------------------|
| HM-001 | Teachers create & publish homework | Sec 13 | 🔴 | |
| HM-002 | Parents view homework for linked students | Sec 13 | 🔴 | |
| HM-003 | Batch-wise & subject-wise organisation | Sec 13 | 🔴 | |
| HM-004 | Homework history | Sec 13 | 🔴 | |
| HM-005 | NO student homework submissions | Sec 13, 25 | 🔴 | |
| HM-006 | Teachers upload PDFs/documents (study materials) | Sec 13 | 🔴 | |
| HM-007 | Organise by batch & subject | Sec 13 | 🔴 | |
| HM-008 | Parents view/download for linked students | Sec 13 | 🔴 | |
| HM-009 | File permissions & storage limits | Sec 13 | 🔴 | |

---

## Examinations & Results (Section 14)

| Req ID | Requirement | Blueprint Ref | Status | Implementation Notes |
|--------|-------------|---------------|--------|---------------------|
| EX-001 | Create exams & assign to batches | Sec 14 | 🔴 | |
| EX-002 | Teachers manually enter marks | Sec 14 | 🔴 | |
| EX-003 | Calculate & prepare results | Sec 14 | 🔴 | |
| EX-004 | Teachers/admins publish results | Sec 14 | 🔴 | |
| EX-005 | Auto-notify parents on publish | Sec 14 | 🔴 | |
| EX-006 | Exam history & individual/batch performance reports | Sec 14 | 🔴 | |

---

## Timetable & Academic Calendar (Section 15)

| Req ID | Requirement | Blueprint Ref | Status | Implementation Notes |
|--------|-------------|---------------|--------|---------------------|
| TC-001 | Class schedules, subjects, teachers, rooms | Sec 15 | 🔴 | |
| TC-002 | Breaks, recurring classes, holidays | Sec 15 | 🔴 | |
| TC-003 | Teacher schedules & room allocation | Sec 15 | 🔴 | |
| TC-004 | Only admins/authorised staff create/modify timetables | Sec 15 | 🔴 | |
| TC-005 | Notify parents on published timetable changes | Sec 15 | 🔴 | |
| TC-006 | Academic calendar: holidays, exams, events, assignments, meetings | Sec 15 | 🔴 | |
| TC-007 | Admins/authorised staff manage calendar events | Sec 15 | 🔴 | |

---

## Communication, Enquiries & Feedback (Section 16)

| Req ID | Requirement | Blueprint Ref | Status | Implementation Notes |
|--------|-------------|---------------|--------|---------------------|
| CE-001 | Announcements, circulars, direct messages, group messages | Sec 16 | 🔴 | |
| CE-002 | Parent-teacher communication in-app | Sec 16 | 🔴 | |
| CE-003 | Parents submit queries, teachers respond | Sec 16 | 🔴 | |
| CE-004 | Announcements with PDF/document attachments | Sec 16 | 🔴 | |
| CE-005 | Emergency announcements & communication history | Sec 16 | 🔴 | |
| CE-006 | Basic enquiry management (prospective students) | Sec 16 | 🔴 | |
| CE-007 | Students/parents submit feedback/complaints to admins | Sec 16 | 🔴 | |
| CE-008 | Only authorised staff publish announcements | Sec 16 | 🔴 | |

---

## Reports, Analytics & Global Search (Section 17)

| Req ID | Requirement | Blueprint Ref | Status | Implementation Notes |
|--------|-------------|---------------|--------|---------------------|
| RA-001 | Academic & financial reports | Sec 17 | 🔴 | |
| RA-002 | Individual student progress & attendance reports | Sec 17 | 🔴 | |
| RA-003 | Fee collection & pending payment reports | Sec 17 | 🔴 | |
| RA-004 | Teacher performance & batch/branch comparisons | Sec 17 | 🔴 | |
| RA-005 | Downloadable reports | Sec 17 | 🔴 | |
| RA-006 | Global search: students, staff, parents, courses, batches, fees, announcements, documents | Sec 17 | 🔴 | |
| RA-007 | Role-based activity feed | Sec 17 | 🔴 | |

---

## AI Assistant (Section 18)

| Req ID | Requirement | Blueprint Ref | Status | Implementation Notes |
|--------|-------------|---------------|--------|---------------------|
| AI-001 | Role & permission aware | Sec 18 | 🔴 | |
| AI-002 | Draft & personalise SMS reminders | Sec 18 | 🔴 | |
| AI-003 | Summarise attendance & fee reports | Sec 18 | 🔴 | |
| AI-004 | Identify attendance patterns & fee trends | Sec 18 | 🔴 | |
| AI-005 | Draft notices & announcements | Sec 18 | 🔴 | |
| AI-006 | Assist with homework preparation | Sec 18 | 🔴 | |
| AI-007 | Explain how to use EduMan | Sec 18 | 🔴 | |
| AI-008 | Help generate/interpret reports | Sec 18 | 🔴 | |
| AI-009 | NO unapproved sends, NO publish without permission, NO financial changes without confirmation, NO bypass permissions, NO cross-tenant access | Sec 18 | 🔴 | Critical |
| AI-010 | Limited free usage + optional higher limits | Sec 18 | 🔴 | |

---

## Security, Audit & Recovery (Section 19)

| Req ID | Requirement | Blueprint Ref | Status | Implementation Notes |
|--------|-------------|---------------|--------|---------------------|
| SA-001 | Common login page for all orgs | Sec 19 | 🔴 | |
| SA-002 | Login: org code + username + password | Sec 19 | 🔴 | |
| SA-003 | Secure password hashing | Sec 19 | 🔴 | |
| SA-004 | Account recovery: SMS OTP or admin reset | Sec 19 | 🔴 | |
| SA-005 | 2FA for owners & admins | Sec 19 | 🔴 | |
| SA-006 | Session management & secure logout | Sec 19 | 🔴 | |
| SA-007 | RBAC & server-side authorisation | Sec 19 | 🔴 | |
| SA-008 | Strict tenant isolation | Sec 19 | 🔴 | |
| SA-009 | Audit logs: login history, suspicious activity alerts | Sec 19 | 🔴 | |
| SA-010 | Audit logs: profile changes, fee edits, attendance changes | Sec 19 | 🔴 | |
| SA-011 | Audit logs: admin actions, permission changes | Sec 19 | 🔴 | |
| SA-012 | Downloadable audit reports | Sec 19 | 🔴 | |
| SA-013 | Automatic daily backups | Sec 19 | 🔴 | |
| SA-014 | Manual backups by authorised admins | Sec 19 | 🔴 | |
| SA-015 | 30-day backup retention | Sec 19 | 🔴 | |
| SA-016 | 30-day recycle bin with restoration | Sec 19 | 🔴 | |
| SA-017 | Secure restoration & recovery testing | Sec 19 | 🔴 | |

---

## Super Admin & Subscriptions (Section 20)

| Req ID | Requirement | Blueprint Ref | Status | Implementation Notes |
|--------|-------------|---------------|--------|---------------------|
| SU-001 | View/manage orgs & users | Sec 20 | 🔴 | |
| SU-002 | Manage subscription plans, usage limits, status | Sec 20 | 🔴 | |
| SU-003 | Platform analytics & complaints | Sec 20 | 🔴 | |
| SU-004 | System-wide settings & verification | Sec 20 | 🔴 | |
| SU-005 | Org plan upgrade requests, Super Admin manual approval | Sec 20 | 🔴 | |
| SU-006 | Immediate registration with optional verification | Sec 20 | 🔴 | |
| SU-007 | INR currency for pricing | Sec 20 | 🔴 | |
| SU-008 | Essential free/affordable; premium for analytics, storage, AI, limits | Sec 20 | 🔴 | |
| SU-009 | Disclose SMS, hosting, storage, AI costs | Sec 20 | 🔴 | |

---

## UX & Accessibility (Section 21)

| Req ID | Requirement | Blueprint Ref | Status | Implementation Notes |
|--------|-------------|---------------|--------|---------------------|
| UX-001 | Professional, info-rich, uncluttered | Sec 21 | 🔴 | |
| UX-002 | Simple workflows for non-technical users | Sec 21 | 🔴 | |
| UX-003 | Responsive: mobile, tablet, desktop | Sec 21 | 🔴 | |
| UX-004 | Bottom navigation (mobile main sections) | Sec 21 | 🔴 | |
| UX-005 | Fixed role-specific dashboards | Sec 21 | 🔴 | |
| UX-006 | Independent light/dark per user | Sec 21 | 🔴 | |
| UX-007 | Carbon-black dark mode (#111111) | Sec 21 | 🔴 | |
| UX-008 | Tables: search, sort, filter, paginate, column customize | Sec 21 | 🔴 | |
| UX-009 | Limited offline access (cached data, queued actions) | Sec 21 | 🔴 | PWA |
| UX-010 | Clear loading/success/error/empty states | Sec 21 | 🔴 | |
| UX-011 | Accessible contrast, keyboard nav, readable typography | Sec 21 | 🔴 | WCAG AA target |

---

## Technical Architecture (Section 22)

| Req ID | Requirement | Blueprint Ref | Status | Implementation Notes |
|--------|-------------|---------------|--------|---------------------|
| TA-001 | Shared backend + secure APIs for all clients | Sec 22 | 🔴 | |
| TA-002 | Frontend: responsive web + shared UI components | Sec 22 | 🔴 | |
| TA-003 | PWA + desktop clients (installable) | Sec 22 | 🔴 | |
| TA-004 | Android client (shared backend) | Sec 22 | 🔴 | Future |
| TA-005 | Backend: business logic, validation, authorisation, integrations | Sec 22 | 🔴 | |
| TA-006 | Database: relational multi-tenant + tenant-scoped access | Sec 22 | 🔴 | |
| TA-007 | Auth: identity, sessions, password recovery, 2FA | Sec 22 | 🔴 | |
| TA-008 | File storage: logos, docs, PDFs, uploads | Sec 22 | 🔴 | |
| TA-009 | Background jobs: reminders, notifications, reports, retries | Sec 22 | 🔴 | |
| TA-010 | AI service layer: drafts, summaries, permission-aware | Sec 22 | 🔴 | |
| TA-011 | SMS integration: compliant provider | Sec 22 | 🔴 | |
| TA-012 | Monitoring: logs, errors, metrics, delivery status | Sec 22 | 🔴 | |
| TA-013 | Idempotent scheduled jobs & message sending | Sec 22 | 🔴 | |
| TA-014 | Retry handling with limits & failure visibility | Sec 22 | 🔴 | |
| TA-015 | Server-side validation & permission checks | Sec 22 | 🔴 | |
| TA-016 | API versioning & documented interfaces | Sec 22 | 🔴 | |
| TA-017 | Secure file access & upload validation | Sec 22 | 🔴 | |
| TA-018 | Database migrations & backup restoration tests | Sec 22 | 🔴 | |
| TA-019 | Monitoring for failed jobs, SMS delivery, app errors | Sec 22 | 🔴 | |

---

## Core Data Model (Section 23)

| Req ID | Entity | Blueprint Ref | Status | Implementation Notes |
|--------|--------|---------------|--------|---------------------|
| DM-001 | Organisations & Branches | Sec 23 | 🔴 | |
| DM-002 | Users, Roles, Permissions | Sec 23 | 🔴 | |
| DM-003 | Students & Parents | Sec 23 | 🔴 | |
| DM-004 | ParentStudentLinks | Sec 23 | 🔴 | |
| DM-005 | AcademicYears, Courses, Subjects | Sec 23 | 🔴 | |
| DM-006 | Batches & StudentEnrollments | Sec 23 | 🔴 | |
| DM-007 | Attendance & LeaveRequests | Sec 23 | 🔴 | |
| DM-008 | FeeStructures, StudentFees, Payments | Sec 23 | 🔴 | |
| DM-009 | Receipts | Sec 23 | 🔴 | |
| DM-010 | Examinations & Marks | Sec 23 | 🔴 | |
| DM-011 | Homework & StudyMaterials | Sec 23 | 🔴 | |
| DM-012 | Timetables & CalendarEvents | Sec 23 | 🔴 | |
| DM-013 | Announcements, Messages, Notifications | Sec 23 | 🔴 | |
| DM-014 | MessageTemplates, SMSMessages, MessageApprovals | Sec 23 | 🔴 | |
| DM-015 | Documents | Sec 23 | 🔴 | |
| DM-016 | AuditLogs | Sec 23 | 🔴 | |
| DM-017 | Subscriptions & AIUsage | Sec 23 | 🔴 | |
| DM-018 | Every org-owned record has organisation_id | Sec 23 | 🔴 | Critical |
| DM-019 | DB constraints, API auth, tests prevent cross-tenant access | Sec 23 | 🔴 | Critical |

---

## Quality Assurance (Section 24)

| Req ID | Acceptance Criteria | Blueprint Ref | Status | Implementation Notes |
|--------|---------------------|---------------|--------|---------------------|
| QA-001 | Test registration & multiple institutes under one owner | Sec 24 | 🔴 | |
| QA-002 | Verify institute isolation (including direct API) | Sec 24 | 🔴 | Critical |
| QA-003 | Test every role & custom permission (including denied) | Sec 24 | 🔴 | |
| QA-004 | Verify parent-only login & linked-child visibility | Sec 24 | 🔴 | |
| QA-005 | Test all-present attendance, absent marking, review, finalise | Sec 24 | 🔴 | |
| QA-006 | Verify fee calcs, partial payments, receipts, reminder suppression | Sec 24 | 🔴 | |
| QA-007 | Test reminders 1 day before due, editing, approval, recipient selection | Sec 24 | 🔴 | |
| QA-008 | Verify SMS failures, retries, delivery status, duplicate prevention | Sec 24 | 🔴 | |
| QA-009 | Test in-app notifications independent of SMS | Sec 24 | 🔴 | |
| QA-010 | Test dashboards, tables, filters, exports, responsive layouts | Sec 24 | 🔴 | |
| QA-011 | Test backups, restore, recycle bin, audit records | Sec 24 | 🔴 | |
| QA-012 | Test light mode & carbon-black dark mode | Sec 24 | 🔴 | |
| QA-013 | Test accessibility, performance, error handling, security | Sec 24 | 🔴 | |
| QA-014 | Feature complete only when backend, permissions, persistence, error handling, tests work | Sec 24 | 🔴 | |

---

## Constraints & Exclusions (Section 25)

| Req ID | Exclusion | Blueprint Ref | Status | Notes |
|--------|-----------|---------------|--------|-------|
| EX-001 | No in-app payment gateway | Sec 25 | 🔴 | Confirmed |
| EX-002 | No WhatsApp automated messaging | Sec 25 | 🔴 | Confirmed |
| EX-003 | No student individual login | Sec 25 | 🔴 | Confirmed |
| EX-004 | No student homework submission | Sec 25 | 🔴 | Confirmed |
| EX-005 | No salary/payroll | Sec 25 | 🔴 | Confirmed |
| EX-006 | No expense management | Sec 25 | 🔴 | Confirmed |
| EX-007 | No library management | Sec 25 | 🔴 | Confirmed |
| EX-008 | No transport management | Sec 25 | 🔴 | Confirmed |
| EX-009 | No inventory management | Sec 25 | 🔴 | Confirmed |
| EX-010 | No certificate generation | Sec 25 | 🔴 | Confirmed |
| EX-011 | No admission application workflow | Sec 25 | 🔴 | Confirmed |

---

## Legal Documents (Instructions)

| Req ID | Requirement | Status | Notes |
|--------|-------------|--------|-------|
| LG-001 | Privacy Policy page (professional, DPDP-aligned) | 🔴 | Placeholders for missing info |
| LG-002 | Terms of Use page (professional) | 🔴 | Placeholders for missing info |
| LG-003 | No invented company identity, address, contact, officer, certifications, audits, guarantees | 🔴 | |
| LG-004 | Clear placeholders where info missing | 🔴 | |
| LG-005 | No false DPDP certification/compliance claims | 🔴 | |
| LG-006 | Accessible from signup, login, footer, settings | 🔴 | |
| LG-007 | Recommend legal review before launch | 🔴 | |
| LG-008 | Signup: unchecked consent checkbox with exact wording | 🔴 | "By clicking Continue, you agree to our Privacy Policy and Terms of Use." |
| LG-009 | Clickable Privacy Policy & Terms links | 🔴 | |
| LG-010 | Continue disabled until consent + valid fields | 🔴 | |
| LG-011 | Backend consent enforcement | 🔴 | |
| LG-012 | Store: user_id, consent_status, timestamp, policy_version, terms_version, registration_method | 🔴 | |
| LG-013 | No pre-check, inference, fabrication | 🔴 | |
| LG-014 | Renewed consent on material changes | 🔴 | |
| LG-015 | Preserve consent record for audit | 🔴 | |

---

## Authentication (Instructions)

| Req ID | Requirement | Status | Notes |
|--------|-------------|--------|-------|
| AU-001 | One common login system | 🔴 | |
| AU-002 | Owner/Admin/Principal: email/password + Google Sign-In | 🔴 | |
| AU-003 | Staff/Parents: org code + username + password | 🔴 | |
| AU-004 | Securely link verified email to authorised accounts | 🔴 | |
| AU-005 | Multi-org users choose authorised org | 🔴 | |
| AU-006 | Never bypass org membership checks | 🔴 | |
| AU-007 | MFA for privileged accounts | 🔴 | |
| AU-008 | No fake Google login (real OAuth only with valid config) | 🔴 | |

---

## Summary Statistics

| Category | Total | Not Started | In Progress | Implemented | Tested | Needs Attention |
|----------|-------|-------------|-------------|-------------|--------|-----------------|
| All Requirements | 200+ | 200+ | 0 | 0 | 0 | 0 |

*This checklist will be updated incrementally as implementation progresses.*