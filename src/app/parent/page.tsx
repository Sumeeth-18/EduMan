"use client";

import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, DollarSign, ClipboardList, BookOpen, FileText, MessageSquare, Award, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const parentStats = [
  {
    title: "My Children",
    value: "0",
    icon: Users,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    href: "/parent/children",
  },
  {
    title: "Attendance This Month",
    value: "0%",
    icon: Calendar,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    href: "/parent/attendance",
  },
  {
    title: "Pending Fees",
    value: "₹0",
    icon: DollarSign,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    href: "/parent/fees",
  },
  {
    title: "Latest Results",
    value: "0",
    icon: ClipboardList,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    href: "/parent/results",
  },
  {
    title: "Homework Due",
    value: "0",
    icon: BookOpen,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    href: "/parent/homework",
  },
  {
    title: "Messages",
    value: "0",
    icon: MessageSquare,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    href: "/parent/messages",
  },
];

export default function ParentDashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome, {session?.user?.firstName}!</h1>
          <p className="text-muted-foreground mt-1">
            Track your children's progress at {session?.user?.organisationName || "your institute"}.
          </p>
        </div>
      </div>

      {/* Children Overview */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">My Children</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Users className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">No children linked to your account yet.</p>
            <p className="text-sm text-muted-foreground mt-1">Contact the institute administration to link your children.</p>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {parentStats.map((stat) => (
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

      {/* Quick Links */}
      <div>
        <CardTitle className="text-lg mb-4">Quick Links</CardTitle>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/parent/attendance" className="block">
            <Card className="hover:shadow-card-hover transition-shadow cursor-pointer p-4 text-center">
              <Calendar className="mx-auto h-8 w-8 text-green-500 mb-2" />
              <p className="text-sm font-medium">Attendance</p>
            </Card>
          </Link>
          <Link href="/parent/fees" className="block">
            <Card className="hover:shadow-card-hover transition-shadow cursor-pointer p-4 text-center">
              <DollarSign className="mx-auto h-8 w-8 text-amber-500 mb-2" />
              <p className="text-sm font-medium">Fee Details</p>
            </Card>
          </Link>
          <Link href="/parent/results" className="block">
            <Card className="hover:shadow-card-hover transition-shadow cursor-pointer p-4 text-center">
              <Award className="mx-auto h-8 w-8 text-purple-500 mb-2" />
              <p className="text-sm font-medium">Exam Results</p>
            </Card>
          </Link>
          <Link href="/parent/timetable" className="block">
            <Card className="hover:shadow-card-hover transition-shadow cursor-pointer p-4 text-center">
              <BookOpen className="mx-auto h-8 w-8 text-blue-500 mb-2" />
              <p className="text-sm font-medium">Timetable</p>
            </Card>
          </Link>
        </div>
      </div>

      {/* Notices */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Latest Notices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-center text-muted-foreground py-8">No recent notices</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}