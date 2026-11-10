import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export const dynamic = "force-dynamic";

export default async function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const allowedRoles = ["owner", "admin", "principal", "manager"];
  if (!allowedRoles.includes(session.user.role)) {
    redirect(`/${session.user.role}`);
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