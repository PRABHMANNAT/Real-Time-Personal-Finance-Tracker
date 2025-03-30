"use client"

import { useState } from "react"
import { ArrowRight, Brain, Calculator, LineChart, Lightbulb, Sparkles, TrendingUp } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"
import {
  AreaChart,
  Area,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "@/components/ui/chart"

export default function FutureLensPage() {
  const [activeTab, setActiveTab] = useState("forecast")
  const [savingsAmount, setSavingsAmount] = useState(500)
  const [savingsYears, setSavingsYears] = useState(10)
  const [interestRate, setInterestRate] = useState(5)

  // Calculate future value based on inputs
  const calculateFutureValue = () => {
    const monthlyContribution = savingsAmount
    const years = savingsYears
    const rate = interestRate / 100
    const months = years * 12

    let futureValue = 0
    for (let i = 0; i < months; i++) {
      futureValue = (futureValue + monthlyContribution) * (1 + rate / 12)
    }

    return Math.round(futureValue)
  }

  const futureValue = calculateFutureValue()

  // Generate forecast data
  const generateForecastData = () => {
    const data = []
    const monthlyContribution = savingsAmount
    const years = savingsYears
    const rate = interestRate / 100

    let currentValue = 0

    for (let year = 0; year <= years; year++) {
      if (year === 0) {
        data.push({
          year,
          value: 0,
          contributions: 0,
          interest: 0,
        })
        continue
      }

      let yearlyContributions = 0
      const previousValue = currentValue

      for (let month = 0; month < 12; month++) {
        yearlyContributions += monthlyContribution
        currentValue = (currentValue + monthlyContribution) * (1 + rate / 12)
      }

      const yearlyInterest = currentValue - previousValue - yearlyContributions

      data.push({
        year,
        value: Math.round(currentValue),
        contributions: Math.round(yearlyContributions),
        interest: Math.round(yearlyInterest),
      })
    }

    return data
  }

  const forecastData = generateForecastData()

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight glow-text">Future-Lens</h1>
          <p className="text-muted-foreground">AI-powered financial forecasting and scenario planning</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm">
            <Calculator className="mr-2 h-4 w-4" />
            Retirement Calculator
          </Button>
          <AnimatedGradientBorder>
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
            >
              <Brain className="mr-2 h-4 w-4" />
              AI Recommendations
            </Button>
          </AnimatedGradientBorder>
        </div>
      </div>

      <Tabs defaultValue="forecast" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-muted/50 backdrop-blur-sm">
          <TabsTrigger value="forecast">Financial Forecast</TabsTrigger>
          <TabsTrigger value="scenarios">Scenario Simulation</TabsTrigger>
          <TabsTrigger value="tips">AI Tips</TabsTrigger>
        </TabsList>

        <TabsContent value="forecast" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-2 bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Wealth Growth Forecast</CardTitle>
                <CardDescription>Projected growth of your investments over time</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={forecastData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                      dataKey="year"
                      stroke="#6B7280"
                      label={{ value: "Years", position: "insideBottom", offset: -5 }}
                    />
                    <YAxis
                      stroke="#6B7280"
                      tickFormatter={(value) => `$${value.toLocaleString()}`}
                      label={{ value: "Value ($)", angle: -90, position: "insideLeft" }}
                    />
                    <Tooltip
                      formatter={(value) => [`$${Number(value).toLocaleString()}`]}
                      contentStyle={{
                        backgroundColor: "rgba(17, 24, 39, 0.8)",
                        borderColor: "#374151",
                        borderRadius: "0.5rem",
                        color: "#F9FAFB",
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#8B5CF6"
                      fillOpacity={1}
                      fill="url(#colorValue)"
                      name="Total Value"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Simulation Parameters</CardTitle>
                <CardDescription>Adjust to see different outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="monthly-savings">Monthly Contribution</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">$</span>
                      <Input
                        id="monthly-savings"
                        type="number"
                        value={savingsAmount}
                        onChange={(e) => setSavingsAmount(Number(e.target.value))}
                        className="bg-background/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="years">Time Period</Label>
                      <span className="text-sm text-muted-foreground">{savingsYears} years</span>
                    </div>
                    <Slider
                      id="years"
                      min={1}
                      max={40}
                      step={1}
                      value={[savingsYears]}
                      onValueChange={(value) => setSavingsYears(value[0])}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="interest-rate">Interest Rate</Label>
                      <span className="text-sm text-muted-foreground">{interestRate}%</span>
                    </div>
                    <Slider
                      id="interest-rate"
                      min={1}
                      max={12}
                      step={0.5}
                      value={[interestRate]}
                      onValueChange={(value) => setInterestRate(value[0])}
                    />
                  </div>

                  <div className="pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Contributions:</span>
                      <span className="font-medium">${(savingsAmount * 12 * savingsYears).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Interest Earned:</span>
                      <span className="font-medium">
                        ${(futureValue - savingsAmount * 12 * savingsYears).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg pt-2">
                      <span>Future Value:</span>
                      <span className="font-bold text-blue-400">${futureValue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Contributions vs. Interest</CardTitle>
                <CardDescription>See how compound interest grows your wealth</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsLineChart data={forecastData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="year" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" tickFormatter={(value) => `$${value.toLocaleString()}`} />
                    <Tooltip
                      formatter={(value) => [`$${Number(value).toLocaleString()}`]}
                      contentStyle={{
                        backgroundColor: "rgba(17, 24, 39, 0.8)",
                        borderColor: "#374151",
                        borderRadius: "0.5rem",
                        color: "#F9FAFB",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="contributions"
                      stroke="#3B82F6"
                      name="Annual Contribution"
                      dot={false}
                    />
                    <Line type="monotone" dataKey="interest" stroke="#10B981" name="Annual Interest" dot={false} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-blue-400" />
                  AI Insights
                </CardTitle>
                <CardDescription>Personalized analysis of your financial future</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <h4 className="font-medium text-blue-400 mb-2">Compound Growth</h4>
                    <p className="text-sm text-muted-foreground">
                      With your current savings rate, your money will double approximately every 14 years due to
                      compound interest.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <h4 className="font-medium text-purple-400 mb-2">Optimization Opportunity</h4>
                    <p className="text-sm text-muted-foreground">
                      Increasing your monthly contribution by just $100 would result in an additional $45,000 over your
                      investment period.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                    <h4 className="font-medium text-green-400 mb-2">Inflation Impact</h4>
                    <p className="text-sm text-muted-foreground">
                      Accounting for 3% annual inflation, your future savings will have approximately 70% of today's
                      purchasing power.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Scenario Simulation</CardTitle>
                <CardDescription>Compare different financial scenarios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <h4 className="font-medium text-blue-400 mb-2">Scenario 1: Current Path</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Your current savings of ${savingsAmount}/month for {savingsYears} years at {interestRate}%
                      interest.
                    </p>
                    <div className="flex justify-between text-sm">
                      <span>Future Value:</span>
                      <span className="font-medium">${futureValue.toLocaleString()}</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      <LineChart className="mr-2 h-4 w-4" />
                      View Detailed Projection
                    </Button>
                  </div>

                  <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <h4 className="font-medium text-purple-400 mb-2">Scenario 2: Increased Savings</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      What if you increased your monthly savings to ${savingsAmount + 200}/month?
                    </p>
                    <div className="flex justify-between text-sm">
                      <span>Future Value:</span>
                      <span className="font-medium">${(futureValue * 1.4).toLocaleString()}</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      <LineChart className="mr-2 h-4 w-4" />
                      Simulate This Scenario
                    </Button>
                  </div>

                  <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                    <h4 className="font-medium text-green-400 mb-2">Scenario 3: Higher Returns</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      What if you could achieve a {interestRate + 2}% return instead of {interestRate}%?
                    </p>
                    <div className="flex justify-between text-sm">
                      <span>Future Value:</span>
                      <span className="font-medium">${(futureValue * 1.25).toLocaleString()}</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      <LineChart className="mr-2 h-4 w-4" />
                      Simulate This Scenario
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle>Custom Scenario Builder</CardTitle>
                <CardDescription>Create and compare your own financial scenarios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="scenario-name">Scenario Name</Label>
                    <Input id="scenario-name" placeholder="e.g., Early Retirement" className="bg-background/50" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monthly-contribution">Monthly Contribution</Label>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">$</span>
                      <Input id="monthly-contribution" type="number" defaultValue="1000" className="bg-background/50" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="time-period">Time Period</Label>
                      <span className="text-sm text-muted-foreground">15 years</span>
                    </div>
                    <Slider id="time-period" min={1} max={40} step={1} defaultValue={[15]} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="return-rate">Expected Return Rate</Label>
                      <span className="text-sm text-muted-foreground">7%</span>
                    </div>
                    <Slider id="return-rate" min={1} max={12} step={0.5} defaultValue={[7]} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additional-parameters">Additional Parameters</Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="inflation" className="rounded text-blue-500" />
                        <Label htmlFor="inflation" className="text-sm font-normal">
                          Account for inflation (3%)
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="tax-impact" className="rounded text-blue-500" />
                        <Label htmlFor="tax-impact" className="text-sm font-normal">
                          Include tax impact
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="checkbox" id="lump-sum" className="rounded text-blue-500" />
                        <Label htmlFor="lump-sum" className="text-sm font-normal">
                          Add initial lump sum
                        </Label>
                      </div>
                    </div>
                  </div>

                  <AnimatedGradientBorder>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
                      <Calculator className="mr-2 h-4 w-4" />
                      Calculate Scenario
                    </Button>
                  </AnimatedGradientBorder>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Scenario Comparison</CardTitle>
              <CardDescription>Visual comparison of different financial paths</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={400}>
                <RechartsLineChart
                  data={[
                    { year: 0, scenario1: 0, scenario2: 0, scenario3: 0 },
                    { year: 5, scenario1: 33000, scenario2: 46000, scenario3: 41000 },
                    { year: 10, scenario1: 73000, scenario2: 102000, scenario3: 91000 },
                    { year: 15, scenario1: 124000, scenario2: 173000, scenario3: 155000 },
                    { year: 20, scenario1: 190000, scenario2: 266000, scenario3: 238000 },
                    { year: 25, scenario1: 278000, scenario2: 389000, scenario3: 347000 },
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="year"
                    stroke="#6B7280"
                    label={{ value: "Years", position: "insideBottom", offset: -5 }}
                  />
                  <YAxis
                    stroke="#6B7280"
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                    label={{ value: "Value ($)", angle: -90, position: "insideLeft" }}
                  />
                  <Tooltip
                    formatter={(value) => [`$${Number(value).toLocaleString()}`]}
                    contentStyle={{
                      backgroundColor: "rgba(17, 24, 39, 0.8)",
                      borderColor: "#374151",
                      borderRadius: "0.5rem",
                      color: "#F9FAFB",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="scenario1" stroke="#3B82F6" name="Current Path" strokeWidth={2} />
                  <Line type="monotone" dataKey="scenario2" stroke="#8B5CF6" name="Increased Savings" strokeWidth={2} />
                  <Line type="monotone" dataKey="scenario3" stroke="#10B981" name="Higher Returns" strokeWidth={2} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tips" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-400" />
                  Savings Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <h4 className="font-medium text-yellow-400 mb-2">50/30/20 Rule</h4>
                    <p className="text-sm text-muted-foreground">
                      Allocate 50% of income to needs, 30% to wants, and 20% to savings for optimal financial health.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <h4 className="font-medium text-yellow-400 mb-2">Automate Your Savings</h4>
                    <p className="text-sm text-muted-foreground">
                      Set up automatic transfers to your savings account on payday to ensure consistent saving.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                    <h4 className="font-medium text-yellow-400 mb-2">Emergency Fund First</h4>
                    <p className="text-sm text-muted-foreground">
                      Build a 3-6 month emergency fund before focusing on other financial goals.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-400" />
                  Investment Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <h4 className="font-medium text-blue-400 mb-2">Diversification</h4>
                    <p className="text-sm text-muted-foreground">
                      Spread investments across different asset classes to reduce risk and optimize returns.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <h4 className="font-medium text-blue-400 mb-2">Dollar-Cost Averaging</h4>
                    <p className="text-sm text-muted-foreground">
                      Invest a fixed amount regularly regardless of market conditions to reduce timing risk.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <h4 className="font-medium text-blue-400 mb-2">Low-Cost Index Funds</h4>
                    <p className="text-sm text-muted-foreground">
                      Consider low-fee index funds for long-term growth with minimal management required.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-400" />
                  Personalized Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <h4 className="font-medium text-purple-400 mb-2">Retirement Planning</h4>
                    <p className="text-sm text-muted-foreground">
                      Based on your age and goals, consider increasing retirement contributions by 3% annually.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <h4 className="font-medium text-purple-400 mb-2">Tax Optimization</h4>
                    <p className="text-sm text-muted-foreground">
                      Maximize tax-advantaged accounts like 401(k) and IRAs before investing in taxable accounts.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                    <h4 className="font-medium text-purple-400 mb-2">Risk Assessment</h4>
                    <p className="text-sm text-muted-foreground">
                      Your current asset allocation suggests a moderate risk tolerance. Consider rebalancing quarterly.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Financial Health Roadmap</CardTitle>
              <CardDescription>AI-generated path to financial wellness</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="relative">
                  <div className="absolute left-5 top-0 h-full w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500"></div>

                  <div className="relative pl-12 pb-8">
                    <div className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 border border-blue-500/50">
                      <span className="text-blue-500 font-bold">1</span>
                    </div>
                    <h3 className="text-lg font-medium mb-2">Emergency Fund (0-6 months)</h3>
                    <p className="text-muted-foreground">
                      Build a 3-6 month emergency fund in a high-yield savings account. Aim to save 20% of your income
                      until complete.
                    </p>
                    <Button variant="link" size="sm" className="px-0 mt-2">
                      Learn more <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>

                  <div className="relative pl-12 pb-8">
                    <div className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/20 border border-purple-500/50">
                      <span className="text-purple-500 font-bold">2</span>
                    </div>
                    <h3 className="text-lg font-medium mb-2">Debt Reduction (6-18 months)</h3>
                    <p className="text-muted-foreground">
                      Focus on eliminating high-interest debt using either the avalanche method (highest interest first)
                      or snowball method (smallest balance first).
                    </p>
                    <Button variant="link" size="sm" className="px-0 mt-2">
                      Learn more <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>

                  <div className="relative pl-12 pb-8">
                    <div className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 border border-blue-500/50">
                      <span className="text-blue-500 font-bold">3</span>
                    </div>
                    <h3 className="text-lg font-medium mb-2">Retirement Contributions (Ongoing)</h3>
                    <p className="text-muted-foreground">
                      Maximize employer match on retirement accounts, then aim to contribute 15% of income to retirement
                      savings through tax-advantaged accounts.
                    </p>
                    <Button variant="link" size="sm" className="px-0 mt-2">
                      Learn more <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>

                  <div className="relative pl-12">
                    <div className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/20 border border-purple-500/50">
                      <span className="text-purple-500 font-bold">4</span>
                    </div>
                    <h3 className="text-lg font-medium mb-2">Wealth Building (Long-term)</h3>
                    <p className="text-muted-foreground">
                      Diversify investments across index funds, real estate, and other asset classes based on your risk
                      tolerance and time horizon.
                    </p>
                    <Button variant="link" size="sm" className="px-0 mt-2">
                      Learn more <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

