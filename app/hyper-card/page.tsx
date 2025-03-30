"use client"

import { useState, useRef, useEffect } from "react"
import {
  Bell,
  CreditCard,
  EyeOff,
  Lock,
  Settings,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Brain,
  Zap,
  Scan,
  QrCode,
  Fingerprint,
  ArrowDown,
  Wallet,
  Gift,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function HyperCardPage() {
  const [ghostMode, setGhostMode] = useState(false)
  const [activeTab, setActiveTab] = useState("card")
  const [showVirtualCard, setShowVirtualCard] = useState(false)
  const [cardFlipped, setCardFlipped] = useState(false)
  const [showAIInsights, setShowAIInsights] = useState(false)
  const [cardLimit, setCardLimit] = useState(25000)
  const [spentAmount, setSpentAmount] = useState(12350)
  const [showScanner, setShowScanner] = useState(false)
  const [showFingerprint, setShowFingerprint] = useState(false)
  const [fingerprintVerified, setFingerprintVerified] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Sample transaction data
  const recentTransactions = [
    {
      id: 1,
      name: "Reliance Fresh",
      amount: -1850,
      category: "Groceries",
      date: "Today",
      time: "14:30",
      upiId: "reliancefresh@sbi",
    },
    { id: 2, name: "Chai Point", amount: -120, category: "Food", date: "Today", time: "09:15", upiId: "chaipoint@ybl" },
    {
      id: 3,
      name: "Ola Cabs",
      amount: -350,
      category: "Transport",
      date: "Yesterday",
      time: "18:45",
      upiId: "olacabs@paytm",
    },
    {
      id: 4,
      name: "Amazon.in",
      amount: -2499,
      category: "Shopping",
      date: "Mar 15",
      time: "20:30",
      upiId: "amazon@axis",
    },
    {
      id: 5,
      name: "Taj Restaurant",
      amount: -1275,
      category: "Food",
      date: "Mar 14",
      time: "19:45",
      upiId: "tajrestaurant@icici",
    },
  ]

  // Sample spending limits
  const spendingLimits = [
    { category: "Food & Dining", limit: 6000, spent: 4500, color: "blue" },
    { category: "Shopping", limit: 10000, spent: 5240, color: "purple" },
    { category: "Entertainment", limit: 3000, spent: 1700, color: "yellow" },
    { category: "Transport", limit: 4000, spent: 1350, color: "green" },
  ]

  // Sample rewards
  const rewards = [
    { name: "5% Cashback on Groceries", progress: 70, target: "₹5,000", current: "₹3,500", expires: "5 days" },
    { name: "Movie Ticket Discount", progress: 40, target: "₹2,000", current: "₹800", expires: "12 days" },
    { name: "Flight Miles Bonus", progress: 25, target: "₹15,000", current: "₹3,750", expires: "30 days" },
  ]

  // AI Insights
  const aiInsights = [
    "Your food expenses have increased by 15% this month. Consider using meal prep services to save up to ₹2,000 monthly.",
    "You've spent ₹1,200 on subscription services this month. We found 3 overlapping subscriptions you could consolidate.",
    "Based on your spending pattern, you could save ₹3,500 monthly by optimizing your grocery shopping schedule.",
    "Your weekend spending is 40% higher than weekdays. Setting a weekend budget could help you save more effectively.",
  ]

  // Initialize camera for QR scanning
  useEffect(() => {
    if (showScanner && videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: "environment" } })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }
        })
        .catch((err) => {
          console.error("Error accessing camera:", err)
          setShowScanner(false)
        })

      return () => {
        if (videoRef.current && videoRef.current.srcObject) {
          const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
          tracks.forEach((track) => track.stop())
        }
      }
    }
  }, [showScanner])

  // Simulate fingerprint verification
  useEffect(() => {
    if (showFingerprint) {
      const timer = setTimeout(() => {
        setFingerprintVerified(true)

        setTimeout(() => {
          setShowFingerprint(false)
          setFingerprintVerified(false)
        }, 1000)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [showFingerprint])

  // Handle QR scan completion
  const handleScanComplete = () => {
    setShowScanner(false)
    setShowFingerprint(true)
  }

  return (
    <div className="space-y-8">
      {/* QR Scanner Modal */}
      <AnimatePresence>
        {showScanner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 p-4"
          >
            <div className="relative w-full max-w-sm aspect-square rounded-lg overflow-hidden mb-4">
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              <div className="absolute inset-0 border-2 border-cyan-400 rounded-lg" />
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-400" />
                <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-cyan-400" />
                <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-cyan-400" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-cyan-400" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-full h-1 bg-cyan-400/50"
                  initial={{ y: -100 }}
                  animate={{ y: 100 }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2, repeatType: "reverse" }}
                />
              </div>
            </div>
            <p className="text-white mb-4">Scan any QR code to pay</p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowScanner(false)} className="border-white/20 text-white">
                Cancel
              </Button>
              <Button onClick={handleScanComplete} className="bg-cyan-600 hover:bg-cyan-700">
                Simulate Scan
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fingerprint Verification Modal */}
      <AnimatePresence>
        {showFingerprint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 p-4"
          >
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <Fingerprint className={`h-24 w-24 ${fingerprintVerified ? "text-green-400" : "text-cyan-400"}`} />
                {!fingerprintVerified && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-cyan-400"
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                  />
                )}
              </div>
              <p className="text-white mb-2">{fingerprintVerified ? "Verified!" : "Verify with fingerprint"}</p>
              <p className="text-sm text-white/70 mb-4">
                {fingerprintVerified ? "Payment successful" : "Touch the fingerprint sensor on your device"}
              </p>
              {!fingerprintVerified && (
                <Button
                  variant="outline"
                  onClick={() => setShowFingerprint(false)}
                  className="border-white/20 text-white"
                >
                  Cancel
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight glow-text font-display">HyperCard</h1>
          <p className="text-muted-foreground">Smart spending with AI-powered controls</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-cyan-500/30 hover:border-cyan-500/50"
                  onClick={() => setShowAIInsights(!showAIInsights)}
                >
                  <Brain className="h-4 w-4 text-cyan-400" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>AI Spending Insights</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button variant="outline" size="sm" className="border-cyan-500/30 hover:border-cyan-500/50">
            <Bell className="mr-2 h-4 w-4 text-cyan-400" />
            Alerts
          </Button>

          <AnimatedGradientBorder variant="cyan">
            <Button
              size="sm"
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white border-0"
            >
              <Settings className="mr-2 h-4 w-4" />
              Card Settings
            </Button>
          </AnimatedGradientBorder>
        </div>
      </div>

      <Tabs defaultValue="card" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-muted/50 backdrop-blur-sm">
          <TabsTrigger value="card">Virtual Card</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="limits">Spending Limits</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="card" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-lg font-medium">Your HyperCard</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-cyan-500/30 hover:border-cyan-500/50"
                  onClick={() => setShowVirtualCard(!showVirtualCard)}
                >
                  {showVirtualCard ? "Hide Card" : "Show Card"}
                </Button>
              </div>

              <AnimatePresence>
                {showVirtualCard ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="perspective-1000"
                  >
                    <motion.div
                      className="relative w-full aspect-[1.6/1] max-w-md mx-auto md:mx-0 preserve-3d transition-transform duration-500"
                      animate={{ rotateY: cardFlipped ? 180 : 0 }}
                    >
                      {/* Front of card */}
                      <div className="absolute inset-0 backface-hidden">
                        <AnimatedGradientBorder containerClassName="w-full h-full rounded-xl" variant="cyan">
                          <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 flex flex-col justify-between overflow-hidden">
                            <div className="absolute top-0 right-0 w-full h-full opacity-20">
                              <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
                              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-cyan-500/30 rounded-full blur-3xl"></div>
                              <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl"></div>
                            </div>

                            <div className="flex justify-between items-start z-10">
                              <div>
                                <div className="text-xs text-cyan-300 uppercase tracking-wider mb-1">HyperCard</div>
                                <div className="text-sm text-white/80">Virtual UPI-Linked</div>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="w-6 h-6 rounded-full bg-cyan-500"></div>
                                <div className="w-6 h-6 rounded-full bg-blue-500 -ml-2"></div>
                              </div>
                            </div>

                            <div className="mt-6 z-10">
                              <div className="text-lg text-white font-medium mb-1">
                                {ghostMode ? "•••• •••• •••• ••••" : "4024 0512 3579 8541"}
                              </div>
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className="text-xs text-white/60 uppercase">Valid Thru</div>
                                  <div className="text-sm text-white/80">{ghostMode ? "••/••" : "05/26"}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-white/60 uppercase">CVV</div>
                                  <div className="text-sm text-white/80">{ghostMode ? "•••" : "123"}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-white/60 uppercase">Balance</div>
                                  <div className="text-sm text-white/80">
                                    ₹{(cardLimit - spentAmount).toLocaleString()}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </AnimatedGradientBorder>
                      </div>

                      {/* Back of card */}
                      <div className="absolute inset-0 backface-hidden rotate-y-180">
                        <AnimatedGradientBorder containerClassName="w-full h-full rounded-xl" variant="cyan">
                          <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 flex flex-col justify-between overflow-hidden">
                            <div className="absolute top-0 right-0 w-full h-full opacity-20">
                              <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
                              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-cyan-500/30 rounded-full blur-3xl"></div>
                              <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl"></div>
                            </div>

                            <div className="w-full h-12 bg-black/50 my-4"></div>

                            <div className="flex flex-col items-end z-10">
                              <div className="bg-white/10 w-3/4 h-10 rounded flex items-center justify-end px-4">
                                <span className="text-white font-mono">{ghostMode ? "•••" : "123"}</span>
                              </div>
                              <p className="text-xs text-white/60 mt-1">Security Code</p>
                            </div>

                            <div className="mt-auto z-10">
                              <p className="text-xs text-white/80">
                                This card is issued by FinNova Bank pursuant to license by Visa/Mastercard. Use of this
                                card is subject to the agreement.
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <QrCode className="h-6 w-6 text-white/80" />
                                <p className="text-xs text-white/60">Scan for UPI payment</p>
                              </div>
                            </div>
                          </div>
                        </AnimatedGradientBorder>
                      </div>
                    </motion.div>

                    <div className="flex justify-center mt-4 gap-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCardFlipped(!cardFlipped)}
                        className="border-cyan-500/30 hover:border-cyan-500/50"
                      >
                        <CreditCard className="mr-2 h-4 w-4 text-cyan-400" />
                        {cardFlipped ? "Show Front" : "Show Back"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setGhostMode(!ghostMode)}
                        className="border-cyan-500/30 hover:border-cyan-500/50"
                      >
                        {ghostMode ? (
                          <CreditCard className="mr-2 h-4 w-4 text-cyan-400" />
                        ) : (
                          <EyeOff className="mr-2 h-4 w-4 text-cyan-400" />
                        )}
                        {ghostMode ? "Show Details" : "Hide Details"}
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full aspect-[1.6/1] max-w-md mx-auto md:mx-0 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 flex flex-col items-center justify-center p-6"
                  >
                    <Lock className="h-12 w-12 text-cyan-500/50 mb-4" />
                    <p className="text-center text-muted-foreground">Your card details are hidden for security.</p>
                    <p className="text-center text-xs text-muted-foreground mt-1">
                      Click "Show Card" to view your virtual card.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-center mt-6 gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowScanner(true)}
                  className="border-cyan-500/30 hover:border-cyan-500/50"
                >
                  <Scan className="mr-2 h-4 w-4 text-cyan-400" />
                  Scan & Pay
                </Button>
                <Button variant="outline" size="sm" className="border-cyan-500/30 hover:border-cyan-500/50">
                  <Smartphone className="mr-2 h-4 w-4 text-cyan-400" />
                  Add to Mobile Wallet
                </Button>
              </div>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Card Features</CardTitle>
                <CardDescription>Advanced controls for smarter spending</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <EyeOff className="h-5 w-5 text-cyan-400" />
                    <div>
                      <p className="font-medium">Ghost Mode</p>
                      <p className="text-sm text-muted-foreground">Hide card details to prevent unauthorized viewing</p>
                    </div>
                  </div>
                  <Switch checked={ghostMode} onCheckedChange={setGhostMode} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="font-medium">Real-time Alerts</p>
                      <p className="text-sm text-muted-foreground">Get notified for every transaction</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="font-medium">Merchant Locking</p>
                      <p className="text-sm text-muted-foreground">Block specific merchants or categories</p>
                    </div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-400" />
                    <div>
                      <p className="font-medium">AI-Powered Fraud Detection</p>
                      <p className="text-sm text-muted-foreground">
                        Automatically detect and block suspicious transactions
                      </p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-400" />
                    <div>
                      <p className="font-medium">UPI Auto-Pay</p>
                      <p className="text-sm text-muted-foreground">Automatically pay recurring bills via UPI</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-cyan-500/30 hover:border-cyan-500/50">
                  <Settings className="mr-2 h-4 w-4 text-cyan-400" />
                  Advanced Settings
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Card Overview</CardTitle>
                  <CardDescription>Your spending and limit</CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Available Balance</p>
                  <p className="text-xl font-bold">₹{(cardLimit - spentAmount).toLocaleString()}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Monthly Limit</span>
                    <span className="text-sm font-medium">
                      ₹{spentAmount.toLocaleString()} of ₹{cardLimit.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2.5 rounded-full"
                      style={{ width: `${(spentAmount / cardLimit) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-muted-foreground">{Math.round((spentAmount / cardLimit) * 100)}% used</p>
                    <p className="text-xs text-muted-foreground">
                      ₹{(cardLimit - spentAmount).toLocaleString()} remaining
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Wallet className="h-5 w-5 text-cyan-400" />
                      <span className="font-medium">UPI Payments</span>
                    </div>
                    <p className="text-2xl font-bold">₹8,250</p>
                    <p className="text-xs text-muted-foreground mt-1">15 transactions this month</p>
                  </div>

                  <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="h-5 w-5 text-purple-400" />
                      <span className="font-medium">Card Payments</span>
                    </div>
                    <p className="text-2xl font-bold">₹4,100</p>
                    <p className="text-xs text-muted-foreground mt-1">7 transactions this month</p>
                  </div>

                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Gift className="h-5 w-5 text-blue-400" />
                      <span className="font-medium">Rewards Earned</span>
                    </div>
                    <p className="text-2xl font-bold">₹350</p>
                    <p className="text-xs text-muted-foreground mt-1">2.8% cashback on spending</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <AnimatePresence>
            {showAIInsights && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-cyan-400" />
                      AI Spending Insights
                    </CardTitle>
                    <CardDescription>Personalized recommendations based on your spending patterns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {aiInsights.map((insight, index) => (
                        <div key={index} className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                          <p className="text-sm">{insight}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>All your card transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-red-500/20 text-red-500">
                        <ArrowDown className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{transaction.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {transaction.category} • {transaction.date} at {transaction.time}
                        </p>
                        <p className="text-xs text-cyan-400">UPI: {transaction.upiId}</p>
                      </div>
                    </div>
                    <p className="font-medium text-red-500">₹{Math.abs(transaction.amount).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Spending Insights</CardTitle>
                <CardDescription>AI-powered analysis of your spending</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <h4 className="font-medium text-blue-400 mb-2">Spending Pattern</h4>
                    <p className="text-sm text-muted-foreground">
                      You spend most frequently on weekends, with an average transaction of ₹850.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <h4 className="font-medium text-purple-400 mb-2">Category Breakdown</h4>
                    <p className="text-sm text-muted-foreground">
                      Food & Dining is your top spending category this month, accounting for 45% of transactions.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                    <h4 className="font-medium text-green-400 mb-2">Saving Opportunity</h4>
                    <p className="text-sm text-muted-foreground">
                      You could save approximately ₹1,500/month by reducing food delivery orders from daily to 3x
                      weekly.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Transaction Filters</CardTitle>
                <CardDescription>Find specific transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="justify-start border-cyan-500/30 hover:border-cyan-500/50">
                      <Badge className="mr-2 bg-blue-500">Food</Badge>
                      Food & Dining
                    </Button>
                    <Button variant="outline" className="justify-start border-cyan-500/30 hover:border-cyan-500/50">
                      <Badge className="mr-2 bg-green-500">Transport</Badge>
                      Transport
                    </Button>
                    <Button variant="outline" className="justify-start border-cyan-500/30 hover:border-cyan-500/50">
                      <Badge className="mr-2 bg-purple-500">Shopping</Badge>
                      Shopping
                    </Button>
                    <Button variant="outline" className="justify-start border-cyan-500/30 hover:border-cyan-500/50">
                      <Badge className="mr-2 bg-yellow-500">Entertainment</Badge>
                      Entertainment
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="justify-start border-cyan-500/30 hover:border-cyan-500/50">
                      Today
                    </Button>
                    <Button variant="outline" className="justify-start border-cyan-500/30 hover:border-cyan-500/50">
                      This Week
                    </Button>
                    <Button variant="outline" className="justify-start border-cyan-500/30 hover:border-cyan-500/50">
                      This Month
                    </Button>
                    <Button variant="outline" className="justify-start border-cyan-500/30 hover:border-cyan-500/50">
                      Custom Range
                    </Button>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="limits" className="space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Spending Limits</CardTitle>
              <CardDescription>Set and monitor category-based spending limits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {spendingLimits.map((limit, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{limit.category}</span>
                      <span className="text-sm font-medium">
                        ₹{limit.spent} of ₹{limit.limit}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div
                        className={`bg-${limit.color}-500 h-2.5 rounded-full`}
                        style={{ width: `${(limit.spent / limit.limit) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-muted-foreground">
                        {Math.round((limit.spent / limit.limit) * 100)}% used
                      </p>
                      <p className="text-xs text-muted-foreground">₹{limit.limit - limit.spent} remaining</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="border-cyan-500/30 hover:border-cyan-500/50">
                Edit Limits
              </Button>
              <AnimatedGradientBorder variant="cyan">
                <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white border-0">
                  Add New Limit
                </Button>
              </AnimatedGradientBorder>
            </CardFooter>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Smart Spending Controls</CardTitle>
                <CardDescription>AI-powered spending management</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <EyeOff className="h-5 w-5 text-cyan-400" />
                    <div>
                      <p className="font-medium">Impulse Purchase Protection</p>
                      <p className="text-sm text-muted-foreground">24-hour hold on purchases over ₹5,000</p>
                    </div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="font-medium">Budget Alerts</p>
                      <p className="text-sm text-muted-foreground">Get notified when nearing category limits</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="font-medium">Recurring Payment Management</p>
                      <p className="text-sm text-muted-foreground">Track and manage subscription payments</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-400" />
                    <div>
                      <p className="font-medium">AI Spending Optimizer</p>
                      <p className="text-sm text-muted-foreground">
                        Automatically suggests ways to optimize your spending habits
                      </p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Spending Recommendations</CardTitle>
                <CardDescription>AI-generated insights to optimize spending</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <h4 className="font-medium text-blue-400 mb-2">Food & Dining</h4>
                    <p className="text-sm text-muted-foreground">
                      Consider meal prepping on weekends to reduce weekday food expenses by up to 30%.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <h4 className="font-medium text-purple-400 mb-2">Entertainment</h4>
                    <p className="text-sm text-muted-foreground">
                      You're approaching your entertainment budget. Consider free local events this weekend.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                    <h4 className="font-medium text-green-400 mb-2">Shopping</h4>
                    <p className="text-sm text-muted-foreground">
                      Wait 2 weeks for the upcoming seasonal sale to purchase your wishlist items at an average 25%
                      discount.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Rewards & Cashback</CardTitle>
              <CardDescription>Track your rewards and cashback progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {rewards.map((reward, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{reward.name}</span>
                      <span className="text-sm font-medium">
                        {reward.current} of {reward.target}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2.5 rounded-full"
                        style={{ width: `${reward.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <p className="text-xs text-muted-foreground">{reward.progress}% complete</p>
                      <p className="text-xs text-muted-foreground">Expires in {reward.expires}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 rounded-lg bg-gradient-to-br from-cyan-900/50 to-blue-900/50 border border-cyan-500/30">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-medium text-white">Special Offer</h3>
                    <p className="text-sm text-cyan-200/70">Limited Time Reward</p>
                  </div>
                  <Badge className="bg-cyan-500/80">NEW</Badge>
                </div>
                <p className="text-sm text-cyan-100 mb-4">
                  Spend ₹10,000 on groceries this month and get 10% cashback (up to ₹1,000)
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-cyan-200/70">14 days remaining</p>
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                    Activate Offer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-cyan-400" />
                  <span>Total Cashback</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center py-4">
                  <p className="text-3xl font-bold mb-2">₹1,250</p>
                  <p className="text-sm text-muted-foreground">Earned this month</p>
                  <Button variant="outline" size="sm" className="mt-4 border-cyan-500/30 hover:border-cyan-500/50">
                    Redeem Cashback
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-400" />
                  <span>Reward Points</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center py-4">
                  <p className="text-3xl font-bold mb-2">2,450</p>
                  <p className="text-sm text-muted-foreground">Worth ₹612.50</p>
                  <Button variant="outline" size="sm" className="mt-4 border-purple-500/30 hover:border-purple-500/50">
                    View Catalog
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  <span>Cashback Rate</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center py-4">
                  <p className="text-3xl font-bold mb-2">2.8%</p>
                  <p className="text-sm text-muted-foreground">Average rate</p>
                  <Button variant="outline" size="sm" className="mt-4 border-yellow-500/30 hover:border-yellow-500/50">
                    Boost Rate
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Protect your card with advanced security features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Require verification for high-value transactions</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="font-medium">Geo-Restriction</p>
                    <p className="text-sm text-muted-foreground">Limit card usage to specific geographic areas</p>
                  </div>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-purple-400" />
                  <div>
                    <p className="font-medium">Fraud Alerts</p>
                    <p className="text-sm text-muted-foreground">Get notified of suspicious activities</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-yellow-400" />
                  <div>
                    <p className="font-medium">Device Binding</p>
                    <p className="text-sm text-muted-foreground">Restrict card usage to registered devices</p>
                  </div>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Fingerprint className="h-5 w-5 text-cyan-400" />
                  <div>
                    <p className="font-medium">Biometric Authentication</p>
                    <p className="text-sm text-muted-foreground">
                      Use fingerprint or face recognition for transactions
                    </p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <AnimatedGradientBorder variant="cyan" containerClassName="w-full">
                <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white border-0">
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Run Security Check
                </Button>
              </AnimatedGradientBorder>
            </CardFooter>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Transaction Verification</CardTitle>
                <CardDescription>Set verification methods for different transaction types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg border border-border">
                    <div>
                      <p className="font-medium">Online Purchases</p>
                      <p className="text-sm text-muted-foreground">Verification method for web transactions</p>
                    </div>
                    <select className="bg-background border border-input rounded-md px-3 py-1 text-sm">
                      <option>Biometric</option>
                      <option>SMS OTP</option>
                      <option>Email OTP</option>
                    </select>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-lg border border-border">
                    <div>
                      <p className="font-medium">International Transactions</p>
                      <p className="text-sm text-muted-foreground">Verification for foreign currency purchases</p>
                    </div>
                    <select className="bg-background border border-input rounded-md px-3 py-1 text-sm">
                      <option>Biometric + SMS</option>
                      <option>SMS OTP</option>
                      <option>Email OTP</option>
                    </select>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-lg border border-border">
                    <div>
                      <p className="font-medium">High-Value Transactions</p>
                      <p className="text-sm text-muted-foreground">For purchases over ₹10,000</p>
                    </div>
                    <select className="bg-background border border-input rounded-md px-3 py-1 text-sm">
                      <option>Biometric + SMS</option>
                      <option>SMS OTP</option>
                      <option>Email OTP</option>
                    </select>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-lg border border-border">
                    <div>
                      <p className="font-medium">UPI Transactions</p>
                      <p className="text-sm text-muted-foreground">For UPI payments</p>
                    </div>
                    <select className="bg-background border border-input rounded-md px-3 py-1 text-sm">
                      <option>UPI PIN</option>
                      <option>Biometric</option>
                      <option>SMS OTP</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Security Activity Log</CardTitle>
                <CardDescription>Recent security events and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 rounded-lg border border-border">
                    <ShieldCheck className="h-5 w-5 text-green-400 mt-0.5" />
                    <div>
                      <p className="font-medium">Security Check Completed</p>
                      <p className="text-sm text-muted-foreground">All security features are properly configured</p>
                      <p className="text-xs text-muted-foreground mt-1">Today, 10:45 AM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg border border-border">
                    <Bell className="h-5 w-5 text-yellow-400 mt-0.5" />
                    <div>
                      <p className="font-medium">Unusual Transaction Detected</p>
                      <p className="text-sm text-muted-foreground">Online purchase from a new merchant was verified</p>
                      <p className="text-xs text-muted-foreground mt-1">Yesterday, 3:20 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg border border-border">
                    <Lock className="h-5 w-5 text-blue-400 mt-0.5" />
                    <div>
                      <p className="font-medium">UPI PIN Changed</p>
                      <p className="text-sm text-muted-foreground">Your UPI PIN was updated successfully</p>
                      <p className="text-xs text-muted-foreground mt-1">Mar 15, 5:30 PM</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg border border-border">
                    <Brain className="h-5 w-5 text-purple-400 mt-0.5" />
                    <div>
                      <p className="font-medium">AI Fraud Prevention</p>
                      <p className="text-sm text-muted-foreground">Suspicious transaction blocked automatically</p>
                      <p className="text-xs text-muted-foreground mt-1">Mar 12, 11:45 AM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

