"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  LayoutDashboard,
  Users,
  Calendar,
  BookOpen,
  ClipboardList,
  DollarSign,
  Bell,
  Settings,
  LogOut,
  User,
  Building2,
  BarChart3,
  MessageSquare,
  FileText,
  GraduationCap,
  Home,
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  navigation?: NavigationItem[];
  userRole: string;
  userName: string;
  userAvatar?: string;
  organisationName?: string;
  organisationCode?: string;
}

interface NavigationItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string | number;
}

const roleNavigation: Record<string, NavigationItem[]> = {
  owner: [
    { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Students", href: "/dashboard/students", icon: <Users className="h-5 w-5" /> },
    { label: "Staff", href: "/dashboard/staff", icon: <User className="h-5 w-5" /> },
    { label: "Attendance", href: "/dashboard/attendance", icon: <Calendar className="h-5 w-5" /> },
    { label: "Fees", href: "/dashboard/fees", icon: <DollarSign className="h-5 w-5" /> },
    { label: "Exams", href: "/dashboard/exams", icon: <ClipboardList className="h-5 w-5" /> },
    { label: "Timetable", href: "/dashboard/timetable", icon: <BookOpen className="h-5 w-5" /> },
    { label: "Announcements", href: "/dashboard/announcements", icon: <Bell className="h-5 w-5" /> },
    { label: "Reports", href: "/dashboard/reports", icon: <BarChart3 className="h-5 w-5" /> },
    { label: "Settings", href: "/dashboard/settings", icon: <Settings className="h-5 w-5" /> },
  ],
  admin: [
    { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Students", href: "/dashboard/students", icon: <Users className="h-5 w-5" /> },
    { label: "Parents", href: "/dashboard/parents", icon: <Users className="h-5 w-5" /> },
    { label: "Teachers", href: "/dashboard/teachers", icon: <User className="h-5 w-5" /> },
    { label: "Attendance", href: "/dashboard/attendance", icon: <Calendar className="h-5 w-5" /> },
    { label: "Fees", href: "/dashboard/fees", icon: <DollarSign className="h-5 w-5" /> },
    { label: "Timetable", href: "/dashboard/timetable", icon: <BookOpen className="h-5 w-5" /> },
    { label: "Communication", href: "/dashboard/communication", icon: <MessageSquare className="h-5 w-5" /> },
    { label: "Reports", href: "/dashboard/reports", icon: <BarChart3 className="h-5 w-5" /> },
    { label: "Settings", href: "/dashboard/settings", icon: <Settings className="h-5 w-5" /> },
  ],
  principal: [
    { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Students", href: "/dashboard/students", icon: <Users className="h-5 w-5" /> },
    { label: "Staff", href: "/dashboard/staff", icon: <User className="h-5 w-5" /> },
    { label: "Attendance", href: "/dashboard/attendance", icon: <Calendar className="h-5 w-5" /> },
    { label: "Fees", href: "/dashboard/fees", icon: <DollarSign className="h-5 w-5" /> },
    { label: "Exams", href: "/dashboard/exams", icon: <ClipboardList className="h-5 w-5" /> },
    { label: "Reports", href: "/dashboard/reports", icon: <BarChart3 className="h-5 w-5" /> },
    { label: "Settings", href: "/dashboard/settings", icon: <Settings className="h-5 w-5" /> },
  ],
  manager: [
    { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Students", href: "/dashboard/students", icon: <Users className="h-5 w-5" /> },
    { label: "Attendance", href: "/dashboard/attendance", icon: <Calendar className="h-5 w-5" /> },
    { label: "Homework", href: "/dashboard/homework", icon: <BookOpen className="h-5 w-5" /> },
    { label: "Exams", href: "/dashboard/exams", icon: <ClipboardList className="h-5 w-5" /> },
    { label: "Reports", href: "/dashboard/reports", icon: <BarChart3 className="h-5 w-5" /> },
    { label: "Communication", href: "/dashboard/communication", icon: <MessageSquare className="h-5 w-5" /> },
  ],
  teacher: [
    { label: "Dashboard", href: "/teacher", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "My Batches", href: "/teacher/batches", icon: <Users className="h-5 w-5" /> },
    { label: "Attendance", href: "/teacher/attendance", icon: <Calendar className="h-5 w-5" /> },
    { label: "Homework", href: "/teacher/homework", icon: <BookOpen className="h-5 w-5" /> },
    { label: "Exams & Marks", href: "/teacher/exams", icon: <ClipboardList className="h-5 w-5" /> },
    { label: "Materials", href: "/teacher/materials", icon: <FileText className="h-5 w-5" /> },
    { label: "Timetable", href: "/teacher/timetable", icon: <BookOpen className="h-5 w-5" /> },
    { label: "Parent Queries", href: "/teacher/queries", icon: <MessageSquare className="h-5 w-5" /> },
  ],
  parent: [
    { label: "Dashboard", href: "/parent", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "My Children", href: "/parent/children", icon: <Users className="h-5 w-5" /> },
    { label: "Attendance", href: "/parent/attendance", icon: <Calendar className="h-5 w-5" /> },
    { label: "Fees", href: "/parent/fees", icon: <DollarSign className="h-5 w-5" /> },
    { label: "Results", href: "/parent/results", icon: <ClipboardList className="h-5 w-5" /> },
    { label: "Timetable", href: "/parent/timetable", icon: <BookOpen className="h-5 w-5" /> },
    { label: "Homework", href: "/parent/homework", icon: <BookOpen className="h-5 w-5" /> },
    { label: "Materials", href: "/parent/materials", icon: <FileText className="h-5 w-5" /> },
    { label: "Messages", href: "/parent/messages", icon: <MessageSquare className="h-5 w-5" /> },
  ],
  accountant: [
    { label: "Dashboard", href: "/accountant", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Fee Records", href: "/accountant/fees", icon: <DollarSign className="h-5 w-5" /> },
    { label: "Payments", href: "/accountant/payments", icon: <DollarSign className="h-5 w-5" /> },
    { label: "Outstanding", href: "/accountant/outstanding", icon: <DollarSign className="h-5 w-5" /> },
    { label: "Receipts", href: "/accountant/receipts", icon: <FileText className="h-5 w-5" /> },
    { label: "Reports", href: "/accountant/reports", icon: <BarChart3 className="h-5 w-5" /> },
  ],
  receptionist: [
    { label: "Dashboard", href: "/receptionist", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Student Directory", href: "/receptionist/students", icon: <Users className="h-5 w-5" /> },
    { label: "Parent Contacts", href: "/receptionist/parents", icon: <Users className="h-5 w-5" /> },
    { label: "Enquiries", href: "/receptionist/enquiries", icon: <MessageSquare className="h-5 w-5" /> },
    { label: "Attendance", href: "/receptionist/attendance", icon: <Calendar className="h-5 w-5" /> },
    { label: "Announcements", href: "/receptionist/announcements", icon: <Bell className="h-5 w-5" /> },
  ],
  super_admin: [
    { label: "Dashboard", href: "/super-admin", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Organisations", href: "/super-admin/organisations", icon: <Building2 className="h-5 w-5" /> },
    { label: "Users", href: "/super-admin/users", icon: <Users className="h-5 w-5" /> },
    { label: "Subscriptions", href: "/super-admin/subscriptions", icon: <DollarSign className="h-5 w-5" /> },
    { label: "Platform Analytics", href: "/super-admin/analytics", icon: <BarChart3 className="h-5 w-5" /> },
    { label: "System Settings", href: "/super-admin/settings", icon: <Settings className="h-5 w-5" /> },
  ],
};

export function DashboardLayout({
  children,
  navigation: customNavigation,
  userRole,
  userName,
  userAvatar,
  organisationName,
  organisationCode,
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = customNavigation || roleNavigation[userRole] || roleNavigation.owner;

  const handleSignOut = () => {
    signOut({ callbackUrl: "/login" });
  };

  const getThemeIcon = (theme: string) => {
    switch (theme) {
      case "dark": return <Moon className="h-4 w-4" />;
      case "light": return <Sun className="h-4 w-4" />;
      default: return <Monitor className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="flex h-16 items-center justify-between px-4">
          {/* Left: Logo + Mobile Menu */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <Link href="/" className="flex items-center gap-2 font-brand text-xl text-primary">
              <span className="font-bold">EduMan.</span>
            </Link>

            {organisationName && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-lg bg-muted">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium truncate max-w-[200px]">{organisationName}</span>
                {organisationCode && (
                  <span className="font-mono text-xs text-muted-foreground px-2 py-0.5 rounded bg-background">
                    {organisationCode}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Right: Theme + User Menu */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Change theme">
                  {getThemeIcon(session?.user?.theme || "system")}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 h-4 w-4" />
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 h-4 w-4" />
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Monitor className="mr-2 h-4 w-4" />
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9" name={userName} src={userAvatar} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userName}</p>
                    <p className="text-xs text-muted-foreground capitalize">{userRole.replace("_", " ")}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                {userRole === "owner" && (
                  <DropdownMenuItem asChild>
                    <Link href="/select-organisation" className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      Switch Institute
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside
          className={cn(
            "hidden lg:flex lg:flex-col fixed lg:static inset-y-0 left-0 z-30 w-64 border-r bg-card transition-transform duration-200",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <nav className="flex flex-1 p-4 space-y-1 overflow-y-auto" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  pathname === item.href || pathname.startsWith(item.href + "/")
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span className="truncate">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto px-2 py-0.5 text-xs font-medium bg-primary/20 text-primary rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t">
            <p className="text-xs text-muted-foreground text-center">
              EduMan. v0.1.0
            </p>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-40 lg:hidden bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-50 lg:hidden w-64 border-r bg-card transform transition-transform duration-200",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-full flex-col">
            <div className="flex h-16 items-center justify-between px-4 border-b">
              <span className="font-medium">Navigation</span>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    pathname === item.href || pathname.startsWith(item.href + "/")
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex flex-1 flex-col overflow-y-auto lg:ml-64">
          <div className="p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t bg-card">
        <div className="grid grid-cols-4 gap-1 p-1">
          {navigation.slice(0, 4).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-2 py-2 rounded-lg text-xs font-medium transition-colors",
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <span className="h-5 w-5">{item.icon}</span>
              <span className="truncate">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

function setTheme(theme: "light" | "dark" | "system") {
  document.documentElement.classList.remove("light", "dark");
  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    document.documentElement.classList.add(systemTheme);
  } else {
    document.documentElement.classList.add(theme);
  }
  localStorage.setItem("theme", theme);
}