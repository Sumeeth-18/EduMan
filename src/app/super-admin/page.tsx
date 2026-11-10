"use client";

import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Users, DollarSign, BarChart3, Settings, Shield, AlertTriangle, TrendingUp, Database } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const superAdminStats = [
  {
    title: "Total Organisations",
    value: "0",
    change: "+0 this month",
    icon: Building2,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    href: "/super-admin/organisations",
  },
  {
    title: "Active Users",
    value: "0",
    change: "+0 this week",
    icon: Users,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    href: "/super-admin/users",
  },
  {
    title: "Monthly Revenue",
    value: "₹0",
    change: "+0% vs last month",
    icon: DollarSign,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    href: "/super-admin/subscriptions",
  },
  {
    title: "Platform Health",
    value: "99.9%",
    change: "0 incidents",
    icon: Shield,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    href: "/super-admin/analytics",
  },
  {
    title: "Storage Used",
    value: "0 GB",
    change: "0% of limit",
    icon: Database,
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    href: "/super-admin/analytics",
  },
  {
    title: "API Requests/Day",
    value: "0",
    change: "0 errors",
    icon: TrendingUp,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    href: "/super-admin/analytics",
  },
];

const quickActions = [
  { label: "New Organisation", href: "/super-admin/organisations/new", icon: Building2, color: "bg-blue-500" },
  { label: "Manage Users", href: "/super-admin/users", icon: Users, color: "bg-green-500" },
  { label: "Subscriptions", href: "/super-admin/subscriptions", icon: DollarSign, color: "bg-amber-500" },
  { label: "Platform Analytics", href: "/super-admin/analytics", icon: BarChart3, color: "bg-purple-500" },
  { label: "System Settings", href: "/super-admin/settings", icon: Settings, color: "bg-indigo-500" },
  { label: "Security Audit", href: "/super-admin/security", icon: Shield, color: "bg-red-500" },
];

export default function SuperAdminDashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Platform Administration</h1>
          <p className="text-muted-foreground mt-1">
            System-wide management and monitoring for EduMan.
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/super-admin/organisations/new">New Organisation</Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {superAdminStats.map((stat) => (
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

      {/* Platform Alerts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">System Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 p-2 rounded-full bg-green-500/20">
                    <Shield className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">All Systems Operational</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      No active incidents or degraded performance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Pending Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 p-2 rounded-full bg-blue-500/20">
                    <AlertTriangle className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">Plan Upgrade Requests</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      0 organisations awaiting plan upgrade approval.
                    </p>
                  </div>
                  <Button asChild variant="ghost" size="sm" className="text-blue-500 hover:bg-blue-500/10">
                    <Link href="/super-admin/subscriptions">Review</Link>
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