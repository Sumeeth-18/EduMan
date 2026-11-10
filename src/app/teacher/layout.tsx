import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export const dynamic = "force-dynamic";

export default async function TeacherLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "teacher" && !["owner", "admin", "principal", "manager", "super_admin"].includes(session.user.role)) {
    redirect("/dashboard");
  }

  return (
    <DashboardLayout
      userRole={session.user.role}
      userName={`${session.user.firstName} ${session.user.lastName}`}
      userAvatar={session.user.image || undefined}
      organisationName={session.user.organisationName}
      organisationCode={session.user.organisationCode}
    >
      {children}
    </DashboardLayout>
  );
}