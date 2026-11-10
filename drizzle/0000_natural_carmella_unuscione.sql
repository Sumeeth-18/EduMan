CREATE TYPE "public"."ai_usage_type" AS ENUM('sms_draft', 'report_summary', 'pattern_analysis', 'notice_draft', 'homework_assist', 'how_to', 'report_generation');--> statement-breakpoint
CREATE TYPE "public"."attendance_status" AS ENUM('present', 'absent', 'late', 'early_departure', 'on_leave');--> statement-breakpoint
CREATE TYPE "public"."audit_action" AS ENUM('create', 'update', 'delete', 'login', 'logout', 'password_change', 'mfa_enable', 'mfa_disable', 'role_change', 'permission_change', 'org_switch', 'data_export', 'bulk_action', 'approval', 'rejection');--> statement-breakpoint
CREATE TYPE "public"."document_type" AS ENUM('student_photo', 'student_id_proof', 'parent_id_proof', 'transfer_certificate', 'marksheet', 'certificate', 'medical', 'other');--> statement-breakpoint
CREATE TYPE "public"."examination_status" AS ENUM('draft', 'scheduled', 'ongoing', 'completed', 'published', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."fee_payment_method" AS ENUM('cash', 'upi', 'bank_transfer', 'card', 'cheque', 'other');--> statement-breakpoint
CREATE TYPE "public"."fee_payment_status" AS ENUM('pending', 'partial', 'paid', 'overdue', 'cancelled', 'refunded');--> statement-breakpoint
CREATE TYPE "public"."gender" AS ENUM('male', 'female', 'other', 'prefer_not_to_say');--> statement-breakpoint
CREATE TYPE "public"."homework_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TYPE "public"."leave_status" AS ENUM('pending', 'approved', 'rejected', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."marks_entry_status" AS ENUM('pending', 'entered', 'verified', 'published');--> statement-breakpoint
CREATE TYPE "public"."message_status" AS ENUM('draft', 'awaiting_approval', 'approved', 'scheduled', 'queued', 'sent', 'delivered', 'failed', 'retrying', 'manually_resent');--> statement-breakpoint
CREATE TYPE "public"."message_type" AS ENUM('fee_reminder', 'attendance_notification', 'announcement', 'exam_result', 'timetable_change', 'account_setup', 'admin_notification', 'homework', 'general');--> statement-breakpoint
CREATE TYPE "public"."register_status" AS ENUM('draft', 'finalised');--> statement-breakpoint
CREATE TYPE "public"."subscription_plan" AS ENUM('free', 'starter', 'professional', 'enterprise', 'custom');--> statement-breakpoint
CREATE TYPE "public"."subscription_status" AS ENUM('trial', 'active', 'past_due', 'cancelled', 'expired');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('super_admin', 'owner', 'admin', 'principal', 'manager', 'teacher', 'parent', 'accountant', 'receptionist', 'custom');--> statement-breakpoint
CREATE TABLE "academic_years" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid NOT NULL,
	"name" varchar(100) NOT NULL,
	"code" varchar(20) NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"is_current" boolean DEFAULT false,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "ai_usage" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"type" "ai_usage_type" NOT NULL,
	"prompt_tokens" integer DEFAULT 0,
	"completion_tokens" integer DEFAULT 0,
	"total_tokens" integer DEFAULT 0,
	"estimated_cost" numeric(10, 6) DEFAULT '0',
	"model" varchar(100),
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "announcements" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid NOT NULL,
	"title" varchar(300) NOT NULL,
	"content" text NOT NULL,
	"type" varchar(50) DEFAULT 'general',
	"priority" varchar(20) DEFAULT 'normal',
	"target_audience" varchar(50) DEFAULT 'all',
	"target_batch_ids" jsonb DEFAULT '[]'::jsonb,
	"attachment_urls" jsonb DEFAULT '[]'::jsonb,
	"publish_at" timestamp with time zone DEFAULT now(),
	"expire_at" timestamp with time zone,
	"is_published" boolean DEFAULT false,
	"published_by" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "attendance_records" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid NOT NULL,
	"register_id" uuid NOT NULL,
	"student_id" uuid NOT NULL,
	"status" "attendance_status" DEFAULT 'present',
	"late_minutes" integer DEFAULT 0,
	"early_departure_minutes" integer DEFAULT 0,
	"remarks" text,
	"recorded_by" uuid NOT NULL,
	"recorded_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "attendance_registers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid NOT NULL,
	"batch_id" uuid NOT NULL,
	"teacher_id" uuid NOT NULL,
	"date" date NOT NULL,
	"status" "register_status" DEFAULT 'draft',
	"notes" text,
	"finalised_at" timestamp with time zone,
	"finalised_by" uuid,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid,
	"user_id" uuid,
	"action" "audit_action" NOT NULL,
	"entity_type" varchar(100) NOT NULL,
	"entity_id" uuid,
	"old_values" jsonb,
	"new_values" jsonb,
	"ip_address" varchar(45),
	"user_agent" text,
	"metadata" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "batches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid NOT NULL,
	"branch_id" uuid,
	"academic_year_id" uuid NOT NULL,
	"course_id" uuid NOT NULL,
	"name" varchar(200) NOT NULL,
	"code" varchar(20) NOT NULL,
	"description" text,
	"teacher_id" uuid,
	"capacity" integer DEFAULT 30,
	"schedule" jsonb DEFAULT '{}'::jsonb,
	"start_date" date,
	"end_date" date,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "branches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid NOT NULL,
	"code" varchar(20) NOT NULL,
	"name" varchar(200) NOT NULL,
	"address" text,
	"city" varchar(100),
	"state" varchar(100),
	"pincode" varchar(10),
	"phone" varchar(20),
	"email" varchar(255),
	"principal_id" uuid,
	"settings" jsonb DEFAULT '{}'::jsonb,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "calendar_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid NOT NULL,
	"branch_id" uuid,
	"title" varchar(300) NOT NULL,
	"description" text,
	"type" varchar(50) NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"start_time" time,
	"end_time" time,
	"is_all_day" boolean DEFAULT false,
	"location" varchar(200),
	"target_audience" varchar(50) DEFAULT 'all',
	"target_batch_ids" jsonb DEFAULT '[]'::jsonb,
	"color" varchar(20) DEFAULT '#204E72',
	"created_by" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "courses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid NOT NULL,
	"academic_year_id" uuid NOT NULL,
	"code" varchar(20) NOT NULL,
	"name" varchar(200) NOT NULL,
	"description" text,
	"fee_amount" numeric(10, 2) DEFAULT '0',
	"duration_months" integer,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "custom_roles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"permissions" jsonb DEFAULT '[]'::jsonb,
	"is_system" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "documents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid NOT NULL,
	"student_id" uuid,
	"parent_id" uuid,
	"user_id" uuid,
	"type" "document_type" NOT NULL,
	"title" varchar(300) NOT NULL,
	"description" text,
	"file_url" varchar(500) NOT NULL,
	"file_name" varchar(300) NOT NULL,
	"file_size" integer,
	"file_type" varchar(100),
	"uploaded_by" uuid NOT NULL,
	"is_verified" boolean DEFAULT false,
	"verified_by" uuid,
	"verified_at" timestamp with time zone,
	"expires_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "examination_subjects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid NOT NULL,
	"examination_id" uuid NOT NULL,
	"subject_id" uuid NOT NULL,
	"batch_id" uuid NOT NULL,
	"date" date NOT NULL,
	"start_time" time NOT NULL,
	"end_time" time NOT NULL,
	"max_marks" integer NOT NULL,
	"passing_marks" integer DEFAULT 35,
	"room" varchar(50),
	"invigilator_id" uuid,
	"instructions" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "examinations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid NOT NULL,
	"academic_year_id" uuid NOT NULL,
	"name" varchar(200) NOT NULL,
	"code" varchar(50) NOT NULL,
	"type" varchar(50) NOT NULL,
	"description" text,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"status" "examination_status" DEFAULT 'draft',
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "fee_structures" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid NOT NULL,
	"academic_year_id" uuid NOT NULL,
	"course_id" uuid,
	"batch_id" uuid,
	"name" varchar(200) NOT NULL,
	"description" text,
	"amount" numeric(10, 2) NOT NULL,
	"frequency" varchar(20) NOT NULL,
	"due_day_of_month" integer DEFAULT 1,
	"installments" integer DEFAULT 1,
	"installment_amounts" jsonb DEFAULT '[]'::jsonb,
	"installment_due_dates" jsonb DEFAULT '[]'::jsonb,
	"is_active" boolean DEFAULT true,
	"applies_to_all" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "homework" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid NOT NULL,
	"batch_id" uuid NOT NULL,
	"subject_id" uuid NOT NULL,
	"teacher_id" uuid NOT NULL,
	"title" varchar(300) NOT NULL,
	"description" text NOT NULL,
	"assigned_date" date NOT NULL,
	"due_date" date NOT NULL,
	"status" "homework_status" DEFAULT 'draft',
	"attachment_urls" jsonb DEFAULT '[]'::jsonb,
	"max_marks" integer,
	"instructions" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "leave_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid NOT NULL,
	"student_id" uuid NOT NULL,
	"parent_id" uuid,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"reason" text NOT NULL,
	"status" "leave_status" DEFAULT 'pending',
	"approved_by" uuid,
	"approved_at" timestamp with time zone,
	"rejection_reason" text,
	"supporting_document_url" varchar(500),
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "marks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid NOT NULL,
	"examination_subject_id" uuid NOT NULL,
	"student_id" uuid NOT NULL,
	"marks_obtained" numeric(5, 2),
	"status" "marks_entry_status" DEFAULT 'pending',
	"entered_by" uuid,
	"entered_at" timestamp with time zone,
	"verified_by" uuid,
	"verified_at" timestamp with time zone,
	"published_at" timestamp with time zone,
	"remarks" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "message_approvals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid NOT NULL,
	"message_id" uuid NOT NULL,
	"requested_by" uuid NOT NULL,
	"approver_id" uuid,
	"status" varchar(20) DEFAULT 'pending',
	"comments" text,
	"requested_at" timestamp with time zone DEFAULT now(),
	"responded_at" timestamp with time zone,
	CONSTRAINT "message_approvals_message_id_unique" UNIQUE("message_id")
);
--> statement-breakpoint
CREATE TABLE "message_recipients" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid NOT NULL,
	"message_id" uuid NOT NULL,
	"student_id" uuid NOT NULL,
	"parent_id" uuid NOT NULL,
	"phone_number" varchar(20) NOT NULL,
	"personalized_content" text NOT NULL,
	"status" "message_status" DEFAULT 'queued',
	"sent_at" timestamp with time zone,
	"delivered_at" timestamp with time zone,
	"failed_at" timestamp with time zone,
	"failure_reason" text,
	"provider_message_id" varchar(100),
	"provider_status" varchar(50),
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "message_templates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid NOT NULL,
	"name" varchar(200) NOT NULL,
	"type" "message_type" NOT NULL,
	"content" text NOT NULL,
	"dynamic_fields" jsonb DEFAULT '[]'::jsonb,
	"is_active" boolean DEFAULT true,
	"is_system" boolean DEFAULT false,
	"created_by" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid NOT NULL,
	"template_id" uuid,
	"type" "message_type" NOT NULL,
	"subject" varchar(300),
	"content" text NOT NULL,
	"status" "message_status" DEFAULT 'draft',
	"sender_id" uuid NOT NULL,
	"sender_name" varchar(200) NOT NULL,
	"sender_type" varchar(20) NOT NULL,
	"scheduled_at" timestamp with time zone,
	"sent_at" timestamp with time zone,
	"delivered_at" timestamp with time zone,
	"failed_at" timestamp with time zone,
	"failure_reason" text,
	"retry_count" integer DEFAULT 0,
	"max_retries" integer DEFAULT 3,
	"approved_by" uuid,
	"approved_at" timestamp with time zone,
	"requires_approval" boolean DEFAULT false,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"title" varchar(300) NOT NULL,
	"content" text NOT NULL,
	"type" varchar(50) NOT NULL,
	"reference_id" uuid,
	"reference_type" varchar(50),
	"is_read" boolean DEFAULT false,
	"read_at" timestamp with time zone,
	"action_url" varchar(500),
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "organisations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" varchar(20) NOT NULL,
	"name" varchar(200) NOT NULL,
	"logo_url" varchar(500),
	"tagline" varchar(300),
	"address" text,
	"city" varchar(100),
	"state" varchar(100),
	"pincode" varchar(10),
	"phone" varchar(20),
	"email" varchar(255),
	"website" varchar(255),
	"gst_number" varchar(15),
	"udise_code" varchar(20),
	"affiliation_board" varchar(100),
	"affiliation_number" varchar(50),
	"settings" jsonb DEFAULT '{}'::jsonb,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"deleted_at" timestamp with time zone,
	CONSTRAINT "organisations_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "parent_student_links" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid NOT NULL,
	"parent_id" uuid NOT NULL,
	"student_id" uuid NOT NULL,
	"relation" varchar(50) NOT NULL,
	"is_primary" boolean DEFAULT false,
	"is_authorized_pickup" boolean DEFAULT true,
	"can_view_academics" boolean DEFAULT true,
	"can_view_attendance" boolean DEFAULT true,
	"can_view_fees" boolean DEFAULT true,
	"can_communicate" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "parents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid NOT NULL,
	"parent_id" varchar(50) NOT NULL,
	"user_id" uuid,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"gender" "gender",
	"date_of_birth" date,
	"phone" varchar(20) NOT NULL,
	"alternate_phone" varchar(20),
	"email" varchar(255),
	"occupation" varchar(100),
	"company_name" varchar(200),
	"annual_income" numeric(12, 2),
	"address" text,
	"city" varchar(100),
	"state" varchar(100),
	"pincode" varchar(10),
	"aadhaar_number" varchar(14),
	"photo_url" varchar(500),
	"preferred_language" varchar(10) DEFAULT 'en',
	"sms_opt_in" boolean DEFAULT true,
	"whatsapp_opt_in" boolean DEFAULT false,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"deleted_at" timestamp with time zone,
	CONSTRAINT "parents_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid NOT NULL,
	"student_fee_id" uuid NOT NULL,
	"student_id" uuid NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"method" "fee_payment_method" NOT NULL,
	"reference_number" varchar(100),
	"transaction_id" varchar(100),
	"paid_at" timestamp with time zone DEFAULT now(),
	"received_by" uuid NOT NULL,
	"notes" text,
	"receipt_number" varchar(50) NOT NULL,
	"receipt_url" varchar(500),
	"status" varchar(20) DEFAULT 'completed',
	"refunded_at" timestamp with time zone,
	"refunded_by" uuid,
	"refund_reason" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "payments_receipt_number_unique" UNIQUE("receipt_number")
);
--> statement-breakpoint
CREATE TABLE "permissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" varchar(100) NOT NULL,
	"name" varchar(200) NOT NULL,
	"description" text,
	"category" varchar(50) NOT NULL,
	"is_system" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "permissions_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "receipts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid NOT NULL,
	"payment_id" uuid NOT NULL,
	"receipt_number" varchar(50) NOT NULL,
	"student_id" uuid NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"issued_at" timestamp with time zone DEFAULT now(),
	"issued_by" uuid NOT NULL,
	"pdf_url" varchar(500),
	"is_voided" boolean DEFAULT false,
	"voided_at" timestamp with time zone,
	"voided_by" uuid,
	"void_reason" text,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "receipts_payment_id_unique" UNIQUE("payment_id"),
	CONSTRAINT "receipts_receipt_number_unique" UNIQUE("receipt_number")
);
--> statement-breakpoint
CREATE TABLE "student_enrollments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid NOT NULL,
	"student_id" uuid NOT NULL,
	"batch_id" uuid NOT NULL,
	"academic_year_id" uuid NOT NULL,
	"enrollment_date" date DEFAULT now(),
	"status" varchar(20) DEFAULT 'active',
	"roll_number" varchar(20),
	"previous_batch_id" uuid,
	"custom_fields" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "student_fees" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid NOT NULL,
	"student_id" uuid NOT NULL,
	"fee_structure_id" uuid NOT NULL,
	"academic_year_id" uuid NOT NULL,
	"total_amount" numeric(10, 2) NOT NULL,
	"discount_amount" numeric(10, 2) DEFAULT '0',
	"discount_reason" varchar(200),
	"scholarship_amount" numeric(10, 2) DEFAULT '0',
	"scholarship_reason" varchar(200),
	"fine_amount" numeric(10, 2) DEFAULT '0',
	"fine_reason" varchar(200),
	"net_amount" numeric(10, 2) NOT NULL,
	"paid_amount" numeric(10, 2) DEFAULT '0',
	"balance_amount" numeric(10, 2) NOT NULL,
	"status" "fee_payment_status" DEFAULT 'pending',
	"due_date" date,
	"installment_number" integer DEFAULT 1,
	"total_installments" integer DEFAULT 1,
	"is_reminder_sent" boolean DEFAULT false,
	"reminder_sent_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "students" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid NOT NULL,
	"branch_id" uuid,
	"student_id" varchar(50) NOT NULL,
	"admission_number" varchar(50),
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"gender" "gender",
	"date_of_birth" date,
	"blood_group" varchar(5),
	"photo_url" varchar(500),
	"address" text,
	"city" varchar(100),
	"state" varchar(100),
	"pincode" varchar(10),
	"aadhaar_number" varchar(14),
	"udise_number" varchar(20),
	"previous_school" varchar(200),
	"previous_class" varchar(50),
	"admission_date" date,
	"medical_info" text,
	"emergency_contact_name" varchar(200),
	"emergency_contact_phone" varchar(20),
	"emergency_contact_relation" varchar(50),
	"custom_fields" jsonb DEFAULT '{}'::jsonb,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "study_materials" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid NOT NULL,
	"batch_id" uuid NOT NULL,
	"subject_id" uuid NOT NULL,
	"teacher_id" uuid NOT NULL,
	"title" varchar(300) NOT NULL,
	"description" text,
	"file_url" varchar(500) NOT NULL,
	"file_name" varchar(300) NOT NULL,
	"file_size" integer,
	"file_type" varchar(100),
	"is_downloadable" boolean DEFAULT true,
	"publish_at" timestamp with time zone DEFAULT now(),
	"expire_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "subjects" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid NOT NULL,
	"course_id" uuid,
	"code" varchar(20) NOT NULL,
	"name" varchar(200) NOT NULL,
	"description" text,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid NOT NULL,
	"plan" "subscription_plan" DEFAULT 'free',
	"status" "subscription_status" DEFAULT 'trial',
	"billing_cycle" varchar(20) DEFAULT 'monthly',
	"amount" numeric(10, 2) DEFAULT '0',
	"currency" varchar(3) DEFAULT 'INR',
	"trial_ends_at" timestamp with time zone,
	"current_period_start" timestamp with time zone DEFAULT now(),
	"current_period_end" timestamp with time zone,
	"cancelled_at" timestamp with time zone,
	"cancel_at_period_end" boolean DEFAULT false,
	"features" jsonb DEFAULT '{}'::jsonb,
	"limits" jsonb DEFAULT '{}'::jsonb,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "subscriptions_organisation_id_unique" UNIQUE("organisation_id")
);
--> statement-breakpoint
CREATE TABLE "timetables" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid NOT NULL,
	"branch_id" uuid,
	"batch_id" uuid NOT NULL,
	"subject_id" uuid NOT NULL,
	"teacher_id" uuid NOT NULL,
	"day_of_week" integer NOT NULL,
	"start_time" time NOT NULL,
	"end_time" time NOT NULL,
	"room" varchar(50),
	"effective_from" date NOT NULL,
	"effective_to" date,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organisation_id" uuid,
	"branch_id" uuid,
	"email" varchar(255) NOT NULL,
	"username" varchar(100) NOT NULL,
	"password_hash" varchar(255),
	"google_id" varchar(100),
	"google_email" varchar(255),
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"phone" varchar(20),
	"gender" "gender",
	"date_of_birth" date,
	"avatar_url" varchar(500),
	"role" "user_role" DEFAULT 'parent' NOT NULL,
	"custom_role_id" uuid,
	"is_active" boolean DEFAULT true,
	"is_verified" boolean DEFAULT false,
	"mfa_enabled" boolean DEFAULT false,
	"mfa_secret" varchar(100),
	"mfa_backup_codes" jsonb DEFAULT '[]'::jsonb,
	"last_login_at" timestamp with time zone,
	"last_login_ip" varchar(45),
	"failed_login_attempts" integer DEFAULT 0,
	"locked_until" timestamp with time zone,
	"password_reset_token" varchar(255),
	"password_reset_expires" timestamp with time zone,
	"email_verification_token" varchar(255),
	"email_verification_expires" timestamp with time zone,
	"theme" varchar(10) DEFAULT 'system',
	"language" varchar(10) DEFAULT 'en',
	"timezone" varchar(50) DEFAULT 'Asia/Kolkata',
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "academic_years" ADD CONSTRAINT "academic_years_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_usage" ADD CONSTRAINT "ai_usage_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ai_usage" ADD CONSTRAINT "ai_usage_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "announcements" ADD CONSTRAINT "announcements_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "announcements" ADD CONSTRAINT "announcements_published_by_users_id_fk" FOREIGN KEY ("published_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attendance_records" ADD CONSTRAINT "attendance_records_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attendance_records" ADD CONSTRAINT "attendance_records_register_id_attendance_registers_id_fk" FOREIGN KEY ("register_id") REFERENCES "public"."attendance_registers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attendance_records" ADD CONSTRAINT "attendance_records_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attendance_records" ADD CONSTRAINT "attendance_records_recorded_by_users_id_fk" FOREIGN KEY ("recorded_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attendance_registers" ADD CONSTRAINT "attendance_registers_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attendance_registers" ADD CONSTRAINT "attendance_registers_batch_id_batches_id_fk" FOREIGN KEY ("batch_id") REFERENCES "public"."batches"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attendance_registers" ADD CONSTRAINT "attendance_registers_teacher_id_users_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attendance_registers" ADD CONSTRAINT "attendance_registers_finalised_by_users_id_fk" FOREIGN KEY ("finalised_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "batches" ADD CONSTRAINT "batches_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "batches" ADD CONSTRAINT "batches_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "batches" ADD CONSTRAINT "batches_academic_year_id_academic_years_id_fk" FOREIGN KEY ("academic_year_id") REFERENCES "public"."academic_years"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "batches" ADD CONSTRAINT "batches_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "batches" ADD CONSTRAINT "batches_teacher_id_users_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "branches" ADD CONSTRAINT "branches_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "calendar_events" ADD CONSTRAINT "calendar_events_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "calendar_events" ADD CONSTRAINT "calendar_events_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "calendar_events" ADD CONSTRAINT "calendar_events_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_academic_year_id_academic_years_id_fk" FOREIGN KEY ("academic_year_id") REFERENCES "public"."academic_years"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "custom_roles" ADD CONSTRAINT "custom_roles_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_parent_id_parents_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."parents"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_uploaded_by_users_id_fk" FOREIGN KEY ("uploaded_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_verified_by_users_id_fk" FOREIGN KEY ("verified_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "examination_subjects" ADD CONSTRAINT "examination_subjects_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "examination_subjects" ADD CONSTRAINT "examination_subjects_examination_id_examinations_id_fk" FOREIGN KEY ("examination_id") REFERENCES "public"."examinations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "examination_subjects" ADD CONSTRAINT "examination_subjects_subject_id_subjects_id_fk" FOREIGN KEY ("subject_id") REFERENCES "public"."subjects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "examination_subjects" ADD CONSTRAINT "examination_subjects_batch_id_batches_id_fk" FOREIGN KEY ("batch_id") REFERENCES "public"."batches"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "examination_subjects" ADD CONSTRAINT "examination_subjects_invigilator_id_users_id_fk" FOREIGN KEY ("invigilator_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "examinations" ADD CONSTRAINT "examinations_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "examinations" ADD CONSTRAINT "examinations_academic_year_id_academic_years_id_fk" FOREIGN KEY ("academic_year_id") REFERENCES "public"."academic_years"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fee_structures" ADD CONSTRAINT "fee_structures_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fee_structures" ADD CONSTRAINT "fee_structures_academic_year_id_academic_years_id_fk" FOREIGN KEY ("academic_year_id") REFERENCES "public"."academic_years"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fee_structures" ADD CONSTRAINT "fee_structures_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "fee_structures" ADD CONSTRAINT "fee_structures_batch_id_batches_id_fk" FOREIGN KEY ("batch_id") REFERENCES "public"."batches"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "homework" ADD CONSTRAINT "homework_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "homework" ADD CONSTRAINT "homework_batch_id_batches_id_fk" FOREIGN KEY ("batch_id") REFERENCES "public"."batches"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "homework" ADD CONSTRAINT "homework_subject_id_subjects_id_fk" FOREIGN KEY ("subject_id") REFERENCES "public"."subjects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "homework" ADD CONSTRAINT "homework_teacher_id_users_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leave_requests" ADD CONSTRAINT "leave_requests_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leave_requests" ADD CONSTRAINT "leave_requests_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leave_requests" ADD CONSTRAINT "leave_requests_parent_id_parents_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."parents"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "leave_requests" ADD CONSTRAINT "leave_requests_approved_by_users_id_fk" FOREIGN KEY ("approved_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "marks" ADD CONSTRAINT "marks_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "marks" ADD CONSTRAINT "marks_examination_subject_id_examination_subjects_id_fk" FOREIGN KEY ("examination_subject_id") REFERENCES "public"."examination_subjects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "marks" ADD CONSTRAINT "marks_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "marks" ADD CONSTRAINT "marks_entered_by_users_id_fk" FOREIGN KEY ("entered_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "marks" ADD CONSTRAINT "marks_verified_by_users_id_fk" FOREIGN KEY ("verified_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_approvals" ADD CONSTRAINT "message_approvals_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_approvals" ADD CONSTRAINT "message_approvals_message_id_messages_id_fk" FOREIGN KEY ("message_id") REFERENCES "public"."messages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_approvals" ADD CONSTRAINT "message_approvals_requested_by_users_id_fk" FOREIGN KEY ("requested_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_approvals" ADD CONSTRAINT "message_approvals_approver_id_users_id_fk" FOREIGN KEY ("approver_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_recipients" ADD CONSTRAINT "message_recipients_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_recipients" ADD CONSTRAINT "message_recipients_message_id_messages_id_fk" FOREIGN KEY ("message_id") REFERENCES "public"."messages"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_recipients" ADD CONSTRAINT "message_recipients_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_recipients" ADD CONSTRAINT "message_recipients_parent_id_parents_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."parents"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_templates" ADD CONSTRAINT "message_templates_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message_templates" ADD CONSTRAINT "message_templates_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_template_id_message_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."message_templates"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_sender_id_users_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_approved_by_users_id_fk" FOREIGN KEY ("approved_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parent_student_links" ADD CONSTRAINT "parent_student_links_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parent_student_links" ADD CONSTRAINT "parent_student_links_parent_id_parents_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."parents"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parent_student_links" ADD CONSTRAINT "parent_student_links_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parents" ADD CONSTRAINT "parents_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "parents" ADD CONSTRAINT "parents_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_student_fee_id_student_fees_id_fk" FOREIGN KEY ("student_fee_id") REFERENCES "public"."student_fees"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_received_by_users_id_fk" FOREIGN KEY ("received_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "payments" ADD CONSTRAINT "payments_refunded_by_users_id_fk" FOREIGN KEY ("refunded_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "receipts" ADD CONSTRAINT "receipts_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "receipts" ADD CONSTRAINT "receipts_payment_id_payments_id_fk" FOREIGN KEY ("payment_id") REFERENCES "public"."payments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "receipts" ADD CONSTRAINT "receipts_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "receipts" ADD CONSTRAINT "receipts_issued_by_users_id_fk" FOREIGN KEY ("issued_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "receipts" ADD CONSTRAINT "receipts_voided_by_users_id_fk" FOREIGN KEY ("voided_by") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_enrollments" ADD CONSTRAINT "student_enrollments_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_enrollments" ADD CONSTRAINT "student_enrollments_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_enrollments" ADD CONSTRAINT "student_enrollments_batch_id_batches_id_fk" FOREIGN KEY ("batch_id") REFERENCES "public"."batches"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_enrollments" ADD CONSTRAINT "student_enrollments_academic_year_id_academic_years_id_fk" FOREIGN KEY ("academic_year_id") REFERENCES "public"."academic_years"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_fees" ADD CONSTRAINT "student_fees_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_fees" ADD CONSTRAINT "student_fees_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_fees" ADD CONSTRAINT "student_fees_fee_structure_id_fee_structures_id_fk" FOREIGN KEY ("fee_structure_id") REFERENCES "public"."fee_structures"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_fees" ADD CONSTRAINT "student_fees_academic_year_id_academic_years_id_fk" FOREIGN KEY ("academic_year_id") REFERENCES "public"."academic_years"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "study_materials" ADD CONSTRAINT "study_materials_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "study_materials" ADD CONSTRAINT "study_materials_batch_id_batches_id_fk" FOREIGN KEY ("batch_id") REFERENCES "public"."batches"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "study_materials" ADD CONSTRAINT "study_materials_subject_id_subjects_id_fk" FOREIGN KEY ("subject_id") REFERENCES "public"."subjects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "study_materials" ADD CONSTRAINT "study_materials_teacher_id_users_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subjects" ADD CONSTRAINT "subjects_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subjects" ADD CONSTRAINT "subjects_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "timetables" ADD CONSTRAINT "timetables_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "timetables" ADD CONSTRAINT "timetables_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "timetables" ADD CONSTRAINT "timetables_batch_id_batches_id_fk" FOREIGN KEY ("batch_id") REFERENCES "public"."batches"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "timetables" ADD CONSTRAINT "timetables_subject_id_subjects_id_fk" FOREIGN KEY ("subject_id") REFERENCES "public"."subjects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "timetables" ADD CONSTRAINT "timetables_teacher_id_users_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_organisation_id_organisations_id_fk" FOREIGN KEY ("organisation_id") REFERENCES "public"."organisations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_branch_id_branches_id_fk" FOREIGN KEY ("branch_id") REFERENCES "public"."branches"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "academic_years_org_code_unique" ON "academic_years" USING btree ("organisation_id","code");--> statement-breakpoint
CREATE INDEX "academic_years_org_idx" ON "academic_years" USING btree ("organisation_id");--> statement-breakpoint
CREATE INDEX "academic_years_current_idx" ON "academic_years" USING btree ("is_current");--> statement-breakpoint
CREATE INDEX "ai_usage_org_idx" ON "ai_usage" USING btree ("organisation_id");--> statement-breakpoint
CREATE INDEX "ai_usage_user_idx" ON "ai_usage" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "ai_usage_type_idx" ON "ai_usage" USING btree ("type");--> statement-breakpoint
CREATE INDEX "ai_usage_created_idx" ON "ai_usage" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "announcements_org_idx" ON "announcements" USING btree ("organisation_id");--> statement-breakpoint
CREATE INDEX "announcements_published_idx" ON "announcements" USING btree ("is_published");--> statement-breakpoint
CREATE INDEX "announcements_publish_at_idx" ON "announcements" USING btree ("publish_at");--> statement-breakpoint
CREATE UNIQUE INDEX "attendance_records_unique" ON "attendance_records" USING btree ("register_id","student_id");--> statement-breakpoint
CREATE INDEX "attendance_records_register_idx" ON "attendance_records" USING btree ("register_id");--> statement-breakpoint
CREATE INDEX "attendance_records_student_idx" ON "attendance_records" USING btree ("student_id");--> statement-breakpoint
CREATE INDEX "attendance_records_org_idx" ON "attendance_records" USING btree ("organisation_id");--> statement-breakpoint
CREATE UNIQUE INDEX "attendance_registers_unique" ON "attendance_registers" USING btree ("batch_id","date");--> statement-breakpoint
CREATE INDEX "attendance_registers_batch_idx" ON "attendance_registers" USING btree ("batch_id");--> statement-breakpoint
CREATE INDEX "attendance_registers_teacher_idx" ON "attendance_registers" USING btree ("teacher_id");--> statement-breakpoint
CREATE INDEX "attendance_registers_date_idx" ON "attendance_registers" USING btree ("date");--> statement-breakpoint
CREATE INDEX "attendance_registers_status_idx" ON "attendance_registers" USING btree ("status");--> statement-breakpoint
CREATE INDEX "attendance_registers_org_idx" ON "attendance_registers" USING btree ("organisation_id");--> statement-breakpoint
CREATE INDEX "audit_logs_org_idx" ON "audit_logs" USING btree ("organisation_id");--> statement-breakpoint
CREATE INDEX "audit_logs_user_idx" ON "audit_logs" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "audit_logs_action_idx" ON "audit_logs" USING btree ("action");--> statement-breakpoint
CREATE INDEX "audit_logs_entity_idx" ON "audit_logs" USING btree ("entity_type","entity_id");--> statement-breakpoint
CREATE INDEX "audit_logs_created_idx" ON "audit_logs" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "batches_org_course_code_unique" ON "batches" USING btree ("organisation_id","course_id","code");--> statement-breakpoint
CREATE INDEX "batches_org_idx" ON "batches" USING btree ("organisation_id");--> statement-breakpoint
CREATE INDEX "batches_branch_idx" ON "batches" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "batches_teacher_idx" ON "batches" USING btree ("teacher_id");--> statement-breakpoint
CREATE INDEX "batches_year_idx" ON "batches" USING btree ("academic_year_id");--> statement-breakpoint
CREATE UNIQUE INDEX "branches_org_code_unique" ON "branches" USING btree ("organisation_id","code");--> statement-breakpoint
CREATE INDEX "branches_org_idx" ON "branches" USING btree ("organisation_id");--> statement-breakpoint
CREATE INDEX "branches_active_idx" ON "branches" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "calendar_events_org_idx" ON "calendar_events" USING btree ("organisation_id");--> statement-breakpoint
CREATE INDEX "calendar_events_date_idx" ON "calendar_events" USING btree ("start_date","end_date");--> statement-breakpoint
CREATE INDEX "calendar_events_type_idx" ON "calendar_events" USING btree ("type");--> statement-breakpoint
CREATE UNIQUE INDEX "courses_org_year_code_unique" ON "courses" USING btree ("organisation_id","academic_year_id","code");--> statement-breakpoint
CREATE INDEX "courses_org_idx" ON "courses" USING btree ("organisation_id");--> statement-breakpoint
CREATE INDEX "courses_year_idx" ON "courses" USING btree ("academic_year_id");--> statement-breakpoint
CREATE UNIQUE INDEX "custom_roles_org_name_unique" ON "custom_roles" USING btree ("organisation_id","name");--> statement-breakpoint
CREATE INDEX "custom_roles_org_idx" ON "custom_roles" USING btree ("organisation_id");--> statement-breakpoint
CREATE INDEX "documents_student_idx" ON "documents" USING btree ("student_id");--> statement-breakpoint
CREATE INDEX "documents_parent_idx" ON "documents" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "documents_user_idx" ON "documents" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "documents_type_idx" ON "documents" USING btree ("type");--> statement-breakpoint
CREATE INDEX "documents_org_idx" ON "documents" USING btree ("organisation_id");--> statement-breakpoint
CREATE UNIQUE INDEX "examination_subjects_unique" ON "examination_subjects" USING btree ("examination_id","subject_id","batch_id");--> statement-breakpoint
CREATE INDEX "examination_subjects_exam_idx" ON "examination_subjects" USING btree ("examination_id");--> statement-breakpoint
CREATE INDEX "examination_subjects_batch_idx" ON "examination_subjects" USING btree ("batch_id");--> statement-breakpoint
CREATE INDEX "examination_subjects_org_idx" ON "examination_subjects" USING btree ("organisation_id");--> statement-breakpoint
CREATE UNIQUE INDEX "examinations_org_year_code_unique" ON "examinations" USING btree ("organisation_id","academic_year_id","code");--> statement-breakpoint
CREATE INDEX "examinations_org_idx" ON "examinations" USING btree ("organisation_id");--> statement-breakpoint
CREATE INDEX "examinations_year_idx" ON "examinations" USING btree ("academic_year_id");--> statement-breakpoint
CREATE INDEX "examinations_status_idx" ON "examinations" USING btree ("status");--> statement-breakpoint
CREATE INDEX "fee_structures_org_idx" ON "fee_structures" USING btree ("organisation_id");--> statement-breakpoint
CREATE INDEX "fee_structures_year_idx" ON "fee_structures" USING btree ("academic_year_id");--> statement-breakpoint
CREATE INDEX "fee_structures_course_idx" ON "fee_structures" USING btree ("course_id");--> statement-breakpoint
CREATE INDEX "fee_structures_batch_idx" ON "fee_structures" USING btree ("batch_id");--> statement-breakpoint
CREATE INDEX "homework_batch_idx" ON "homework" USING btree ("batch_id");--> statement-breakpoint
CREATE INDEX "homework_subject_idx" ON "homework" USING btree ("subject_id");--> statement-breakpoint
CREATE INDEX "homework_teacher_idx" ON "homework" USING btree ("teacher_id");--> statement-breakpoint
CREATE INDEX "homework_due_date_idx" ON "homework" USING btree ("due_date");--> statement-breakpoint
CREATE INDEX "homework_status_idx" ON "homework" USING btree ("status");--> statement-breakpoint
CREATE INDEX "homework_org_idx" ON "homework" USING btree ("organisation_id");--> statement-breakpoint
CREATE INDEX "leave_requests_student_idx" ON "leave_requests" USING btree ("student_id");--> statement-breakpoint
CREATE INDEX "leave_requests_status_idx" ON "leave_requests" USING btree ("status");--> statement-breakpoint
CREATE INDEX "leave_requests_date_idx" ON "leave_requests" USING btree ("start_date","end_date");--> statement-breakpoint
CREATE INDEX "leave_requests_org_idx" ON "leave_requests" USING btree ("organisation_id");--> statement-breakpoint
CREATE UNIQUE INDEX "marks_unique" ON "marks" USING btree ("examination_subject_id","student_id");--> statement-breakpoint
CREATE INDEX "marks_student_idx" ON "marks" USING btree ("student_id");--> statement-breakpoint
CREATE INDEX "marks_exam_subject_idx" ON "marks" USING btree ("examination_subject_id");--> statement-breakpoint
CREATE INDEX "marks_status_idx" ON "marks" USING btree ("status");--> statement-breakpoint
CREATE INDEX "marks_org_idx" ON "marks" USING btree ("organisation_id");--> statement-breakpoint
CREATE INDEX "message_approvals_message_idx" ON "message_approvals" USING btree ("message_id");--> statement-breakpoint
CREATE INDEX "message_approvals_approver_idx" ON "message_approvals" USING btree ("approver_id");--> statement-breakpoint
CREATE INDEX "message_recipients_message_idx" ON "message_recipients" USING btree ("message_id");--> statement-breakpoint
CREATE INDEX "message_recipients_student_idx" ON "message_recipients" USING btree ("student_id");--> statement-breakpoint
CREATE INDEX "message_recipients_parent_idx" ON "message_recipients" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "message_recipients_status_idx" ON "message_recipients" USING btree ("status");--> statement-breakpoint
CREATE INDEX "message_recipients_org_idx" ON "message_recipients" USING btree ("organisation_id");--> statement-breakpoint
CREATE INDEX "message_templates_org_idx" ON "message_templates" USING btree ("organisation_id");--> statement-breakpoint
CREATE INDEX "message_templates_type_idx" ON "message_templates" USING btree ("type");--> statement-breakpoint
CREATE INDEX "messages_org_idx" ON "messages" USING btree ("organisation_id");--> statement-breakpoint
CREATE INDEX "messages_sender_idx" ON "messages" USING btree ("sender_id");--> statement-breakpoint
CREATE INDEX "messages_status_idx" ON "messages" USING btree ("status");--> statement-breakpoint
CREATE INDEX "messages_scheduled_idx" ON "messages" USING btree ("scheduled_at");--> statement-breakpoint
CREATE INDEX "notifications_user_idx" ON "notifications" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "notifications_read_idx" ON "notifications" USING btree ("is_read");--> statement-breakpoint
CREATE INDEX "notifications_created_idx" ON "notifications" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "notifications_org_idx" ON "notifications" USING btree ("organisation_id");--> statement-breakpoint
CREATE INDEX "organisations_code_idx" ON "organisations" USING btree ("code");--> statement-breakpoint
CREATE INDEX "organisations_active_idx" ON "organisations" USING btree ("is_active");--> statement-breakpoint
CREATE UNIQUE INDEX "parent_student_links_unique" ON "parent_student_links" USING btree ("parent_id","student_id");--> statement-breakpoint
CREATE INDEX "parent_student_links_parent_idx" ON "parent_student_links" USING btree ("parent_id");--> statement-breakpoint
CREATE INDEX "parent_student_links_student_idx" ON "parent_student_links" USING btree ("student_id");--> statement-breakpoint
CREATE INDEX "parent_student_links_org_idx" ON "parent_student_links" USING btree ("organisation_id");--> statement-breakpoint
CREATE UNIQUE INDEX "parents_org_parent_id_unique" ON "parents" USING btree ("organisation_id","parent_id");--> statement-breakpoint
CREATE INDEX "parents_org_idx" ON "parents" USING btree ("organisation_id");--> statement-breakpoint
CREATE INDEX "parents_user_idx" ON "parents" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "parents_phone_idx" ON "parents" USING btree ("phone");--> statement-breakpoint
CREATE INDEX "parents_active_idx" ON "parents" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "payments_student_fee_idx" ON "payments" USING btree ("student_fee_id");--> statement-breakpoint
CREATE INDEX "payments_student_idx" ON "payments" USING btree ("student_id");--> statement-breakpoint
CREATE INDEX "payments_receipt_idx" ON "payments" USING btree ("receipt_number");--> statement-breakpoint
CREATE INDEX "payments_paid_at_idx" ON "payments" USING btree ("paid_at");--> statement-breakpoint
CREATE INDEX "payments_org_idx" ON "payments" USING btree ("organisation_id");--> statement-breakpoint
CREATE INDEX "receipts_payment_idx" ON "receipts" USING btree ("payment_id");--> statement-breakpoint
CREATE INDEX "receipts_student_idx" ON "receipts" USING btree ("student_id");--> statement-breakpoint
CREATE INDEX "receipts_number_idx" ON "receipts" USING btree ("receipt_number");--> statement-breakpoint
CREATE INDEX "receipts_org_idx" ON "receipts" USING btree ("organisation_id");--> statement-breakpoint
CREATE UNIQUE INDEX "student_enrollments_unique" ON "student_enrollments" USING btree ("student_id","batch_id","academic_year_id");--> statement-breakpoint
CREATE INDEX "student_enrollments_student_idx" ON "student_enrollments" USING btree ("student_id");--> statement-breakpoint
CREATE INDEX "student_enrollments_batch_idx" ON "student_enrollments" USING btree ("batch_id");--> statement-breakpoint
CREATE INDEX "student_enrollments_org_idx" ON "student_enrollments" USING btree ("organisation_id");--> statement-breakpoint
CREATE INDEX "student_fees_student_idx" ON "student_fees" USING btree ("student_id");--> statement-breakpoint
CREATE INDEX "student_fees_structure_idx" ON "student_fees" USING btree ("fee_structure_id");--> statement-breakpoint
CREATE INDEX "student_fees_status_idx" ON "student_fees" USING btree ("status");--> statement-breakpoint
CREATE INDEX "student_fees_due_date_idx" ON "student_fees" USING btree ("due_date");--> statement-breakpoint
CREATE INDEX "student_fees_org_idx" ON "student_fees" USING btree ("organisation_id");--> statement-breakpoint
CREATE UNIQUE INDEX "students_org_student_id_unique" ON "students" USING btree ("organisation_id","student_id");--> statement-breakpoint
CREATE UNIQUE INDEX "students_org_admission_unique" ON "students" USING btree ("organisation_id","admission_number");--> statement-breakpoint
CREATE INDEX "students_org_idx" ON "students" USING btree ("organisation_id");--> statement-breakpoint
CREATE INDEX "students_branch_idx" ON "students" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "students_active_idx" ON "students" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "students_name_idx" ON "students" USING btree ("first_name","last_name");--> statement-breakpoint
CREATE INDEX "study_materials_batch_idx" ON "study_materials" USING btree ("batch_id");--> statement-breakpoint
CREATE INDEX "study_materials_subject_idx" ON "study_materials" USING btree ("subject_id");--> statement-breakpoint
CREATE INDEX "study_materials_teacher_idx" ON "study_materials" USING btree ("teacher_id");--> statement-breakpoint
CREATE INDEX "study_materials_publish_idx" ON "study_materials" USING btree ("publish_at");--> statement-breakpoint
CREATE INDEX "study_materials_org_idx" ON "study_materials" USING btree ("organisation_id");--> statement-breakpoint
CREATE UNIQUE INDEX "subjects_org_course_code_unique" ON "subjects" USING btree ("organisation_id","course_id","code");--> statement-breakpoint
CREATE INDEX "subjects_org_idx" ON "subjects" USING btree ("organisation_id");--> statement-breakpoint
CREATE INDEX "subjects_course_idx" ON "subjects" USING btree ("course_id");--> statement-breakpoint
CREATE INDEX "subscriptions_org_idx" ON "subscriptions" USING btree ("organisation_id");--> statement-breakpoint
CREATE INDEX "subscriptions_status_idx" ON "subscriptions" USING btree ("status");--> statement-breakpoint
CREATE INDEX "timetables_batch_idx" ON "timetables" USING btree ("batch_id");--> statement-breakpoint
CREATE INDEX "timetables_teacher_idx" ON "timetables" USING btree ("teacher_id");--> statement-breakpoint
CREATE INDEX "timetables_day_idx" ON "timetables" USING btree ("day_of_week");--> statement-breakpoint
CREATE INDEX "timetables_org_idx" ON "timetables" USING btree ("organisation_id");--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_unique" ON "users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "users_username_unique" ON "users" USING btree ("username");--> statement-breakpoint
CREATE UNIQUE INDEX "users_google_id_unique" ON "users" USING btree ("google_id");--> statement-breakpoint
CREATE INDEX "users_org_idx" ON "users" USING btree ("organisation_id");--> statement-breakpoint
CREATE INDEX "users_branch_idx" ON "users" USING btree ("branch_id");--> statement-breakpoint
CREATE INDEX "users_role_idx" ON "users" USING btree ("role");--> statement-breakpoint
CREATE INDEX "users_active_idx" ON "users" USING btree ("is_active");