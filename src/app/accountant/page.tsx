"use client";

import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, FileText, TrendingUp, AlertTriangle, CreditCard, Receipt, Users } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const accountantStats = [
  {
    title: "Total Collection",
    value: "₹0",
    change: "+0% this month",
    icon: DollarSign,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    href: "/accountant/fees",
  },
  {
    title: "Outstanding",
    value: "₹0",
    change: "0 students",
    icon: AlertTriangle,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    href: "/accountant/outstanding",
  },
  {
    title: "This Month",
    value: "₹0",
    change: "0 payments",
    icon: CreditCard,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    href: "/accountant/payments",
  },
  {
    title: "Receipts Issued",
    value: "0",
    change: "0 this month",
    icon: Receipt,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    href: "/accountant/receipts",
  },
  {
    title: "Reports Generated",
    value: "0",
    change: "0 this week",
    icon: FileText,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    href: "/accountant/reports",
  },
  {
    title: "Active Students",
    value: "0",
    change: "0 with dues",
    icon: Users,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    href: "/accountant/fees",
  },
];

const quickActions = [
  { label: "Record Payment", href: "/accountant/payments/new", icon: CreditCard, color: "bg-green-500" },
  { label: "Generate Receipt", href: "/accountant/receipts/new", icon: Receipt, color: "bg-blue-500" },
  { label: "View Outstanding", href: "/accountant/outstanding", icon: AlertTriangle, color: "bg-red-500" },
  { label: "Fee Report", href: "/accountant/reports/fees", icon: FileText, color: "bg-purple-500" },
  { label: "Collection Report", href: "/accountant/reports/collection", icon: TrendingUp, color: "bg-indigo-500" },
  { label: "Student Ledger", href: "/accountant/students", icon: Users, color: "bg-amber-500" },
];

export default function AccountantDashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome, {session?.user?.firstName}!</h1>
          <p className="text-muted-foreground mt-1">
            Fee management dashboard for {session?.user?.organisationName || "your institute"}.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/accountant/payments/new">Record Payment</Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {accountantStats.map((stat) => (
          <Link key={stat.title} href={stat.href} className="block">
            <Card className="hover:shadow-card-hover transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
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

      {/* Outstanding Alerts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Outstanding Fees Alert</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 p-2 rounded-full bg-amber-500/20">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">No Outstanding Records</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    All fee records appear to be up to date.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}