"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Activity, BarChart3, CreditCard, DollarSign, Gift, Home, LineChart, Lock, Shield, Users } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"

const navItems = [
  { name: "Home", href: "/", icon: Home, color: "blue" },
  { name: "Dashboard", href: "/dashboard", icon: Activity, color: "cyan" },
  { name: "Transactions", href: "/transactions", icon: DollarSign, color: "purple" },
  { name: "Quantum Vault", href: "/quantum-vault", icon: Lock, color: "blue" },
  { name: "Future-Lens", href: "/future-lens", icon: LineChart, color: "cyan" },
  { name: "HyperCard", href: "/hyper-card", icon: CreditCard, color: "purple" },
  { name: "HoloTrade", href: "/holo-trade", icon: BarChart3, color: "blue" },
  { name: "SquadFunds", href: "/squad-funds", icon: Users, color: "cyan" },
  { name: "Spin & Win", href: "/spin-and-win", icon: Gift, color: "purple" },
  { name: "Security", href: "/security", icon: Shield, color: "blue" },
]

export function SidebarNav() {
  const pathname = usePathname()

  return (
    <Sidebar variant="floating" className="border-none glass">
      <SidebarHeader className="flex flex-col items-center justify-center py-6">
        <AnimatedGradientBorder containerClassName="w-12 h-12 rounded-full" variant="multi">
          <div className="flex items-center justify-center w-full h-full rounded-full bg-background">
            <span className="text-white font-bold text-xl font-display">F</span>
          </div>
        </AnimatedGradientBorder>
        <span className="mt-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 font-display">
          FinNova
        </span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const colorClass =
              item.color === "blue"
                ? "text-blue-400 bg-blue-500/20"
                : item.color === "purple"
                  ? "text-purple-400 bg-purple-500/20"
                  : "text-cyan-400 bg-cyan-500/20"

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.name}
                  className={isActive ? `neon-border-${item.color}` : ""}
                >
                  <Link href={item.href} className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-md mr-3 ${isActive ? colorClass : ""}`}
                    >
                      <item.icon className={`h-5 w-5 ${isActive ? "" : "text-muted-foreground"}`} />
                    </div>
                    <span className={`font-medium ${isActive ? `text-${item.color}-400` : ""}`}>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-border/30">
        <div className="p-4">
          <AnimatedGradientBorder variant="multi" className="p-2">
            <div className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=b6e3f4"
                  alt="User"
                />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400">
                  UN
                </AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium">User Name</p>
                <p className="text-xs text-muted-foreground">user@example.com</p>
              </div>
            </div>
          </AnimatedGradientBorder>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

