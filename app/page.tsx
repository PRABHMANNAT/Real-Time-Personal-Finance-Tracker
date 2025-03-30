"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  ArrowRight,
  Cpu,
  LineChart,
  Lock,
  Shield,
  Sparkles,
  Zap,
  Brain,
  Fingerprint,
  Globe,
  Layers,
  BarChart3,
  TrendingUp,
  Bell,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { CardHoverEffect } from "@/components/ui/card-hover-effect"
import { AnimatedGradientBorder } from "@/components/ui/animated-gradient-border"

export default function Home() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100])

  // Handle mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Features with enhanced descriptions and icons
  const features = [
    {
      title: "Quantum AI Analysis",
      description:
        "Our advanced neural networks analyze market patterns 200x faster than traditional algorithms, predicting trends with 94% accuracy.",
      icon: <Brain className="w-6 h-6" />,
      color: "blue",
    },
    {
      title: "Real-Time Holographic Tracking",
      description:
        "Visualize your finances in stunning 3D with our holographic interface that updates in real-time as transactions occur.",
      icon: <Globe className="w-6 h-6" />,
      color: "purple",
    },
    {
      title: "Predictive Financial Modeling",
      description:
        "Simulate 1000+ possible financial futures based on your current habits and receive personalized optimization strategies.",
      icon: <LineChart className="w-6 h-6" />,
      color: "cyan",
    },
    {
      title: "Quantum-Encrypted Vault",
      description:
        "Military-grade encryption combined with biometric authentication ensures your assets remain impenetrable to cyber threats.",
      icon: <Lock className="w-6 h-6" />,
      color: "blue",
    },
    {
      title: "Neural Reward System",
      description:
        "Our dopamine-optimized gamification system makes building wealth as addictive as your favorite mobile game.",
      icon: <Sparkles className="w-6 h-6" />,
      color: "purple",
    },
    {
      title: "Blockchain Security Matrix",
      description:
        "Every transaction is verified across a distributed network of 10,000+ nodes, making fraud mathematically impossible.",
      icon: <Shield className="w-6 h-6" />,
      color: "cyan",
    },
  ]

  // Testimonials
  const testimonials = [
    {
      quote: "FinNova transformed how I manage my finances. The AI predictions saved me ₹50,000 in just three months!",
      author: "Priya Sharma",
      title: "Tech Entrepreneur",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya&backgroundColor=ffdfbf",
    },
    {
      quote:
        "The holographic visualization made understanding complex investments intuitive. I've never felt more in control.",
      author: "Rajesh Kumar",
      title: "Investment Analyst",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh&backgroundColor=b6e3f4",
    },
    {
      quote: "The gamification aspect turned saving from a chore into something I actually look forward to every day.",
      author: "Ananya Patel",
      title: "Digital Marketer",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya&backgroundColor=d1d4f9",
    },
  ]

  // Stats with animated counters
  const stats = [
    { label: "Active Users", value: "2.5M+", icon: <Layers className="w-5 h-5" />, color: "blue" },
    { label: "Transactions Processed", value: "₹850B+", icon: <BarChart3 className="w-5 h-5" />, color: "purple" },
    { label: "Prediction Accuracy", value: "94.7%", icon: <TrendingUp className="w-5 h-5" />, color: "cyan" },
    { label: "User Savings", value: "₹12.8B+", icon: <Zap className="w-5 h-5" />, color: "blue" },
  ]

  return (
    <div className="relative">
      {/* Interactive background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div
          className="absolute w-[800px] h-[800px] rounded-full blur-[120px] opacity-20 bg-blue-500"
          style={{
            left: cursorPosition.x * 0.05,
            top: cursorPosition.y * 0.05,
          }}
        ></div>
        <div
          className="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-20 bg-purple-500"
          style={{
            right: cursorPosition.x * 0.03,
            bottom: cursorPosition.y * 0.03,
          }}
        ></div>
      </div>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden"
        style={{ opacity, scale, y }}
      >
        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />

        {/* Floating elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-20 h-20 rounded-full bg-blue-500/10 backdrop-blur-md border border-blue-500/20"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Cpu className="w-8 h-8 text-blue-400" />
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-16 h-16 rounded-full bg-purple-500/10 backdrop-blur-md border border-purple-500/20"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Brain className="w-6 h-6 text-purple-400" />
          </div>
        </motion.div>

        <motion.div
          className="absolute top-1/3 right-1/3 w-24 h-24 rounded-full bg-cyan-500/10 backdrop-blur-md border border-cyan-500/20"
          animate={{
            y: [0, 15, 0],
            rotate: [0, 5, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 9,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <LineChart className="w-10 h-10 text-cyan-400" />
          </div>
        </motion.div>

        <div className="space-y-8 max-w-5xl mx-auto relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mx-auto"
          >
            <AnimatedGradientBorder containerClassName="rounded-full px-4 py-1.5">
              <div className="flex items-center gap-2">
                <Fingerprint className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium">The Future of Finance Has Arrived</span>
              </div>
            </AnimatedGradientBorder>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold tracking-tight glow-text bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 font-display"
          >
            FinNova OS
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Experience the quantum leap in financial management with AI-driven insights, holographic visualization, and
            neural reward systems that make wealth-building addictive.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 pt-8"
          >
            <AnimatedGradientBorder>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white border-0 font-medium text-lg h-14 px-8"
              >
                Begin Your Journey <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </AnimatedGradientBorder>

            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-blue-500/30 hover:border-blue-500/50 backdrop-blur-sm text-lg h-14 px-8"
            >
              <Link href="/dashboard">Explore Interface</Link>
            </Button>
          </motion.div>

          {/* Stats counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-16 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                className="flex flex-col items-center p-4 rounded-xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-sm border border-slate-700/30"
              >
                <div className={`p-2 rounded-lg bg-${stat.color}-500/20 mb-3`}>{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center p-1"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              <motion.div
                className="w-1 h-2 bg-muted-foreground/50 rounded-full"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="relative z-10 py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative inline-block mb-4"
            >
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 opacity-30 blur-lg"></div>
              <h2 className="relative text-4xl md:text-5xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 px-4 py-1">
                Quantum Features
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              Experience capabilities that transcend traditional financial tools, powered by cutting-edge AI and quantum
              computing
            </motion.p>
          </motion.div>

          <CardHoverEffect items={features} />
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="relative z-10 py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/0 via-blue-900/10 to-slate-900/0 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 mb-6">
                Experience The Interface
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Our neural-adaptive UI learns your habits and preferences, creating a personalized financial command
                center that anticipates your needs before you do.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-blue-500/20 mt-1">
                    <Cpu className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Neural Adaptation</h3>
                    <p className="text-muted-foreground">
                      The interface evolves with your usage patterns, becoming more intuitive with each interaction.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-purple-500/20 mt-1">
                    <Globe className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Holographic Visualization</h3>
                    <p className="text-muted-foreground">
                      Complex financial data transformed into intuitive 3D models you can manipulate and explore.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-cyan-500/20 mt-1">
                    <Fingerprint className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Biometric Integration</h3>
                    <p className="text-muted-foreground">
                      Seamless security that recognizes you through multiple biometric signatures simultaneously.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <AnimatedGradientBorder variant="cyan">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white border-0 font-medium"
                  >
                    Try Interactive Demo
                  </Button>
                </AnimatedGradientBorder>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-50"></div>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800">
                  <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
                </div>

                {/* Mock UI elements */}
                <div className="absolute inset-0 p-6 flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Bell className="w-4 h-4 text-blue-400" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <User className="w-4 h-4 text-purple-400" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="col-span-2 h-24 rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="w-20 h-3 bg-blue-500/30 rounded-full mb-2"></div>
                          <div className="w-32 h-6 bg-blue-500/40 rounded-full"></div>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <TrendingUp className="w-6 h-6 text-blue-400" />
                        </div>
                      </div>
                    </div>
                    <div className="h-24 rounded-xl bg-purple-500/10 border border-purple-500/20 p-4">
                      <div className="flex flex-col justify-between h-full">
                        <div className="w-16 h-3 bg-purple-500/30 rounded-full"></div>
                        <div className="w-20 h-6 bg-purple-500/40 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 rounded-xl bg-slate-800/50 border border-slate-700/50 p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="w-40 h-4 bg-slate-700 rounded-full"></div>
                      <div className="flex gap-2">
                        <div className="w-8 h-4 bg-slate-700 rounded-full"></div>
                        <div className="w-8 h-4 bg-slate-700 rounded-full"></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className={`h-16 rounded-lg ${
                            i % 4 === 0
                              ? "bg-blue-500/20 border-blue-500/30"
                              : i % 4 === 1
                                ? "bg-purple-500/20 border-purple-500/30"
                                : i % 4 === 2
                                  ? "bg-cyan-500/20 border-cyan-500/30"
                                  : "bg-slate-700/50 border-slate-600/30"
                          } border p-2 flex flex-col justify-between`}
                        >
                          <div
                            className={`w-6 h-6 rounded-md ${
                              i % 4 === 0
                                ? "bg-blue-500/30"
                                : i % 4 === 1
                                  ? "bg-purple-500/30"
                                  : i % 4 === 2
                                    ? "bg-cyan-500/30"
                                    : "bg-slate-600/50"
                            }`}
                          ></div>
                          <div
                            className={`w-full h-2 rounded-full ${
                              i % 4 === 0
                                ? "bg-blue-500/30"
                                : i % 4 === 1
                                  ? "bg-purple-500/30"
                                  : i % 4 === 2
                                    ? "bg-cyan-500/30"
                                    : "bg-slate-600/50"
                            }`}
                          ></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Animated elements */}
                <motion.div
                  className="absolute top-1/4 right-1/4 w-20 h-20 rounded-full bg-blue-500/10 blur-xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                />
                <motion.div
                  className="absolute bottom-1/3 left-1/3 w-16 h-16 rounded-full bg-purple-500/10 blur-xl"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                />
              </div>

              {/* Floating elements around the UI */}
              <motion.div
                className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30 flex items-center justify-center"
                animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
              >
                <Zap className="w-5 h-5 text-cyan-400" />
              </motion.div>

              <motion.div
                className="absolute -bottom-8 -left-8 w-16 h-16 rounded-full bg-purple-500/20 backdrop-blur-sm border border-purple-500/30 flex items-center justify-center"
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
              >
                <Brain className="w-6 h-6 text-purple-400" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold font-display bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
              User Experiences
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover how FinNova is transforming financial management for users across India
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AnimatedGradientBorder variant={index === 0 ? "blue" : index === 1 ? "cyan" : "purple"}>
                  <div className="bg-slate-900/80 backdrop-blur-sm p-6 rounded-xl h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-700">
                        <img
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                  </div>
                </AnimatedGradientBorder>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-32 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-30 blur-xl rounded-3xl"></div>
            <div className="relative glass-card rounded-2xl p-12 text-center overflow-hidden">
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold font-display glow-text mb-6">
                  Ready to Transform Your Financial Future?
                </h2>
                <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Join thousands of users who are already experiencing the quantum leap in financial management with
                  FinNova OS.
                </p>
              </motion.div>

              <div className="flex flex-wrap justify-center gap-6">
                <AnimatedGradientBorder variant="multi">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white border-0 font-medium text-lg h-14 px-8"
                  >
                    Begin Your Journey Now
                  </Button>
                </AnimatedGradientBorder>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-purple-500/30 hover:border-purple-500/50 backdrop-blur-sm text-lg h-14 px-8"
                >
                  Schedule Demo
                </Button>
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute top-10 left-10 w-16 h-16 rounded-full bg-blue-500/10 backdrop-blur-sm border border-blue-500/20"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 10, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-blue-400" />
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-10 right-10 w-20 h-20 rounded-full bg-purple-500/10 backdrop-blur-sm border border-purple-500/20"
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-purple-400" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}

