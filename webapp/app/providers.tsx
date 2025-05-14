'use client'

import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/sonner"
import { ReactNode } from "react"
import { AuthProvider } from "@/lib/auth-context"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <AuthProvider>
        {children}
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  )
}