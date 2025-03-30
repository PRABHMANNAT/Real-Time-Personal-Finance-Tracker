"use client"

import type React from "react"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface CardHoverEffectProps extends React.HTMLAttributes<HTMLDivElement> {
  items: {
    title: string
    description: string
    icon: React.ReactNode
    color?: "blue" | "purple" | "cyan"
  }[]
  className?: string
}

export function CardHoverEffect({ items, className, ...props }: CardHoverEffectProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)} {...props}>
      {items.map((item, idx) => {
        // Determine color classes based on the item's color or cycle through colors
        const colorIdx = item.color || (["blue", "purple", "cyan"][idx % 3] as "blue" | "purple" | "cyan")

        const getBgGradient = () => {
          switch (colorIdx) {
            case "blue":
              return "from-blue-600/20 to-blue-600/5"
            case "purple":
              return "from-purple-600/20 to-purple-600/5"
            case "cyan":
              return "from-cyan-500/20 to-cyan-500/5"
            default:
              return "from-blue-600/20 to-blue-600/5"
          }
        }

        const getBorderGlow = () => {
          switch (colorIdx) {
            case "blue":
              return "border-blue-500/50 animate-glow"
            case "purple":
              return "border-purple-500/50 animate-glow-purple"
            case "cyan":
              return "border-cyan-400/50 animate-glow-cyan"
            default:
              return "border-blue-500/50 animate-glow"
          }
        }

        return (
          <div
            key={idx}
            className="relative group block p-6 h-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className={cn(
                "absolute inset-0 bg-gradient-to-r rounded-xl border border-border/50 shadow-md transition-all duration-300 glass-card",
                getBgGradient(),
                hoveredIndex === idx ? `scale-[1.03] ${getBorderGlow()}` : "scale-100",
              )}
            />
            <div className="relative">
              <div
                className={cn(
                  "p-3 inline-block rounded-lg mb-4",
                  colorIdx === "blue"
                    ? "bg-blue-500/20 text-blue-400"
                    : colorIdx === "purple"
                      ? "bg-purple-500/20 text-purple-400"
                      : "bg-cyan-500/20 text-cyan-400",
                )}
              >
                {item.icon}
              </div>
              <h3 className="font-bold text-xl mb-2 font-display">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

