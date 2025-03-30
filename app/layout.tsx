import type React from "react"
import type { Metadata } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"
import { SidebarNav } from "@/components/sidebar-nav"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { GlowingStars } from "@/components/ui/glowing-stars"
import { FloatingParticles } from "@/components/ui/floating-particles"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
})

export const metadata: Metadata = {
  title: "FinNova - AI-Powered Finance OS",
  description: "A futuristic AI-powered finance OS with real-time tracking, AI-driven insights, and gamification",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-background min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="fixed inset-0 cyber-dots opacity-30 z-0"></div>
          <GlowingStars />
          <FloatingParticles />

          <SidebarProvider>
            <div className="flex min-h-screen relative z-10">
              <SidebarNav />
              <main className="flex-1 p-6 md:p-8 pt-16 overflow-y-auto">
                <div className="absolute top-4 left-4 z-50 md:hidden">
                  <SidebarTrigger />
                </div>
                {children}
              </main>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'