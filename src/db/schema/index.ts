import { pgTable, uuid, varchar, text, timestamp, boolean, integer, decimal, jsonb, date, time, pgEnum, index, uniqueIndex, foreignKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ============================================
// ENUMS
// ============================================

export const userRoleEnum = pgEnum('user_role', [
  'super_admin',
  'owner',
  'admin',
  'principal',
  'manager',
  'teacher',
  'parent',
  'accountant',
  'receptionist',
  'custom',
]);

export const genderEnum = pgEnum('gender', ['male', 'female', 'other', 'prefer_not_to_say']);

export const attendanceStatusEnum = pgEnum('attendance_status', ['present', 'absent', 'late', 'early_departure', 'on_leave']);

export const registerStatusEnum = pgEnum('register_status', ['draft', 'finalised']);

export const feePaymentMethodEnum = pgEnum('fee_payment_method', ['cash', 'upi', 'bank_transfer', 'card', 'cheque', 'other']);

export const feePaymentStatusEnum = pgEnum('fee_payment_status', ['pending', 'partial', 'paid', 'overdue', 'cancelled', 'refunded']);

export const messageStatusEnum = pgEnum('message_status', [
  'draft',
  'awaiting_approval',
  'approved',
  'scheduled',
  'queued',
  'sent',
  'delivered',
  'failed',
  'retrying',
  'manually_resent',
]);

export const messageTypeEnum = pgEnum('message_type', [
  'fee_reminder',
  'attendance_notification',
  'announcement',
  'exam_result',
  'timetable_change',
  'account_setup',
  'admin_notification',
  'homework',
  'general',
]);

export const leaveStatusEnum = pgEnum('leave_status', ['pending', 'approved', 'rejected', 'cancelled']);

export const examinationStatusEnum = pgEnum('examination_status', ['draft', 'scheduled', 'ongoing', 'completed', 'published', 'cancelled']);

export const marksEntryStatusEnum = pgEnum('marks_entry_status', ['pending', 'entered', 'verified', 'published']);

export const homeworkStatusEnum = pgEnum('homework_status', ['draft', 'published', 'archived']);

export const documentTypeEnum = pgEnum('document_type', [
  'student_photo',
  'student_id_proof',
  'parent_id_proof',
  'transfer_certificate',
  'marksheet',
  'certificate',
  'medical',
  'other',
]);

export const auditActionEnum = pgEnum('audit_action', [
  'create',
  'update',
  'delete',
  'login',
  'logout',
  'password_change',
  'mfa_enable',
  'mfa_disable',
  'role_change',
  'permission_change',
  'org_switch',
  'data_export',
  'bulk_action',
  'approval',
  'rejection',
]);

export const subscriptionStatusEnum = pgEnum('subscription_status', ['trial', 'active', 'past_due', 'cancelled', 'expired']);

export const subscriptionPlanEnum = pgEnum('subscription_plan', ['free', 'starter', 'professional', 'enterprise', 'custom']);

export const aiUsageTypeEnum = pgEnum('ai_usage_type', [
  'sms_draft',
  'report_summary',
  'pattern_analysis',
  'notice_draft',
  'homework_assist',
  'how_to',
  'report_generation',
]);

// ============================================
// CORE TABLES
// ============================================

// Organisations (Institutes)
export const organisations = pgTable('organisations', {
  id: uuid('id').primaryKey().defaultRandom(),
  code: varchar('code', { length: 20 }).notNull().unique(),
  name: varchar('name', { length: 200 }).notNull(),
  logoUrl: varchar('logo_url', { length: 500 }),
  tagline: varchar('tagline', { length: 300 }),
  address: text('address'),
  city: varchar('city', { length: 100 }),
  state: varchar('state', { length: 100 }),
  pincode: varchar('pincode', { length: 10 }),
  phone: varchar('phone', { length: 20 }),
  email: varchar('email', { length: 255 }),
  website: varchar('website', { length: 255 }),
  gstNumber: varchar('gst_number', { length: 15 }),
  udiseCode: varchar('udise_code', { length: 20 }),
  affiliationBoard: varchar('affiliation_board', { length: 100 }),
  affiliationNumber: varchar('affiliation_number', { length: 50 }),
  settings: jsonb('settings').default({}),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => [
  index('organisations_code_idx').on(table.code),
  index('organisations_active_idx').on(table.isActive),
]);

// Branches
export const branches = pgTable('branches', {
  id: uuid('id').primaryKey().defaultRandom(),
  organisationId: uuid('organisation_id').notNull().references(() => organisations.id, { onDelete: 'cascade' }),
  code: varchar('code', { length: 20 }).notNull(),
  name: varchar('name', { length: 200 }).notNull(),
  address: text('address'),
  city: varchar('city', { length: 100 }),
  state: varchar('state', { length: 100 }),
  pincode: varchar('pincode', { length: 10 }),
  phone: varchar('phone', { length: 20 }),
  email: varchar('email', { length: 255 }),
  principalId: uuid('principal_id'), // Will reference users later
  settings: jsonb('settings').default({}),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => [
  uniqueIndex('branches_org_code_unique').on(table.organisationId, table.code),
  index('branches_org_idx').on(table.organisationId),
  index('branches_active_idx').on(table.isActive),
]);

// Users
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  organisationId: uuid('organisation_id').references(() => organisations.id, { onDelete: 'cascade' }),
  branchId: uuid('branch_id').references(() => branches.id, { onDelete: 'set null' }),
  email: varchar('email', { length: 255 }).notNull(),
  username: varchar('username', { length: 100 }).notNull(),
  passwordHash: varchar('password_hash', { length: 255 }),
  googleId: varchar('google_id', { length: 100 }),
  googleEmail: varchar('google_email', { length: 255 }),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  gender: genderEnum('gender'),
  dateOfBirth: date('date_of_birth'),
  avatarUrl: varchar('avatar_url', { length: 500 }),
  role: userRoleEnum('role').notNull().default('parent'),
  customRoleId: uuid('custom_role_id'),
  isActive: boolean('is_active').default(true),
  isVerified: boolean('is_verified').default(false),
  mfaEnabled: boolean('mfa_enabled').default(false),
  mfaSecret: varchar('mfa_secret', { length: 100 }),
  mfaBackupCodes: jsonb('mfa_backup_codes').default([]),
  lastLoginAt: timestamp('last_login_at', { withTimezone: true }),
  lastLoginIp: varchar('last_login_ip', { length: 45 }),
  failedLoginAttempts: integer('failed_login_attempts').default(0),
  lockedUntil: timestamp('locked_until', { withTimezone: true }),
  passwordResetToken: varchar('password_reset_token', { length: 255 }),
  passwordResetExpires: timestamp('password_reset_expires', { withTimezone: true }),
  emailVerificationToken: varchar('email_verification_token', { length: 255 }),
  emailVerificationExpires: timestamp('email_verification_expires', { withTimezone: true }),
  theme: varchar('theme', { length: 10 }).default('system'), // 'light', 'dark', 'system'
  language: varchar('language', { length: 10 }).default('en'),
  timezone: varchar('timezone', { length: 50 }).default('Asia/Kolkata'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => [
  uniqueIndex('users_email_unique').on(table.email),
  uniqueIndex('users_username_unique').on(table.username),
  uniqueIndex('users_google_id_unique').on(table.googleId),
  index('users_org_idx').on(table.organisationId),
  index('users_branch_idx').on(table.branchId),
  index('users_role_idx').on(table.role),
  index('users_active_idx').on(table.isActive),
]);

// Custom Roles
export const customRoles = pgTable('custom_roles', {
  id: uuid('id').primaryKey().defaultRandom(),
  organisationId: uuid('organisation_id').notNull().references(() => organisations.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  permissions: jsonb('permissions').default([]), // Array of permission strings
  isSystem: boolean('is_system').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => [
  uniqueIndex('custom_roles_org_name_unique').on(table.organisationId, table.name),
  index('custom_roles_org_idx').on(table.organisationId),
]);

// Permissions (for reference/documentation)
export const permissions = pgTable('permissions', {
  id: uuid('id').primaryKey().defaultRandom(),
  key: varchar('key', { length: 100 }).notNull().unique(),
  name: varchar('name', { length: 200 }).notNull(),
  description: text('description'),
  category: varchar('category', { length: 50 }).notNull(),
  isSystem: boolean('is_system').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

// Academic Years
export const academicYears = pgTable('academic_years', {
  id: uuid('id').primaryKey().defaultRandom(),
  organisationId: uuid('organisation_id').notNull().references(() => organisations.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 100 }).notNull(),
  code: varchar('code', { length: 20 }).notNull(),
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  isCurrent: boolean('is_current').default(false),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => [
  uniqueIndex('academic_years_org_code_unique').on(table.organisationId, table.code),
  index('academic_years_org_idx').on(table.organisationId),
  index('academic_years_current_idx').on(table.isCurrent),
]);

// Courses
export const courses = pgTable('courses', {
  id: uuid('id').primaryKey().defaultRandom(),
  organisationId: uuid('organisation_id').notNull().references(() => organisations.id, { onDelete: 'cascade' }),
  academicYearId: uuid('academic_year_id').notNull().references(() => academicYears.id, { onDelete: 'cascade' }),
  code: varchar('code', { length: 20 }).notNull(),
  name: varchar('name', { length: 200 }).notNull(),
  description: text('description'),
  feeAmount: decimal('fee_amount', { precision: 10, scale: 2 }).default('0'),
  durationMonths: integer('duration_months'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => [
  uniqueIndex('courses_org_year_code_unique').on(table.organisationId, table.academicYearId, table.code),
  index('courses_org_idx').on(table.organisationId),
  index('courses_year_idx').on(table.academicYearId),
]);

// Subjects
export const subjects = pgTable('subjects', {
  id: uuid('id').primaryKey().defaultRandom(),
  organisationId: uuid('organisation_id').notNull().references(() => organisations.id, { onDelete: 'cascade' }),
  courseId: uuid('course_id').references(() => courses.id, { onDelete: 'cascade' }),
  code: varchar('code', { length: 20 }).notNull(),
  name: varchar('name', { length: 200 }).notNull(),
  description: text('description'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => [
  uniqueIndex('subjects_org_course_code_unique').on(table.organisationId, table.courseId, table.code),
  index('subjects_org_idx').on(table.organisationId),
  index('subjects_course_idx').on(table.courseId),
]);

// Batches
export const batches = pgTable('batches', {
  id: uuid('id').primaryKey().defaultRandom(),
  organisationId: uuid('organisation_id').notNull().references(() => organisations.id, { onDelete: 'cascade' }),
  branchId: uuid('branch_id').references(() => branches.id, { onDelete: 'cascade' }),
  academicYearId: uuid('academic_year_id').notNull().references(() => academicYears.id, { onDelete: 'cascade' }),
  courseId: uuid('course_id').notNull().references(() => courses.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 200 }).notNull(),
  code: varchar('code', { length: 20 }).notNull(),
  description: text('description'),
  teacherId: uuid('teacher_id').references(() => users.id, { onDelete: 'set null' }),
  capacity: integer('capacity').default(30),
  schedule: jsonb('schedule').default({}), // { days: [], startTime, endTime, room }
  startDate: date('start_date'),
  endDate: date('end_date'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => [
  uniqueIndex('batches_org_course_code_unique').on(table.organisationId, table.courseId, table.code),
  index('batches_org_idx').on(table.organisationId),
  index('batches_branch_idx').on(table.branchId),
  index('batches_teacher_idx').on(table.teacherId),
  index('batches_year_idx').on(table.academicYearId),
]);

// Students
export const students = pgTable('students', {
  id: uuid('id').primaryKey().defaultRandom(),
  organisationId: uuid('organisation_id').notNull().references(() => organisations.id, { onDelete: 'cascade' }),
  branchId: uuid('branch_id').references(() => branches.id, { onDelete: 'set null' }),
  studentId: varchar('student_id', { length: 50 }).notNull(), // Human-readable ID like EDU-2024-001
  admissionNumber: varchar('admission_number', { length: 50 }),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  gender: genderEnum('gender'),
  dateOfBirth: date('date_of_birth'),
  bloodGroup: varchar('blood_group', { length: 5 }),
  photoUrl: varchar('photo_url', { length: 500 }),
  address: text('address'),
  city: varchar('city', { length: 100 }),
  state: varchar('state', { length: 100 }),
  pincode: varchar('pincode', { length: 10 }),
  aadhaarNumber: varchar('aadhaar_number', { length: 14 }), // Encrypted at rest
  udiseNumber: varchar('udise_number', { length: 20 }),
  previousSchool: varchar('previous_school', { length: 200 }),
  previousClass: varchar('previous_class', { length: 50 }),
  admissionDate: date('admission_date'),
  medicalInfo: text('medical_info'),
  emergencyContactName: varchar('emergency_contact_name', { length: 200 }),
  emergencyContactPhone: varchar('emergency_contact_phone', { length: 20 }),
  emergencyContactRelation: varchar('emergency_contact_relation', { length: 50 }),
  customFields: jsonb('custom_fields').default({}),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => [
  uniqueIndex('students_org_student_id_unique').on(table.organisationId, table.studentId),
  uniqueIndex('students_org_admission_unique').on(table.organisationId, table.admissionNumber),
  index('students_org_idx').on(table.organisationId),
  index('students_branch_idx').on(table.branchId),
  index('students_active_idx').on(table.isActive),
  index('students_name_idx').on(table.firstName, table.lastName),
]);

// Parents
export const parents = pgTable('parents', {
  id: uuid('id').primaryKey().defaultRandom(),
  organisationId: uuid('organisation_id').notNull().references(() => organisations.id, { onDelete: 'cascade' }),
  parentId: varchar('parent_id', { length: 50 }).notNull(), // Human-readable ID
  userId: uuid('user_id').unique().references(() => users.id, { onDelete: 'cascade' }),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  gender: genderEnum('gender'),
  dateOfBirth: date('date_of_birth'),
  phone: varchar('phone', { length: 20 }).notNull(),
  alternatePhone: varchar('alternate_phone', { length: 20 }),
  email: varchar('email', { length: 255 }),
  occupation: varchar('occupation', { length: 100 }),
  companyName: varchar('company_name', { length: 200 }),
  annualIncome: decimal('annual_income', { precision: 12, scale: 2 }),
  address: text('address'),
  city: varchar('city', { length: 100 }),
  state: varchar('state', { length: 100 }),
  pincode: varchar('pincode', { length: 10 }),
  aadhaarNumber: varchar('aadhaar_number', { length: 14 }), // Encrypted at rest
  photoUrl: varchar('photo_url', { length: 500 }),
  preferredLanguage: varchar('preferred_language', { length: 10 }).default('en'),
  smsOptIn: boolean('sms_opt_in').default(true),
  whatsappOptIn: boolean('whatsapp_opt_in').default(false),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => [
  uniqueIndex('parents_org_parent_id_unique').on(table.organisationId, table.parentId),
  index('parents_org_idx').on(table.organisationId),
  index('parents_user_idx').on(table.userId),
  index('parents_phone_idx').on(table.phone),
  index('parents_active_idx').on(table.isActive),
]);

// Parent-Student Links
export const parentStudentLinks = pgTable('parent_student_links', {
  id: uuid('id').primaryKey().defaultRandom(),
  organisationId: uuid('organisation_id').notNull().references(() => organisations.id, { onDelete: 'cascade' }),
  parentId: uuid('parent_id').notNull().references(() => parents.id, { onDelete: 'cascade' }),
  studentId: uuid('student_id').notNull().references(() => students.id, { onDelete: 'cascade' }),
  relation: varchar('relation', { length: 50 }).notNull(), // 'father', 'mother', 'guardian', etc.
  isPrimary: boolean('is_primary').default(false),
  isAuthorizedPickup: boolean('is_authorized_pickup').default(true),
  canViewAcademics: boolean('can_view_academics').default(true),
  canViewAttendance: boolean('can_view_attendance').default(true),
  canViewFees: boolean('can_view_fees').default(true),
  canCommunicate: boolean('can_communicate').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (table) => [
  uniqueIndex('parent_student_links_unique').on(table.parentId, table.studentId),
  index('parent_student_links_parent_idx').on(table.parentId),
  index('parent_student_links_student_idx').on(table.studentId),
  index('parent_student_links_org_idx').on(table.organisationId),
]);

// Student Enrollments
export const studentEnrollments = pgTable('student_enrollments', {
  id: uuid('id').primaryKey().defaultRandom(),
  organisationId: uuid('organisation_id').notNull().references(() => organisations.id, { onDelete: 'cascade' }),
  studentId: uuid('student_id').notNull().references(() => students.id, { onDelete: 'cascade' }),
  batchId: uuid('batch_id').notNull().references(() => batches.id, { onDelete: 'cascade' }),
  academicYearId: uuid('academic_year_id').notNull().references(() => academicYears.id, { onDelete: 'cascade' }),
  enrollmentDate: date('enrollment_date').defaultNow(),
  status: varchar('status', { length: 20 }).default('active'), // 'active', 'dropped', 'transferred', 'completed'
  rollNumber: varchar('roll_number', { length: 20 }),
  previousBatchId: uuid('previous_batch_id'),
  customFields: jsonb('custom_fields').default({}),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => [
  uniqueIndex('student_enrollments_unique').on(table.studentId, table.batchId, table.academicYearId),
  index('student_enrollments_student_idx').on(table.studentId),
  index('student_enrollments_batch_idx').on(table.batchId),
  index('student_enrollments_org_idx').on(table.organisationId),
]);

// ============================================
// ATTENDANCE
// ============================================

export const attendanceRegisters = pgTable('attendance_registers', {
  id: uuid('id').primaryKey().defaultRandom(),
  organisationId: uuid('organisation_id').notNull().references(() => organisations.id, { onDelete: 'cascade' }),
  batchId: uuid('batch_id').notNull().references(() => batches.id, { onDelete: 'cascade' }),
  teacherId: uuid('teacher_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  date: date('date').notNull(),
  status: registerStatusEnum('status').default('draft'),
  notes: text('notes'),
  finalisedAt: timestamp('finalised_at', { withTimezone: true }),
  finalisedBy: uuid('finalised_by').references(() => users.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (table) => [
  uniqueIndex('attendance_registers_unique').on(table.batchId, table.date),
  index('attendance_registers_batch_idx').on(table.batchId),
  index('attendance_registers_teacher_idx').on(table.teacherId),
  index('attendance_registers_date_idx').on(table.date),
  index('attendance_registers_status_idx').on(table.status),
  index('attendance_registers_org_idx').on(table.organisationId),
]);

export const attendanceRecords = pgTable('attendance_records', {
  id: uuid('id').primaryKey().defaultRandom(),
  organisationId: uuid('organisation_id').notNull().references(() => organisations.id, { onDelete: 'cascade' }),
  registerId: uuid('register_id').notNull().references(() => attendanceRegisters.id, { onDelete: 'cascade' }),
  studentId: uuid('student_id').notNull().references(() => students.id, { onDelete: 'cascade' }),
  status: attendanceStatusEnum('status').default('present'),
  lateMinutes: integer('late_minutes').default(0),
  earlyDepartureMinutes: integer('early_departure_minutes').default(0),
  remarks: text('remarks'),
  recordedBy: uuid('recorded_by').notNull().references(() => users.id, { onDelete: 'cascade' }),
  recordedAt: timestamp('recorded_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (table) => [
  uniqueIndex('attendance_records_unique').on(table.registerId, table.studentId),
  index('attendance_records_register_idx').on(table.registerId),
  index('attendance_records_student_idx').on(table.studentId),
  index('attendance_records_org_idx').on(table.organisationId),
]);

export const leaveRequests = pgTable('leave_requests', {
  id: uuid('id').primaryKey().defaultRandom(),
  organisationId: uuid('organisation_id').notNull().references(() => organisations.id, { onDelete: 'cascade' }),
  studentId: uuid('student_id').notNull().references(() => students.id, { onDelete: 'cascade' }),
  parentId: uuid('parent_id').references(() => parents.id, { onDelete: 'set null' }),
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  reason: text('reason').notNull(),
  status: leaveStatusEnum('status').default('pending'),
  approvedBy: uuid('approved_by').references(() => users.id, { onDelete: 'set null' }),
  approvedAt: timestamp('approved_at', { withTimezone: true }),
  rejectionReason: text('rejection_reason'),
  supportingDocumentUrl: varchar('supporting_document_url', { length: 500 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (table) => [
  index('leave_requests_student_idx').on(table.studentId),
  index('leave_requests_status_idx').on(table.status),
  index('leave_requests_date_idx').on(table.startDate, table.endDate),
  index('leave_requests_org_idx').on(table.organisationId),
]);

// ============================================
// FEE MANAGEMENT
// ============================================

export const feeStructures = pgTable('fee_structures', {
  id: uuid('id').primaryKey().defaultRandom(),
  organisationId: uuid('organisation_id').notNull().references(() => organisations.id, { onDelete: 'cascade' }),
  academicYearId: uuid('academic_year_id').notNull().references(() => academicYears.id, { onDelete: 'cascade' }),
  courseId: uuid('course_id').references(() => courses.id, { onDelete: 'cascade' }),
  batchId: uuid('batch_id').references(() => batches.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 200 }).notNull(),
  description: text('description'),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  frequency: varchar('frequency', { length: 20 }).notNull(), // 'one_time', 'monthly', 'quarterly', 'half_yearly', 'yearly', 'custom'
  dueDayOfMonth: integer('due_day_of_month').default(1),
  installments: integer('installments').default(1),
  installmentAmounts: jsonb('installment_amounts').default([]), // For custom installment amounts
  installmentDueDates: jsonb('installment_due_dates').default([]), // For custom due dates
  isActive: boolean('is_active').default(true),
  appliesToAll: boolean('applies_to_all').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => [
  index('fee_structures_org_idx').on(table.organisationId),
  index('fee_structures_year_idx').on(table.academicYearId),
  index('fee_structures_course_idx').on(table.courseId),
  index('fee_structures_batch_idx').on(table.batchId),
]);

export const studentFees = pgTable('student_fees', {
  id: uuid('id').primaryKey().defaultRandom(),
  organisationId: uuid('organisation_id').notNull().references(() => organisations.id, { onDelete: 'cascade' }),
  studentId: uuid('student_id').notNull().references(() => students.id, { onDelete: 'cascade' }),
  feeStructureId: uuid('fee_structure_id').notNull().references(() => feeStructures.id, { onDelete: 'cascade' }),
  academicYearId: uuid('academic_year_id').notNull().references(() => academicYears.id, { onDelete: 'cascade' }),
  totalAmount: decimal('total_amount', { precision: 10, scale: 2 }).notNull(),
  discountAmount: decimal('discount_amount', { precision: 10, scale: 2 }).default('0'),
  discountReason: varchar('discount_reason', { length: 200 }),
  scholarshipAmount: decimal('scholarship_amount', { precision: 10, scale: 2 }).default('0'),
  scholarshipReason: varchar('scholarship_reason', { length: 200 }),
  fineAmount: decimal('fine_amount', { precision: 10, scale: 2 }).default('0'),
  fineReason: varchar('fine_reason', { length: 200 }),
  netAmount: decimal('net_amount', { precision: 10, scale: 2 }).notNull(),
  paidAmount: decimal('paid_amount', { precision: 10, scale: 2 }).default('0'),
  balanceAmount: decimal('balance_amount', { precision: 10, scale: 2 }).notNull(),
  status: feePaymentStatusEnum('status').default('pending'),
  dueDate: date('due_date'),
  installmentNumber: integer('installment_number').default(1),
  totalInstallments: integer('total_installments').default(1),
  isReminderSent: boolean('is_reminder_sent').default(false),
  reminderSentAt: timestamp('reminder_sent_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => [
  index('student_fees_student_idx').on(table.studentId),
  index('student_fees_structure_idx').on(table.feeStructureId),
  index('student_fees_status_idx').on(table.status),
  index('student_fees_due_date_idx').on(table.dueDate),
  index('student_fees_org_idx').on(table.organisationId),
]);

export const payments = pgTable('payments', {
  id: uuid('id').primaryKey().defaultRandom(),
  organisationId: uuid('organisation_id').notNull().references(() => organisations.id, { onDelete: 'cascade' }),
  studentFeeId: uuid('student_fee_id').notNull().references(() => studentFees.id, { onDelete: 'cascade' }),
  studentId: uuid('student_id').notNull().references(() => students.id, { onDelete: 'cascade' }),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  method: feePaymentMethodEnum('method').notNull(),
  referenceNumber: varchar('reference_number', { length: 100 }),
  transactionId: varchar('transaction_id', { length: 100 }),
  paidAt: timestamp('paid_at', { withTimezone: true }).defaultNow(),
  receivedBy: uuid('received_by').notNull().references(() => users.id, { onDelete: 'cascade' }),
  notes: text('notes'),
  receiptNumber: varchar('receipt_number', { length: 50 }).notNull().unique(),
  receiptUrl: varchar('receipt_url', { length: 500 }),
  status: varchar('status', { length: 20 }).default('completed'), // 'completed', 'refunded', 'failed'
  refundedAt: timestamp('refunded_at', { withTimezone: true }),
  refundedBy: uuid('refunded_by').references(() => users.id, { onDelete: 'set null' }),
  refundReason: text('refund_reason'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (table) => [
  index('payments_student_fee_idx').on(table.studentFeeId),
  index('payments_student_idx').on(table.studentId),
  index('payments_receipt_idx').on(table.receiptNumber),
  index('payments_paid_at_idx').on(table.paidAt),
  index('payments_org_idx').on(table.organisationId),
]);

export const receipts = pgTable('receipts', {
  id: uuid('id').primaryKey().defaultRandom(),
  organisationId: uuid('organisation_id').notNull().references(() => organisations.id, { onDelete: 'cascade' }),
  paymentId: uuid('payment_id').notNull().unique().references(() => payments.id, { onDelete: 'cascade' }),
  receiptNumber: varchar('receipt_number', { length: 50 }).notNull().unique(),
  studentId: uuid('student_id').notNull().references(() => students.id, { onDelete: 'cascade' }),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  issuedAt: timestamp('issued_at', { withTimezone: true }).defaultNow(),
  issuedBy: uuid('issued_by').notNull().references(() => users.id, { onDelete: 'cascade' }),
  pdfUrl: varchar('pdf_url', { length: 500 }),
  isVoided: boolean('is_voided').default(false),
  voidedAt: timestamp('voided_at', { withTimezone: true }),
  voidedBy: uuid('voided_by').references(() => users.id, { onDelete: 'set null' }),
  voidReason: text('void_reason'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
}, (table) => [
  index('receipts_payment_idx').on(table.paymentId),
  index('receipts_student_idx').on(table.studentId),
  index('receipts_number_idx').on(table.receiptNumber),
  index('receipts_org_idx').on(table.organisationId),
]);

// ============================================
// COMMUNICATION & MESSAGING
// ============================================

export const messageTemplates = pgTable('message_templates', {
  id: uuid('id').primaryKey().defaultRandom(),
  organisationId: uuid('organisation_id').notNull().references(() => organisations.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 200 }).notNull(),
  type: messageTypeEnum('type').notNull(),
  content: text('content').notNull(),
  dynamicFields: jsonb('dynamic_fields').default([]), // ['StudentName', 'ParentName', ...]
  isActive: boolean('is_active').default(true),
  isSystem: boolean('is_system').default(false),
  createdBy: uuid('created_by').notNull().references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => [
  index('message_templates_org_idx').on(table.organisationId),
  index('message_templates_type_idx').on(table.type),
]);

export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  organisationId: uuid('organisation_id').notNull().references(() => organisations.id, { onDelete: 'cascade' }),
  templateId: uuid('template_id').references(() => messageTemplates.id, { onDelete: 'set null' }),
  type: messageTypeEnum('type').notNull(),
  subject: varchar('subject', { length: 300 }),
  content: text('content').notNull(),
  status: messageStatusEnum('status').default('draft'),
  senderId: uuid('sender_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  senderName: varchar('sender_name', { length: 200 }).notNull(),
  senderType: varchar('sender_type', { length: 20 }).notNull(), // 'owner', 'admin', 'teacher', 'system'
  scheduledAt: timestamp('scheduled_at', { withTimezone: true }),
  sentAt: timestamp('sent_at', { withTimezone: true }),
  deliveredAt: timestamp('delivered_at', { withTimezone: true }),
  failedAt: timestamp('failed_at', { withTimezone: true }),
  failureReason: text('failure_reason'),
  retryCount: integer('retry_count').default(0),
  maxRetries: integer('max_retries').default(3),
  approvedBy: uuid('approved_by').references(() => users.id, { onDelete: 'set null' }),
  approvedAt: timestamp('approved_at', { withTimezone: true }),
  requiresApproval: boolean('requires_approval').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => [
  index('messages_org_idx').on(table.organisationId),
  index('messages_sender_idx').on(table.senderId),
  index('messages_status_idx').on(table.status),
  index('messages_scheduled_idx').on(table.scheduledAt),
]);

export const messageRecipients = pgTable('message_recipients', {
  id: uuid('id').primaryKey().defaultRandom(),
  organisationId: uuid('organisation_id').notNull().references(() => organisations.id, { onDelete: 'cascade' }),
  messageId: uuid('message_id').notNull().references(() => messages.id, { onDelete: 'cascade' }),
  studentId: uuid('student_id').notNull().references(() => students.id, { onDelete: 'cascade' }),
  parentId: uuid('parent_id').notNull().references(() => parents.id, { onDelete: 'cascade' }),
  phoneNumber: varchar('phone_number', { length: 20 }).notNull(),
  personalizedContent: text('personalized_content').notNull(),
  status: messageStatusEnum('status').default('queued'),
  sentAt: timestamp('sent_at', { withTimezone: true }),
  deliveredAt: timestamp('delivered_at', { withTimezone: true }),
  failedAt: timestamp('failed_at', { withTimezone: true }),
  failureReason: text('failure_reason'),
  providerMessageId: varchar('provider_message_id', { length: 100 }),
  providerStatus: varchar('provider_status', { length: 50 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (table) => [
  index('message_recipients_message_idx').on(table.messageId),
  index('message_recipients_student_idx').on(table.studentId),
  index('message_recipients_parent_idx').on(table.parentId),
  index('message_recipients_status_idx').on(table.status),
  index('message_recipients_org_idx').on(table.organisationId),
]);

export const messageApprovals = pgTable('message_approvals', {
  id: uuid('id').primaryKey().defaultRandom(),
  organisationId: uuid('organisation_id').notNull().references(() => organisations.id, { onDelete: 'cascade' }),
  messageId: uuid('message_id').notNull().unique().references(() => messages.id, { onDelete: 'cascade' }),
  requestedBy: uuid('requested_by').notNull().references(() => users.id, { onDelete: 'cascade' }),
  approverId: uuid('approver_id').references(() => users.id, { onDelete: 'set null' }),
  status: varchar('status', { length: 20 }).default('pending'), // 'pending', 'approved', 'rejected', 'changes_requested'
  comments: text('comments'),
  requestedAt: timestamp('requested_at', { withTimezone: true }).defaultNow(),
  respondedAt: timestamp('responded_at', { withTimezone: true }),
}, (table) => [
  index('message_approvals_message_idx').on(table.messageId),
  index('message_approvals_approver_idx').on(table.approverId),
]);

// In-app Notifications
export const notifications = pgTable('notifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  organisationId: uuid('organisation_id').notNull().references(() => organisations.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 300 }).notNull(),
  content: text('content').notNull(),
  type: varchar('type', { length: 50 }).notNull(),
  referenceId: uuid('reference_id'),
  referenceType: varchar('reference_type', { length: 50 }),
  isRead: boolean('is_read').default(false),
  readAt: timestamp('read_at', { withTimezone: true }),
  actionUrl: varchar('action_url', { length: 500 }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
}, (table) => [
  index('notifications_user_idx').on(table.userId),
  index('notifications_read_idx').on(table.isRead),
  index('notifications_created_idx').on(table.createdAt),
  index('notifications_org_idx').on(table.organisationId),
]);

// Announcements
export const announcements = pgTable('announcements', {
  id: uuid('id').primaryKey().defaultRandom(),
  organisationId: uuid('organisation_id').notNull().references(() => organisations.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 300 }).notNull(),
  content: text('content').notNull(),
  type: varchar('type', { length: 50 }).default('general'), // 'general', 'emergency', 'academic', 'event', 'holiday'
  priority: varchar('priority', { length: 20 }).default('normal'), // 'low', 'normal', 'high', 'urgent'
  targetAudience: varchar('target_audience', { length: 50 }).default('all'), // 'all', 'parents', 'teachers', 'students', 'staff', 'specific_batch'
  targetBatchIds: jsonb('target_batch_ids').default([]),
  attachmentUrls: jsonb('attachment_urls').default([]),
  publishAt: timestamp('publish_at', { withTimezone: true }).defaultNow(),
  expireAt: timestamp('expire_at', { withTimezone: true }),
  isPublished: boolean('is_published').default(false),
  publishedBy: uuid('published_by').notNull().references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => [
  index('announcements_org_idx').on(table.organisationId),
  index('announcements_published_idx').on(table.isPublished),
  index('announcements_publish_at_idx').on(table.publishAt),
]);

// ============================================
// HOMEWORK & STUDY MATERIALS
// ============================================

export const homework = pgTable('homework', {
  id: uuid('id').primaryKey().defaultRandom(),
  organisationId: uuid('organisation_id').notNull().references(() => organisations.id, { onDelete: 'cascade' }),
  batchId: uuid('batch_id').notNull().references(() => batches.id, { onDelete: 'cascade' }),
  subjectId: uuid('subject_id').notNull().references(() => subjects.id, { onDelete: 'cascade' }),
  teacherId: uuid('teacher_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 300 }).notNull(),
  description: text('description').notNull(),
  assignedDate: date('assigned_date').notNull(),
  dueDate: date('due_date').notNull(),
  status: homeworkStatusEnum('status').default('draft'),
  attachmentUrls: jsonb('attachment_urls').default([]),
  maxMarks: integer('max_marks'),
  instructions: text('instructions'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => [
  index('homework_batch_idx').on(table.batchId),
  index('homework_subject_idx').on(table.subjectId),
  index('homework_teacher_idx').on(table.teacherId),
  index('homework_due_date_idx').on(table.dueDate),
  index('homework_status_idx').on(table.status),
  index('homework_org_idx').on(table.organisationId),
]);

export const studyMaterials = pgTable('study_materials', {
  id: uuid('id').primaryKey().defaultRandom(),
  organisationId: uuid('organisation_id').notNull().references(() => organisations.id, { onDelete: 'cascade' }),
  batchId: uuid('batch_id').notNull().references(() => batches.id, { onDelete: 'cascade' }),
  subjectId: uuid('subject_id').notNull().references(() => subjects.id, { onDelete: 'cascade' }),
  teacherId: uuid('teacher_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 300 }).notNull(),
  description: text('description'),
  fileUrl: varchar('file_url', { length: 500 }).notNull(),
  fileName: varchar('file_name', { length: 300 }).notNull(),
  fileSize: integer('file_size'), // bytes
  fileType: varchar('file_type', { length: 100 }),
  isDownloadable: boolean('is_downloadable').default(true),
  publishAt: timestamp('publish_at', { withTimezone: true }).defaultNow(),
  expireAt: timestamp('expire_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => [
  index('study_materials_batch_idx').on(table.batchId),
  index('study_materials_subject_idx').on(table.subjectId),
  index('study_materials_teacher_idx').on(table.teacherId),
  index('study_materials_publish_idx').on(table.publishAt),
  index('study_materials_org_idx').on(table.organisationId),
]);

// ============================================
// EXAMINATIONS & RESULTS
// ============================================

export const examinations = pgTable('examinations', {
  id: uuid('id').primaryKey().defaultRandom(),
  organisationId: uuid('organisation_id').notNull().references(() => organisations.id, { onDelete: 'cascade' }),
  academicYearId: uuid('academic_year_id').notNull().references(() => academicYears.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 200 }).notNull(),
  code: varchar('code', { length: 50 }).notNull(),
  type: varchar('type', { length: 50 }).notNull(), // 'unit_test', 'mid_term', 'final', 'practical', 'assignment', 'project'
  description: text('description'),
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  status: examinationStatusEnum('status').default('draft'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => [
  uniqueIndex('examinations_org_year_code_unique').on(table.organisationId, table.academicYearId, table.code),
  index('examinations_org_idx').on(table.organisationId),
  index('examinations_year_idx').on(table.academicYearId),
  index('examinations_status_idx').on(table.status),
]);

export const examinationSubjects = pgTable('examination_subjects', {
  id: uuid('id').primaryKey().defaultRandom(),
  organisationId: uuid('organisation_id').notNull().references(() => organisations.id, { onDelete: 'cascade' }),
  examinationId: uuid('examination_id').notNull().references(() => examinations.id, { onDelete: 'cascade' }),
  subjectId: uuid('subject_id').notNull().references(() => subjects.id, { onDelete: 'cascade' }),
  batchId: uuid('batch_id').notNull().references(() => batches.id, { onDelete: 'cascade' }),
  date: date('date').notNull(),
  startTime: time('start_time').notNull(),
  endTime: time('end_time').notNull(),
  maxMarks: integer('max_marks').notNull(),
  passingMarks: integer('passing_marks').default(35),
  room: varchar('room', { length: 50 }),
  invigilatorId: uuid('invigilator_id').references(() => users.id, { onDelete: 'set null' }),
  instructions: text('instructions'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (table) => [
  uniqueIndex('examination_subjects_unique').on(table.examinationId, table.subjectId, table.batchId),
  index('examination_subjects_exam_idx').on(table.examinationId),
  index('examination_subjects_batch_idx').on(table.batchId),
  index('examination_subjects_org_idx').on(table.organisationId),
]);

export const marks = pgTable('marks', {
  id: uuid('id').primaryKey().defaultRandom(),
  organisationId: uuid('organisation_id').notNull().references(() => organisations.id, { onDelete: 'cascade' }),
  examinationSubjectId: uuid('examination_subject_id').notNull().references(() => examinationSubjects.id, { onDelete: 'cascade' }),
  studentId: uuid('student_id').notNull().references(() => students.id, { onDelete: 'cascade' }),
  marksObtained: decimal('marks_obtained', { precision: 5, scale: 2 }),
  status: marksEntryStatusEnum('status').default('pending'),
  enteredBy: uuid('entered_by').references(() => users.id, { onDelete: 'set null' }),
  enteredAt: timestamp('entered_at', { withTimezone: true }),
  verifiedBy: uuid('verified_by').references(() => users.id, { onDelete: 'set null' }),
  verifiedAt: timestamp('verified_at', { withTimezone: true }),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  remarks: text('remarks'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (table) => [
  uniqueIndex('marks_unique').on(table.examinationSubjectId, table.studentId),
  index('marks_student_idx').on(table.studentId),
  index('marks_exam_subject_idx').on(table.examinationSubjectId),
  index('marks_status_idx').on(table.status),
  index('marks_org_idx').on(table.organisationId),
]);

// ============================================
// TIMETABLE & CALENDAR
// ============================================

export const timetables = pgTable('timetables', {
  id: uuid('id').primaryKey().defaultRandom(),
  organisationId: uuid('organisation_id').notNull().references(() => organisations.id, { onDelete: 'cascade' }),
  branchId: uuid('branch_id').references(() => branches.id, { onDelete: 'cascade' }),
  batchId: uuid('batch_id').notNull().references(() => batches.id, { onDelete: 'cascade' }),
  subjectId: uuid('subject_id').notNull().references(() => subjects.id, { onDelete: 'cascade' }),
  teacherId: uuid('teacher_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  dayOfWeek: integer('day_of_week').notNull(), // 0=Sunday, 1=Monday, ..., 6=Saturday
  startTime: time('start_time').notNull(),
  endTime: time('end_time').notNull(),
  room: varchar('room', { length: 50 }),
  effectiveFrom: date('effective_from').notNull(),
  effectiveTo: date('effective_to'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => [
  index('timetables_batch_idx').on(table.batchId),
  index('timetables_teacher_idx').on(table.teacherId),
  index('timetables_day_idx').on(table.dayOfWeek),
  index('timetables_org_idx').on(table.organisationId),
]);

export const calendarEvents = pgTable('calendar_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  organisationId: uuid('organisation_id').notNull().references(() => organisations.id, { onDelete: 'cascade' }),
  branchId: uuid('branch_id').references(() => branches.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 300 }).notNull(),
  description: text('description'),
  type: varchar('type', { length: 50 }).notNull(), // 'holiday', 'exam', 'event', 'meeting', 'assignment', 'deadline'
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  startTime: time('start_time'),
  endTime: time('end_time'),
  isAllDay: boolean('is_all_day').default(false),
  location: varchar('location', { length: 200 }),
  targetAudience: varchar('target_audience', { length: 50 }).default('all'),
  targetBatchIds: jsonb('target_batch_ids').default([]),
  color: varchar('color', { length: 20 }).default('#204E72'),
  createdBy: uuid('created_by').notNull().references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => [
  index('calendar_events_org_idx').on(table.organisationId),
  index('calendar_events_date_idx').on(table.startDate, table.endDate),
  index('calendar_events_type_idx').on(table.type),
]);

// ============================================
// DOCUMENTS
// ============================================

export const documents = pgTable('documents', {
  id: uuid('id').primaryKey().defaultRandom(),
  organisationId: uuid('organisation_id').notNull().references(() => organisations.id, { onDelete: 'cascade' }),
  studentId: uuid('student_id').references(() => students.id, { onDelete: 'cascade' }),
  parentId: uuid('parent_id').references(() => parents.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  type: documentTypeEnum('type').notNull(),
  title: varchar('title', { length: 300 }).notNull(),
  description: text('description'),
  fileUrl: varchar('file_url', { length: 500 }).notNull(),
  fileName: varchar('file_name', { length: 300 }).notNull(),
  fileSize: integer('file_size'),
  fileType: varchar('file_type', { length: 100 }),
  uploadedBy: uuid('uploaded_by').notNull().references(() => users.id, { onDelete: 'cascade' }),
  isVerified: boolean('is_verified').default(false),
  verifiedBy: uuid('verified_by').references(() => users.id, { onDelete: 'set null' }),
  verifiedAt: timestamp('verified_at', { withTimezone: true }),
  expiresAt: timestamp('expires_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
}, (table) => [
  index('documents_student_idx').on(table.studentId),
  index('documents_parent_idx').on(table.parentId),
  index('documents_user_idx').on(table.userId),
  index('documents_type_idx').on(table.type),
  index('documents_org_idx').on(table.organisationId),
]);

// ============================================
// AUDIT LOGS
// ============================================

export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  organisationId: uuid('organisation_id').references(() => organisations.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  action: auditActionEnum('action').notNull(),
  entityType: varchar('entity_type', { length: 100 }).notNull(),
  entityId: uuid('entity_id'),
  oldValues: jsonb('old_values'),
  newValues: jsonb('new_values'),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  metadata: jsonb('metadata').default({}),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
}, (table) => [
  index('audit_logs_org_idx').on(table.organisationId),
  index('audit_logs_user_idx').on(table.userId),
  index('audit_logs_action_idx').on(table.action),
  index('audit_logs_entity_idx').on(table.entityType, table.entityId),
  index('audit_logs_created_idx').on(table.createdAt),
]);

// ============================================
// SUBSCRIPTIONS & AI USAGE
// ============================================

export const subscriptions = pgTable('subscriptions', {
  id: uuid('id').primaryKey().defaultRandom(),
  organisationId: uuid('organisation_id').notNull().unique().references(() => organisations.id, { onDelete: 'cascade' }),
  plan: subscriptionPlanEnum('plan').default('free'),
  status: subscriptionStatusEnum('status').default('trial'),
  billingCycle: varchar('billing_cycle', { length: 20 }).default('monthly'), // 'monthly', 'yearly'
  amount: decimal('amount', { precision: 10, scale: 2 }).default('0'),
  currency: varchar('currency', { length: 3 }).default('INR'),
  trialEndsAt: timestamp('trial_ends_at', { withTimezone: true }),
  currentPeriodStart: timestamp('current_period_start', { withTimezone: true }).defaultNow(),
  currentPeriodEnd: timestamp('current_period_end', { withTimezone: true }),
  cancelledAt: timestamp('cancelled_at', { withTimezone: true }),
  cancelAtPeriodEnd: boolean('cancel_at_period_end').default(false),
  features: jsonb('features').default({}),
  limits: jsonb('limits').default({}), // { students: 100, teachers: 10, sms: 500, ai: 1000, storage: 1073741824 }
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
}, (table) => [
  index('subscriptions_org_idx').on(table.organisationId),
  index('subscriptions_status_idx').on(table.status),
]);

export const aiUsage = pgTable('ai_usage', {
  id: uuid('id').primaryKey().defaultRandom(),
  organisationId: uuid('organisation_id').notNull().references(() => organisations.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  type: aiUsageTypeEnum('type').notNull(),
  promptTokens: integer('prompt_tokens').default(0),
  completionTokens: integer('completion_tokens').default(0),
  totalTokens: integer('total_tokens').default(0),
  estimatedCost: decimal('estimated_cost', { precision: 10, scale: 6 }).default('0'),
  model: varchar('model', { length: 100 }),
  metadata: jsonb('metadata').default({}),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
}, (table) => [
  index('ai_usage_org_idx').on(table.organisationId),
  index('ai_usage_user_idx').on(table.userId),
  index('ai_usage_type_idx').on(table.type),
  index('ai_usage_created_idx').on(table.createdAt),
]);

// ============================================
// RELATIONS
// ============================================

export const organisationsRelations = relations(organisations, ({ many }) => ({
  branches: many(branches),
  users: many(users),
  academicYears: many(academicYears),
  courses: many(courses),
  subjects: many(subjects),
  batches: many(batches),
  students: many(students),
  parents: many(parents),
  parentStudentLinks: many(parentStudentLinks),
  studentEnrollments: many(studentEnrollments),
  attendanceRegisters: many(attendanceRegisters),
  attendanceRecords: many(attendanceRecords),
  leaveRequests: many(leaveRequests),
  feeStructures: many(feeStructures),
  studentFees: many(studentFees),
  payments: many(payments),
  receipts: many(receipts),
  messageTemplates: many(messageTemplates),
  messages: many(messages),
  messageRecipients: many(messageRecipients),
  messageApprovals: many(messageApprovals),
  notifications: many(notifications),
  announcements: many(announcements),
  homework: many(homework),
  studyMaterials: many(studyMaterials),
  examinations: many(examinations),
  examinationSubjects: many(examinationSubjects),
  marks: many(marks),
  timetables: many(timetables),
  calendarEvents: many(calendarEvents),
  documents: many(documents),
  auditLogs: many(auditLogs),
  subscriptions: many(subscriptions),
  aiUsage: many(aiUsage),
}));

export const branchesRelations = relations(branches, ({ one, many }) => ({
  organisation: one(organisations, { fields: [branches.organisationId], references: [organisations.id] }),
  users: many(users),
  batches: many(batches),
  timetables: many(timetables),
  calendarEvents: many(calendarEvents),
}));

export const usersRelations = relations(users, ({ one, many }) => ({
  organisation: one(organisations, { fields: [users.organisationId], references: [organisations.id] }),
  branch: one(branches, { fields: [users.branchId], references: [branches.id] }),
  customRole: one(customRoles, { fields: [users.customRoleId], references: [customRoles.id] }),
  managedBatches: many(batches, { relationName: 'teacherBatches' }),
  attendanceRegisters: many(attendanceRegisters),
  attendanceRecords: many(attendanceRecords, { relationName: 'recordedBy' }),
  leaveRequestsApproved: many(leaveRequests, { relationName: 'approvedBy' }),
  paymentsReceived: many(payments, { relationName: 'receivedBy' }),
  paymentsRefunded: many(payments, { relationName: 'refundedBy' }),
  receiptsIssued: many(receipts, { relationName: 'issuedBy' }),
  receiptsVoided: many(receipts, { relationName: 'voidedBy' }),
  messageTemplatesCreated: many(messageTemplates),
  messagesSent: many(messages),
  messageApprovalsRequested: many(messageApprovals, { relationName: 'requestedBy' }),
  messageApprovalsResponded: many(messageApprovals, { relationName: 'approverId' }),
  notifications: many(notifications),
  announcementsPublished: many(announcements),
  homeworkCreated: many(homework),
  studyMaterialsCreated: many(studyMaterials),
  marksEntered: many(marks, { relationName: 'enteredBy' }),
  marksVerified: many(marks, { relationName: 'verifiedBy' }),
  timetables: many(timetables),
  calendarEventsCreated: many(calendarEvents),
  documentsUploaded: many(documents),
  documentsVerified: many(documents, { relationName: 'verifiedBy' }),
  auditLogs: many(auditLogs),
  aiUsage: many(aiUsage),
  parent: one(parents, { fields: [users.id], references: [parents.userId] }),
}));

export const customRolesRelations = relations(customRoles, ({ one, many }) => ({
  organisation: one(organisations, { fields: [customRoles.organisationId], references: [organisations.id] }),
  users: many(users),
}));

export const academicYearsRelations = relations(academicYears, ({ one, many }) => ({
  organisation: one(organisations, { fields: [academicYears.organisationId], references: [organisations.id] }),
  courses: many(courses),
  batches: many(batches),
  studentEnrollments: many(studentEnrollments),
  feeStructures: many(feeStructures),
  studentFees: many(studentFees),
  examinations: many(examinations),
}));

export const coursesRelations = relations(courses, ({ one, many }) => ({
  organisation: one(organisations, { fields: [courses.organisationId], references: [organisations.id] }),
  academicYear: one(academicYears, { fields: [courses.academicYearId], references: [academicYears.id] }),
  subjects: many(subjects),
  batches: many(batches),
  feeStructures: many(feeStructures),
}));

export const subjectsRelations = relations(subjects, ({ one, many }) => ({
  organisation: one(organisations, { fields: [subjects.organisationId], references: [organisations.id] }),
  course: one(courses, { fields: [subjects.courseId], references: [courses.id] }),
  batches: many(batches),
  homework: many(homework),
  studyMaterials: many(studyMaterials),
  examinationSubjects: many(examinationSubjects),
  timetables: many(timetables),
}));

export const batchesRelations = relations(batches, ({ one, many }) => ({
  organisation: one(organisations, { fields: [batches.organisationId], references: [organisations.id] }),
  branch: one(branches, { fields: [batches.branchId], references: [branches.id] }),
  academicYear: one(academicYears, { fields: [batches.academicYearId], references: [academicYears.id] }),
  course: one(courses, { fields: [batches.courseId], references: [courses.id] }),
  teacher: one(users, { fields: [batches.teacherId], references: [users.id], relationName: 'teacherBatches' }),
  studentEnrollments: many(studentEnrollments),
  attendanceRegisters: many(attendanceRegisters),
  homework: many(homework),
  studyMaterials: many(studyMaterials),
  examinationSubjects: many(examinationSubjects),
  timetables: many(timetables),
}));

export const studentsRelations = relations(students, ({ one, many }) => ({
  organisation: one(organisations, { fields: [students.organisationId], references: [organisations.id] }),
  branch: one(branches, { fields: [students.branchId], references: [branches.id] }),
  parentLinks: many(parentStudentLinks),
  enrollments: many(studentEnrollments),
  attendanceRecords: many(attendanceRecords),
  leaveRequests: many(leaveRequests),
  studentFees: many(studentFees),
  payments: many(payments),
  receipts: many(receipts),
  messageRecipients: many(messageRecipients),
  marks: many(marks),
  documents: many(documents),
}));

export const parentsRelations = relations(parents, ({ one, many }) => ({
  organisation: one(organisations, { fields: [parents.organisationId], references: [organisations.id] }),
  user: one(users, { fields: [parents.userId], references: [users.id] }),
  studentLinks: many(parentStudentLinks),
  leaveRequests: many(leaveRequests),
  messageRecipients: many(messageRecipients),
  documents: many(documents),
}));

export const parentStudentLinksRelations = relations(parentStudentLinks, ({ one }) => ({
  organisation: one(organisations, { fields: [parentStudentLinks.organisationId], references: [organisations.id] }),
  parent: one(parents, { fields: [parentStudentLinks.parentId], references: [parents.id] }),
  student: one(students, { fields: [parentStudentLinks.studentId], references: [students.id] }),
}));

export const studentEnrollmentsRelations = relations(studentEnrollments, ({ one }) => ({
  organisation: one(organisations, { fields: [studentEnrollments.organisationId], references: [organisations.id] }),
  student: one(students, { fields: [studentEnrollments.studentId], references: [students.id] }),
  batch: one(batches, { fields: [studentEnrollments.batchId], references: [batches.id] }),
  academicYear: one(academicYears, { fields: [studentEnrollments.academicYearId], references: [academicYears.id] }),
}));

export const attendanceRegistersRelations = relations(attendanceRegisters, ({ one, many }) => ({
  organisation: one(organisations, { fields: [attendanceRegisters.organisationId], references: [organisations.id] }),
  batch: one(batches, { fields: [attendanceRegisters.batchId], references: [batches.id] }),
  teacher: one(users, { fields: [attendanceRegisters.teacherId], references: [users.id] }),
  finalisedByUser: one(users, { fields: [attendanceRegisters.finalisedBy], references: [users.id] }),
  records: many(attendanceRecords),
}));

export const attendanceRecordsRelations = relations(attendanceRecords, ({ one }) => ({
  organisation: one(organisations, { fields: [attendanceRecords.organisationId], references: [organisations.id] }),
  register: one(attendanceRegisters, { fields: [attendanceRecords.registerId], references: [attendanceRegisters.id] }),
  student: one(students, { fields: [attendanceRecords.studentId], references: [students.id] }),
  recordedByUser: one(users, { fields: [attendanceRecords.recordedBy], references: [users.id] }),
}));

export const leaveRequestsRelations = relations(leaveRequests, ({ one }) => ({
  organisation: one(organisations, { fields: [leaveRequests.organisationId], references: [organisations.id] }),
  student: one(students, { fields: [leaveRequests.studentId], references: [students.id] }),
  parent: one(parents, { fields: [leaveRequests.parentId], references: [parents.id] }),
  approvedByUser: one(users, { fields: [leaveRequests.approvedBy], references: [users.id] }),
}));

export const feeStructuresRelations = relations(feeStructures, ({ one, many }) => ({
  organisation: one(organisations, { fields: [feeStructures.organisationId], references: [organisations.id] }),
  academicYear: one(academicYears, { fields: [feeStructures.academicYearId], references: [academicYears.id] }),
  course: one(courses, { fields: [feeStructures.courseId], references: [courses.id] }),
  batch: one(batches, { fields: [feeStructures.batchId], references: [batches.id] }),
  studentFees: many(studentFees),
}));

export const studentFeesRelations = relations(studentFees, ({ one, many }) => ({
  organisation: one(organisations, { fields: [studentFees.organisationId], references: [organisations.id] }),
  student: one(students, { fields: [studentFees.studentId], references: [students.id] }),
  feeStructure: one(feeStructures, { fields: [studentFees.feeStructureId], references: [feeStructures.id] }),
  academicYear: one(academicYears, { fields: [studentFees.academicYearId], references: [academicYears.id] }),
  payments: many(payments),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  organisation: one(organisations, { fields: [payments.organisationId], references: [organisations.id] }),
  studentFee: one(studentFees, { fields: [payments.studentFeeId], references: [studentFees.id] }),
  student: one(students, { fields: [payments.studentId], references: [students.id] }),
  receivedByUser: one(users, { fields: [payments.receivedBy], references: [users.id] }),
  refundedByUser: one(users, { fields: [payments.refundedBy], references: [users.id] }),
  receipt: one(receipts, { fields: [payments.id], references: [receipts.paymentId] }),
}));

export const receiptsRelations = relations(receipts, ({ one }) => ({
  organisation: one(organisations, { fields: [receipts.organisationId], references: [organisations.id] }),
  payment: one(payments, { fields: [receipts.paymentId], references: [payments.id] }),
  student: one(students, { fields: [receipts.studentId], references: [students.id] }),
  issuedByUser: one(users, { fields: [receipts.issuedBy], references: [users.id] }),
  voidedByUser: one(users, { fields: [receipts.voidedBy], references: [users.id] }),
}));

export const messageTemplatesRelations = relations(messageTemplates, ({ one, many }) => ({
  organisation: one(organisations, { fields: [messageTemplates.organisationId], references: [organisations.id] }),
  createdByUser: one(users, { fields: [messageTemplates.createdBy], references: [users.id] }),
  messages: many(messages),
}));

export const messagesRelations = relations(messages, ({ one, many }) => ({
  organisation: one(organisations, { fields: [messages.organisationId], references: [organisations.id] }),
  template: one(messageTemplates, { fields: [messages.templateId], references: [messageTemplates.id] }),
  sender: one(users, { fields: [messages.senderId], references: [users.id] }),
  approvedByUser: one(users, { fields: [messages.approvedBy], references: [users.id] }),
  recipients: many(messageRecipients),
  approval: one(messageApprovals, { fields: [messages.id], references: [messageApprovals.messageId] }),
}));

export const messageRecipientsRelations = relations(messageRecipients, ({ one }) => ({
  organisation: one(organisations, { fields: [messageRecipients.organisationId], references: [organisations.id] }),
  message: one(messages, { fields: [messageRecipients.messageId], references: [messages.id] }),
  student: one(students, { fields: [messageRecipients.studentId], references: [students.id] }),
  parent: one(parents, { fields: [messageRecipients.parentId], references: [parents.id] }),
}));

export const messageApprovalsRelations = relations(messageApprovals, ({ one }) => ({
  organisation: one(organisations, { fields: [messageApprovals.organisationId], references: [organisations.id] }),
  message: one(messages, { fields: [messageApprovals.messageId], references: [messages.id] }),
  requestedByUser: one(users, { fields: [messageApprovals.requestedBy], references: [users.id] }),
  approverUser: one(users, { fields: [messageApprovals.approverId], references: [users.id] }),
}));

export const notificationsRelations = relations(notifications, ({ one }) => ({
  organisation: one(organisations, { fields: [notifications.organisationId], references: [organisations.id] }),
  user: one(users, { fields: [notifications.userId], references: [users.id] }),
}));

export const announcementsRelations = relations(announcements, ({ one }) => ({
  organisation: one(organisations, { fields: [announcements.organisationId], references: [organisations.id] }),
  publishedByUser: one(users, { fields: [announcements.publishedBy], references: [users.id] }),
}));

export const homeworkRelations = relations(homework, ({ one }) => ({
  organisation: one(organisations, { fields: [homework.organisationId], references: [organisations.id] }),
  batch: one(batches, { fields: [homework.batchId], references: [batches.id] }),
  subject: one(subjects, { fields: [homework.subjectId], references: [subjects.id] }),
  teacher: one(users, { fields: [homework.teacherId], references: [users.id] }),
}));

export const studyMaterialsRelations = relations(studyMaterials, ({ one }) => ({
  organisation: one(organisations, { fields: [studyMaterials.organisationId], references: [organisations.id] }),
  batch: one(batches, { fields: [studyMaterials.batchId], references: [batches.id] }),
  subject: one(subjects, { fields: [studyMaterials.subjectId], references: [subjects.id] }),
  teacher: one(users, { fields: [studyMaterials.teacherId], references: [users.id] }),
}));

export const examinationsRelations = relations(examinations, ({ one, many }) => ({
  organisation: one(organisations, { fields: [examinations.organisationId], references: [organisations.id] }),
  academicYear: one(academicYears, { fields: [examinations.academicYearId], references: [academicYears.id] }),
  subjects: many(examinationSubjects),
}));

export const examinationSubjectsRelations = relations(examinationSubjects, ({ one, many }) => ({
  organisation: one(organisations, { fields: [examinationSubjects.organisationId], references: [organisations.id] }),
  examination: one(examinations, { fields: [examinationSubjects.examinationId], references: [examinations.id] }),
  subject: one(subjects, { fields: [examinationSubjects.subjectId], references: [subjects.id] }),
  batch: one(batches, { fields: [examinationSubjects.batchId], references: [batches.id] }),
  invigilator: one(users, { fields: [examinationSubjects.invigilatorId], references: [users.id] }),
  marks: many(marks),
}));

export const marksRelations = relations(marks, ({ one }) => ({
  organisation: one(organisations, { fields: [marks.organisationId], references: [organisations.id] }),
  examinationSubject: one(examinationSubjects, { fields: [marks.examinationSubjectId], references: [examinationSubjects.id] }),
  student: one(students, { fields: [marks.studentId], references: [students.id] }),
  enteredByUser: one(users, { fields: [marks.enteredBy], references: [users.id] }),
  verifiedByUser: one(users, { fields: [marks.verifiedBy], references: [users.id] }),
}));

export const timetablesRelations = relations(timetables, ({ one }) => ({
  organisation: one(organisations, { fields: [timetables.organisationId], references: [organisations.id] }),
  branch: one(branches, { fields: [timetables.branchId], references: [branches.id] }),
  batch: one(batches, { fields: [timetables.batchId], references: [batches.id] }),
  subject: one(subjects, { fields: [timetables.subjectId], references: [subjects.id] }),
  teacher: one(users, { fields: [timetables.teacherId], references: [users.id] }),
}));

export const calendarEventsRelations = relations(calendarEvents, ({ one }) => ({
  organisation: one(organisations, { fields: [calendarEvents.organisationId], references: [organisations.id] }),
  branch: one(branches, { fields: [calendarEvents.branchId], references: [branches.id] }),
  createdByUser: one(users, { fields: [calendarEvents.createdBy], references: [users.id] }),
}));

export const documentsRelations = relations(documents, ({ one }) => ({
  organisation: one(organisations, { fields: [documents.organisationId], references: [organisations.id] }),
  student: one(students, { fields: [documents.studentId], references: [students.id] }),
  parent: one(parents, { fields: [documents.parentId], references: [parents.id] }),
  user: one(users, { fields: [documents.userId], references: [users.id] }),
  uploadedByUser: one(users, { fields: [documents.uploadedBy], references: [users.id] }),
  verifiedByUser: one(users, { fields: [documents.verifiedBy], references: [users.id] }),
}));

export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
  organisation: one(organisations, { fields: [auditLogs.organisationId], references: [organisations.id] }),
  user: one(users, { fields: [auditLogs.userId], references: [users.id] }),
}));

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  organisation: one(organisations, { fields: [subscriptions.organisationId], references: [organisations.id] }),
}));

export const aiUsageRelations = relations(aiUsage, ({ one }) => ({
  organisation: one(organisations, { fields: [aiUsage.organisationId], references: [organisations.id] }),
  user: one(users, { fields: [aiUsage.userId], references: [users.id] }),
}));

// ============================================
// TYPE EXPORTS
// ============================================

export type Organisation = typeof organisations.$inferSelect;
export type NewOrganisation = typeof organisations.$inferInsert;

export type Branch = typeof branches.$inferSelect;
export type NewBranch = typeof branches.$inferInsert;

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type CustomRole = typeof customRoles.$inferSelect;
export type NewCustomRole = typeof customRoles.$inferInsert;

export type AcademicYear = typeof academicYears.$inferSelect;
export type NewAcademicYear = typeof academicYears.$inferInsert;

export type Course = typeof courses.$inferSelect;
export type NewCourse = typeof courses.$inferInsert;

export type Subject = typeof subjects.$inferSelect;
export type NewSubject = typeof subjects.$inferInsert;

export type Batch = typeof batches.$inferSelect;
export type NewBatch = typeof batches.$inferInsert;

export type Student = typeof students.$inferSelect;
export type NewStudent = typeof students.$inferInsert;

export type Parent = typeof parents.$inferSelect;
export type NewParent = typeof parents.$inferInsert;

export type ParentStudentLink = typeof parentStudentLinks.$inferSelect;
export type NewParentStudentLink = typeof parentStudentLinks.$inferInsert;

export type StudentEnrollment = typeof studentEnrollments.$inferSelect;
export type NewStudentEnrollment = typeof studentEnrollments.$inferInsert;

export type AttendanceRegister = typeof attendanceRegisters.$inferSelect;
export type NewAttendanceRegister = typeof attendanceRegisters.$inferInsert;

export type AttendanceRecord = typeof attendanceRecords.$inferSelect;
export type NewAttendanceRecord = typeof attendanceRecords.$inferInsert;

export type LeaveRequest = typeof leaveRequests.$inferSelect;
export type NewLeaveRequest = typeof leaveRequests.$inferInsert;

export type FeeStructure = typeof feeStructures.$inferSelect;
export type NewFeeStructure = typeof feeStructures.$inferInsert;

export type StudentFee = typeof studentFees.$inferSelect;
export type NewStudentFee = typeof studentFees.$inferInsert;

export type Payment = typeof payments.$inferSelect;
export type NewPayment = typeof payments.$inferInsert;

export type Receipt = typeof receipts.$inferSelect;
export type NewReceipt = typeof receipts.$inferInsert;

export type MessageTemplate = typeof messageTemplates.$inferSelect;
export type NewMessageTemplate = typeof messageTemplates.$inferInsert;

export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;

export type MessageRecipient = typeof messageRecipients.$inferSelect;
export type NewMessageRecipient = typeof messageRecipients.$inferInsert;

export type MessageApproval = typeof messageApprovals.$inferSelect;
export type NewMessageApproval = typeof messageApprovals.$inferInsert;

export type Notification = typeof notifications.$inferSelect;
export type NewNotification = typeof notifications.$inferInsert;

export type Announcement = typeof announcements.$inferSelect;
export type NewAnnouncement = typeof announcements.$inferInsert;

export type Homework = typeof homework.$inferSelect;
export type NewHomework = typeof homework.$inferInsert;

export type StudyMaterial = typeof studyMaterials.$inferSelect;
export type NewStudyMaterial = typeof studyMaterials.$inferInsert;

export type Examination = typeof examinations.$inferSelect;
export type NewExamination = typeof examinations.$inferInsert;

export type ExaminationSubject = typeof examinationSubjects.$inferSelect;
export type NewExaminationSubject = typeof examinationSubjects.$inferInsert;

export type Mark = typeof marks.$inferSelect;
export type NewMark = typeof marks.$inferInsert;

export type Timetable = typeof timetables.$inferSelect;
export type NewTimetable = typeof timetables.$inferInsert;

export type CalendarEvent = typeof calendarEvents.$inferSelect;
export type NewCalendarEvent = typeof calendarEvents.$inferInsert;

export type Document = typeof documents.$inferSelect;
export type NewDocument = typeof documents.$inferInsert;

export type AuditLog = typeof auditLogs.$inferSelect;
export type NewAuditLog = typeof auditLogs.$inferInsert;

export type Subscription = typeof subscriptions.$inferSelect;
export type NewSubscription = typeof subscriptions.$inferInsert;

export type AiUsage = typeof aiUsage.$inferSelect;
export type NewAiUsage = typeof aiUsage.$inferInsert;