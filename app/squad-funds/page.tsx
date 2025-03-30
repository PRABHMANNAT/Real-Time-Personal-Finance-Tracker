"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  ArrowRight,
  Wallet,
  Receipt,
  PieChart,
  Calendar,
  Clock,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  SlidersHorizontal,
  UserPlus,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
  Brain,
  Zap,
  Share2,
  MoreHorizontal,
  Bell,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"
import { GlowingStars } from "@/components/ui/glowing-stars"

// Types
interface Member {
  id: string
  name: string
  avatar: string
  email: string
  contribution: number
  status: "active" | "pending"
}

interface Fund {
  id: string
  name: string
  description: string
  totalAmount: number
  targetAmount: number
  members: Member[]
  category: string
  dueDate?: string
  createdAt: string
  recentActivity: Activity[]
}

interface Expense {
  id: string
  description: string
  amount: number
  paidBy: string
  date: string
  category: string
  splitType: "equal" | "percentage" | "custom"
  fundId: string
  status: "settled" | "pending"
  members: {
    memberId: string
    amount: number
    status: "paid" | "pending"
  }[]
}

interface Activity {
  id: string
  type: "contribution" | "expense" | "member_added" | "goal_reached" | "reminder"
  description: string
  date: string
  amount?: number
  memberId?: string
}

// Sample data
const sampleFunds: Fund[] = [
  {
    id: "f1",
    name: "Goa Trip Fund",
    description: "Saving for our annual Goa trip in December",
    totalAmount: 24500,
    targetAmount: 50000,
    category: "Travel",
    dueDate: "2023-12-15",
    createdAt: "2023-08-10",
    members: [
      {
        id: "m1",
        name: "Rahul Sharma",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "rahul@example.com",
        contribution: 8000,
        status: "active",
      },
      {
        id: "m2",
        name: "Priya Patel",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "priya@example.com",
        contribution: 7500,
        status: "active",
      },
      {
        id: "m3",
        name: "Amit Kumar",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "amit@example.com",
        contribution: 9000,
        status: "active",
      },
    ],
    recentActivity: [
      {
        id: "a1",
        type: "contribution",
        description: "Rahul contributed ₹2,000",
        date: "2023-09-15",
        amount: 2000,
        memberId: "m1",
      },
      {
        id: "a2",
        type: "expense",
        description: "Booking advance paid",
        date: "2023-09-10",
        amount: 5000,
        memberId: "m2",
      },
    ],
  },
  {
    id: "f2",
    name: "Flat Deposit",
    description: "Security deposit for our new flat",
    totalAmount: 45000,
    targetAmount: 100000,
    category: "Housing",
    dueDate: "2023-10-30",
    createdAt: "2023-07-25",
    members: [
      {
        id: "m1",
        name: "Rahul Sharma",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "rahul@example.com",
        contribution: 15000,
        status: "active",
      },
      {
        id: "m4",
        name: "Sneha Gupta",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "sneha@example.com",
        contribution: 15000,
        status: "active",
      },
      {
        id: "m5",
        name: "Vikram Singh",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "vikram@example.com",
        contribution: 15000,
        status: "active",
      },
    ],
    recentActivity: [
      {
        id: "a3",
        type: "contribution",
        description: "Sneha contributed ₹5,000",
        date: "2023-09-12",
        amount: 5000,
        memberId: "m4",
      },
      {
        id: "a4",
        type: "member_added",
        description: "Vikram joined the fund",
        date: "2023-09-05",
        memberId: "m5",
      },
    ],
  },
  {
    id: "f3",
    name: "Birthday Gift for Mom",
    description: "Collecting for mom's 50th birthday gift",
    totalAmount: 12000,
    targetAmount: 15000,
    category: "Gift",
    dueDate: "2023-11-10",
    createdAt: "2023-08-15",
    members: [
      {
        id: "m2",
        name: "Priya Patel",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "priya@example.com",
        contribution: 4000,
        status: "active",
      },
      {
        id: "m3",
        name: "Amit Kumar",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "amit@example.com",
        contribution: 4000,
        status: "active",
      },
      {
        id: "m6",
        name: "Neha Reddy",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "neha@example.com",
        contribution: 4000,
        status: "active",
      },
    ],
    recentActivity: [
      {
        id: "a5",
        type: "goal_reached",
        description: "80% of target amount reached!",
        date: "2023-09-14",
      },
      {
        id: "a6",
        type: "contribution",
        description: "Neha contributed ₹2,000",
        date: "2023-09-13",
        amount: 2000,
        memberId: "m6",
      },
    ],
  },
]

const sampleExpenses: Expense[] = [
  {
    id: "e1",
    description: "Hotel Booking Advance",
    amount: 5000,
    paidBy: "m2",
    date: "2023-09-10",
    category: "Travel",
    splitType: "equal",
    fundId: "f1",
    status: "pending",
    members: [
      { memberId: "m1", amount: 1667, status: "pending" },
      { memberId: "m2", amount: 1667, status: "paid" },
      { memberId: "m3", amount: 1666, status: "pending" },
    ],
  },
  {
    id: "e2",
    description: "Broker Fee",
    amount: 10000,
    paidBy: "m1",
    date: "2023-09-05",
    category: "Housing",
    splitType: "equal",
    fundId: "f2",
    status: "settled",
    members: [
      { memberId: "m1", amount: 3334, status: "paid" },
      { memberId: "m4", amount: 3333, status: "paid" },
      { memberId: "m5", amount: 3333, status: "paid" },
    ],
  },
  {
    id: "e3",
    description: "Cake Booking Advance",
    amount: 1000,
    paidBy: "m6",
    date: "2023-09-08",
    category: "Food",
    splitType: "equal",
    fundId: "f3",
    status: "pending",
    members: [
      { memberId: "m2", amount: 333, status: "pending" },
      { memberId: "m3", amount: 333, status: "pending" },
      { memberId: "m6", amount: 334, status: "paid" },
    ],
  },
]

export default function SquadFundsPage() {
  const [funds, setFunds] = useState<Fund[]>(sampleFunds)
  const [expenses, setExpenses] = useState<Expense[]>(sampleExpenses)
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null)
  const [showNewFundDialog, setShowNewFundDialog] = useState(false)
  const [showNewExpenseDialog, setShowNewExpenseDialog] = useState(false)
  const [showAddMemberDialog, setShowAddMemberDialog] = useState(false)
  const [showAIInsight, setShowAIInsight] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  // Form states
  const [newFundName, setNewFundName] = useState("")
  const [newFundDescription, setNewFundDescription] = useState("")
  const [newFundTarget, setNewFundTarget] = useState("")
  const [newFundCategory, setNewFundCategory] = useState("Travel")
  const [newFundDueDate, setNewFundDueDate] = useState("")

  const [newExpenseDescription, setNewExpenseDescription] = useState("")
  const [newExpenseAmount, setNewExpenseAmount] = useState("")
  const [newExpensePaidBy, setNewExpensePaidBy] = useState("")
  const [newExpenseCategory, setNewExpenseCategory] = useState("Food")
  const [newExpenseSplitType, setNewExpenseSplitType] = useState("equal")

  const [newMemberEmail, setNewMemberEmail] = useState("")
  const [newMemberName, setNewMemberName] = useState("")

  // Handle fund selection
  const handleSelectFund = (fund: Fund) => {
    setSelectedFund(fund)
    setActiveTab("overview")
  }

  // Handle back to funds list
  const handleBackToList = () => {
    setSelectedFund(null)
  }

  // Create new fund
  const handleCreateFund = () => {
    if (!newFundName || !newFundTarget) return

    const newFund: Fund = {
      id: `f${funds.length + 1}`,
      name: newFundName,
      description: newFundDescription,
      totalAmount: 0,
      targetAmount: Number.parseInt(newFundTarget),
      category: newFundCategory,
      dueDate: newFundDueDate || undefined,
      createdAt: new Date().toISOString().split("T")[0],
      members: [
        {
          id: "m1", // Current user
          name: "Rahul Sharma",
          avatar: "/placeholder.svg?height=40&width=40",
          email: "rahul@example.com",
          contribution: 0,
          status: "active",
        },
      ],
      recentActivity: [
        {
          id: `a${Math.random().toString(36).substring(7)}`,
          type: "member_added",
          description: "You created this fund",
          date: new Date().toISOString().split("T")[0],
          memberId: "m1",
        },
      ],
    }

    setFunds([...funds, newFund])
    setShowNewFundDialog(false)
    setNewFundName("")
    setNewFundDescription("")
    setNewFundTarget("")
    setNewFundCategory("Travel")
    setNewFundDueDate("")

    // Select the newly created fund
    setSelectedFund(newFund)
  }

  // Add new expense
  const handleAddExpense = () => {
    if (!selectedFund || !newExpenseDescription || !newExpenseAmount || !newExpensePaidBy) return

    const amount = Number.parseInt(newExpenseAmount)
    const memberCount = selectedFund.members.length
    const equalShare = Math.floor(amount / memberCount)
    const remainder = amount - equalShare * memberCount

    const newExpense: Expense = {
      id: `e${expenses.length + 1}`,
      description: newExpenseDescription,
      amount: amount,
      paidBy: newExpensePaidBy,
      date: new Date().toISOString().split("T")[0],
      category: newExpenseCategory,
      splitType: newExpenseSplitType as "equal" | "percentage" | "custom",
      fundId: selectedFund.id,
      status: "pending",
      members: selectedFund.members.map((member, index) => ({
        memberId: member.id,
        amount: index === 0 ? equalShare + remainder : equalShare,
        status: member.id === newExpensePaidBy ? "paid" : "pending",
      })),
    }

    setExpenses([...expenses, newExpense])

    // Add to activity
    const paidByMember = selectedFund.members.find((m) => m.id === newExpensePaidBy)
    const updatedFund = {
      ...selectedFund,
      recentActivity: [
        {
          id: `a${Math.random().toString(36).substring(7)}`,
          type: "expense",
          description: `${paidByMember?.name} paid ₹${amount.toLocaleString()} for ${newExpenseDescription}`,
          date: new Date().toISOString().split("T")[0],
          amount: amount,
          memberId: newExpensePaidBy,
        },
        ...selectedFund.recentActivity,
      ],
    }

    setSelectedFund(updatedFund)
    setFunds(funds.map((f) => (f.id === selectedFund.id ? updatedFund : f)))

    setShowNewExpenseDialog(false)
    setNewExpenseDescription("")
    setNewExpenseAmount("")
    setNewExpensePaidBy("")
    setNewExpenseCategory("Food")
    setNewExpenseSplitType("equal")
  }

  // Add new member
  const handleAddMember = () => {
    if (!selectedFund || !newMemberEmail || !newMemberName) return

    const newMember: Member = {
      id: `m${Math.random().toString(36).substring(7)}`,
      name: newMemberName,
      avatar: "/placeholder.svg?height=40&width=40",
      email: newMemberEmail,
      contribution: 0,
      status: "pending",
    }

    const updatedMembers = [...selectedFund.members, newMember]

    const updatedFund = {
      ...selectedFund,
      members: updatedMembers,
      recentActivity: [
        {
          id: `a${Math.random().toString(36).substring(7)}`,
          type: "member_added",
          description: `${newMemberName} was invited to join`,
          date: new Date().toISOString().split("T")[0],
          memberId: newMember.id,
        },
        ...selectedFund.recentActivity,
      ],
    }

    setSelectedFund(updatedFund)
    setFunds(funds.map((f) => (f.id === selectedFund.id ? updatedFund : f)))

    setShowAddMemberDialog(false)
    setNewMemberEmail("")
    setNewMemberName("")
  }

  // Handle contribution
  const handleContribute = (fundId: string, amount: number) => {
    const fund = funds.find((f) => f.id === fundId)
    if (!fund) return

    // Update the fund
    const updatedFund = {
      ...fund,
      totalAmount: fund.totalAmount + amount,
      members: fund.members.map((m) => (m.id === "m1" ? { ...m, contribution: m.contribution + amount } : m)),
      recentActivity: [
        {
          id: `a${Math.random().toString(36).substring(7)}`,
          type: "contribution",
          description: `You contributed ₹${amount.toLocaleString()}`,
          date: new Date().toISOString().split("T")[0],
          amount: amount,
          memberId: "m1",
        },
        ...fund.recentActivity,
      ],
    }

    setFunds(funds.map((f) => (f.id === fundId ? updatedFund : f)))
    if (selectedFund?.id === fundId) {
      setSelectedFund(updatedFund)
    }
  }

  // Handle settle expense
  const handleSettleExpense = (expenseId: string, memberId: string) => {
    const updatedExpenses = expenses.map((expense) => {
      if (expense.id === expenseId) {
        const updatedMembers = expense.members.map((member) =>
          member.memberId === memberId ? { ...member, status: "paid" } : member,
        )

        // Check if all members have paid
        const allSettled = updatedMembers.every((m) => m.status === "paid")

        return {
          ...expense,
          members: updatedMembers,
          status: allSettled ? "settled" : "pending",
        }
      }
      return expense
    })

    setExpenses(updatedExpenses)
  }

  // Get fund expenses
  const getFundExpenses = (fundId: string) => {
    return expenses.filter((e) => e.fundId === fundId)
  }

  // Calculate member balance
  const getMemberBalance = (fundId: string, memberId: string) => {
    const fundExpenses = getFundExpenses(fundId)
    let paid = 0
    let owed = 0

    fundExpenses.forEach((expense) => {
      // Amount paid by this member
      if (expense.paidBy === memberId) {
        paid += expense.amount
      }

      // Amount owed by this member
      const memberShare = expense.members.find((m) => m.memberId === memberId)
      if (memberShare) {
        owed += memberShare.amount
      }
    })

    return paid - owed
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString("en-IN")}`
  }

  // Calculate progress percentage
  const calculateProgress = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100)
  }

  // Get time remaining
  const getTimeRemaining = (dueDate?: string) => {
    if (!dueDate) return "No deadline"

    const now = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return "Overdue"
    if (diffDays === 0) return "Due today"
    if (diffDays === 1) return "Due tomorrow"
    return `${diffDays} days left`
  }

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Travel":
        return <Calendar className="h-4 w-4" />
      case "Housing":
        return <Wallet className="h-4 w-4" />
      case "Food":
        return <Receipt className="h-4 w-4" />
      case "Gift":
        return <Sparkles className="h-4 w-4" />
      default:
        return <Wallet className="h-4 w-4" />
    }
  }

  // Reset form states when dialog closes
  useEffect(() => {
    if (!showNewFundDialog) {
      setNewFundName("")
      setNewFundDescription("")
      setNewFundTarget("")
      setNewFundCategory("Travel")
      setNewFundDueDate("")
    }

    if (!showNewExpenseDialog) {
      setNewExpenseDescription("")
      setNewExpenseAmount("")
      setNewExpensePaidBy("")
      setNewExpenseCategory("Food")
      setNewExpenseSplitType("equal")
    }

    if (!showAddMemberDialog) {
      setNewMemberEmail("")
      setNewMemberName("")
    }
  }, [showNewFundDialog, showNewExpenseDialog, showAddMemberDialog])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight glow-text-purple font-display">
            {selectedFund ? selectedFund.name : "Squad Funds"}
          </h1>
          <p className="text-muted-foreground">
            {selectedFund ? selectedFund.description : "Create and manage shared funds with friends and family"}
          </p>
        </div>

        <div className="flex gap-2 mt-4 md:mt-0">
          {selectedFund ? (
            <>
              <Button
                variant="outline"
                size="sm"
                className="border-purple-500/30 hover:border-purple-500/50"
                onClick={handleBackToList}
              >
                Back to All Funds
              </Button>

              <Dialog open={showNewExpenseDialog} onOpenChange={setShowNewExpenseDialog}>
                <DialogTrigger asChild>
                  <AnimatedGradientBorder variant="purple">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
                    >
                      <Receipt className="mr-2 h-4 w-4" />
                      Add Expense
                    </Button>
                  </AnimatedGradientBorder>
                </DialogTrigger>
                <DialogContent className="glass-card">
                  <DialogHeader>
                    <DialogTitle>Add New Expense</DialogTitle>
                    <DialogDescription>Add a new expense to split among fund members</DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label htmlFor="expense-description" className="text-sm font-medium">
                        Description
                      </label>
                      <Input
                        id="expense-description"
                        placeholder="e.g., Dinner at Restaurant"
                        value={newExpenseDescription}
                        onChange={(e) => setNewExpenseDescription(e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="expense-amount" className="text-sm font-medium">
                        Amount (₹)
                      </label>
                      <Input
                        id="expense-amount"
                        type="number"
                        placeholder="e.g., 1000"
                        value={newExpenseAmount}
                        onChange={(e) => setNewExpenseAmount(e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="expense-paid-by" className="text-sm font-medium">
                        Paid By
                      </label>
                      <Select value={newExpensePaidBy} onValueChange={setNewExpensePaidBy}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select who paid" />
                        </SelectTrigger>
                        <SelectContent>
                          {selectedFund.members.map((member) => (
                            <SelectItem key={member.id} value={member.id}>
                              {member.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="expense-category" className="text-sm font-medium">
                        Category
                      </label>
                      <Select value={newExpenseCategory} onValueChange={setNewExpenseCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Food">Food</SelectItem>
                          <SelectItem value="Travel">Travel</SelectItem>
                          <SelectItem value="Housing">Housing</SelectItem>
                          <SelectItem value="Entertainment">Entertainment</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="expense-split-type" className="text-sm font-medium">
                        Split Type
                      </label>
                      <Select value={newExpenseSplitType} onValueChange={setNewExpenseSplitType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select split type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="equal">Equal Split</SelectItem>
                          <SelectItem value="percentage">Percentage Split</SelectItem>
                          <SelectItem value="custom">Custom Split</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowNewExpenseDialog(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddExpense}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Add Expense
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog open={showAddMemberDialog} onOpenChange={setShowAddMemberDialog}>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline" className="border-purple-500/30 hover:border-purple-500/50">
                    <UserPlus className="mr-2 h-4 w-4 text-purple-400" />
                    Add Member
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass-card">
                  <DialogHeader>
                    <DialogTitle>Add New Member</DialogTitle>
                    <DialogDescription>Invite someone to join this fund</DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label htmlFor="member-name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input
                        id="member-name"
                        placeholder="e.g., John Doe"
                        value={newMemberName}
                        onChange={(e) => setNewMemberName(e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="member-email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="member-email"
                        type="email"
                        placeholder="e.g., john@example.com"
                        value={newMemberEmail}
                        onChange={(e) => setNewMemberEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowAddMemberDialog(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddMember}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Send Invite
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" className="border-purple-500/30 hover:border-purple-500/50">
                <Filter className="mr-2 h-4 w-4 text-purple-400" />
                Filter
              </Button>

              <Dialog open={showNewFundDialog} onOpenChange={setShowNewFundDialog}>
                <DialogTrigger asChild>
                  <AnimatedGradientBorder variant="purple">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Create Fund
                    </Button>
                  </AnimatedGradientBorder>
                </DialogTrigger>
                <DialogContent className="glass-card">
                  <DialogHeader>
                    <DialogTitle>Create New Fund</DialogTitle>
                    <DialogDescription>
                      Create a new shared fund to manage expenses with friends and family
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label htmlFor="fund-name" className="text-sm font-medium">
                        Fund Name
                      </label>
                      <Input
                        id="fund-name"
                        placeholder="e.g., Goa Trip Fund"
                        value={newFundName}
                        onChange={(e) => setNewFundName(e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="fund-description" className="text-sm font-medium">
                        Description
                      </label>
                      <Input
                        id="fund-description"
                        placeholder="e.g., Saving for our annual Goa trip"
                        value={newFundDescription}
                        onChange={(e) => setNewFundDescription(e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="fund-target" className="text-sm font-medium">
                        Target Amount (₹)
                      </label>
                      <Input
                        id="fund-target"
                        type="number"
                        placeholder="e.g., 50000"
                        value={newFundTarget}
                        onChange={(e) => setNewFundTarget(e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="fund-category" className="text-sm font-medium">
                        Category
                      </label>
                      <Select value={newFundCategory} onValueChange={setNewFundCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Travel">Travel</SelectItem>
                          <SelectItem value="Housing">Housing</SelectItem>
                          <SelectItem value="Gift">Gift</SelectItem>
                          <SelectItem value="Event">Event</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <label htmlFor="fund-due-date" className="text-sm font-medium">
                        Due Date (Optional)
                      </label>
                      <Input
                        id="fund-due-date"
                        type="date"
                        value={newFundDueDate}
                        onChange={(e) => setNewFundDueDate(e.target.value)}
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowNewFundDialog(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCreateFund}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      Create Fund
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {selectedFund ? (
          <motion.div
            key="fund-details"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Fund Overview */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="glass-card neon-border-purple animate-glow-purple md:col-span-2">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                        {selectedFund.category}
                      </Badge>
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                        {selectedFund.members.length} Members
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{getTimeRemaining(selectedFund.dueDate)}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">Progress</div>
                        <div className="text-sm font-medium">
                          {formatCurrency(selectedFund.totalAmount)} of {formatCurrency(selectedFund.targetAmount)}
                        </div>
                      </div>
                      <Progress
                        value={calculateProgress(selectedFund.totalAmount, selectedFund.targetAmount)}
                        className="h-2 bg-muted"
                        indicatorClassName="bg-gradient-to-r from-purple-600 to-pink-600"
                      />
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <div>{calculateProgress(selectedFund.totalAmount, selectedFund.targetAmount)}% Complete</div>
                        <div>{formatCurrency(selectedFund.targetAmount - selectedFund.totalAmount)} remaining</div>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <Card className="bg-purple-500/5 border-purple-500/10">
                        <CardContent className="p-4">
                          <div className="flex flex-col items-center text-center">
                            <Wallet className="h-8 w-8 text-purple-400 mb-2" />
                            <div className="text-sm text-muted-foreground">Total Collected</div>
                            <div className="text-xl font-bold mt-1">{formatCurrency(selectedFund.totalAmount)}</div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-blue-500/5 border-blue-500/10">
                        <CardContent className="p-4">
                          <div className="flex flex-col items-center text-center">
                            <Receipt className="h-8 w-8 text-blue-400 mb-2" />
                            <div className="text-sm text-muted-foreground">Total Expenses</div>
                            <div className="text-xl font-bold mt-1">
                              {formatCurrency(getFundExpenses(selectedFund.id).reduce((sum, e) => sum + e.amount, 0))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-green-500/5 border-green-500/10">
                        <CardContent className="p-4">
                          <div className="flex flex-col items-center text-center">
                            <PieChart className="h-8 w-8 text-green-400 mb-2" />
                            <div className="text-sm text-muted-foreground">Your Contribution</div>
                            <div className="text-xl font-bold mt-1">
                              {formatCurrency(selectedFund.members.find((m) => m.id === "m1")?.contribution || 0)}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Dialog>
                        <DialogTrigger asChild>
                          <AnimatedGradientBorder variant="purple">
                            <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0">
                              <Plus className="mr-2 h-4 w-4" />
                              Contribute
                            </Button>
                          </AnimatedGradientBorder>
                        </DialogTrigger>
                        <DialogContent className="glass-card">
                          <DialogHeader>
                            <DialogTitle>Contribute to Fund</DialogTitle>
                            <DialogDescription>Add money to {selectedFund.name}</DialogDescription>
                          </DialogHeader>

                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-3 gap-2">
                              {[500, 1000, 2000].map((amount) => (
                                <Button
                                  key={amount}
                                  variant="outline"
                                  className="border-purple-500/30 hover:border-purple-500/50"
                                  onClick={() => {
                                    handleContribute(selectedFund.id, amount)
                                  }}
                                >
                                  ₹{amount}
                                </Button>
                              ))}
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                              {[5000, 10000, 20000].map((amount) => (
                                <Button
                                  key={amount}
                                  variant="outline"
                                  className="border-purple-500/30 hover:border-purple-500/50"
                                  onClick={() => {
                                    handleContribute(selectedFund.id, amount)
                                  }}
                                >
                                  ₹{amount}
                                </Button>
                              ))}
                            </div>

                            <div className="flex items-center gap-2">
                              <Input type="number" placeholder="Custom amount" className="flex-1" id="custom-amount" />
                              <Button
                                onClick={() => {
                                  const input = document.getElementById("custom-amount") as HTMLInputElement
                                  const amount = Number.parseInt(input.value)
                                  if (amount > 0) {
                                    handleContribute(selectedFund.id, amount)
                                  }
                                }}
                              >
                                Add
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="outline"
                        className="w-full sm:w-auto border-purple-500/30 hover:border-purple-500/50"
                      >
                        <Share2 className="mr-2 h-4 w-4 text-purple-400" />
                        Share Fund
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full sm:w-auto border-purple-500/30 hover:border-purple-500/50"
                      >
                        <SlidersHorizontal className="mr-2 h-4 w-4 text-purple-400" />
                        Fund Settings
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-400" />
                    <span>AI Insights</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AnimatePresence>
                    {showAIInsight && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                      >
                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                          <div className="flex items-center gap-2 mb-1">
                            <TrendingUp className="h-4 w-4 text-purple-400" />
                            <span className="text-sm font-medium text-purple-400">Spending Pattern</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Based on your group's spending, you're on track to reach your goal by{" "}
                            {selectedFund.dueDate
                              ? new Date(selectedFund.dueDate).toLocaleDateString("en-IN", {
                                  day: "numeric",
                                  month: "short",
                                })
                              : "the deadline"}
                            .
                          </p>
                        </div>

                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                          <div className="flex items-center gap-2 mb-1">
                            <ArrowUpRight className="h-4 w-4 text-purple-400" />
                            <span className="text-sm font-medium text-purple-400">Contribution Suggestion</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            If each member contributes ₹
                            {Math.ceil(
                              (selectedFund.targetAmount - selectedFund.totalAmount) / selectedFund.members.length,
                            ).toLocaleString()}{" "}
                            more, you'll reach your target.
                          </p>
                        </div>

                        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                          <div className="flex items-center gap-2 mb-1">
                            <Zap className="h-4 w-4 text-purple-400" />
                            <span className="text-sm font-medium text-purple-400">Smart Tip</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Setting up weekly auto-contributions of ₹500 per member would help you reach your goal
                            faster.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="glass">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="expenses">Expenses</TabsTrigger>
                <TabsTrigger value="members">Members</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>Recent Expenses</CardTitle>
                      <CardDescription>Latest expenses in this fund</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {getFundExpenses(selectedFund.id)
                          .slice(0, 3)
                          .map((expense) => {
                            const paidByMember = selectedFund.members.find((m) => m.id === expense.paidBy)
                            return (
                              <div
                                key={expense.id}
                                className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/20 transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="p-2 rounded-full bg-blue-500/20 text-blue-400">
                                    {getCategoryIcon(expense.category)}
                                  </div>
                                  <div>
                                    <p className="font-medium">{expense.description}</p>
                                    <p className="text-xs text-muted-foreground">
                                      Paid by {paidByMember?.name} •{" "}
                                      {new Date(expense.date).toLocaleDateString("en-IN", {
                                        day: "numeric",
                                        month: "short",
                                      })}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">{formatCurrency(expense.amount)}</p>
                                  <Badge
                                    variant="outline"
                                    className={
                                      expense.status === "settled"
                                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                    }
                                  >
                                    {expense.status === "settled" ? "Settled" : "Pending"}
                                  </Badge>
                                </div>
                              </div>
                            )
                          })}

                        {getFundExpenses(selectedFund.id).length === 0 && (
                          <div className="flex flex-col items-center justify-center py-6 text-center">
                            <Receipt className="h-10 w-10 text-muted-foreground mb-2" />
                            <p className="text-muted-foreground">No expenses yet</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Add your first expense to start tracking
                            </p>
                          </div>
                        )}
                      </div>

                      {getFundExpenses(selectedFund.id).length > 0 && (
                        <Button
                          variant="link"
                          className="mt-2 w-full text-purple-400"
                          onClick={() => setActiveTab("expenses")}
                        >
                          View All Expenses
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle>Member Contributions</CardTitle>
                      <CardDescription>Who has contributed what</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {selectedFund.members.map((member) => {
                          const contributionPercentage = Math.round(
                            (member.contribution / selectedFund.targetAmount) * 100,
                          )
                          return (
                            <div key={member.id} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={member.avatar} alt={member.name} />
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm font-medium">{member.name}</span>
                                </div>
                                <span className="text-sm font-medium">{formatCurrency(member.contribution)}</span>
                              </div>
                              <Progress
                                value={contributionPercentage}
                                className="h-1.5 bg-muted"
                                indicatorClassName="bg-gradient-to-r from-purple-600 to-pink-600"
                              />
                              <div className="flex justify-between items-center text-xs text-muted-foreground">
                                <div>{contributionPercentage}% of target</div>
                                <div>
                                  {member.id === "m1" ? "You" : member.name}{" "}
                                  {member.status === "pending" ? "(Pending)" : ""}
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>

                      <Button
                        variant="link"
                        className="mt-2 w-full text-purple-400"
                        onClick={() => setActiveTab("members")}
                      >
                        View All Members
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest updates in this fund</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedFund.recentActivity.slice(0, 5).map((activity) => {
                        const activityMember = activity.memberId
                          ? selectedFund.members.find((m) => m.id === activity.memberId)
                          : null

                        return (
                          <div
                            key={activity.id}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/20 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-2 rounded-full ${
                                  activity.type === "contribution"
                                    ? "bg-green-500/20 text-green-400"
                                    : activity.type === "expense"
                                      ? "bg-blue-500/20 text-blue-400"
                                      : activity.type === "member_added"
                                        ? "bg-purple-500/20 text-purple-400"
                                        : "bg-amber-500/20 text-amber-400"
                                }`}
                              >
                                {activity.type === "contribution" ? (
                                  <Wallet className="h-4 w-4" />
                                ) : activity.type === "expense" ? (
                                  <Receipt className="h-4 w-4" />
                                ) : activity.type === "member_added" ? (
                                  <UserPlus className="h-4 w-4" />
                                ) : (
                                  <Sparkles className="h-4 w-4" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium">{activity.description}</p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(activity.date).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                  })}
                                </p>
                              </div>
                            </div>
                            {activity.amount && <div className="font-medium">{formatCurrency(activity.amount)}</div>}
                          </div>
                        )
                      })}
                    </div>

                    <Button
                      variant="link"
                      className="mt-2 w-full text-purple-400"
                      onClick={() => setActiveTab("activity")}
                    >
                      View All Activity
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="expenses" className="space-y-4">
                <Card className="glass-card">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>All Expenses</CardTitle>
                        <CardDescription>Track and manage all expenses</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Search expenses..."
                          className="w-[200px]"
                          prefix={<Search className="h-4 w-4 text-muted-foreground" />}
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="border-purple-500/30 hover:border-purple-500/50"
                        >
                          <Filter className="h-4 w-4 text-purple-400" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {getFundExpenses(selectedFund.id).map((expense) => {
                        const paidByMember = selectedFund.members.find((m) => m.id === expense.paidBy)
                        const currentUserShare = expense.members.find((m) => m.memberId === "m1")

                        return (
                          <Card key={expense.id} className="overflow-hidden">
                            <CardHeader className="bg-muted/20 py-3">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <div className="p-2 rounded-full bg-blue-500/20 text-blue-400">
                                    {getCategoryIcon(expense.category)}
                                  </div>
                                  <div>
                                    <p className="font-medium">{expense.description}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {new Date(expense.date).toLocaleDateString("en-IN", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                      })}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-medium">{formatCurrency(expense.amount)}</p>
                                  <p className="text-xs text-muted-foreground">Paid by {paidByMember?.name}</p>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="py-3">
                              <div className="space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                  <span>Split Type</span>
                                  <Badge
                                    variant="outline"
                                    className="bg-purple-500/10 text-purple-400 border-purple-500/20"
                                  >
                                    {expense.splitType === "equal"
                                      ? "Equal Split"
                                      : expense.splitType === "percentage"
                                        ? "Percentage Split"
                                        : "Custom Split"}
                                  </Badge>
                                </div>

                                <div className="space-y-2">
                                  {expense.members.map((member) => {
                                    const memberData = selectedFund.members.find((m) => m.id === member.memberId)
                                    return (
                                      <div key={member.memberId} className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                          <Avatar className="h-6 w-6">
                                            <AvatarImage src={memberData?.avatar} alt={memberData?.name} />
                                            <AvatarFallback>{memberData?.name.charAt(0)}</AvatarFallback>
                                          </Avatar>
                                          <span className="text-sm">
                                            {member.memberId === "m1" ? "You" : memberData?.name}
                                          </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <span className="text-sm font-medium">{formatCurrency(member.amount)}</span>
                                          {member.status === "paid" ? (
                                            <Badge
                                              variant="outline"
                                              className="bg-green-500/10 text-green-400 border-green-500/20"
                                            >
                                              <CheckCircle2 className="mr-1 h-3 w-3" />
                                              Paid
                                            </Badge>
                                          ) : (
                                            <Badge
                                              variant="outline"
                                              className="bg-amber-500/10 text-amber-400 border-amber-500/20"
                                            >
                                              <AlertCircle className="mr-1 h-3 w-3" />
                                              Pending
                                            </Badge>
                                          )}
                                        </div>
                                      </div>
                                    )
                                  })}
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="bg-muted/10 py-3 flex justify-between">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Receipt className="h-4 w-4" />
                                <span>{expense.status === "settled" ? "Fully settled" : "Settlement pending"}</span>
                              </div>

                              {currentUserShare && currentUserShare.status === "pending" && expense.paidBy !== "m1" && (
                                <Button
                                  size="sm"
                                  onClick={() => handleSettleExpense(expense.id, "m1")}
                                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                >
                                  Pay {formatCurrency(currentUserShare.amount)}
                                </Button>
                              )}

                              {expense.paidBy === "m1" && expense.status !== "settled" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-purple-500/30 hover:border-purple-500/50"
                                >
                                  <Bell className="mr-2 h-4 w-4 text-purple-400" />
                                  Send Reminder
                                </Button>
                              )}
                            </CardFooter>
                          </Card>
                        )
                      })}

                      {getFundExpenses(selectedFund.id).length === 0 && (
                        <div className="flex flex-col items-center justify-center py-10 text-center">
                          <Receipt className="h-16 w-16 text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium mb-1">No expenses yet</h3>
                          <p className="text-muted-foreground max-w-md">
                            Add your first expense to start tracking and splitting costs with your group
                          </p>
                          <Button
                            className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                            onClick={() => setShowNewExpenseDialog(true)}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add First Expense
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="members" className="space-y-4">
                <Card className="glass-card">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Fund Members</CardTitle>
                        <CardDescription>Manage members and their contributions</CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-500/30 hover:border-purple-500/50"
                        onClick={() => setShowAddMemberDialog(true)}
                      >
                        <UserPlus className="mr-2 h-4 w-4 text-purple-400" />
                        Add Member
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedFund.members.map((member) => {
                        const balance = getMemberBalance(selectedFund.id, member.id)
                        return (
                          <Card key={member.id} className="overflow-hidden">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                  <Avatar>
                                    <AvatarImage src={member.avatar} alt={member.name} />
                                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">
                                      {member.name} {member.id === "m1" && "(You)"}
                                    </p>
                                    <p className="text-xs text-muted-foreground">{member.email}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {member.status === "pending" ? (
                                    <Badge
                                      variant="outline"
                                      className="bg-amber-500/10 text-amber-400 border-amber-500/20"
                                    >
                                      Pending
                                    </Badge>
                                  ) : (
                                    <Badge
                                      variant="outline"
                                      className="bg-green-500/10 text-green-400 border-green-500/20"
                                    >
                                      Active
                                    </Badge>
                                  )}
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                <div className="p-3 rounded-lg bg-muted/20">
                                  <div className="text-xs text-muted-foreground mb-1">Contribution</div>
                                  <div className="font-medium">{formatCurrency(member.contribution)}</div>
                                  <div className="text-xs text-muted-foreground mt-1">
                                    {Math.round((member.contribution / selectedFund.targetAmount) * 100)}% of target
                                  </div>
                                </div>

                                <div className="p-3 rounded-lg bg-muted/20">
                                  <div className="text-xs text-muted-foreground mb-1">Balance</div>
                                  <div
                                    className={`font-medium ${balance > 0 ? "text-green-400" : balance < 0 ? "text-red-400" : ""}`}
                                  >
                                    {balance > 0 ? "+" : ""}
                                    {formatCurrency(balance)}
                                  </div>
                                  <div className="text-xs text-muted-foreground mt-1">
                                    {balance > 0 ? "To be received" : balance < 0 ? "To be paid" : "Settled up"}
                                  </div>
                                </div>

                                <div className="p-3 rounded-lg bg-muted/20">
                                  <div className="text-xs text-muted-foreground mb-1">Expenses Paid</div>
                                  <div className="font-medium">
                                    {formatCurrency(
                                      getFundExpenses(selectedFund.id)
                                        .filter((e) => e.paidBy === member.id)
                                        .reduce((sum, e) => sum + e.amount, 0),
                                    )}
                                  </div>
                                  <div className="text-xs text-muted-foreground mt-1">
                                    {getFundExpenses(selectedFund.id).filter((e) => e.paidBy === member.id).length}{" "}
                                    expenses
                                  </div>
                                </div>
                              </div>

                              {member.id !== "m1" && (
                                <div className="flex gap-2 mt-4 justify-end">
                                  {balance < 0 && (
                                    <Button
                                      size="sm"
                                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                    >
                                      Pay {formatCurrency(Math.abs(balance))}
                                    </Button>
                                  )}

                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-purple-500/30 hover:border-purple-500/50"
                                  >
                                    <Share2 className="mr-2 h-4 w-4 text-purple-400" />
                                    Send Reminder
                                  </Button>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="space-y-4">
                <Card className="glass-card">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Activity Feed</CardTitle>
                        <CardDescription>All updates and transactions</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Select defaultValue="all">
                          <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Filter by type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Activity</SelectItem>
                            <SelectItem value="contribution">Contributions</SelectItem>
                            <SelectItem value="expense">Expenses</SelectItem>
                            <SelectItem value="member">Members</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedFund.recentActivity.map((activity) => {
                        const activityMember = activity.memberId
                          ? selectedFund.members.find((m) => m.id === activity.memberId)
                          : null

                        return (
                          <div
                            key={activity.id}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/20 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-2 rounded-full ${
                                  activity.type === "contribution"
                                    ? "bg-green-500/20 text-green-400"
                                    : activity.type === "expense"
                                      ? "bg-blue-500/20 text-blue-400"
                                      : activity.type === "member_added"
                                        ? "bg-purple-500/20 text-purple-400"
                                        : "bg-amber-500/20 text-amber-400"
                                }`}
                              >
                                {activity.type === "contribution" ? (
                                  <Wallet className="h-4 w-4" />
                                ) : activity.type === "expense" ? (
                                  <Receipt className="h-4 w-4" />
                                ) : activity.type === "member_added" ? (
                                  <UserPlus className="h-4 w-4" />
                                ) : (
                                  <Sparkles className="h-4 w-4" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium">{activity.description}</p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(activity.date).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </p>
                              </div>
                            </div>
                            {activity.amount && <div className="font-medium">{formatCurrency(activity.amount)}</div>}
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        ) : (
          <motion.div
            key="funds-list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* AI Insight Card */}
            <Card className="glass-card neon-border-purple animate-glow-purple">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 animate-pulse" />
                    <div className="absolute inset-2 rounded-full bg-gradient-to-r from-purple-600/30 to-pink-600/30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Brain className="h-12 w-12 text-purple-400" />
                    </div>
                    <GlowingStars className="absolute inset-0" />
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-bold mb-2 font-display">AI-Powered Squad Funds</h3>
                    <p className="text-muted-foreground mb-4">
                      Create shared funds with friends and family to manage group expenses, track contributions, and
                      split costs effortlessly.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                      <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                        <Sparkles className="mr-1 h-3 w-3" />
                        Smart Expense Splitting
                      </Badge>
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                        <Brain className="mr-1 h-3 w-3" />
                        AI Insights
                      </Badge>
                      <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                        <Wallet className="mr-1 h-3 w-3" />
                        UPI Integration
                      </Badge>
                    </div>
                  </div>

                  <AnimatedGradientBorder variant="purple">
                    <Button
                      onClick={() => setShowNewFundDialog(true)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Create New Fund
                    </Button>
                  </AnimatedGradientBorder>
                </div>
              </CardContent>
            </Card>

            {/* Funds Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {funds.map((fund) => (
                <motion.div key={fund.id} whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Card
                    className="glass-card overflow-hidden h-full cursor-pointer"
                    onClick={() => handleSelectFund(fund)}
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-600"></div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{fund.name}</CardTitle>
                          <CardDescription className="line-clamp-1">{fund.description}</CardDescription>
                        </div>
                        <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                          {fund.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span>{calculateProgress(fund.totalAmount, fund.targetAmount)}%</span>
                          </div>
                          <Progress
                            value={calculateProgress(fund.totalAmount, fund.targetAmount)}
                            className="h-2 bg-muted"
                            indicatorClassName="bg-gradient-to-r from-purple-600 to-pink-600"
                          />
                        </div>

                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-xs text-muted-foreground">Collected</div>
                            <div className="font-medium">{formatCurrency(fund.totalAmount)}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-muted-foreground">Target</div>
                            <div className="font-medium">{formatCurrency(fund.targetAmount)}</div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex -space-x-2">
                            {fund.members.slice(0, 3).map((member, index) => (
                              <Avatar key={member.id} className="border-2 border-background h-8 w-8">
                                <AvatarImage src={member.avatar} alt={member.name} />
                                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                            ))}
                            {fund.members.length > 3 && (
                              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-xs font-medium">
                                +{fund.members.length - 3}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{getTimeRemaining(fund.dueDate)}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="bg-muted/10 flex justify-between">
                      <div className="text-sm text-muted-foreground">
                        Created{" "}
                        {new Date(fund.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                      </div>
                      <Button variant="ghost" size="sm" className="gap-1">
                        View Details
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}

              {/* Create New Fund Card */}
              <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card
                  className="glass-card h-full border-dashed border-2 border-muted-foreground/20 flex flex-col items-center justify-center p-6 cursor-pointer"
                  onClick={() => setShowNewFundDialog(true)}
                >
                  <div className="rounded-full bg-purple-500/10 p-4 mb-4">
                    <Plus className="h-8 w-8 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Create New Fund</h3>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    Start a new shared fund for trips, events, or group expenses
                  </p>
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Get Started
                  </Button>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

