"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Calendar, CreditCard, Filter, Search } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"

// Sample transaction data
const transactions = [
  {
    id: 1,
    name: "Grocery Store",
    amount: -85.32,
    category: "Food",
    date: "2023-03-20",
    time: "14:30",
    paymentMethod: "Credit Card",
    status: "completed",
  },
  {
    id: 2,
    name: "Salary Deposit",
    amount: 3200.0,
    category: "Income",
    date: "2023-03-19",
    time: "09:15",
    paymentMethod: "Bank Transfer",
    status: "completed",
  },
  {
    id: 3,
    name: "Netflix Subscription",
    amount: -15.99,
    category: "Entertainment",
    date: "2023-03-15",
    time: "00:00",
    paymentMethod: "Credit Card",
    status: "completed",
  },
  {
    id: 4,
    name: "Gas Station",
    amount: -45.5,
    category: "Transport",
    date: "2023-03-14",
    time: "18:45",
    paymentMethod: "Debit Card",
    status: "completed",
  },
  {
    id: 5,
    name: "Restaurant",
    amount: -62.75,
    category: "Food",
    date: "2023-03-12",
    time: "20:30",
    paymentMethod: "Credit Card",
    status: "completed",
  },
  {
    id: 6,
    name: "Freelance Payment",
    amount: 850.0,
    category: "Income",
    date: "2023-03-10",
    time: "15:20",
    paymentMethod: "Bank Transfer",
    status: "completed",
  },
  {
    id: 7,
    name: "Mobile Phone Bill",
    amount: -55.0,
    category: "Bills",
    date: "2023-03-08",
    time: "10:00",
    paymentMethod: "Automatic Payment",
    status: "completed",
  },
  {
    id: 8,
    name: "Online Shopping",
    amount: -120.45,
    category: "Shopping",
    date: "2023-03-05",
    time: "13:15",
    paymentMethod: "Credit Card",
    status: "completed",
  },
]

// Categories with colors
const categories = [
  { name: "All", color: "gray" },
  { name: "Food", color: "blue" },
  { name: "Transport", color: "green" },
  { name: "Entertainment", color: "purple" },
  { name: "Shopping", color: "yellow" },
  { name: "Bills", color: "red" },
  { name: "Income", color: "emerald" },
]

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedTab, setSelectedTab] = useState("all")

  // Filter transactions based on search query, category, and tab
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || transaction.category === selectedCategory
    const matchesTab =
      selectedTab === "all" ||
      (selectedTab === "income" && transaction.amount > 0) ||
      (selectedTab === "expenses" && transaction.amount < 0)

    return matchesSearch && matchesCategory && matchesTab
  })

  // Get category color
  const getCategoryColor = (categoryName: string) => {
    const category = categories.find((c) => c.name === categoryName)
    return category ? category.color : "gray"
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight glow-text">Transactions</h1>
          <p className="text-muted-foreground">Track and analyze your financial activities</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Advanced Filters
          </Button>
          <AnimatedGradientBorder>
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Add Transaction
            </Button>
          </AnimatedGradientBorder>
        </div>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search transactions or use natural language (e.g. 'food last week')"
                className="pl-8 bg-background/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="All" onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px] bg-background/50">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.name} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="bg-background/50">
                <Calendar className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
            <TabsList className="bg-muted/50 backdrop-blur-sm">
              <TabsTrigger value="all">All Transactions</TabsTrigger>
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-muted-foreground border-b">
                  <div className="col-span-5 md:col-span-6">Transaction</div>
                  <div className="col-span-3 md:col-span-2">Category</div>
                  <div className="col-span-2 hidden md:block">Date</div>
                  <div className="col-span-4 md:col-span-2 text-right">Amount</div>
                </div>
                <div className="divide-y">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/50 transition-colors"
                      >
                        <div className="col-span-5 md:col-span-6 flex items-center gap-3">
                          <div
                            className={`p-2 rounded-full bg-${getCategoryColor(transaction.category)}-500/20 text-${getCategoryColor(transaction.category)}-500`}
                          >
                            {transaction.amount > 0 ? (
                              <ArrowUp className="h-4 w-4" />
                            ) : (
                              <ArrowDown className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{transaction.name}</p>
                            <p className="text-xs text-muted-foreground hidden md:block">
                              {transaction.time} • {transaction.paymentMethod}
                            </p>
                          </div>
                        </div>
                        <div className="col-span-3 md:col-span-2">
                          <Badge
                            variant="outline"
                            className={`bg-${getCategoryColor(transaction.category)}-500/10 text-${getCategoryColor(transaction.category)}-500 border-${getCategoryColor(transaction.category)}-500/20`}
                          >
                            {transaction.category}
                          </Badge>
                        </div>
                        <div className="col-span-2 hidden md:block text-muted-foreground text-sm">
                          {formatDate(transaction.date)}
                        </div>
                        <div
                          className={`col-span-4 md:col-span-2 text-right font-medium ${
                            transaction.amount > 0 ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {transaction.amount > 0 ? "+" : ""}
                          {transaction.amount.toFixed(2)}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-muted-foreground">No transactions found</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="income" className="space-y-4">
              {/* Same structure as "all" tab but filtered for income */}
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-muted-foreground border-b">
                  <div className="col-span-5 md:col-span-6">Transaction</div>
                  <div className="col-span-3 md:col-span-2">Category</div>
                  <div className="col-span-2 hidden md:block">Date</div>
                  <div className="col-span-4 md:col-span-2 text-right">Amount</div>
                </div>
                <div className="divide-y">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/50 transition-colors"
                      >
                        <div className="col-span-5 md:col-span-6 flex items-center gap-3">
                          <div className="p-2 rounded-full bg-green-500/20 text-green-500">
                            <ArrowUp className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">{transaction.name}</p>
                            <p className="text-xs text-muted-foreground hidden md:block">
                              {transaction.time} • {transaction.paymentMethod}
                            </p>
                          </div>
                        </div>
                        <div className="col-span-3 md:col-span-2">
                          <Badge
                            variant="outline"
                            className={`bg-${getCategoryColor(transaction.category)}-500/10 text-${getCategoryColor(transaction.category)}-500 border-${getCategoryColor(transaction.category)}-500/20`}
                          >
                            {transaction.category}
                          </Badge>
                        </div>
                        <div className="col-span-2 hidden md:block text-muted-foreground text-sm">
                          {formatDate(transaction.date)}
                        </div>
                        <div className="col-span-4 md:col-span-2 text-right font-medium text-green-500">
                          +{transaction.amount.toFixed(2)}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-muted-foreground">No income transactions found</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="expenses" className="space-y-4">
              {/* Same structure as "all" tab but filtered for expenses */}
              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-muted-foreground border-b">
                  <div className="col-span-5 md:col-span-6">Transaction</div>
                  <div className="col-span-3 md:col-span-2">Category</div>
                  <div className="col-span-2 hidden md:block">Date</div>
                  <div className="col-span-4 md:col-span-2 text-right">Amount</div>
                </div>
                <div className="divide-y">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/50 transition-colors"
                      >
                        <div className="col-span-5 md:col-span-6 flex items-center gap-3">
                          <div className="p-2 rounded-full bg-red-500/20 text-red-500">
                            <ArrowDown className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">{transaction.name}</p>
                            <p className="text-xs text-muted-foreground hidden md:block">
                              {transaction.time} • {transaction.paymentMethod}
                            </p>
                          </div>
                        </div>
                        <div className="col-span-3 md:col-span-2">
                          <Badge
                            variant="outline"
                            className={`bg-${getCategoryColor(transaction.category)}-500/10 text-${getCategoryColor(transaction.category)}-500 border-${getCategoryColor(transaction.category)}-500/20`}
                          >
                            {transaction.category}
                          </Badge>
                        </div>
                        <div className="col-span-2 hidden md:block text-muted-foreground text-sm">
                          {formatDate(transaction.date)}
                        </div>
                        <div className="col-span-4 md:col-span-2 text-right font-medium text-red-500">
                          {transaction.amount.toFixed(2)}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-muted-foreground">No expense transactions found</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>AI-Powered Spend Analysis</CardTitle>
            <CardDescription>Insights based on your transaction history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <h4 className="font-medium text-blue-400 mb-2">Spending Pattern</h4>
                <p className="text-sm text-muted-foreground">
                  Your food expenses have increased by 15% compared to last month. This is primarily due to more
                  restaurant visits.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <h4 className="font-medium text-purple-400 mb-2">Budget Alert</h4>
                <p className="text-sm text-muted-foreground">
                  You've spent 85% of your entertainment budget this month with 10 days remaining. Consider adjusting
                  your spending.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                <h4 className="font-medium text-green-400 mb-2">Saving Opportunity</h4>
                <p className="text-sm text-muted-foreground">
                  You have 3 subscription services with overlapping features. Consolidating could save you $25/month.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Smart Budgeting</CardTitle>
            <CardDescription>AI-recommended budget based on your spending habits</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Food & Dining</span>
                  <span className="text-sm font-medium">75%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                </div>
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-muted-foreground">$450 spent</p>
                  <p className="text-xs text-muted-foreground">$600 budget</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Transportation</span>
                  <span className="text-sm font-medium">45%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "45%" }}></div>
                </div>
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-muted-foreground">$135 spent</p>
                  <p className="text-xs text-muted-foreground">$300 budget</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Entertainment</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-red-500 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                </div>
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-muted-foreground">$170 spent</p>
                  <p className="text-xs text-muted-foreground">$200 budget</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Shopping</span>
                  <span className="text-sm font-medium">60%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "60%" }}></div>
                </div>
                <div className="flex justify-between mt-1">
                  <p className="text-xs text-muted-foreground">$240 spent</p>
                  <p className="text-xs text-muted-foreground">$400 budget</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

