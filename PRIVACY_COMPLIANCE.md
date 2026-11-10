# EduMan Privacy Compliance (DPDP Act 2023)

**Version:** 1.0  
**Last Updated:** 2026-11-06  
**Status Legend:** 🔴 Not Started | 🟡 In Progress | 🟢 Implemented | ✅ Tested | ⚠️ Needs Attention

> **Disclaimer:** This document tracks implementation of privacy-by-design features. It does not constitute legal advice. A qualified Indian privacy/legal professional must review before production launch.

---

## 1. Data Minimisation & Purpose Limitation
| # | Requirement | Status | Implementation Notes |
|---|-------------|--------|---------------------|
| 1.1 | Collect only data necessary for educational management | 🔴 | Schema review required |
| 1.2 | Document purpose for each data field collected | 🔴 | Data dictionary needed |
| 1.3 | No collection of unnecessary sensitive data (caste, religion, health, biometrics) | 🔴 | |
| 1.4 | Purpose disclosure before collection (signup, forms) | 🔴 | |
| 1.5 | No secondary use without additional consent | 🔴 | |
| 1.6 | No sale, advertising, or exploitation of student/parent data | 🔴 | |
| 1.7 | No AI training on personal data without explicit consent | 🔴 | |

---

## 2. Consent Management
| # | Requirement | Status | Implementation Notes |
|---|-------------|--------|---------------------|
| 2.1 | Signup: unchecked consent checkbox with exact wording | 🔴 | "By clicking Continue, you agree to our Privacy Policy and Terms of Use." |
| 2.2 | Clickable Privacy Policy & Terms of Use links | 🔴 | |
| 2.3 | Continue button disabled until consent + valid fields | 🔴 | |
| 2.4 | Backend enforcement of consent (not just frontend) | 🔴 | |
| 2.5 | Store: user_id, consent_status, timestamp, policy_version, terms_version, registration_method | 🔴 | |
| 2.6 | No pre-checked, inferred, or fabricated consent | 🔴 | |
| 2.7 | Renewed consent flow for material policy changes | 🔴 | |
| 2.8 | Consent withdrawal mechanism with consequences | 🔴 | |
| 2.9 | Audit trail of all consent records | 🔴 | |
| 2.10 | Parental/guardian consent for children's data | 🔴 | |

---

## 3. Data Principal Rights (DPDP Section 11-14)
| # | Right | Status | Implementation Notes |
|---|-------|--------|---------------------|
| 3.1 | Right to access personal data | 🔴 | Data export feature |
| 3.2 | Right to correction/updation | 🔴 | Profile edit with audit |
| 3.3 | Right to erasure (with legal exceptions) | 🔴 | Soft delete + purge workflow |
| 3.4 | Right to grievance redressal | 🔴 | Complaint/feedback module |
| 3.5 | Right to nominate digital representative | 🔴 | |
| 3.6 | Parent/guardian rights for children's data | 🔴 | |

---

## 4. Retention & Deletion Policies
| # | Requirement | Status | Implementation Notes |
|---|-------------|--------|---------------------|
| 4.1 | Purpose-based retention schedules documented | 🔴 | |
| 4.2 | Automated deletion after retention expiry | 🔴 | |
| 4.3 | 30-day recycle bin for soft-deleted records | 🔴 | |
| 4.4 | Backup retention: 30 days (aligned with recycle bin) | 🔴 | |
| 4.5 | Secure deletion from backups on request | 🔴 | |
| 4.6 | Legal hold capability for disputes | 🔴 | |

---

## 5. Access Control & Employee Restrictions
| # | Requirement | Status | Implementation Notes |
|---|-------------|--------|---------------------|
| 5.1 | Role-based access to personal data (least privilege) | 🔴 | |
| 5.2 | Teachers see only assigned students | 🔴 | |
| 5.3 | Parents see only linked children | 🔴 | |
| 5.4 | Accountants see financial data only | 🔴 | |
| 5.5 | Receptionists see limited contact data | 🔴 | |
| 5.6 | Audit log of personal data access | 🔴 | |

---

## 6. Records of Processing Activities (ROPA)
| # | Requirement | Status | Implementation Notes |
|---|-------------|--------|---------------------|
| 6.1 | Record consent, purposes, processing activities | 🔴 | |
| 6.2 | Document data processors & hosting providers | 🔴 | |
| 6.3 | Document external services (SMS, AI, storage) | 🔴 | |
| 6.4 | Cross-border transfer documentation (if any) | 🔴 | |

---

## 7. Children's Data Protection
| # | Requirement | Status | Implementation Notes |
|---|-------------|--------|---------------------|
| 7.1 | Identify child users (age < 18) | 🔴 | Date of birth field |
| 7.2 | Parental/guardian consent for children | 🔴 | |
| 7.3 | Enhanced protections for children's data | 🔴 | |
| 7.4 | No profiling/targeted advertising to children | 🔴 | |

---

## 8. Data Processor Management
| # | Requirement | Status | Implementation Notes |
|---|-------------|--------|---------------------|
| 8.1 | Data Processing Agreements (DPAs) with all processors | 🔴 | Placeholder for legal review |
| 8.2 | SMS provider compliance (TRAI/DLT) | 🔴 | |
| 8.3 | AI provider data handling terms | 🔴 | |
| 8.4 | Cloud hosting provider (Vercel, Neon, Supabase) DPAs | 🔴 | |
| 8.5 | Sub-processor notification | 🔴 | |

---

## 9. Breach Detection & Notification
| # | Requirement | Status | Implementation Notes |
|---|-------------|--------|---------------------|
| 9.1 | Breach detection mechanisms (monitoring, alerts) | 🔴 | |
| 9.2 | Escalation procedure documented | 🔴 | |
| 9.3 | Notification to Data Protection Board (72 hours) | 🔴 | |
| 9.4 | Notification to affected data principals | 🔴 | |
| 9.5 | Breach register maintained | 🔴 | |

---

## 10. Grievance Redressal
| # | Requirement | Status | Implementation Notes |
|---|-------------|--------|---------------------|
| 10.1 | Grievance officer contact (placeholder) | 🔴 | |
| 10.2 | Complaint submission mechanism | 🔴 | Feedback/complaint module |
| 10.3 | Acknowledgment & timeline communication | 🔴 | |
| 10.4 | Resolution tracking | 🔴 | |

---

## 11. Technical & Organisational Measures
| # | Measure | Status | Implementation Notes |
|---|---------|--------|---------------------|
| 11.1 | Encryption in transit (TLS 1.2+) | 🔴 | |
| 11.2 | Encryption at rest (database, backups, storage) | 🔴 | |
| 11.3 | Pseudonymisation where feasible | 🔴 | |
| 11.4 | Regular security testing | 🔴 | |
| 11.5 | Staff privacy training (documented) | 🔴 | |
| 11.6 | Privacy impact assessments for new features | 🔴 | |

---

## 12. Privacy Policy Page
| # | Required Content | Status | Notes |
|---|------------------|--------|-------|
| 12.1 | Information collected (owners, admins, teachers, staff, parents, students) | 🔴 | |
| 12.2 | Student profiles, attendance, fees, exams, communications, educational records | 🔴 | |
| 12.3 | Purposes & lawful basis/consent mechanisms | 🔴 | |
| 12.4 | Data storage, hosting, security practices | 🔴 | |
| 12.5 | Third-party processors & integrations | 🔴 | |
| 12.6 | Google authentication data handling | 🔴 | |
| 12.7 | AI processing & external AI providers | 🔴 | |
| 12.8 | SMS services & limitations | 🔴 | |
| 12.9 | Cookies, sessions, device information | 🔴 | |
| 12.10 | Retention, deletion, backup policies | 🔴 | |
| 12.11 | User rights & request procedures | 🔴 | |
| 12.12 | Children's data & guardian consent | 🔴 | |
| 12.13 | Security incidents & grievance redressal | 🔴 | |
| 12.14 | Contact & grievance officer details (placeholders) | 🔴 | |
| 12.15 | Accessible from signup, login, footer, settings | 🔴 | |
| 12.16 | Professional language, no false compliance claims | 🔴 | |
| 12.17 | Placeholders for missing legal info (not invented) | 🔴 | |

---

## 13. Terms of Use Page
| # | Required Content | Status | Notes |
|---|------------------|--------|-------|
| 13.1 | Eligibility & account responsibilities | 🔴 | |
| 13.2 | Roles & permissions | 🔴 | |
| 13.3 | Acceptable & prohibited use | 🔴 | |
| 13.4 | Accuracy & ownership of records | 🔴 | |
| 13.5 | Educational data responsibilities | 🔴 | |
| 13.6 | Manual external fee collection & recording | 🔴 | |
| 13.7 | SMS & AI limitations | 🔴 | |
| 13.8 | Third-party services | 🔴 | |
| 13.9 | Subscription & payment terms | 🔴 | |
| 13.10 | Availability, maintenance, service limitations | 🔴 | |
| 13.11 | Suspension & termination | 🔴 | |
| 13.12 | Intellectual property | 🔴 | |
| 13.13 | Liability & dispute resolution | 🔴 | |
| 13.14 | Governing law & jurisdiction (subject to legal review) | 🔴 | |
| 13.15 | Accessible from signup, login, footer, settings | 🔴 | |
| 13.16 | Professional language, placeholders for missing info | 🔴 | |

---

## 14. Signup Consent Implementation Checklist
| # | Requirement | Status | Notes |
|---|-------------|--------|-------|
| 14.1 | Unchecked checkbox by default | 🔴 | |
| 14.2 | Exact wording: "By clicking Continue, you agree to our Privacy Policy and Terms of Use." | 🔴 | |
| 14.3 | "Privacy Policy" and "Terms of Use" as clickable links | 🔴 | |
| 14.4 | Continue disabled until checkbox checked + all fields valid | 🔴 | |
| 14.5 | Backend validation of consent | 🔴 | |
| 14.6 | Store: user_id, consent_status, timestamp, policy_version, terms_version, registration_method | 🔴 | |
| 14.7 | No pre-check, inference, or fabrication | 🔴 | |
| 14.8 | Renewed consent on material changes | 🔴 | |
| 14.9 | Consent record preserved for audit | 🔴 | |

---

## 15. Test Evidence Tracking

| Requirement | Test Case | Date Tested | Result | Tester |
|-------------|-----------|-------------|--------|--------|
| | | | | |

*No privacy control may be marked ✅ Tested without actual test evidence.*