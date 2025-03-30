"use client"

import { useState, useEffect, useRef } from "react"
import {
  Award,
  Brain,
  Calendar,
  ChevronRight,
  Clock,
  CreditCard,
  Gift,
  History,
  Info,
  Sparkles,
  Star,
  Trophy,
  Zap,
  VolumeX,
  Volume2,
  Mic,
  Lightbulb,
  TrendingUp,
} from "lucide-react"
import confetti from "canvas-confetti"
import { motion, AnimatePresence } from "framer-motion"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"
import { SpinWheel } from "@/components/spin-wheel"
import { AIAssistantPopup } from "@/components/ai-assistant-popup"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function SpinAndWinPage() {
  const [points, setPoints] = useState(1250)
  const [spinsLeft, setSpinsLeft] = useState(3)
  const [lastWin, setLastWin] = useState<number | null>(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const [showWinModal, setShowWinModal] = useState(false)
  const [activeTab, setActiveTab] = useState("spin")
  const [nextRefreshTime, setNextRefreshTime] = useState<Date>(new Date(Date.now() + 4 * 60 * 60 * 1000)) // 4 hours from now
  const [timeLeft, setTimeLeft] = useState("")
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showAIAssistant, setShowAIAssistant] = useState(false)
  const [aiSuggestion, setAiSuggestion] = useState("")
  const [showAIInsight, setShowAIInsight] = useState(false)
  const [streakDays, setStreakDays] = useState(3)
  const [showVoiceCommand, setShowVoiceCommand] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Wheel segments - points values and probabilities
  const wheelSegments = [
    { value: 50, label: "50", color: "#3B82F6", probability: 0.25 },
    { value: 100, label: "100", color: "#8B5CF6", probability: 0.2 },
    { value: 25, label: "25", color: "#22D3EE", probability: 0.3 },
    { value: 200, label: "200", color: "#F59E0B", probability: 0.1 },
    { value: 75, label: "75", color: "#10B981", probability: 0.1 },
    { value: 500, label: "500", color: "#EC4899", probability: 0.03 },
    { value: 10, label: "10", color: "#6B7280", probability: 0.01 },
    { value: 1000, label: "1000", color: "#EF4444", probability: 0.01 },
  ]

  // Redemption options (in INR)
  const redemptionOptions = [
    {
      points: 5000,
      cashValue: "₹400",
      description: "Basic Cash Reward",
      icon: <CreditCard className="h-5 w-5" />,
      method: "UPI Transfer",
    },
    {
      points: 10000,
      cashValue: "₹900",
      description: "Silver Cash Reward",
      icon: <Award className="h-5 w-5" />,
      method: "Bank Transfer",
    },
    {
      points: 25000,
      cashValue: "₹2,500",
      description: "Gold Cash Reward",
      icon: <Trophy className="h-5 w-5" />,
      method: "Paytm/PhonePe",
    },
    {
      points: 50000,
      cashValue: "₹5,500",
      description: "Platinum Cash Reward",
      icon: <Star className="h-5 w-5" />,
      method: "Any Method",
    },
  ]

  // Recent winners (mock data)
  const recentWinners = [
    { username: "RajeshT", points: 1000, date: "Today", city: "Mumbai" },
    { username: "PriyaS", points: 500, date: "Today", city: "Delhi" },
    { username: "AmitK", points: 200, date: "Yesterday", city: "Bangalore" },
    { username: "SunitaR", points: 1000, date: "Yesterday", city: "Chennai" },
    { username: "VikasM", points: 500, date: "2 days ago", city: "Hyderabad" },
  ]

  // Spin history (mock data)
  const spinHistory = [
    { points: 100, date: "Today, 10:45 AM", aiInsight: "Morning spins tend to be luckier for you!" },
    { points: 50, date: "Today, 09:30 AM", aiInsight: null },
    { points: 25, date: "Yesterday, 2:15 PM", aiInsight: null },
    { points: 200, date: "Yesterday, 11:20 AM", aiInsight: "You've won 200+ points 3 times this week!" },
    { points: 75, date: "3 days ago, 4:45 PM", aiInsight: null },
  ]

  // AI insights
  const aiInsights = [
    "Your spinning pattern shows you're luckier on weekdays!",
    "Based on your history, spinning between 6-8 PM gives better results.",
    "You've maintained a 3-day streak! Keep it up for bonus points tomorrow.",
    "Your redemption strategy is efficient - you're maximizing value per point.",
    "Try spinning right after daily market updates for potentially better odds.",
  ]

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio("/sounds/win-sound.mp3")

    // Generate AI suggestion
    const randomInsight = aiInsights[Math.floor(Math.random() * aiInsights.length)]
    setAiSuggestion(randomInsight)

    // Show AI insight after a delay
    const timer = setTimeout(() => {
      setShowAIInsight(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // Update countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const diff = nextRefreshTime.getTime() - now.getTime()

      if (diff <= 0) {
        setSpinsLeft(3)
        setNextRefreshTime(new Date(Date.now() + 4 * 60 * 60 * 1000))
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        setTimeLeft(
          `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
        )
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [nextRefreshTime])

  // Handle spin result
  const handleSpinResult = (value: number) => {
    setLastWin(value)
    setPoints((prev) => prev + value)
    setSpinsLeft((prev) => prev - 1)
    setIsSpinning(false)
    setShowWinModal(true)

    // Play sound if enabled
    if (soundEnabled && audioRef.current) {
      audioRef.current.play().catch((e) => console.error("Audio play failed:", e))
    }

    // Trigger confetti
    if (confettiCanvasRef.current) {
      const canvas = confettiCanvasRef.current
      const myConfetti = confetti.create(canvas, {
        resize: true,
        useWorker: true,
      })

      myConfetti({
        particleCount: value >= 500 ? 200 : value >= 100 ? 100 : 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#3B82F6", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"],
      })
    }

    // Show AI insight after win
    setTimeout(() => {
      const shouldShowInsight = Math.random() > 0.5
      if (shouldShowInsight) {
        const newInsight = aiInsights[Math.floor(Math.random() * aiInsights.length)]
        setAiSuggestion(newInsight)
        setShowAIInsight(true)
      }
    }, 2000)
  }

  // Handle spin button click
  const handleSpin = () => {
    if (spinsLeft > 0 && !isSpinning) {
      setIsSpinning(true)
      setShowAIInsight(false)
      // The actual result will be determined by the SpinWheel component
    }
  }

  // Handle redeem button click
  const handleRedeem = (pointsRequired: number) => {
    if (points >= pointsRequired) {
      setPoints((prev) => prev - pointsRequired)
      // In a real app, this would trigger an API call to process the redemption
      alert(`Successfully redeemed ${pointsRequired} points!`)
    }
  }

  // Handle voice command
  const handleVoiceCommand = () => {
    setShowVoiceCommand(true)

    // Simulate voice recognition
    setTimeout(() => {
      if (spinsLeft > 0 && !isSpinning) {
        setShowVoiceCommand(false)
        handleSpin()
      } else {
        setShowVoiceCommand(false)
      }
    }, 2000)
  }

  return (
    <div className="space-y-8 relative">
      {/* Confetti canvas */}
      <canvas
        ref={confettiCanvasRef}
        className="fixed inset-0 pointer-events-none z-50"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Win modal */}
      <AnimatePresence>
        {showWinModal && lastWin && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex items-center justify-center z-40 bg-black/50 backdrop-blur-sm"
          >
            <AnimatedGradientBorder variant="multi" containerClassName="w-full max-w-md">
              <Card className="glass-card w-full">
                <CardHeader className="text-center pb-2">
                  <CardTitle className="text-2xl font-display">Congratulations!</CardTitle>
                  <CardDescription>You've won points!</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-6">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="text-6xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mb-4"
                  >
                    {lastWin}
                  </motion.div>
                  <div className="text-xl text-center mb-6">Points added to your balance</div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Info className="h-4 w-4" />
                    <span className="text-sm">You have {spinsLeft} spins left today</span>
                  </div>

                  {lastWin >= 200 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mb-4 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20"
                    >
                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-purple-400" />
                        <span className="text-sm font-medium text-purple-400">AI Insight</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Only 5% of users win {lastWin}+ points in a single spin! Your luck is exceptional today.
                      </p>
                    </motion.div>
                  )}

                  <Button
                    onClick={() => setShowWinModal(false)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Continue
                  </Button>
                </CardContent>
              </Card>
            </AnimatedGradientBorder>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voice command modal */}
      <AnimatePresence>
        {showVoiceCommand && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-40 bg-black/70 backdrop-blur-md rounded-full px-6 py-3"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <Mic className="h-6 w-6 text-purple-400" />
                <motion.div
                  className="absolute inset-0 rounded-full border border-purple-400"
                  initial={{ scale: 1, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                />
              </div>
              <span className="text-white">Listening... "Spin the wheel"</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Assistant */}
      <AnimatePresence>
        {showAIAssistant && <AIAssistantPopup onClose={() => setShowAIAssistant(false)} />}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight glow-text-purple font-display">Spin & Win</h1>
          <p className="text-muted-foreground">Spin the wheel to earn points and redeem for cash</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-purple-500/30 hover:border-purple-500/50"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                >
                  {soundEnabled ? (
                    <Volume2 className="h-4 w-4 text-purple-400" />
                  ) : (
                    <VolumeX className="h-4 w-4 text-purple-400" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{soundEnabled ? "Disable" : "Enable"} sound effects</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-purple-500/30 hover:border-purple-500/50"
                  onClick={handleVoiceCommand}
                >
                  <Mic className="h-4 w-4 text-purple-400" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Use voice command</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            variant="outline"
            size="sm"
            className="border-purple-500/30 hover:border-purple-500/50"
            onClick={() => setShowAIAssistant(true)}
          >
            <Brain className="mr-2 h-4 w-4 text-purple-400" />
            AI Assistant
          </Button>

          <Button variant="outline" size="sm" className="border-purple-500/30 hover:border-purple-500/50">
            <History className="mr-2 h-4 w-4 text-purple-400" />
            History
          </Button>

          <AnimatedGradientBorder variant="purple">
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
            >
              <Gift className="mr-2 h-4 w-4" />
              Redeem Points
            </Button>
          </AnimatedGradientBorder>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="glass-card neon-border-purple animate-glow-purple md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Your Points</CardTitle>
                <CardDescription>Spin to earn more points</CardDescription>
              </div>
              <motion.div
                className="flex items-center gap-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
              >
                <Sparkles className="h-5 w-5 text-purple-400" />
                <span className="text-2xl font-bold font-display">{points}</span>
              </motion.div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative w-full max-w-md mx-auto">
              <SpinWheel segments={wheelSegments} isSpinning={isSpinning} onSpinEnd={handleSpinResult} />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <AnimatedGradientBorder variant="purple" containerClassName="rounded-full">
                  <Button
                    onClick={handleSpin}
                    disabled={isSpinning || spinsLeft <= 0}
                    className={`h-16 w-16 rounded-full font-bold text-lg ${
                      isSpinning || spinsLeft <= 0
                        ? "bg-gray-700"
                        : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    }`}
                  >
                    {isSpinning ? (
                      <span className="animate-spin">
                        <Zap className="h-6 w-6" />
                      </span>
                    ) : (
                      "SPIN"
                    )}
                  </Button>
                </AnimatedGradientBorder>
              </div>
            </div>

            <div className="mt-8 w-full">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-purple-400" />
                  <span className="text-sm font-medium">Daily Spins Left</span>
                </div>
                <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                  {spinsLeft} / 3
                </Badge>
              </div>
              <Progress
                value={spinsLeft * 33.33}
                className="h-2 bg-muted"
                indicatorClassName="bg-gradient-to-r from-purple-600 to-pink-600"
              />

              {spinsLeft === 0 && (
                <div className="mt-4 flex items-center justify-between p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-purple-400" />
                    <span className="text-sm">Spins refresh in</span>
                  </div>
                  <span className="font-mono text-sm font-medium">{timeLeft}</span>
                </div>
              )}

              {/* Daily streak */}
              <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-blue-400" />
                    <span className="text-sm font-medium">Daily Streak</span>
                  </div>
                  <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                    {streakDays} days
                  </Badge>
                </div>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <div
                      key={day}
                      className={`flex-1 h-2 rounded-full ${
                        day <= streakDays ? "bg-gradient-to-r from-blue-500 to-purple-500" : "bg-gray-700"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Come back tomorrow to maintain your streak and get a 2x multiplier!
                </p>
              </div>
            </div>

            {/* AI Insight */}
            <AnimatePresence>
              {showAIInsight && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-4 p-4 rounded-lg bg-purple-500/10 border border-purple-500/20 w-full"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-5 w-5 text-purple-400" />
                    <span className="font-medium text-purple-400">AI Insight</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{aiSuggestion}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Leaderboard</CardTitle>
              <CardDescription>Top winners this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentWinners.map((winner, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/20 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-full ${
                          index === 0
                            ? "bg-yellow-500/20 text-yellow-400"
                            : index === 1
                              ? "bg-gray-400/20 text-gray-400"
                              : index === 2
                                ? "bg-amber-600/20 text-amber-600"
                                : "bg-purple-500/20 text-purple-400"
                        }`}
                      >
                        {index < 3 ? <Trophy className="h-4 w-4" /> : <Star className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="font-medium">{winner.username}</p>
                        <p className="text-xs text-muted-foreground">
                          {winner.city} • {winner.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-purple-400" />
                      <span className="font-medium">{winner.points}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-cyan-400" />
                <span>Spin Predictions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Lightbulb className="h-4 w-4 text-cyan-400" />
                    <span className="text-sm font-medium text-cyan-400">Best Time to Spin</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Based on your history, your optimal spin time is between 6-8 PM
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Lightbulb className="h-4 w-4 text-cyan-400" />
                    <span className="text-sm font-medium text-cyan-400">Luck Forecast</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your luck pattern indicates higher chances of winning tomorrow
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="redeem" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="glass">
          <TabsTrigger value="redeem">Redeem Rewards</TabsTrigger>
          <TabsTrigger value="history">Spin History</TabsTrigger>
          <TabsTrigger value="rules">Game Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="redeem" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {redemptionOptions.map((option, index) => (
              <motion.div key={index} whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="glass-card overflow-hidden h-full">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-600"></div>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{option.cashValue}</CardTitle>
                      <div className="p-2 rounded-full bg-purple-500/20 text-purple-400">{option.icon}</div>
                    </div>
                    <CardDescription>{option.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-1 mb-2">
                      <Sparkles className="h-4 w-4 text-purple-400" />
                      <span className="font-medium">{option.points.toLocaleString()} points required</span>
                    </div>
                    <div className="text-xs text-muted-foreground mb-4">Via {option.method}</div>
                    <Button
                      onClick={() => handleRedeem(option.points)}
                      disabled={points < option.points}
                      className={`w-full ${
                        points >= option.points
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                          : "bg-gray-700"
                      }`}
                    >
                      {points >= option.points ? "Redeem Now" : "Not Enough Points"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Special Redemption Offers</CardTitle>
              <CardDescription>Limited time offers with better value</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 rounded-lg bg-gradient-to-br from-purple-900/50 to-pink-900/50 border border-purple-500/30">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-medium text-white">Amazon Gift Card</h3>
                      <p className="text-sm text-purple-200/70">₹1,000 value</p>
                    </div>
                    <Badge className="bg-purple-500/80">20% BONUS</Badge>
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    <Sparkles className="h-4 w-4 text-purple-300" />
                    <span className="text-sm text-purple-100">8,000 points (Usually 10,000)</span>
                  </div>
                  <div className="text-xs text-purple-200/70 mb-4">Offer expires in 2 days</div>
                  <Button
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    disabled={points < 8000}
                  >
                    Redeem Special Offer
                  </Button>
                </div>

                <div className="p-4 rounded-lg bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border border-blue-500/30">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-medium text-white">Paytm Cash</h3>
                      <p className="text-sm text-blue-200/70">₹500 value</p>
                    </div>
                    <Badge className="bg-blue-500/80">INSTANT</Badge>
                  </div>
                  <div className="flex items-center gap-1 mb-3">
                    <Sparkles className="h-4 w-4 text-blue-300" />
                    <span className="text-sm text-blue-100">4,500 points</span>
                  </div>
                  <div className="text-xs text-blue-200/70 mb-4">Transfers within minutes</div>
                  <Button
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                    disabled={points < 4500}
                  >
                    Instant Redeem
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Your Spin History</CardTitle>
              <CardDescription>Recent spins and rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {spinHistory.map((spin, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/20 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-purple-500/20 text-purple-400">
                        <Gift className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">Won {spin.points} points</p>
                        <p className="text-xs text-muted-foreground">{spin.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {spin.aiInsight && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <Brain className="h-4 w-4 text-purple-400" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">{spin.aiInsight}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-5 w-5 text-blue-400" />
                  <span className="font-medium text-blue-400">AI Pattern Analysis</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Based on your spin history, our AI has detected patterns in your rewards:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400"></div>
                    <span>You tend to get higher rewards when spinning in the morning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400"></div>
                    <span>Your average reward is 90 points per spin (15% above average)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400"></div>
                    <span>You've earned a total of 2,450 points from spins this month</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="space-y-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Game Rules</CardTitle>
              <CardDescription>How to play and win</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs">
                      1
                    </div>
                    <span>Daily Spins</span>
                  </h3>
                  <p className="text-muted-foreground pl-8">
                    You get 3 free spins every 4 hours. Use them wisely to maximize your points!
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs">
                      2
                    </div>
                    <span>Earning Points</span>
                  </h3>
                  <p className="text-muted-foreground pl-8">
                    Each spin gives you a chance to win between 10 and 1000 points. The rarer the segment, the more
                    points you win!
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs">
                      3
                    </div>
                    <span>Redeeming Rewards</span>
                  </h3>
                  <p className="text-muted-foreground pl-8">
                    Collect points and redeem them for real cash rewards via UPI, Paytm, or bank transfer. The more
                    points you save, the better the rewards!
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs">
                      4
                    </div>
                    <span>Daily Streak</span>
                  </h3>
                  <p className="text-muted-foreground pl-8">
                    Maintain a daily streak by spinning at least once every day. After 7 consecutive days, you'll
                    receive a 2x multiplier on your next spin!
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 text-xs">
                      5
                    </div>
                    <span>AI Features</span>
                  </h3>
                  <p className="text-muted-foreground pl-8">
                    Our AI analyzes your spin patterns to provide personalized insights and recommendations. Use voice
                    commands for hands-free spinning!
                  </p>
                </div>

                <div className="mt-6 p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <h4 className="font-medium text-purple-400 mb-2 flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    <span>Important Note</span>
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Points earned through Spin & Win can be redeemed for real cash that will be transferred to your UPI
                    ID, Paytm wallet, or bank account. Minimum redemption amount is 5,000 points (₹400). All
                    transactions comply with RBI guidelines.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

