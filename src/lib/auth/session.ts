import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import { db } from '@/db';
import { users, auditLogs } from '@/db/schema';
import { eq } from 'drizzle-orm';

const SECRET_KEY = new TextEncoder().encode(process.env.AUTH_SECRET!);
const SESSION_COOKIE_NAME = 'eduman-session';

export interface SessionPayload {
  userId: string;
  email: string;
  role: string;
  organisationId: string | null;
  branchId: string | null;
  iat: number;
  exp: number;
}

export async function createSession(payload: Omit<SessionPayload, 'iat' | 'exp'>): Promise<string> {
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(SECRET_KEY);
  return token;
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySession(token);
}

export async function setSessionCookie(token: string, rememberMe = false): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60, // 30 days or 1 day
  });
}

export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function refreshSessionIfNeeded(): Promise<SessionPayload | null> {
  const session = await getSession();
  if (!session) return null;

  const now = Math.floor(Date.now() / 1000);
  const timeUntilExpiry = session.exp - now;

  // Refresh if less than 24 hours remaining
  if (timeUntilExpiry < 24 * 60 * 60) {
    const newToken = await createSession({
      userId: session.userId,
      email: session.email,
      role: session.role,
      organisationId: session.organisationId,
      branchId: session.branchId,
    });
    await setSessionCookie(newToken, true);
    return verifySession(newToken);
  }

  return session;
}

export async function revokeAllUserSessions(userId: string): Promise<void> {
  // In a stateless JWT system, we can't directly revoke other sessions
  // This would require a token blacklist or database-backed sessions
  // For now, we rely on short expiry and password change forcing re-login
}

export interface Permission {
  key: string;
  name: string;
  category: string;
}

export const PERMISSIONS: Permission[] = [
  // Organisation Management
  { key: 'org:read', name: 'View Organisation', category: 'Organisation' },
  { key: 'org:write', name: 'Manage Organisation', category: 'Organisation' },
  { key: 'org:delete', name: 'Delete Organisation', category: 'Organisation' },
  { key: 'org:switch', name: 'Switch Organisation', category: 'Organisation' },

  // User Management
  { key: 'user:read', name: 'View Users', category: 'Users' },
  { key: 'user:write', name: 'Manage Users', category: 'Users' },
  { key: 'user:delete', name: 'Delete Users', category: 'Users' },
  { key: 'user:role:assign', name: 'Assign Roles', category: 'Users' },
  { key: 'user:permission:manage', name: 'Manage Permissions', category: 'Users' },
  { key: 'user:impersonate', name: 'Impersonate User', category: 'Users' },

  // Student Management
  { key: 'student:read', name: 'View Students', category: 'Students' },
  { key: 'student:write', name: 'Manage Students', category: 'Students' },
  { key: 'student:delete', name: 'Delete Students', category: 'Students' },
  { key: 'student:import', name: 'Import Students', category: 'Students' },
  { key: 'student:export', name: 'Export Students', category: 'Students' },
  { key: 'student:documents', name: 'Manage Student Documents', category: 'Students' },

  // Parent Management
  { key: 'parent:read', name: 'View Parents', category: 'Parents' },
  { key: 'parent:write', name: 'Manage Parents', category: 'Parents' },
  { key: 'parent:link', name: 'Link Parents to Students', category: 'Parents' },
  { key: 'parent:credentials', name: 'Send Parent Credentials', category: 'Parents' },

  // Attendance
  { key: 'attendance:read', name: 'View Attendance', category: 'Attendance' },
  { key: 'attendance:write', name: 'Mark Attendance', category: 'Attendance' },
  { key: 'attendance:finalise', name: 'Finalise Registers', category: 'Attendance' },
  { key: 'attendance:reports', name: 'View Attendance Reports', category: 'Attendance' },
  { key: 'attendance:leave:approve', name: 'Approve Leave Requests', category: 'Attendance' },

  // Fee Management
  { key: 'fee:read', name: 'View Fees', category: 'Fees' },
  { key: 'fee:write', name: 'Manage Fee Structures', category: 'Fees' },
  { key: 'fee:payment:record', name: 'Record Payments', category: 'Fees' },
  { key: 'fee:payment:refund', name: 'Refund Payments', category: 'Fees' },
  { key: 'fee:discount', name: 'Apply Discounts/Scholarships', category: 'Fees' },
  { key: 'fee:fine', name: 'Apply Fines', category: 'Fees' },
  { key: 'fee:receipt', name: 'Generate Receipts', category: 'Fees' },
  { key: 'fee:reports', name: 'View Fee Reports', category: 'Fees' },
  { key: 'fee:reminders', name: 'Manage Fee Reminders', category: 'Fees' },

  // Communication
  { key: 'message:read', name: 'View Messages', category: 'Communication' },
  { key: 'message:write', name: 'Send Messages', category: 'Communication' },
  { key: 'message:approve', name: 'Approve Messages', category: 'Communication' },
  { key: 'message:template:manage', name: 'Manage Templates', category: 'Communication' },
  { key: 'announcement:read', name: 'View Announcements', category: 'Communication' },
  { key: 'announcement:write', name: 'Create Announcements', category: 'Communication' },
  { key: 'announcement:publish', name: 'Publish Announcements', category: 'Communication' },

  // Academic
  { key: 'academic:read', name: 'View Academic Data', category: 'Academic' },
  { key: 'academic:write', name: 'Manage Academic Data', category: 'Academic' },
  { key: 'course:manage', name: 'Manage Courses', category: 'Academic' },
  { key: 'subject:manage', name: 'Manage Subjects', category: 'Academic' },
  { key: 'batch:manage', name: 'Manage Batches', category: 'Academic' },
  { key: 'timetable:manage', name: 'Manage Timetables', category: 'Academic' },
  { key: 'calendar:manage', name: 'Manage Calendar', category: 'Academic' },

  // Examinations
  { key: 'exam:read', name: 'View Examinations', category: 'Examinations' },
  { key: 'exam:write', name: 'Manage Examinations', category: 'Examinations' },
  { key: 'exam:marks:enter', name: 'Enter Marks', category: 'Examinations' },
  { key: 'exam:marks:verify', name: 'Verify Marks', category: 'Examinations' },
  { key: 'exam:results:publish', name: 'Publish Results', category: 'Examinations' },
  { key: 'exam:reports', name: 'View Exam Reports', category: 'Examinations' },

  // Homework & Materials
  { key: 'homework:read', name: 'View Homework', category: 'Academic' },
  { key: 'homework:write', name: 'Create Homework', category: 'Academic' },
  { key: 'material:read', name: 'View Study Materials', category: 'Academic' },
  { key: 'material:write', name: 'Upload Study Materials', category: 'Academic' },

  // Staff Management
  { key: 'staff:read', name: 'View Staff', category: 'Staff' },
  { key: 'staff:write', name: 'Manage Staff', category: 'Staff' },
  { key: 'staff:leave:approve', name: 'Approve Staff Leave', category: 'Staff' },

  // Enquiries & Feedback
  { key: 'enquiry:read', name: 'View Enquiries', category: 'Enquiries' },
  { key: 'enquiry:write', name: 'Manage Enquiries', category: 'Enquiries' },
  { key: 'feedback:read', name: 'View Feedback', category: 'Feedback' },
  { key: 'feedback:respond', name: 'Respond to Feedback', category: 'Feedback' },

  // Reports & Analytics
  { key: 'report:read', name: 'View Reports', category: 'Reports' },
  { key: 'report:export', name: 'Export Reports', category: 'Reports' },
  { key: 'analytics:read', name: 'View Analytics', category: 'Reports' },
  { key: 'search:global', name: 'Global Search', category: 'Reports' },

  // AI Assistant
  { key: 'ai:use', name: 'Use AI Assistant', category: 'AI' },
  { key: 'ai:admin', name: 'Manage AI Settings', category: 'AI' },

  // Settings & System
  { key: 'settings:read', name: 'View Settings', category: 'Settings' },
  { key: 'settings:write', name: 'Manage Settings', category: 'Settings' },
  { key: 'audit:read', name: 'View Audit Logs', category: 'System' },
  { key: 'backup:manage', name: 'Manage Backups', category: 'System' },
  { key: 'recyclebin:manage', name: 'Manage Recycle Bin', category: 'System' },

  // Super Admin
  { key: 'superadmin:org:manage', name: 'Manage Organisations', category: 'Super Admin' },
  { key: 'superadmin:user:manage', name: 'Manage All Users', category: 'Super Admin' },
  { key: 'superadmin:plan:manage', name: 'Manage Plans', category: 'Super Admin' },
  { key: 'superadmin:analytics', name: 'Platform Analytics', category: 'Super Admin' },
];

export const ROLE_PERMISSIONS: Record<string, string[]> = {
  super_admin: PERMISSIONS.map(p => p.key),

  owner: [
    'org:read', 'org:write', 'org:switch',
    'user:read', 'user:write', 'user:role:assign', 'user:permission:manage',
    'student:read', 'student:write', 'student:import', 'student:export', 'student:documents',
    'parent:read', 'parent:write', 'parent:link', 'parent:credentials',
    'attendance:read', 'attendance:reports',
    'fee:read', 'fee:write', 'fee:payment:record', 'fee:discount', 'fee:fine', 'fee:receipt', 'fee:reports', 'fee:reminders',
    'message:read', 'message:write', 'message:approve', 'message:template:manage',
    'announcement:read', 'announcement:write', 'announcement:publish',
    'academic:read', 'academic:write', 'course:manage', 'subject:manage', 'batch:manage', 'timetable:manage', 'calendar:manage',
    'exam:read', 'exam:write', 'exam:reports',
    'homework:read', 'homework:write',
    'material:read', 'material:write',
    'staff:read', 'staff:write', 'staff:leave:approve',
    'enquiry:read', 'enquiry:write',
    'feedback:read', 'feedback:respond',
    'report:read', 'report:export', 'analytics:read', 'search:global',
    'ai:use', 'ai:admin',
    'settings:read', 'settings:write',
    'audit:read', 'backup:manage', 'recyclebin:manage',
  ],

  admin: [
    'org:read',
    'user:read', 'user:write', 'user:role:assign',
    'student:read', 'student:write', 'student:import', 'student:export', 'student:documents',
    'parent:read', 'parent:write', 'parent:link', 'parent:credentials',
    'attendance:read', 'attendance:write', 'attendance:finalise', 'attendance:reports', 'attendance:leave:approve',
    'fee:read', 'fee:write', 'fee:payment:record', 'fee:discount', 'fee:fine', 'fee:receipt', 'fee:reports', 'fee:reminders',
    'message:read', 'message:write', 'message:approve', 'message:template:manage',
    'announcement:read', 'announcement:write', 'announcement:publish',
    'academic:read', 'academic:write', 'course:manage', 'subject:manage', 'batch:manage', 'timetable:manage', 'calendar:manage',
    'exam:read', 'exam:write', 'exam:marks:enter', 'exam:marks:verify', 'exam:results:publish', 'exam:reports',
    'homework:read', 'homework:write',
    'material:read', 'material:write',
    'staff:read', 'staff:write', 'staff:leave:approve',
    'enquiry:read', 'enquiry:write',
    'feedback:read', 'feedback:respond',
    'report:read', 'report:export', 'analytics:read', 'search:global',
    'ai:use',
    'settings:read', 'settings:write',
    'audit:read', 'backup:manage', 'recyclebin:manage',
  ],

  principal: [
    'org:read',
    'user:read',
    'student:read', 'student:write',
    'parent:read',
    'attendance:read', 'attendance:reports',
    'fee:read', 'fee:reports',
    'message:read', 'message:write',
    'announcement:read', 'announcement:write',
    'academic:read', 'batch:manage', 'timetable:read', 'calendar:read',
    'exam:read', 'exam:reports',
    'homework:read',
    'material:read',
    'staff:read',
    'enquiry:read',
    'feedback:read', 'feedback:respond',
    'report:read', 'analytics:read', 'search:global',
    'ai:use',
    'settings:read',
  ],

  manager: [
    'org:read',
    'user:read',
    'student:read', 'student:write',
    'parent:read',
    'attendance:read', 'attendance:write', 'attendance:finalise', 'attendance:reports',
    'fee:read', 'fee:payment:record', 'fee:receipt', 'fee:reports',
    'message:read', 'message:write',
    'announcement:read', 'announcement:write',
    'academic:read', 'batch:manage', 'timetable:read', 'calendar:read',
    'exam:read', 'exam:marks:enter', 'exam:reports',
    'homework:read', 'homework:write',
    'material:read', 'material:write',
    'staff:read',
    'enquiry:read', 'enquiry:write',
    'feedback:read', 'feedback:respond',
    'report:read', 'analytics:read', 'search:global',
    'ai:use',
    'settings:read',
  ],

  teacher: [
    'org:read',
    'student:read', // Only assigned students
    'parent:read', // Only linked parents
    'attendance:read', 'attendance:write', 'attendance:finalise', // Only assigned batches
    'fee:read', // Only for reference
    'message:read', 'message:write', // Only to assigned students' parents
    'announcement:read',
    'academic:read', // Only assigned batches
    'exam:read', 'exam:marks:enter', // Only assigned subjects/batches
    'homework:read', 'homework:write', // Only assigned batches
    'material:read', 'material:write', // Only assigned batches
    'report:read', // Only assigned students
    'ai:use',
  ],

  parent: [
    'org:read',
    'student:read', // Only linked children
    'attendance:read', // Only linked children
    'fee:read', // Only linked children
    'message:read', // Only messages to them
    'announcement:read',
    'academic:read', // Only linked children
    'exam:read', // Only linked children
    'homework:read', // Only linked children
    'material:read', // Only linked children
    'feedback:write', // Submit feedback
  ],

  accountant: [
    'org:read',
    'student:read', // For fee reference
    'parent:read', // For contact
    'fee:read', 'fee:write', 'fee:payment:record', 'fee:payment:refund', 'fee:discount', 'fee:fine', 'fee:receipt', 'fee:reports', 'fee:reminders',
    'message:read', 'message:write', // Fee-related only
    'announcement:read',
    'report:read', 'report:export', // Financial reports
    'search:global',
  ],

  receptionist: [
    'org:read',
    'student:read', 'student:write', // Limited
    'parent:read', 'parent:write', // Limited
    'attendance:read',
    'fee:read',
    'message:read', 'message:write', // Enquiry-related
    'announcement:read',
    'enquiry:read', 'enquiry:write',
    'feedback:read',
    'report:read',
    'search:global',
  ],

  custom: [], // Defined per custom role
};

export function hasPermission(userRole: string, customPermissions: string[], permission: string): boolean {
  if (userRole === 'super_admin') return true;
  if (userRole === 'custom') {
    return customPermissions.includes(permission);
  }
  const rolePerms = ROLE_PERMISSIONS[userRole] || [];
  return rolePerms.includes(permission);
}

export function getRolePermissions(role: string, customPermissions: string[] = []): string[] {
  if (role === 'super_admin') return PERMISSIONS.map(p => p.key);
  if (role === 'custom') return customPermissions;
  return ROLE_PERMISSIONS[role] || [];
}

export async function logAudit(
  action: string,
  entityType: string,
  entityId: string | null,
  oldValues: Record<string, unknown> | null,
  newValues: Record<string, unknown> | null,
  metadata: Record<string, unknown> = {}
): Promise<void> {
  try {
    const session = await getSession();
    await db.insert(auditLogs).values({
      organisationId: session?.organisationId || null,
      userId: session?.userId || null,
      action: action as any,
      entityType,
      entityId: entityId ? entityId : null,
      oldValues: oldValues ? JSON.parse(JSON.stringify(oldValues)) : null,
      newValues: newValues ? JSON.parse(JSON.stringify(newValues)) : null,
      metadata: JSON.parse(JSON.stringify(metadata)),
    });
  } catch (error) {
    console.error('Audit log failed:', error);
  }
}