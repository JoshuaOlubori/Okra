"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/logo";
// import { useTheme } from "next-themes";

export function LandingHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  // const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 dark:bg-gray-950/90 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* <Logo
            className="h-14 w-14"
            logoType={isScrolled ? theme === "dark" : true}
          /> */}
           <Logo
            className="h-14 w-14"
            logoType={isScrolled}
          />
          {/* <span className="font-bold text-lg">Okra</span> */}
        </div>

        <div className="hidden md:flex items-center gap-8">
          <nav>
            <ul className="flex items-center gap-6">
              {[
                { name: "Features", href: "#features" },
                { name: "How It Works", href: "#how-it-works" },
                { name: "About", href: "#about" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={cn(
                      "font-medium transition-colors",
                      isScrolled
                        ? "text-foreground hover:text-green-700 dark:hover:text-green-300"
                        : "text-primary-foreground hover:text-white/80"
                    )}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant={isScrolled ? "outline" : "secondary"}>
                Log In
              </Button>
            </Link>
            {/* <Link href="/auth/register">
              <Button
                variant={isScrolled ? "default" : "secondary"}
                className={
                  !isScrolled ? "bg-white text-primary hover:bg-white/90" : ""
                }
              >
                Sign Up
              </Button>
            </Link> */}
          </div>
        </div>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button size="icon" variant="ghost">
              <Menu
                className={cn(
                  isScrolled ? "text-foreground" : "text-primary-foreground"
                )}
              />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="container">
            <div className="flex flex-col gap-8 mt-8">
              <nav>
                <ul className="flex flex-col gap-4">
                  {[
                    { name: "Features", href: "#features" },
                    { name: "How It Works", href: "#how-it-works" },
                    { name: "About", href: "#about" },
                  ].map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="font-medium text-foreground hover:text-green-700 dark:hover:text-green-300 text-lg"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="flex flex-col gap-4">
                <Link href="/auth/login">
                  <Button variant="outline" className="w-full">
                    Log In
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
