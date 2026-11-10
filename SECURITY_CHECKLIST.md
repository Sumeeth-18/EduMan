# EduMan Security Checklist

**Version:** 1.0  
**Last Updated:** 2026-11-06  
**Status Legend:** 🔴 Not Started | 🟡 In Progress | 🟢 Implemented | ✅ Tested | ⚠️ Needs Attention

---

## 1. Secure Authentication & Account Recovery
| # | Control | Status | Evidence/Notes |
|---|---------|--------|----------------|
| 1.1 | Common login page for all organisations | 🔴 | |
| 1.2 | Email/password authentication with secure hashing (bcrypt/argon2) | 🔴 | |
| 1.3 | Google OAuth 2.0 / OpenID Connect implementation | 🔴 | |
| 1.4 | Organisation code + username + password for staff/parents | 🔴 | |
| 1.5 | Secure account recovery (SMS OTP or admin reset) | 🔴 | |
| 1.6 | Account linking: verified email → authorised accounts | 🔴 | |
| 1.7 | Multi-organisation user selection at login | 🔴 | |
| 1.8 | No authentication bypasses | 🔴 | |

---

## 2. Multi-Factor Authentication (MFA)
| # | Control | Status | Evidence/Notes |
|---|---------|--------|----------------|
| 2.1 | Mandatory MFA for Owners and Admins (TOTP) | 🔴 | |
| 2.2 | Configurable MFA for Principals | 🔴 | |
| 2.3 | MFA setup/enrollment flow | 🔴 | |
| 2.4 | MFA recovery codes | 🔴 | |
| 2.5 | MFA enforcement on privileged actions | 🔴 | |

---

## 3. Google OAuth 2.0 / OpenID Connect
| # | Control | Status | Evidence/Notes |
|---|---------|--------|----------------|
| 3.1 | Proper OAuth 2.0 authorization code flow with PKCE | 🔴 | |
| 3.2 | Secure client secret storage (server-only) | 🔴 | |
| 3.3 | State parameter for CSRF protection | 🔴 | |
| 3.4 | Token validation and user info retrieval | 🔴 | |
| 3.5 | Account linking for existing users | 🔴 | |
| 3.6 | No fake/mock Google login | 🔴 | |

---

## 4. Server-Side Role-Based Access Control (RBAC)
| # | Control | Status | Evidence/Notes |
|---|---------|--------|----------------|
| 4.1 | Role definitions: Super Admin, Owner, Admin, Principal, Manager, Teacher, Parent, Accountant, Receptionist, Custom | 🔴 | |
| 4.2 | Permission matrix per role | 🔴 | |
| 4.3 | Server-side authorization on every protected route/API | 🔴 | |
| 4.4 | No frontend-only permission checks | 🔴 | |
| 4.5 | Custom role creation by admins | 🔴 | |
| 4.6 | Permission inheritance and composition | 🔴 | |

---

## 5. Multi-Tenant Isolation
| # | Control | Status | Evidence/Notes |
|---|---------|--------|----------------|
| 5.1 | Organization ID on all tenant-scoped tables | 🔴 | |
| 5.2 | Database row-level security (RLS) policies | 🔴 | |
| 5.3 | Application-level tenant context enforcement | 🔴 | |
| 5.4 | Cross-tenant access prevention in API layer | 🔴 | |
| 5.5 | Organization switcher with membership validation | 🔴 | |
| 5.6 | No data leakage via global search, reports, analytics | 🔴 | |

---

## 6. Least-Privilege & Restricted Admin Access
| # | Control | Status | Evidence/Notes |
|---|---------|--------|----------------|
| 6.1 | Super Admin scoped to platform management only | 🔴 | |
| 6.2 | Owner scoped to their organisations | 🔴 | |
| 6.3 | Admin scoped to authorised institute | 🔴 | |
| 6.4 | No unrestricted administrative endpoints | 🔴 | |
| 6.5 | Just-in-time privilege elevation (if needed) | 🔴 | |

---

## 7. Secure Password Hashing
| # | Control | Status | Evidence/Notes |
|---|---------|--------|----------------|
| 7.1 | Argon2id or bcrypt with appropriate cost factor | 🔴 | |
| 7.2 | No plaintext password storage | 🔴 | |
| 7.3 | Password strength requirements | 🔴 | |
| 7.4 | Breach password checking (optional) | 🔴 | |

---

## 8. Secure Session Management
| # | Control | Status | Evidence/Notes |
|---|---------|--------|----------------|
| 8.1 | Secure, HttpOnly, SameSite=Lax/Strict cookies | 🔴 | |
| 8.2 | Short-lived access tokens, refresh token rotation | 🔴 | |
| 8.3 | Session invalidation on password change, MFA enable, logout | 🔴 | |
| 8.4 | Concurrent session limits per role | 🔴 | |
| 8.5 | Secure logout (client + server) | 🔴 | |
| 8.6 | Token revocation on suspicious activity | 🔴 | |

---

## 9. Input Validation, Sanitisation & Output Encoding
| # | Control | Status | Evidence/Notes |
|---|---------|--------|----------------|
| 9.1 | Zod/Valibot schemas for all API inputs | 🔴 | |
| 9.2 | HTML sanitisation for rich text (DOMPurify) | 🔴 | |
| 9.3 | Output encoding in templates (React auto-escapes) | 🔴 | |
| 9.4 | File upload validation (type, size, content) | 🔴 | |
| 9.5 | SQL injection prevention via Drizzle ORM parameterized queries | 🔴 | |

---

## 10. SQL Injection Prevention
| # | Control | Status | Evidence/Notes |
|---|---------|--------|----------------|
| 10.1 | Drizzle ORM for all database operations | 🔴 | |
| 10.2 | No raw SQL with string interpolation | 🔴 | |
| 10.3 | Parameterized queries for any raw SQL | 🔴 | |

---

## 11. Cross-Site Scripting (XSS) Prevention
| # | Control | Status | Evidence/Notes |
|---|---------|--------|----------------|
| 11.1 | React's built-in XSS protection | 🔴 | |
| 11.2 | Content Security Policy (CSP) headers | 🔴 | |
| 11.3 | No dangerouslySetInnerHTML without sanitisation | 🔴 | |
| 11.4 | Trusted Types policy (if applicable) | 🔴 | |

---

## 12. CSRF Protection
| # | Control | Status | Evidence/Notes |
|---|---------|--------|----------------|
| 12.1 | SameSite cookies + CSRF tokens for state-changing operations | 🔴 | |
| 12.2 | Double-submit cookie pattern or header-based validation | 🔴 | |

---

## 13. Rate Limiting & Abuse Prevention
| # | Control | Status | Evidence/Notes |
|---|---------|--------|----------------|
| 13.1 | Login rate limiting (IP + account) | 🔴 | |
| 13.2 | API rate limiting per organisation/user | 🔴 | |
| 13.3 | Brute-force protection with exponential backoff | 🔴 | |
| 13.4 | Credential stuffing detection | 🔴 | |
| 13.5 | SMS sending rate limits | 🔴 | |

---

## 14. Encryption in Transit & At Rest
| # | Control | Status | Evidence/Notes |
|---|---------|--------|----------------|
| 14.1 | TLS 1.2+ everywhere (enforced via HSTS) | 🔴 | |
| 14.2 | Database encryption at rest (provider-managed) | 🔴 | |
| 14.3 | Encrypted backups | 🔴 | |
| 14.4 | Sensitive field encryption (PII, keys) | 🔴 | |

---

## 15. Secret & API Key Management
| # | Control | Status | Evidence/Notes |
|---|---------|--------|----------------|
| 15.1 | All secrets in environment variables (never in code) | 🔴 | |
| 15.2 | No secrets in frontend bundles | 🔴 | |
| 15.3 | No secrets in Git history | 🔴 | |
| 15.4 | Secret rotation procedure documented | 🔴 | |
| 15.5 | Separate secrets per environment | 🔴 | |

---

## 16. Tamper-Resistant Audit Logging
| # | Control | Status | Evidence/Notes |
|---|---------|--------|----------------|
| 16.1 | Immutable audit log table (append-only) | 🔴 | |
| 16.2 | Log: authentication events, permission changes, data modifications | 🔴 | |
| 16.3 | Log: admin actions, role assignments, organisation changes | 🔴 | |
| 16.4 | Structured logging with correlation IDs | 🔴 | |
| 16.5 | Audit log export for admins | 🔴 | |
| 16.6 | Log integrity verification (hash chaining) | 🔴 | |

---

## 17. Automated Backups & Disaster Recovery
| # | Control | Status | Evidence/Notes |
|---|---------|--------|----------------|
| 17.1 | Daily automated backups (provider) | 🔴 | |
| 17.2 | 30-day backup retention | 🔴 | |
| 17.3 | Manual backup trigger for admins | 🔴 | |
| 17.4 | Tested restoration procedure (quarterly) | 🔴 | |
| 17.5 | Point-in-time recovery capability | 🔴 | |
| 17.6 | 30-day recycle bin for soft-deleted records | 🔴 | |

---

## 18. Secure File Uploads
| # | Control | Status | Evidence/Notes |
|---|---------|--------|----------------|
| 18.1 | File type validation (magic bytes + extension) | 🔴 | |
| 18.2 | File size limits | 🔴 | |
| 18.3 | Malware scanning (ClamAV or provider) | 🔴 | |
| 18.4 | Access-controlled storage (signed URLs) | 🔴 | |
| 18.5 | No direct execution of uploaded files | 🔴 | |
| 18.6 | Organization-scoped file access | 🔴 | |

---

## 19. Security Monitoring & Incident Response
| # | Control | Status | Evidence/Notes |
|---|---------|--------|----------------|
| 19.1 | Application error logging (Sentry or self-hosted) | 🔴 | |
| 19.2 | Security event alerting (failed logins, privilege escalation) | 🔴 | |
| 19.3 | Vulnerability scanning (npm audit, Trivy, Dependabot) | 🔴 | |
| 19.4 | Incident response runbook | 🔴 | |
| 19.5 | Privacy breach notification procedure | 🔴 | |

---

## Additional Mandatory Protections

| # | Control | Status | Evidence/Notes |
|---|---------|--------|----------------|
| A.1 | Secure database access (least privilege DB users) | 🔴 | |
| A.2 | No public database access | 🔴 | |
| A.3 | IDOR prevention (authorization checks on every resource access) | 🔴 | |
| A.4 | Privilege escalation prevention | 🔴 | |
| A.5 | Cross-tenant data leakage prevention (tested) | 🔴 | |
| A.6 | Account enumeration prevention (uniform responses) | 🔴 | |
| A.7 | Credential stuffing protection | 🔴 | |
| A.8 | Session theft protection (IP binding, device fingerprinting) | 🔴 | |
| A.9 | Secure HTTP headers (HSTS, CSP, X-Frame-Options, etc.) | 🔴 | |
| A.10 | HTTPS enforcement, secure CORS, cookie configuration | 🔴 | |
| A.11 | No logging of passwords, tokens, sensitive student data | 🔴 | |
| A.12 | Safe defaults, deny-by-default authorization | 🔴 | |
| A.13 | Dependency auditing in CI/CD | 🔴 | |
| A.14 | Server-side authorization testing (not just UI hiding) | 🔴 | |
| A.15 | Security checklist maintained with statuses | 🟢 | This document |

---

## Test Evidence Tracking

| Control | Test Case | Date Tested | Result | Tester |
|---------|-----------|-------------|--------|--------|
| | | | | |

*No control may be marked ✅ Tested without actual test evidence recorded above.*