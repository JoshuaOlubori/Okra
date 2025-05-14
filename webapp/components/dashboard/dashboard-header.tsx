"use client";

import { useState, useEffect } from "react";
import { BellIcon, Search, Sun, Moon } from "lucide-react";
import { User } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

interface DashboardHeaderProps {
  user: User;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Ensure theme is client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 h-16 flex items-center justify-between">
        <div className="flex-1 min-w-0 flex md:hidden items-center">
          <span className="text-lg font-semibold truncate">
            {getUserGreeting(user)}
          </span>
        </div>

        <div className="hidden md:flex md:flex-1 md:items-center">
          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 bg-gray-50 dark:bg-gray-700"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <BellIcon className="h-5 w-5" />
                {user.dashboardData.messages.unread > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 transform translate-x-1 -translate-y-1" />
                )}
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-4 font-medium border-b border-gray-200 dark:border-gray-700">
                Notifications
              </div>
              <div className="py-2">
                <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                  No new notifications
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="hidden md:flex md:items-center md:justify-end">
            <span className="text-sm font-medium text-gray-900 dark:text-white mr-2">
              {user.name}
            </span>
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-green-100 text-green-700">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}

function getUserGreeting(user: User): string {
  const hour = new Date().getHours();
  let greeting = "Good ";

  if (hour < 12) {
    greeting += "morning";
  } else if (hour < 18) {
    greeting += "afternoon";
  } else {
    greeting += "evening";
  }

  return `${greeting}, ${user.name.split(" ")[0]}`;
}
