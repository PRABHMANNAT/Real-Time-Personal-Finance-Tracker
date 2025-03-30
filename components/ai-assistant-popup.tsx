"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Brain, X, Send, Sparkles, Mic, User, Bot } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface AIAssistantPopupProps {
  onClose: () => void
}

export function AIAssistantPopup({ onClose }: AIAssistantPopupProps) {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    {
      role: "assistant",
      content: "Hello! I'm your FinNova AI Assistant. How can I help you with your finances today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Sample responses for demo purposes
  const sampleResponses = {
    points:
      "You currently have 1,250 points. Based on your spinning patterns, you could reach 5,000 points (₹400 redemption) in approximately 2 weeks if you maintain your daily spins.",
    redeem:
      "You can redeem your points for real cash via UPI, Paytm, or bank transfer. The minimum redemption is 5,000 points for ₹400. Would you like to see all redemption options?",
    streak:
      "You're on a 3-day streak! Keep spinning daily to maintain it. After 7 consecutive days, you'll receive a 2x multiplier on your next spin!",
    strategy:
      "Based on your history, I recommend saving points until you reach at least 10,000 for better value. The ₹900 redemption option gives you the best points-to-rupees ratio.",
    default:
      "I'm here to help with any questions about FinNova's features, your finances, or game strategies. Feel free to ask about points, redemptions, or financial insights!",
  }

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage = { role: "user" as const, content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      let response = sampleResponses.default

      // Simple keyword matching for demo
      const lowercaseInput = input.toLowerCase()
      if (lowercaseInput.includes("point")) {
        response = sampleResponses.points
      } else if (lowercaseInput.includes("redeem") || lowercaseInput.includes("cash")) {
        response = sampleResponses.redeem
      } else if (lowercaseInput.includes("streak")) {
        response = sampleResponses.streak
      } else if (lowercaseInput.includes("strategy") || lowercaseInput.includes("recommend")) {
        response = sampleResponses.strategy
      }

      setMessages((prev) => [...prev, { role: "assistant", content: response }])
      setIsTyping(false)
    }, 1500)
  }

  // Handle voice input
  const handleVoiceInput = () => {
    setIsListening(true)

    // Simulate voice recognition
    setTimeout(() => {
      setIsListening(false)
      setInput("What's the best strategy for redeeming points?")

      // Auto-submit after a brief delay
      setTimeout(() => {
        handleSubmit({ preventDefault: () => {} } as React.FormEvent)
      }, 500)
    }, 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="w-full max-w-md"
      >
        <Card className="glass-card border-purple-500/30">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-400" />
              <span>FinNova AI Assistant</span>
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex gap-2 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div
                      className={`flex items-center justify-center h-8 w-8 rounded-full shrink-0 ${
                        message.role === "user" ? "bg-blue-500/20" : "bg-purple-500/20"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="h-4 w-4 text-blue-400" />
                      ) : (
                        <Bot className="h-4 w-4 text-purple-400" />
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        message.role === "user" ? "bg-blue-500/20 text-blue-50" : "bg-purple-500/20 text-purple-50"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[80%]">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full shrink-0 bg-purple-500/20">
                      <Bot className="h-4 w-4 text-purple-400" />
                    </div>
                    <div className="p-3 rounded-lg bg-purple-500/20 text-purple-50">
                      <div className="flex gap-1">
                        <span className="animate-bounce">•</span>
                        <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
                          •
                        </span>
                        <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
                          •
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-purple-500/20">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about points, redemptions, or strategies..."
                    className="bg-background/50 pr-10"
                  />
                  <AnimatePresence>
                    {isListening && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute inset-0 flex items-center justify-center bg-background/90 rounded-md"
                      >
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <Mic className="h-5 w-5 text-purple-400" />
                            <motion.div
                              className="absolute inset-0 rounded-full border border-purple-400"
                              initial={{ scale: 1, opacity: 1 }}
                              animate={{ scale: 2, opacity: 0 }}
                              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                            />
                          </div>
                          <span>Listening...</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="border-purple-500/30 hover:border-purple-500/50"
                  onClick={handleVoiceInput}
                >
                  <Mic className="h-4 w-4 text-purple-400" />
                </Button>
                <Button type="submit" size="icon" className="bg-purple-600 hover:bg-purple-700">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                <Sparkles className="h-3 w-3 text-purple-400" />
                <span>Powered by FinNova AI - Your personal financial advisor</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

