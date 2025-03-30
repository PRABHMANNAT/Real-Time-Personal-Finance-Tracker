import type React from "react"
import { cn } from "@/lib/utils"

interface AnimatedGradientBorderProps {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  gradientClassName?: string
  variant?: "blue" | "purple" | "cyan" | "multi"
}

export function AnimatedGradientBorder({
  children,
  className,
  containerClassName,
  gradientClassName,
  variant = "multi",
}: AnimatedGradientBorderProps) {
  const getGradient = () => {
    switch (variant) {
      case "blue":
        return "from-blue-500 via-blue-600 to-blue-500"
      case "purple":
        return "from-purple-500 via-purple-600 to-purple-500"
      case "cyan":
        return "from-cyan-400 via-cyan-500 to-cyan-400"
      case "multi":
      default:
        return "from-blue-500 via-purple-600 to-cyan-400"
    }
  }

  return (
    <div className={cn("relative p-[2px] rounded-xl overflow-hidden group", containerClassName)}>
      <div className={cn("absolute inset-0 bg-gradient-to-r animate-pulse-slow", getGradient(), gradientClassName)} />
      <div className={cn("relative bg-background rounded-xl h-full", className)}>{children}</div>
    </div>
  )
}

