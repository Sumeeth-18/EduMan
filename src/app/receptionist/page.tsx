"use client";

import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, Calendar, Bell, Search, UserPlus, Phone, Mail } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const receptionistStats = [
  {
    title: "Total Students",
    value: "0",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    href: "/receptionist/students",
  },
  {
    title: "Active Enquiries",
    value: "0",
    icon: MessageSquare,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    href: "/receptionist/enquiries",
  },
  {
    title: "Today's Appointments",
    value: "0",
    icon: Calendar,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    href: "/receptionist/attendance",
  },
  {
    title: "Announcements",
    value: "0",
    icon: Bell,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    href: "/receptionist/announcements",
  },
];

const quickActions = [
  { label: "New Student", href: "/receptionist/students/new", icon: UserPlus, color: "bg-blue-500" },
  { label: "New Enquiry", href: "/receptionist/enquiries/new", icon: MessageSquare, color: "bg-green-500" },
  { label: "Search Student", href: "/receptionist/students", icon: Search, color: "bg-amber-500" },
  { label: "View Contacts", href: "/receptionist/parents", icon: Users, color: "bg-purple-500" },
  { label: "Attendance", href: "/receptionist/attendance", icon: Calendar, color: "bg-indigo-500" },
  { label: "Announcements", href: "/receptionist/announcements", icon: Bell, color: "bg-red-500" },
];

export default function ReceptionistDashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome, {session?.user?.firstName}!</h1>
          <p className="text-muted-foreground mt-1">
            Front desk dashboard for {session?.user?.organisationName || "your institute"}.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/receptionist/students/new">New Student</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/receptionist/enquiries/new">New Enquiry</Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {receptionistStats.map((stat) => (
          <Link key={stat.title} href={stat.href} className="block">
            <Card className="hover:shadow-card-hover transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                  </div>
                  <div className={cn("p-3 rounded-xl", stat.bgColor)}>
                    <stat.icon className={cn("h-6 w-6", stat.color)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {quickActions.map((action) => (
            <Link key={action.label} href={action.href}>
              <Card className="hover:shadow-card-hover transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div className={cn("mx-auto mb-3 p-3 rounded-xl", action.color)}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm font-medium text-foreground">{action.label}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Enquiries */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Recent Enquiries</CardTitle>
          <Button asChild variant="ghost" size="sm">
            <Link href="/receptionist/enquiries">View All</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-center text-muted-foreground py-8">No recent enquiries</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}