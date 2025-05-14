"use client";

import { ReactNode, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  LayoutDashboard,
  Package,
  Truck,
  Users,
  AlertCircle,
  BarChart3,
  MessageCircle,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Check authentication
    if (!isLoading && !user) {
      router.push("/auth/login");
    }
  }, [isLoading, user, router]);

  const handleLogout = () => {
    window.location.href = "/";
  };

  // Don't render anything until we check auth
  if (!isMounted || isLoading) {
    return <LoadingState />;
  }

  // If no user, don't render the dashboard (will redirect in the effect)
  if (!user) {
    return null;
  }

  const role = user.role;

  // Navigation links based on user role
  const navigationLinks = [
    {
      name: "Dashboard",
      href: `/dashboard/${role}`,
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
  ];

  // Add role-specific navigation links
  if (role === "farmer") {
    navigationLinks.push(
      {
        name: "My Listings",
        href: "/dashboard/farmer/listings",
        icon: <Package className="h-5 w-5" />,
      },
      {
        name: "Orders",
        href: "/dashboard/farmer/orders",
        icon: <Package className="h-5 w-5" />,
      },
      {
        name: "Buyer Requests",
        href: "/dashboard/farmer/requests",
        icon: <Users className="h-5 w-5" />,
      },
      {
        name: "PHL Risk Advisory",
        href: "/dashboard/farmer/phl-risk",
        icon: <AlertCircle className="h-5 w-5" />,
      }
    );
  } else if (role === "buyer") {
    navigationLinks.push(
      {
        name: "My Requests",
        href: "/dashboard/buyer/requests",
        icon: <Package className="h-5 w-5" />,
      },
      {
        name: "Orders",
        href: "/dashboard/buyer/orders",
        icon: <Package className="h-5 w-5" />,
      },
      {
        name: "Browse Listings",
        href: "/dashboard/buyer/listings",
        icon: <Users className="h-5 w-5" />,
      },
      {
        name: "Market Insights",
        href: "/dashboard/buyer/insights",
        icon: <BarChart3 className="h-5 w-5" />,
      }
    );
  } else if (role === "logistics") {
    navigationLinks.push(
      {
        name: "Available Jobs",
        href: "/dashboard/logistics/jobs",
        icon: <Truck className="h-5 w-5" />,
      },
      {
        name: "My Deliveries",
        href: "/dashboard/logistics/deliveries",
        icon: <Truck className="h-5 w-5" />,
      },
      {
        name: "Earnings",
        href: "/dashboard/logistics/earnings",
        icon: <BarChart3 className="h-5 w-5" />,
      }
    );
  }

  // Shared navigation links for all roles
  navigationLinks.push(
    {
      name: "Messages",
      href: `/dashboard/${role}/messages`,
      icon: <MessageCircle className="h-5 w-5" />,
    },
    {
      name: "Settings",
      href: `/dashboard/${role}/settings`,
      icon: <Settings className="h-5 w-5" />,
    }
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Sidebar Trigger */}
      <div className="md:hidden fixed top-4 left-4 z-40">
        <Sheet open={isSidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <nav className="flex flex-col h-full py-6 px-4">
              <div className="flex-1">
                {navigationLinks.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.name} href={item.href}>
                      <div
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium",
                          isActive
                            ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                            : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50"
                        )}
                      >
                        <span
                          className={cn(
                            isActive
                              ? "text-green-600 dark:text-green-400"
                              : "text-gray-500 dark:text-gray-400"
                          )}
                        >
                          {item.icon}
                        </span>
                        {item.name}
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex fixed inset-y-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <nav className="flex flex-col h-full py-6 px-4">
          <div className="flex-1">
            {navigationLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <div
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium",
                      isActive
                        ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                        : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50"
                    )}
                  >
                    <span
                      className={cn(
                        isActive
                          ? "text-green-600 dark:text-green-400"
                          : "text-gray-500 dark:text-gray-400"
                      )}
                    >
                      {item.icon}
                    </span>
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <main className="md:pl-64">
        <DashboardHeader user={user} />
        <div className="py-6 px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Skeleton sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 px-4 h-16 border-b border-gray-200 dark:border-gray-700">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-6 w-24" />
          </div>

          <div className="flex-1 py-6 overflow-y-auto">
            <nav className="px-2 space-y-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full rounded-md" />
              ))}
            </nav>
          </div>

          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
            <Skeleton className="h-10 w-full mt-4" />
          </div>
        </div>
      </aside>

      {/* Main content skeleton */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="h-16 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 flex items-center justify-between">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-64 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-lg" />
            ))}
          </div>
          <Skeleton className="h-96 w-full rounded-lg" />
        </main>
      </div>
    </div>
  );
}
