"use client"

import { useState } from "react"
import { Calendar, Clock, Flame, Lock, Plus, Shield, Sparkles, Unlock } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

export default function QuantumVaultPage() {
  const [activeTab, setActiveTab] = useState("active")
  const [lockAmount, setLockAmount] = useState(500)
  const [lockDuration, setLockDuration] = useState(30)

  // Sample vault data
  const vaults = [
    {
      id: 1,
      name: "Emergency Fund",
      amount: 2500,
      target: 5000,
      progress: 50,
      lockDate: "2023-06-15",
      daysLeft: 45,
      streak: 12,
      status: "active",
    },
    {
      id: 2,
      name: "Vacation Fund",
      amount: 1200,
      target: 3000,
      progress: 40,
      lockDate: "2023-05-30",
      daysLeft: 30,
      streak: 8,
      status: "active",
    },
    {
      id: 3,
      name: "New Laptop",
      amount: 800,
      target: 1500,
      progress: 53,
      lockDate: "2023-04-20",
      daysLeft: 15,
      streak: 5,
      status: "active",
    },
    {
      id: 4,
      name: "Home Renovation",
      amount: 5000,
      target: 5000,
      progress: 100,
      lockDate: "2023-02-10",
      daysLeft: 0,
      streak: 20,
      status: "completed",
    },
  ]

  const filteredVaults = vaults.filter(
    (vault) =>
      (activeTab === "active" && vault.status === "active") ||
      (activeTab === "completed" && vault.status === "completed"),
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight glow-text">Quantum Vault</h1>
          <p className="text-muted-foreground">Lock your money with AI-powered security</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <AnimatedGradientBorder>
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create New Vault
            </Button>
          </AnimatedGradientBorder>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 glow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Locked</CardTitle>
            <Lock className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,500.00</div>
            <p className="text-xs text-muted-foreground">Across 3 active vaults</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Longest Streak</CardTitle>
            <Flame className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">20 Days</div>
            <p className="text-xs text-muted-foreground">Home Renovation Fund</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rewards Earned</CardTitle>
            <Sparkles className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">250 Points</div>
            <p className="text-xs text-muted-foreground">Redeem for cashbacks</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Level</CardTitle>
            <Shield className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Advanced</div>
            <p className="text-xs text-muted-foreground">AI-powered protection</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle>Create a New Quantum Vault</CardTitle>
          <CardDescription>Lock your money with AI-driven unlock conditions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="vault-name">Vault Name</Label>
              <Input id="vault-name" placeholder="e.g., Dream Vacation" className="bg-background/50" />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="lock-amount">Lock Amount</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="lock-amount"
                  type="number"
                  value={lockAmount}
                  onChange={(e) => setLockAmount(Number(e.target.value))}
                  className="bg-background/50"
                />
                <span className="text-sm text-muted-foreground whitespace-nowrap">USD</span>
              </div>
            </div>

            <div className="grid gap-3">
              <div className="flex justify-between">
                <Label htmlFor="lock-duration">Lock Duration</Label>
                <span className="text-sm text-muted-foreground">{lockDuration} days</span>
              </div>
              <Slider
                id="lock-duration"
                min={7}
                max={90}
                step={1}
                value={[lockDuration]}
                onValueChange={(value) => setLockDuration(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>7 days</span>
                <span>30 days</span>
                <span>90 days</span>
              </div>
            </div>

            <div className="grid gap-3">
              <Label>Unlock Conditions</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="time-condition" className="rounded text-blue-500" />
                  <Label htmlFor="time-condition" className="text-sm font-normal">
                    Time-based (unlock after duration)
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="goal-condition" className="rounded text-blue-500" />
                  <Label htmlFor="goal-condition" className="text-sm font-normal">
                    Goal-based (unlock when target is reached)
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="emergency-condition" className="rounded text-blue-500" />
                  <Label htmlFor="emergency-condition" className="text-sm font-normal">
                    Emergency unlock (with AI risk assessment)
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <AnimatedGradientBorder>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0">
              Create Vault
            </Button>
          </AnimatedGradientBorder>
        </CardFooter>
      </Card>

      <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-muted/50 backdrop-blur-sm">
          <TabsTrigger value="active">Active Vaults</TabsTrigger>
          <TabsTrigger value="completed">Completed Vaults</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredVaults.map((vault) => (
              <Card key={vault.id} className="bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden">
                <div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600"
                  style={{ width: `${vault.progress}%` }}
                ></div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{vault.name}</CardTitle>
                    <div className="flex items-center gap-1 bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs">
                      <Lock className="h-3 w-3" />
                      <span>{vault.daysLeft} days left</span>
                    </div>
                  </div>
                  <CardDescription>Target: ${vault.target.toLocaleString()}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">${vault.amount.toLocaleString()} saved</span>
                      <span className="text-sm font-medium">{vault.progress}%</span>
                    </div>
                    <Progress value={vault.progress} className="h-2" />
                  </div>

                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Unlocks: {new Date(vault.lockDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame className="h-4 w-4 text-orange-400" />
                      <span>{vault.streak} day streak</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-3 w-3" />
                    Add Funds
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-500 border-red-500/20 hover:bg-red-500/10">
                    <Unlock className="mr-2 h-3 w-3" />
                    Emergency Unlock
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredVaults.map((vault) => (
              <Card key={vault.id} className="bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden">
                <div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-green-600"
                  style={{ width: `${vault.progress}%` }}
                ></div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{vault.name}</CardTitle>
                    <div className="flex items-center gap-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-xs">
                      <Unlock className="h-3 w-3" />
                      <span>Completed</span>
                    </div>
                  </div>
                  <CardDescription>Target: ${vault.target.toLocaleString()}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">${vault.amount.toLocaleString()} saved</span>
                      <span className="text-sm font-medium">{vault.progress}%</span>
                    </div>
                    <Progress value={vault.progress} className="h-2" />
                  </div>

                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Completed on: {new Date(vault.lockDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Sparkles className="h-4 w-4 text-yellow-400" />
                      <span>+50 points earned</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-3 w-3" />
                    Create Similar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

