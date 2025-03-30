"use client"

import { useState } from "react"
import {
  ArrowUp,
  BookOpen,
  ChevronDown,
  CreditCard,
  DollarSign,
  LineChart,
  RefreshCw,
  Search,
  TrendingDown,
  TrendingUp,
  Sparkles,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "@/components/ui/chart"

export default function HoloTradePage() {
  const [activeTab, setActiveTab] = useState("stocks")
  const [timeRange, setTimeRange] = useState("1W")

  // Sample portfolio data
  const portfolioValue = 15750.42
  const portfolioChange = 450.28
  const portfolioChangePercent = 2.94

  // Sample stock data
  const stocks = [
    { symbol: "AAPL", name: "Apple Inc.", price: 175.42, change: 2.35, changePercent: 1.36, shares: 10, value: 1754.2 },
    {
      symbol: "MSFT",
      name: "Microsoft Corp.",
      price: 325.76,
      change: 5.42,
      changePercent: 1.69,
      shares: 5,
      value: 1628.8,
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      price: 142.38,
      change: -1.25,
      changePercent: -0.87,
      shares: 8,
      value: 1139.04,
    },
    {
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      price: 178.35,
      change: 3.21,
      changePercent: 1.83,
      shares: 7,
      value: 1248.45,
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      price: 245.62,
      change: -4.38,
      changePercent: -1.75,
      shares: 4,
      value: 982.48,
    },
  ]

  // Sample crypto data
  const cryptos = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      price: 52345.78,
      change: 1245.32,
      changePercent: 2.43,
      amount: 0.15,
      value: 7851.87,
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      price: 2845.65,
      change: 65.42,
      changePercent: 2.35,
      amount: 1.2,
      value: 3414.78,
    },
    { symbol: "SOL", name: "Solana", price: 125.42, change: -3.25, changePercent: -2.52, amount: 10, value: 1254.2 },
    { symbol: "ADA", name: "Cardano", price: 0.58, change: 0.02, changePercent: 3.57, amount: 1000, value: 580.0 },
    { symbol: "DOT", name: "Polkadot", price: 7.85, change: 0.15, changePercent: 1.95, amount: 50, value: 392.5 },
  ]

  // Sample mutual funds data
  const mutualFunds = [
    {
      symbol: "VFIAX",
      name: "Vanguard 500 Index Fund",
      price: 425.78,
      change: 5.32,
      changePercent: 1.27,
      shares: 5,
      value: 2128.9,
    },
    {
      symbol: "FXAIX",
      name: "Fidelity 500 Index Fund",
      price: 175.42,
      change: 2.15,
      changePercent: 1.24,
      shares: 10,
      value: 1754.2,
    },
    {
      symbol: "VTSAX",
      name: "Vanguard Total Stock Market",
      price: 112.35,
      change: 1.42,
      changePercent: 1.28,
      shares: 15,
      value: 1685.25,
    },
    {
      symbol: "VBTLX",
      name: "Vanguard Total Bond Market",
      price: 10.25,
      change: -0.05,
      changePercent: -0.48,
      shares: 100,
      value: 1025.0,
    },
  ]

  // Chart data
  const portfolioHistory = [
    { date: "Jan", value: 12500 },
    { date: "Feb", value: 13200 },
    { date: "Mar", value: 12800 },
    { date: "Apr", value: 13500 },
    { date: "May", value: 14200 },
    { date: "Jun", value: 14800 },
    { date: "Jul", value: 15750 },
  ]

  const assetAllocation = [
    { name: "Stocks", value: 6752.97, color: "#3B82F6" },
    { name: "Crypto", value: 13493.35, color: "#8B5CF6" },
    { name: "Mutual Funds", value: 6593.35, color: "#22D3EE" },
  ]

  // Get data based on active tab
  const getActiveData = () => {
    switch (activeTab) {
      case "stocks":
        return stocks
      case "crypto":
        return cryptos
      case "mutual-funds":
        return mutualFunds
      default:
        return stocks
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight glow-text-cyan font-display">HoloTrade</h1>
          <p className="text-muted-foreground">AI-assisted paper trading platform</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" size="sm" className="border-cyan-500/30 hover:border-cyan-500/50">
            <BookOpen className="mr-2 h-4 w-4 text-cyan-400" />
            Learning Center
          </Button>
          <AnimatedGradientBorder variant="cyan">
            <Button
              size="sm"
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white border-0"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Add Funds
            </Button>
          </AnimatedGradientBorder>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card neon-border-cyan animate-glow-cyan">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-display">${portfolioValue.toLocaleString()}</div>
            <div className="flex items-center mt-1">
              <Badge variant="outline" className={`bg-green-500/10 text-green-400 border-green-500/20`}>
                <ArrowUp className="mr-1 h-3 w-3" />
                {portfolioChangePercent.toFixed(2)}%
              </Badge>
              <span className="text-xs text-muted-foreground ml-2">+${portfolioChange.toFixed(2)} today</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assets</CardTitle>
            <LineChart className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-display">12</div>
            <p className="text-xs text-muted-foreground">Across 3 categories</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-display">BTC</div>
            <div className="flex items-center mt-1">
              <Badge variant="outline" className={`bg-green-500/10 text-green-400 border-green-500/20`}>
                <ArrowUp className="mr-1 h-3 w-3" />
                2.43%
              </Badge>
              <span className="text-xs text-muted-foreground ml-2">Last 24 hours</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Prediction</CardTitle>
            <Sparkles className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-display">Bullish</div>
            <p className="text-xs text-muted-foreground">Next 7 days forecast</p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center">
            <div>
              <CardTitle>Portfolio Performance</CardTitle>
              <CardDescription>Track your investment growth over time</CardDescription>
            </div>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              {["1D", "1W", "1M", "3M", "1Y", "ALL"].map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeRange(range)}
                  className={
                    timeRange === range
                      ? "bg-cyan-500 hover:bg-cyan-600"
                      : "border-cyan-500/30 hover:border-cyan-500/50"
                  }
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={portfolioHistory}>
              <defs>
                <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#22D3EE" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#6B7280" />
              <YAxis stroke="#6B7280" tickFormatter={(value) => `$${value.toLocaleString()}`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(17, 24, 39, 0.8)",
                  borderColor: "#374151",
                  borderRadius: "0.5rem",
                  color: "#F9FAFB",
                }}
                formatter={(value) => [`$${Number(value).toLocaleString()}`]}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#22D3EE"
                fillOpacity={1}
                fill="url(#colorPortfolio)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="glass-card md:col-span-2">
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
            <CardDescription>Distribution of your investment portfolio</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={assetAllocation}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {assetAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(17, 24, 39, 0.8)",
                      borderColor: "#374151",
                      borderRadius: "0.5rem",
                      color: "#F9FAFB",
                    }}
                    formatter={(value) => [`$${Number(value).toLocaleString()}`]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 space-y-4 mt-4 md:mt-0 md:pl-8">
              {assetAllocation.map((asset, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: asset.color }}></div>
                      <span className="text-sm font-medium">{asset.name}</span>
                    </div>
                    <span className="text-sm font-medium">${asset.value.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full"
                      style={{
                        width: `${(asset.value / assetAllocation.reduce((acc, curr) => acc + curr.value, 0)) * 100}%`,
                        backgroundColor: asset.color,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>AI Market Insights</CardTitle>
            <CardDescription>Personalized trading recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <h4 className="font-medium text-blue-400 mb-2">Market Trend</h4>
                <p className="text-sm text-muted-foreground">
                  Tech sector showing strong momentum. Consider increasing allocation to MSFT and AAPL.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                <h4 className="font-medium text-purple-400 mb-2">Volatility Alert</h4>
                <p className="text-sm text-muted-foreground">
                  Crypto market volatility expected to increase. Consider setting stop-loss orders.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                <h4 className="font-medium text-cyan-400 mb-2">Opportunity</h4>
                <p className="text-sm text-muted-foreground">
                  SOL is currently undervalued based on technical analysis. Consider buying the dip.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="stocks" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="glass">
          <TabsTrigger value="stocks">Stocks</TabsTrigger>
          <TabsTrigger value="crypto">Crypto</TabsTrigger>
          <TabsTrigger value="mutual-funds">Mutual Funds</TabsTrigger>
        </TabsList>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search assets..." className="pl-8 bg-background/50" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-cyan-500/30 hover:border-cyan-500/50">
                  <RefreshCw className="mr-2 h-4 w-4 text-cyan-400" />
                  Refresh
                </Button>
                <AnimatedGradientBorder variant="cyan">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white border-0"
                  >
                    <LineChart className="mr-2 h-4 w-4" />
                    Trade
                  </Button>
                </AnimatedGradientBorder>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-border/50">
              <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-muted-foreground border-b">
                <div className="col-span-5 md:col-span-4">Asset</div>
                <div className="col-span-3 md:col-span-2 text-right">Price</div>
                <div className="col-span-4 md:col-span-2 text-right">24h Change</div>
                <div className="hidden md:block md:col-span-2 text-right">Holdings</div>
                <div className="hidden md:block md:col-span-2 text-right">Value</div>
              </div>
              <div className="divide-y divide-border/50">
                {getActiveData().map((asset, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/20 transition-colors"
                  >
                    <div className="col-span-5 md:col-span-4 flex items-center gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          index % 3 === 0
                            ? "bg-blue-500/20 text-blue-400"
                            : index % 3 === 1
                              ? "bg-purple-500/20 text-purple-400"
                              : "bg-cyan-500/20 text-cyan-400"
                        }`}
                      >
                        {asset.symbol.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{asset.symbol}</p>
                        <p className="text-xs text-muted-foreground hidden md:block">{asset.name}</p>
                      </div>
                    </div>
                    <div className="col-span-3 md:col-span-2 text-right font-medium">
                      ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div
                      className={`col-span-4 md:col-span-2 text-right font-medium ${
                        asset.change > 0 ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      <div className="flex items-center justify-end">
                        {asset.change > 0 ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        {asset.changePercent > 0 ? "+" : ""}
                        {asset.changePercent.toFixed(2)}%
                      </div>
                    </div>
                    <div className="hidden md:block md:col-span-2 text-right">
                      {"shares" in asset ? asset.shares : asset.amount} {activeTab === "crypto" ? asset.symbol : ""}
                    </div>
                    <div className="hidden md:block md:col-span-2 text-right font-medium">
                      ${asset.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" size="sm" className="border-cyan-500/30 hover:border-cyan-500/50">
              <ChevronDown className="mr-2 h-4 w-4 text-cyan-400" />
              Show More
            </Button>
            <Button variant="outline" size="sm" className="border-cyan-500/30 hover:border-cyan-500/50">
              Export Data
            </Button>
          </CardFooter>
        </Card>
      </Tabs>
    </div>
  )
}

