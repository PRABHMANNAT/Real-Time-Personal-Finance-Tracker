"use client"

import { useState } from "react"
import { Activity, ArrowDown, ArrowUp, CreditCard, DollarSign, LineChart, Wallet, Sparkles } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "@/components/ui/chart"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Sample data
  const balanceHistory = [
    { name: "Jan", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 5000 },
    { name: "Apr", value: 4500 },
    { name: "May", value: 6000 },
    { name: "Jun", value: 5500 },
    { name: "Jul", value: 7000 },
  ]

  const expensesByCategory = [
    { name: "Food", value: 400 },
    { name: "Transport", value: 300 },
    { name: "Shopping", value: 300 },
    { name: "Bills", value: 200 },
    { name: "Entertainment", value: 100 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

  const recentTransactions = [
    { id: 1, name: "Grocery Store", amount: -85.32, category: "Food", date: "Today" },
    { id: 2, name: "Salary Deposit", amount: 3200.0, category: "Income", date: "Yesterday" },
    { id: 3, name: "Netflix Subscription", amount: -15.99, category: "Entertainment", date: "Mar 15" },
    { id: 4, name: "Gas Station", amount: -45.5, category: "Transport", date: "Mar 14" },
  ]

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight glow-text">HoloFinance™ Dashboard</h1>
          <p className="text-muted-foreground">Your AI-powered financial command center</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm">
            <DollarSign className="mr-2 h-4 w-4" />
            Add Income
          </Button>
          <AnimatedGradientBorder>
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Add Expense
            </Button>
          </AnimatedGradientBorder>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 glow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,546.00</div>
            <p className="text-xs text-muted-foreground">+2.5% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <ArrowUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$6,350.00</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <ArrowDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,850.00</div>
            <p className="text-xs text-muted-foreground">-4% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">39.4%</div>
            <p className="text-xs text-muted-foreground">+5.2% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-muted/50 backdrop-blur-sm">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="forecast">Forecast</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Balance History</CardTitle>
                <CardDescription>Your financial journey over time</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={balanceHistory}>
                    <defs>
                      <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(17, 24, 39, 0.8)",
                        borderColor: "#374151",
                        borderRadius: "0.5rem",
                        color: "#F9FAFB",
                      }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#3B82F6" fillOpacity={1} fill="url(#colorBalance)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="col-span-3 bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Expenses by Category</CardTitle>
                <CardDescription>Where your money is going</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={expensesByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {expensesByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(17, 24, 39, 0.8)",
                        borderColor: "#374151",
                        borderRadius: "0.5rem",
                        color: "#F9FAFB",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your latest financial activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-full ${
                          transaction.amount > 0 ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                        }`}
                      >
                        {transaction.amount > 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {transaction.category} • {transaction.date}
                        </p>
                      </div>
                    </div>
                    <p className={`font-medium ${transaction.amount > 0 ? "text-green-500" : "text-red-500"}`}>
                      {transaction.amount > 0 ? "+" : ""}
                      {transaction.amount.toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Spending Analytics</CardTitle>
              <CardDescription>Detailed breakdown of your spending habits</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={[
                    { name: "Jan", food: 400, transport: 240, shopping: 320, bills: 500, entertainment: 180 },
                    { name: "Feb", food: 380, transport: 220, shopping: 280, bills: 500, entertainment: 160 },
                    { name: "Mar", food: 420, transport: 260, shopping: 350, bills: 500, entertainment: 210 },
                    { name: "Apr", food: 390, transport: 230, shopping: 310, bills: 500, entertainment: 190 },
                    { name: "May", food: 410, transport: 250, shopping: 330, bills: 500, entertainment: 200 },
                    { name: "Jun", food: 430, transport: 270, shopping: 360, bills: 500, entertainment: 220 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(17, 24, 39, 0.8)",
                      borderColor: "#374151",
                      borderRadius: "0.5rem",
                      color: "#F9FAFB",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="food" name="Food" fill="#0088FE" />
                  <Bar dataKey="transport" name="Transport" fill="#00C49F" />
                  <Bar dataKey="shopping" name="Shopping" fill="#FFBB28" />
                  <Bar dataKey="bills" name="Bills" fill="#FF8042" />
                  <Bar dataKey="entertainment" name="Entertainment" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-400" />
                  AI Financial Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <h4 className="font-medium text-blue-400 mb-2">Spending Pattern Detected</h4>
                    <p className="text-sm text-muted-foreground">
                      Your food expenses have increased by 15% this month. Consider reviewing your grocery shopping
                      habits.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                    <h4 className="font-medium text-green-400 mb-2">Saving Opportunity</h4>
                    <p className="text-sm text-muted-foreground">
                      You could save $120/month by optimizing your subscription services. Would you like a detailed
                      analysis?
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <h4 className="font-medium text-purple-400 mb-2">Investment Recommendation</h4>
                    <p className="text-sm text-muted-foreground">
                      Based on your risk profile and goals, consider allocating 10% more to index funds for better
                      long-term growth.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5 text-blue-400" />
                  Financial Health Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center h-full py-6">
                  <div className="relative w-48 h-48 mb-4">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                        78
                      </div>
                    </div>
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#1f2937" strokeWidth="10" />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="10"
                        strokeDasharray="282.7"
                        strokeDashoffset="62.2"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3B82F6" />
                          <stop offset="100%" stopColor="#8B5CF6" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Good</h3>
                  <p className="text-sm text-muted-foreground text-center max-w-xs">
                    Your financial health is good, but there's room for improvement in your emergency fund.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forecast" className="space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Financial Forecast</CardTitle>
              <CardDescription>AI-powered prediction of your financial future</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart
                  data={[
                    { month: "Apr", actual: 12546, predicted: 12546 },
                    { month: "May", actual: null, predicted: 13100 },
                    { month: "Jun", actual: null, predicted: 13800 },
                    { month: "Jul", actual: null, predicted: 14600 },
                    { month: "Aug", actual: null, predicted: 15500 },
                    { month: "Sep", actual: null, predicted: 16400 },
                  ]}
                >
                  <defs>
                    <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(17, 24, 39, 0.8)",
                      borderColor: "#374151",
                      borderRadius: "0.5rem",
                      color: "#F9FAFB",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="actual"
                    stroke="#3B82F6"
                    fillOpacity={1}
                    fill="url(#colorActual)"
                    name="Actual Balance"
                  />
                  <Area
                    type="monotone"
                    dataKey="predicted"
                    stroke="#8B5CF6"
                    fillOpacity={1}
                    fill="url(#colorPredicted)"
                    strokeDasharray="5 5"
                    name="Predicted Balance"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Scenario Planning</CardTitle>
                <CardDescription>See how different decisions affect your finances</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <h4 className="font-medium text-blue-400 mb-2">Scenario 1: Increase Savings</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      If you increase your monthly savings by $500, you could reach your home down payment goal 8 months
                      earlier.
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Simulate This Scenario
                    </Button>
                  </div>

                  <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <h4 className="font-medium text-purple-400 mb-2">Scenario 2: Debt Repayment</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Paying an extra $300/month toward your highest interest debt would save you $2,450 in interest
                      over time.
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Simulate This Scenario
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Goal Tracking</CardTitle>
                <CardDescription>Progress toward your financial goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Emergency Fund</span>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">$6,500 of $10,000 goal</p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Home Down Payment</span>
                      <span className="text-sm font-medium">42%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "42%" }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">$21,000 of $50,000 goal</p>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Vacation Fund</span>
                      <span className="text-sm font-medium">78%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">$2,340 of $3,000 goal</p>
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

