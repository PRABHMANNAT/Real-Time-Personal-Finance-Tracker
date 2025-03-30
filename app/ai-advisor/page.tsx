"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Brain,
  Send,
  User,
  Bot,
  Sparkles,
  Lightbulb,
  Coins,
  TrendingUp,
  PiggyBank,
  CreditCard,
  BarChart3,
  Wallet,
  ArrowRight,
  Mic,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"
import { Badge } from "@/components/ui/badge"

// Define the message type
interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

// Define the FAQ category type
interface FAQCategory {
  id: string
  name: string
  icon: React.ReactNode
  color: string
  questions: {
    id: string
    question: string
    answer: string
  }[]
}

export default function AIAdvisorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm your FinNova AI Financial Advisor. How can I help you with your finances today?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [activeTab, setActiveTab] = useState("chat")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // FAQ categories with predefined questions and answers
  const faqCategories: FAQCategory[] = [
    {
      id: "investments",
      name: "Investments",
      icon: <TrendingUp className="h-5 w-5" />,
      color: "blue",
      questions: [
        {
          id: "inv-1",
          question: "How should I start investing with ₹10,000?",
          answer:
            "With ₹10,000, I recommend starting with a diversified approach: 40% in index funds for market exposure, 30% in fixed deposits for stability, 20% in government bonds for security, and 10% in a high-interest savings account for emergencies. This balanced portfolio minimizes risk while providing growth potential.",
        },
        {
          id: "inv-2",
          question: "What are the best investment options for tax saving in India?",
          answer:
            "For tax savings in India, consider these Section 80C options (₹1.5 lakh limit): ELSS funds (equity with 3-year lock-in), PPF (7.1% tax-free returns, 15-year term), NPS (additional ₹50,000 deduction under 80CCD), and tax-saving FDs (5-year lock-in). ELSS offers the shortest lock-in with potential for highest returns.",
        },
        {
          id: "inv-3",
          question: "How do I build a diversified investment portfolio?",
          answer:
            "To build a diversified portfolio, follow the 5-step approach: 1) Allocate across asset classes (stocks, bonds, gold, real estate) based on your risk tolerance, 2) Diversify within each asset class (different sectors/company sizes), 3) Include international investments (10-20%), 4) Add alternative investments like REITs, and 5) Rebalance annually to maintain your target allocation.",
        },
      ],
    },
    {
      id: "savings",
      name: "Savings",
      icon: <PiggyBank className="h-5 w-5" />,
      color: "green",
      questions: [
        {
          id: "sav-1",
          question: "How much should I save each month?",
          answer:
            "I recommend following the 50/30/20 rule: allocate 50% of your income to needs, 30% to wants, and 20% to savings. For financial security, aim to save at least 20-25% of your monthly income. Prioritize building an emergency fund covering 6 months of expenses, then focus on retirement and other financial goals.",
        },
        {
          id: "sav-2",
          question: "What's the best way to save for my child's education?",
          answer:
            "For your child's education, consider a multi-instrument approach: 1) Sukanya Samriddhi Yojana for girls (8.2% tax-free), 2) PPF for long-term tax-free growth, 3) Equity mutual funds for inflation-beating returns (for goals >7 years away), and 4) Education-specific insurance plans. Start early and increase contributions annually by 10% to account for education inflation.",
        },
        {
          id: "sav-3",
          question: "How can I build an emergency fund quickly?",
          answer:
            "To build an emergency fund quickly: 1) Automate transfers of 10-15% of income to a separate high-yield savings account, 2) Allocate all windfalls (bonuses, tax refunds) to this fund, 3) Temporarily reduce discretionary spending, 4) Consider a side hustle dedicating all earnings to your fund, and 5) Sell unused items. Aim for 3 months of expenses initially, then expand to 6 months.",
        },
      ],
    },
    {
      id: "credit",
      name: "Credit & Loans",
      icon: <CreditCard className="h-5 w-5" />,
      color: "purple",
      questions: [
        {
          id: "cred-1",
          question: "How can I improve my credit score?",
          answer:
            "To improve your credit score: 1) Pay all bills on time (set up auto-payments), 2) Reduce credit utilization below 30%, 3) Don't close old credit accounts, 4) Limit new credit applications, 5) Regularly check your credit report for errors, 6) Use a credit builder tool if you have limited history, and 7) Maintain a diverse credit mix. Most people see significant improvement within 3-6 months of consistent action.",
        },
        {
          id: "cred-2",
          question: "Should I take a personal loan or use a credit card for a large purchase?",
          answer:
            "For large purchases, personal loans typically offer lower interest rates (10-15%) compared to credit cards (24-36%). Personal loans provide structured repayment plans and don't impact your credit utilization ratio. However, if you can pay off the amount within a 0% introductory period on a credit card or within 1-2 months, a credit card might be more convenient with potential rewards.",
        },
        {
          id: "cred-3",
          question: "How do I choose the best home loan in India?",
          answer:
            "When selecting a home loan in India: 1) Compare interest rates across banks and NBFCs (currently ranging from 8.50-9.50%), 2) Evaluate processing fees (typically 0.5-1% of loan amount), 3) Check prepayment/foreclosure charges, 4) Consider loan tenure flexibility, 5) Assess customer service quality, and 6) Look for special rates for women borrowers. Public sector banks often offer lower rates but may have slower processing than private banks.",
        },
      ],
    },
    {
      id: "taxes",
      name: "Taxes",
      icon: <Coins className="h-5 w-5" />,
      color: "yellow",
      questions: [
        {
          id: "tax-1",
          question: "What tax regime should I choose - old or new?",
          answer:
            "The choice between tax regimes depends on your investments and income. The old regime offers deductions (80C, HRA, etc.) but has higher rates. The new regime has lower rates but no deductions. Generally, if your annual deductions exceed ₹3 lakhs, the old regime is beneficial. For those with fewer deductions or simpler finances, the new regime may save more. I recommend calculating your tax liability under both systems before deciding.",
        },
        {
          id: "tax-2",
          question: "How can I reduce my tax liability legally?",
          answer:
            "To legally reduce tax liability: 1) Maximize Section 80C investments (₹1.5 lakh limit) through ELSS, PPF, or insurance, 2) Utilize Section 80D for medical insurance (up to ₹75,000), 3) Claim HRA benefits if renting, 4) Invest in NPS for additional ₹50,000 deduction, 5) Claim interest on home and education loans, 6) Set up a Hindu Undivided Family (HUF) for additional deductions, and 7) Consider tax-free bonds for investment income.",
        },
        {
          id: "tax-3",
          question: "What are the tax implications of selling mutual funds?",
          answer:
            "When selling mutual funds, equity funds held >1 year incur 10% LTCG tax on gains above ₹1 lakh (without indexation benefit). For equity funds held <1 year, STCG tax is 15%. For debt funds, LTCG (>3 years) is taxed at 20% with indexation, while STCG (<3 years) is added to your income and taxed at your slab rate. ELSS funds, despite being equity funds, require a 3-year holding period before redemption.",
        },
      ],
    },
    {
      id: "retirement",
      name: "Retirement",
      icon: <Wallet className="h-5 w-5" />,
      color: "cyan",
      questions: [
        {
          id: "ret-1",
          question: "How much should I save for retirement in India?",
          answer:
            "For retirement in India, aim to accumulate at least 20 times your annual expenses. If your current monthly expenses are ₹50,000 (₹6 lakh annually), target a corpus of ₹1.2 crore minimum. Accounting for inflation, if you're 30 years from retirement, you'll need approximately ₹3.2 crore. To achieve this, invest 15-20% of your income in a mix of NPS, PPF, equity mutual funds, and EPF, increasing contributions by 10% annually.",
        },
        {
          id: "ret-2",
          question: "What's better for retirement - NPS or mutual funds?",
          answer:
            "Both NPS and mutual funds have distinct advantages for retirement planning. NPS offers tax benefits (additional ₹50,000 deduction) and enforced discipline with lower costs (0.01-0.1% expense ratio), but has lower liquidity and limited equity exposure (75% max). Mutual funds provide complete flexibility, potentially higher returns through 100% equity options, and better liquidity, but lack tax advantages specific to retirement. An ideal strategy combines both: NPS for tax benefits and mutual funds for flexibility and potentially higher returns.",
        },
        {
          id: "ret-3",
          question: "When should I start planning for retirement?",
          answer:
            "The ideal time to start retirement planning is with your first paycheck. Starting at age 25 versus 35 can nearly double your retirement corpus due to compounding. If you're starting at 25, investing ₹10,000 monthly with 12% returns could yield approximately ₹5.8 crore by age 60. The same investment beginning at 35 would yield only about ₹1.8 crore. Even small early investments are significantly more valuable than larger investments started later.",
        },
      ],
    },
    {
      id: "budgeting",
      name: "Budgeting",
      icon: <BarChart3 className="h-5 w-5" />,
      color: "red",
      questions: [
        {
          id: "bud-1",
          question: "How do I create a monthly budget that works?",
          answer:
            "To create an effective monthly budget: 1) Track all expenses for 30 days to establish baseline spending, 2) Categorize expenses as needs (50%), wants (30%), and savings (20%) following the 50/30/20 rule, 3) Set specific spending limits for each category, 4) Use digital tools like FinNova's budget tracker for automated monitoring, 5) Schedule a weekly 15-minute review to stay on track, and 6) Use the envelope method for categories where you tend to overspend. Consistency is key - stick with it for at least 3 months to form the habit.",
        },
        {
          id: "bud-2",
          question: "What's the best way to track daily expenses?",
          answer:
            "The most effective expense tracking methods are: 1) Dedicated apps like FinNova that automatically categorize expenses and provide insights, 2) Digital envelope system using multiple accounts for different spending categories, 3) The 24-hour rule (wait 24 hours before any non-essential purchase over ₹2,000), and 4) Weekly expense reviews. The key is choosing a system simple enough that you'll stick with it consistently. Our data shows users who track expenses daily typically reduce discretionary spending by 15-20%.",
        },
        {
          id: "bud-3",
          question: "How can I reduce my monthly expenses?",
          answer:
            "To reduce monthly expenses: 1) Audit subscriptions and eliminate unused services (average savings: ₹1,500/month), 2) Renegotiate bills (internet, insurance, rent) which typically yields 10-15% savings, 3) Implement the 'cash envelope' system for discretionary spending, 4) Meal plan to reduce food waste and impulse purchases (potential 30% savings on groceries), 5) Use the 30-day rule for non-essential purchases, and 6) Consider shared transportation or public transit. Most households can reduce expenses by 15-25% without significantly impacting quality of life.",
        },
      ],
    },
  ]

  // Predefined responses for common questions
  const predefinedResponses: Record<string, string> = {
    hello: "Hello! How can I assist with your financial questions today?",
    hi: "Hi there! I'm your FinNova AI Financial Advisor. What financial topics can I help you with?",
    help: "I can help with various financial topics including investments, savings, credit, taxes, retirement planning, and budgeting. What specific area are you interested in?",
    "thank you": "You're welcome! If you have any more financial questions, feel free to ask anytime.",
    thanks: "You're welcome! I'm here to help with any financial questions you might have.",
    bye: "Goodbye! Feel free to return whenever you have financial questions. Your financial well-being is my priority!",
    "what can you do":
      "I can provide personalized financial advice on investments, savings strategies, credit management, tax planning, retirement preparation, and budgeting techniques. I can also analyze your spending patterns and suggest optimization strategies. What area would you like to explore?",
  }

  // AI response generator based on user query
  const generateAIResponse = (query: string): string => {
    // Check for predefined responses
    const lowercaseQuery = query.toLowerCase().trim()

    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (lowercaseQuery.includes(key)) {
        return response
      }
    }

    // Check for keywords and generate responses
    if (
      lowercaseQuery.includes("invest") ||
      lowercaseQuery.includes("stock") ||
      lowercaseQuery.includes("mutual fund")
    ) {
      return "Based on current market analysis, I recommend a diversified investment approach with 60% in index funds, 20% in blue-chip stocks, and 20% in government bonds. This balanced portfolio offers growth potential while managing risk. Would you like more specific investment recommendations based on your risk tolerance?"
    }

    if (lowercaseQuery.includes("save") || lowercaseQuery.includes("saving")) {
      return "For effective saving, I recommend the 50/30/20 rule: 50% of income for necessities, 30% for wants, and 20% for savings. Automate transfers to a high-yield savings account on payday and consider laddered fixed deposits for better returns while maintaining liquidity. Would you like me to analyze your current saving patterns for optimization?"
    }

    if (lowercaseQuery.includes("loan") || lowercaseQuery.includes("credit") || lowercaseQuery.includes("debt")) {
      return "When managing loans, prioritize high-interest debt first. Currently, personal loan rates range from 10-15%, while credit cards charge 24-36%. Consider consolidating high-interest debts into a lower-interest option. For new loans, compare at least 3 lenders and negotiate terms. Would you like specific strategies for your debt situation?"
    }

    if (lowercaseQuery.includes("tax") || lowercaseQuery.includes("taxes")) {
      return "For tax optimization, fully utilize Section 80C investments (₹1.5 lakh limit) through ELSS, PPF, or insurance. Consider NPS for additional ₹50,000 deduction under Section 80CCD(1B). If you're a salaried employee, request your employer to restructure your salary with tax-efficient components like HRA and LTA. Would you like a personalized tax-saving strategy?"
    }

    if (lowercaseQuery.includes("retire") || lowercaseQuery.includes("pension")) {
      return "For retirement planning in India, aim to accumulate at least 25-30 times your annual expenses. A diversified approach using EPF, PPF, NPS, and equity mutual funds provides tax efficiency and inflation-beating returns. Start early - even small contributions grow significantly over time due to compounding. Would you like a detailed retirement calculator based on your current age and expenses?"
    }

    if (lowercaseQuery.includes("budget") || lowercaseQuery.includes("spend") || lowercaseQuery.includes("expense")) {
      return "Effective budgeting starts with tracking all expenses for 30 days to establish baseline spending. Then implement the 50/30/20 rule (50% needs, 30% wants, 20% savings). Use digital tools like FinNova's budget tracker for automated monitoring and insights. Schedule weekly reviews to stay on track. Would you like personalized budgeting strategies based on your income and goals?"
    }

    // Default response for other queries
    return "That's an interesting financial question. To provide the most accurate advice, I'd need to understand more about your specific financial situation, goals, and risk tolerance. Could you provide more details about your current financial status and what you're hoping to achieve?"
  }

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response with typing delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateAIResponse(userMessage.content),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  // Handle FAQ question click
  const handleFAQClick = (question: string, answer: string) => {
    // Add user message (the question)
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: question,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    // Simulate AI response with typing delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: answer,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
      setActiveTab("chat") // Switch to chat tab after answering
    }, 1500)
  }

  // Handle voice input
  const handleVoiceInput = () => {
    setIsListening(true)

    // Simulate voice recognition (in a real app, this would use the Web Speech API)
    setTimeout(() => {
      setIsListening(false)
      const randomQuestions = [
        "How should I start investing with ₹10,000?",
        "How much should I save for retirement?",
        "What's the best way to improve my credit score?",
        "How can I reduce my monthly expenses?",
      ]
      setInputValue(randomQuestions[Math.floor(Math.random() * randomQuestions.length)])

      // Focus the input
      inputRef.current?.focus()
    }, 2000)
  }

  // Clear chat history
  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Hello! I'm your FinNova AI Financial Advisor. How can I help you with your finances today?",
        timestamp: new Date(),
      },
    ])
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight glow-text-purple font-display">AI Financial Advisor</h1>
          <p className="text-muted-foreground">Get personalized financial guidance powered by quantum AI</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <AnimatedGradientBorder variant="purple">
            <Card className="glass-card h-[600px] flex flex-col">
              <CardHeader className="pb-4 flex-shrink-0">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <Brain className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <CardTitle>FinNova AI Advisor</CardTitle>
                      <CardDescription>Quantum-powered financial intelligence</CardDescription>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearChat}
                    className="border-purple-500/30 hover:border-purple-500/50"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear Chat
                  </Button>
                </div>
              </CardHeader>

              <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                <TabsList className="mx-4 bg-background/20">
                  <TabsTrigger value="chat">Chat</TabsTrigger>
                  <TabsTrigger value="faq">FAQ Topics</TabsTrigger>
                </TabsList>

                <TabsContent value="chat" className="flex-1 flex flex-col p-0">
                  <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                    <AnimatePresence>
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}
                          >
                            <div
                              className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
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
                                message.role === "user"
                                  ? "bg-blue-500/10 border border-blue-500/20"
                                  : "bg-purple-500/10 border border-purple-500/20"
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}

                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex justify-start"
                        >
                          <div className="flex gap-3 max-w-[80%]">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                              <Bot className="h-4 w-4 text-purple-400" />
                            </div>

                            <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                              <div className="flex space-x-1">
                                <div
                                  className="h-2 w-2 rounded-full bg-purple-400 animate-bounce"
                                  style={{ animationDelay: "0ms" }}
                                ></div>
                                <div
                                  className="h-2 w-2 rounded-full bg-purple-400 animate-bounce"
                                  style={{ animationDelay: "300ms" }}
                                ></div>
                                <div
                                  className="h-2 w-2 rounded-full bg-purple-400 animate-bounce"
                                  style={{ animationDelay: "600ms" }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      <div ref={messagesEndRef} />
                    </AnimatePresence>
                  </CardContent>

                  <CardFooter className="border-t border-border/50 p-4">
                    <form onSubmit={handleSubmit} className="flex w-full gap-2">
                      <div className="relative flex-1">
                        <Input
                          ref={inputRef}
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="Ask about investments, savings, taxes, or any financial topic..."
                          className="pr-10 bg-background/50"
                        />

                        <AnimatePresence>
                          {isListening && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0 }}
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
                        onClick={handleVoiceInput}
                        disabled={isListening}
                        className="border-purple-500/30 hover:border-purple-500/50"
                      >
                        <Mic className="h-4 w-4 text-purple-400" />
                      </Button>

                      <Button type="submit" size="icon" className="bg-purple-600 hover:bg-purple-700">
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </CardFooter>
                </TabsContent>

                <TabsContent value="faq" className="flex-1 overflow-hidden p-0">
                  <CardContent className="h-full overflow-y-auto p-4">
                    <div className="grid gap-4">
                      {faqCategories.map((category) => (
                        <div key={category.id} className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-md bg-${category.color}-500/20`}>{category.icon}</div>
                            <h3 className="text-lg font-medium">{category.name}</h3>
                          </div>

                          <div className="grid gap-2">
                            {category.questions.map((item) => (
                              <motion.button
                                key={item.id}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={() => handleFAQClick(item.question, item.answer)}
                                className={`text-left p-3 rounded-lg bg-${category.color}-500/10 border border-${category.color}-500/20 hover:bg-${category.color}-500/20 transition-colors`}
                              >
                                <div className="flex justify-between items-center">
                                  <span>{item.question}</span>
                                  <ArrowRight className="h-4 w-4" />
                                </div>
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </TabsContent>
              </Tabs>
            </Card>
          </AnimatedGradientBorder>
        </div>

        <div className="space-y-6">
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <Sparkles className="h-5 w-5 text-purple-400" />
                </div>
                <CardTitle>AI Insights</CardTitle>
              </div>
              <CardDescription>Personalized financial intelligence</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <h4 className="font-medium text-blue-400 mb-1 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span>Investment Opportunity</span>
                </h4>
                <p className="text-sm text-muted-foreground">
                  Based on your risk profile, consider allocating 15% of your portfolio to small-cap funds for higher
                  growth potential.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <h4 className="font-medium text-green-400 mb-1 flex items-center gap-2">
                  <PiggyBank className="h-4 w-4" />
                  <span>Savings Optimization</span>
                </h4>
                <p className="text-sm text-muted-foreground">
                  Your current savings rate of 12% is below the recommended 20%. Increasing by just 3% can add ₹8.5
                  lakhs to your retirement fund.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <h4 className="font-medium text-purple-400 mb-1 flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>Credit Alert</span>
                </h4>
                <p className="text-sm text-muted-foreground">
                  Your credit utilization is approaching 40%. Reducing to below 30% could improve your credit score by
                  15-20 points.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/20">
                  <Lightbulb className="h-5 w-5 text-cyan-400" />
                </div>
                <CardTitle>Quick Tips</CardTitle>
              </div>
              <CardDescription>Smart financial advice</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-background/20">
                <Badge className="bg-blue-500">Tip #1</Badge>
                <p className="text-sm">Use the 72 rule to estimate investment doubling time: 72 ÷ interest rate.</p>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-background/20">
                <Badge className="bg-purple-500">Tip #2</Badge>
                <p className="text-sm">Review and rebalance your investment portfolio every 6 months.</p>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-background/20">
                <Badge className="bg-cyan-500">Tip #3</Badge>
                <p className="text-sm">Save first, spend later - automate transfers on payday.</p>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg bg-background/20">
                <Badge className="bg-green-500">Tip #4</Badge>
                <p className="text-sm">For tax efficiency, hold equity investments for at least 1 year.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Popular Questions</CardTitle>
          <CardDescription>Frequently asked financial queries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {faqCategories.flatMap((category) =>
              category.questions.slice(0, 1).map((question) => (
                <motion.button
                  key={question.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleFAQClick(question.question, question.answer)}
                  className="text-left p-4 rounded-lg bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 hover:border-purple-500/30 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg bg-${category.color}-500/20 mt-1`}>{category.icon}</div>
                    <div>
                      <p className="font-medium mb-2">{question.question}</p>
                      <p className="text-xs text-muted-foreground">Click to see AI response</p>
                    </div>
                  </div>
                </motion.button>
              )),
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

