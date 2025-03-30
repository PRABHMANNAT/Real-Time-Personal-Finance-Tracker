"use client"

import { useRef, useEffect, useState } from "react"

interface WheelSegment {
  value: number
  label: string
  color: string
  probability: number
}

interface SpinWheelProps {
  segments: WheelSegment[]
  isSpinning: boolean
  onSpinEnd: (value: number) => void
}

export function SpinWheel({ segments, isSpinning, onSpinEnd }: SpinWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [rotation, setRotation] = useState(0)
  const [finalRotation, setFinalRotation] = useState(0)
  const [selectedSegment, setSelectedSegment] = useState<WheelSegment | null>(null)
  const animationRef = useRef<number | null>(null)
  const spinStartTimeRef = useRef<number | null>(null)
  const spinDurationRef = useRef(5000) // 5 seconds spin duration

  // Draw the wheel
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const size = Math.min(window.innerWidth * 0.8, 500)
    canvas.width = size
    canvas.height = size

    // Calculate segment angles
    const totalSegments = segments.length
    const arcAngle = (2 * Math.PI) / totalSegments

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw wheel segments
    segments.forEach((segment, i) => {
      const startAngle = i * arcAngle + rotation
      const endAngle = (i + 1) * arcAngle + rotation

      // Draw segment
      ctx.beginPath()
      ctx.moveTo(canvas.width / 2, canvas.height / 2)
      ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2 - 10, startAngle, endAngle)
      ctx.closePath()
      ctx.fillStyle = segment.color
      ctx.fill()
      ctx.strokeStyle = "rgba(255, 255, 255, 0.3)"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw segment text
      ctx.save()
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.rotate(startAngle + arcAngle / 2)
      ctx.textAlign = "right"
      ctx.fillStyle = "white"
      ctx.font = "bold 20px var(--font-sans)"
      ctx.shadowColor = "rgba(0, 0, 0, 0.5)"
      ctx.shadowBlur = 5
      ctx.fillText(segment.label, canvas.width / 2 - 30, 8)
      ctx.restore()
    })

    // Draw center circle
    ctx.beginPath()
    ctx.arc(canvas.width / 2, canvas.height / 2, 20, 0, 2 * Math.PI)
    ctx.fillStyle = "#1f2937"
    ctx.fill()
    ctx.strokeStyle = "rgba(255, 255, 255, 0.5)"
    ctx.lineWidth = 3
    ctx.stroke()

    // Draw pointer
    ctx.beginPath()
    ctx.moveTo(canvas.width / 2, 10)
    ctx.lineTo(canvas.width / 2 - 15, 40)
    ctx.lineTo(canvas.width / 2 + 15, 40)
    ctx.closePath()
    ctx.fillStyle = "#ef4444"
    ctx.fill()
    ctx.strokeStyle = "white"
    ctx.lineWidth = 2
    ctx.stroke()
  }, [segments, rotation])

  // Handle spinning animation
  useEffect(() => {
    if (isSpinning && !animationRef.current) {
      // Determine the winning segment based on probabilities
      const randomValue = Math.random()
      let cumulativeProbability = 0
      let winningSegment: WheelSegment | null = null

      for (const segment of segments) {
        cumulativeProbability += segment.probability
        if (randomValue <= cumulativeProbability) {
          winningSegment = segment
          break
        }
      }

      // If no segment was selected (shouldn't happen if probabilities sum to 1)
      if (!winningSegment) {
        winningSegment = segments[segments.length - 1]
      }

      setSelectedSegment(winningSegment)

      // Calculate the final rotation to land on the selected segment
      const segmentIndex = segments.findIndex((s) => s.value === winningSegment?.value)
      const segmentAngle = (2 * Math.PI) / segments.length
      const segmentMiddleAngle = segmentIndex * segmentAngle + segmentAngle / 2

      // Add multiple full rotations plus the angle to the selected segment
      // We subtract from 2π because we want the pointer (at top) to point to the segment
      const fullRotations = 5 * 2 * Math.PI // 5 full rotations for dramatic effect
      const targetRotation = fullRotations + (2 * Math.PI - segmentMiddleAngle)

      setFinalRotation(targetRotation)
      spinStartTimeRef.current = performance.now()

      // Start animation
      const animate = (timestamp: number) => {
        if (!spinStartTimeRef.current) {
          spinStartTimeRef.current = timestamp
        }

        const elapsed = timestamp - spinStartTimeRef.current
        const progress = Math.min(elapsed / spinDurationRef.current, 1)

        // Easing function for smooth deceleration
        const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
        const currentRotation = easeOut(progress) * finalRotation

        setRotation(currentRotation)

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate)
        } else {
          // Animation complete
          if (selectedSegment) {
            setTimeout(() => {
              onSpinEnd(selectedSegment.value)
            }, 500)
          }
          animationRef.current = null
          spinStartTimeRef.current = null
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isSpinning, segments, onSpinEnd, selectedSegment])

  return (
    <div className="relative w-full max-w-md mx-auto">
      <canvas
        ref={canvasRef}
        className="w-full h-auto"
        style={{
          filter: "drop-shadow(0 0 10px rgba(139, 92, 246, 0.3))",
        }}
      />

      {/* Glow effect around the wheel */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(139, 92, 246, 0) 70%)",
          zIndex: -1,
        }}
      />
    </div>
  )
}

