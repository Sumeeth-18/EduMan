"use client";

import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, BookOpen, ClipboardList, FileText, MessageSquare, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const teacherStats = [
  {
    title: "My Batches",
    value: "0",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    href: "/teacher/batches",
  },
  {
    title: "Today's Classes",
    value: "0",
    icon: Calendar,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    href: "/teacher/timetable",
  },
  {
    title: "Pending Attendance",
    value: "0",
    icon: Calendar,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    href: "/teacher/attendance",
  },
  {
    title: "Homework to Review",
    value: "0",
    icon: BookOpen,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    href: "/teacher/homework",
  },
  {
    title: "Marks to Enter",
    value: "0",
    icon: ClipboardList,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    href: "/teacher/exams",
  },
  {
    title: "Parent Queries",
    value: "0",
    icon: MessageSquare,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    href: "/teacher/queries",
  },
];

const quickActions = [
  { label: "Mark Attendance", href: "/teacher/attendance/new", icon: Calendar, color: "bg-green-500" },
  { label: "Create Homework", href: "/teacher/homework/new", icon: BookOpen, color: "bg-blue-500" },
  { label: "Enter Marks", href: "/teacher/exams/marks", icon: ClipboardList, color: "bg-amber-500" },
  { label: "Upload Material", href: "/teacher/materials/new", icon: FileText, color: "bg-purple-500" },
  { label: "Reply to Queries", href: "/teacher/queries", icon: MessageSquare, color: "bg-indigo-500" },
  { label: "View Timetable", href: "/teacher/timetable", icon: Calendar, color: "bg-gray-500" },
];

export default function TeacherDashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Good morning, {session?.user?.firstName}!</h1>
          <p className="text-muted-foreground mt-1">
            Your teaching dashboard for {session?.user?.organisationName || "your institute"}.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/teacher/attendance/new">Mark Attendance</Link>
          </Button>
          <Button asChild>
            <Link href="/teacher/homework/new">Create Homework</Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {teacherStats.map((stat) => (
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

      {/* Today's Schedule & Alerts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Today's Schedule */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Today's Schedule</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link href="/teacher/timetable">View Full</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-center text-muted-foreground py-8">No classes scheduled for today</p>
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Important</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 p-2 rounded-full bg-blue-500/20">
                    <AlertTriangle className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">Complete Your Profile</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Add your qualifications, subjects, and contact details.
                    </p>
                  </div>
                  <Button asChild variant="ghost" size="sm" className="text-blue-500 hover:bg-blue-500/10">
                    <Link href="/profile">Update</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}