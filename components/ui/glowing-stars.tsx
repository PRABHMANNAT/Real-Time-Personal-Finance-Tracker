"use client"

import { useEffect, useRef } from "react"

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  pulse: number
  pulseSpeed: number
}

export function GlowingStars() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    const initStars = () => {
      starsRef.current = []
      const starCount = Math.floor((canvas.width * canvas.height) / 8000)

      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.3,
          pulse: 0,
          pulseSpeed: Math.random() * 0.02 + 0.01,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      starsRef.current.forEach((star) => {
        // Update pulse
        star.pulse += star.pulseSpeed
        if (star.pulse > Math.PI * 2) {
          star.pulse = 0
        }

        const pulseFactor = Math.sin(star.pulse) * 0.2 + 0.8

        // Draw star with glow
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size * pulseFactor, 0, Math.PI * 2)

        // Create gradient for glow effect
        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 4)

        // Randomly choose color
        const colorIndex = Math.floor(star.x % 3)
        let color

        if (colorIndex === 0) {
          color = `rgba(59, 130, 246, ${star.opacity * pulseFactor})`
        } else if (colorIndex === 1) {
          color = `rgba(139, 92, 246, ${star.opacity * pulseFactor})`
        } else {
          color = `rgba(34, 211, 238, ${star.opacity * pulseFactor})`
        }

        gradient.addColorStop(0, color)
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = gradient
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}

