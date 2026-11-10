"use client";

import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, DollarSign, ClipboardList, TrendingUp, AlertTriangle, Building2, GraduationCap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const statCards = [
  {
    title: "Total Students",
    value: "0",
    change: "+0%",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    href: "/dashboard/students",
  },
  {
    title: "Active Staff",
    value: "0",
    change: "+0%",
    icon: GraduationCap,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    href: "/dashboard/staff",
  },
  {
    title: "Today's Attendance",
    value: "0%",
    change: "0% avg",
    icon: Calendar,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    href: "/dashboard/attendance",
  },
  {
    title: "Fee Collection",
    value: "₹0",
    change: "0% this month",
    icon: DollarSign,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    href: "/dashboard/fees",
  },
  {
    title: "Upcoming Exams",
    value: "0",
    change: "0 this week",
    icon: ClipboardList,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    href: "/dashboard/exams",
  },
  {
    title: "Announcements",
    value: "0",
    change: "0 unread",
    icon: AlertTriangle,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    href: "/dashboard/announcements",
  },
];

const quickActions = [
  { label: "Add Student", href: "/dashboard/students/new", icon: Users, color: "bg-blue-500" },
  { label: "Mark Attendance", href: "/dashboard/attendance/new", icon: Calendar, color: "bg-green-500" },
  { label: "Record Payment", href: "/dashboard/fees/payments/new", icon: DollarSign, color: "bg-amber-500" },
  { label: "Create Announcement", href: "/dashboard/announcements/new", icon: AlertTriangle, color: "bg-purple-500" },
  { label: "Schedule Exam", href: "/dashboard/exams/new", icon: ClipboardList, color: "bg-red-500" },
  { label: "Generate Report", href: "/dashboard/reports", icon: TrendingUp, color: "bg-indigo-500" },
];

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, {session?.user?.firstName}!</h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening at {session?.user?.organisationName || "your institute"} today.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/dashboard/students/new">Add Student</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard/attendance/new">Mark Attendance</Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {statCards.map((stat) => (
          <Link key={stat.title} href={stat.href} className="block">
            <Card className="hover:shadow-card-hover transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    <p className="text-xs text-success mt-1">{stat.change}</p>
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
          <Button asChild variant="ghost" size="sm">
            <Link href="/dashboard">View All</Link>
          </Button>
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

      {/* Recent Activity & Alerts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard/activity">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-center text-muted-foreground py-8">No recent activity</p>
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Notifications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Alerts & Notifications</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard/notifications">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 p-2 rounded-full bg-warning/20">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">Setup Required</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Complete your institute setup to unlock all features.
                    </p>
                  </div>
                  <Button asChild variant="ghost" size="sm" className="text-warning hover:bg-warning/10">
                    <Link href="/dashboard/settings">Configure</Link>
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