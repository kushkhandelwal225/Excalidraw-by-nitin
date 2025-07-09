"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useInView, useMotionValue, useSpring } from "framer-motion"
import {
  ArrowRight,
  Pencil,
  Palette,
  Users,
  Download,
  Github,
  Twitter,
  Play,
  ArrowUpRight,
  Zap,
  Heart,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { useRef } from "react"
import LottieAnimation from "@/components/animations/LottieAnimation"

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 10 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 10 })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener("mousemove", updateMousePosition)
    return () => window.removeEventListener("mousemove", updateMousePosition)
  }, [mouseX, mouseY])

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Animated cursor with trail */}
      <motion.div
        className="fixed w-8 h-8 pointer-events-none z-50 mix-blend-difference"
        style={{ x: springX, y: springY }}
      >
        <div className="w-full h-full bg-black rounded-full opacity-80"></div>
      </motion.div>


      {/* Header */}
      <motion.header
        className=" w-full z-40 bg-white/70 backdrop-blur-xl"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: [0.6, 0.01, 0.05, 0.95] }}
      >
        <div className="container mx-auto px-6 py-6 flex items-center justify-between">
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            >
              <div className="w-12 h-12 bg-black rounded-3xl flex items-center justify-center transform rotate-12">
                <Pencil className="w-6 h-6 text-white -rotate-12" />
              </div>
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              />
            </motion.div>
            <span className="text-2xl font-bold tracking-tight text-black">Draft Space</span>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-12">
            {["Features", "Magic", "Community"].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-600 hover:text-black transition-all duration-300 relative font-medium text-lg"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                whileHover={{ y: -3, scale: 1.05 }}
              >
                {item}
                <motion.div
                  className="absolute -bottom-2 left-0 w-0 h-1 bg-black rounded-full"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.4 }}
                />
              </motion.a>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <button className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-110 hover:shadow-lg">
              Start Creating
            </button>
          </motion.div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          {/* Floating orbs */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-${20 + i * 10} h-${20 + i * 10} bg-gradient-to-br from-gray-100 to-gray-200 rounded-full blur-xl opacity-30`}
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + i * 10}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
        <LottieAnimation/>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Hero Content */}
            <motion.div
              className="text-center mb-20"
              initial={{ opacity: 0 }}
              animate={isHeroInView ? { opacity: 1 } : {}}
              transition={{ duration: 1 }}
            >
              {/* Floating badge */}
              <motion.div
                className="inline-flex items-center space-x-3 bg-black text-white rounded-full px-6 py-3 mb-12 relative overflow-hidden"
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={isHeroInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: 0.2, duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-3 h-3 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                <span className="font-medium">✨ Now with AI Magic</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
                />
              </motion.div>

              {/* Main heading with creative animations */}
              <div className="relative">
                <motion.h1
                  className="text-8xl md:text-9xl font-bold mb-8 leading-none relative"
                  initial={{ opacity: 0 }}
                  animate={isHeroInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4, duration: 1 }}
                >
                  <motion.span
                    className="block text-black relative"
                    initial={{ y: 100, opacity: 0 }}
                    animate={isHeroInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ delay: 0.6, duration: 0.8 }}
                  >
                    Draw
                    <motion.div
                      className="absolute -top-8 -right-16 text-6xl"
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    >
                      ✏️
                    </motion.div>
                  </motion.span>

                  <motion.span
                    className="block text-gray-300 relative"
                    initial={{ y: 100, opacity: 0 }}
                    animate={isHeroInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  >
                    Beyond
                    <motion.div
                      className="absolute -right-20 top-1/2 w-16 h-16"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <svg viewBox="0 0 100 100" className="w-full h-full text-blue-500">
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="30"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeDasharray="10,5"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 2, delay: 1.5 }}
                        />
                      </svg>
                    </motion.div>
                  </motion.span>

                  <motion.span
                    className="block text-black"
                    initial={{ y: 100, opacity: 0 }}
                    animate={isHeroInView ? { y: 0, opacity: 1 } : {}}
                    transition={{ delay: 1, duration: 0.8 }}
                  >
                    Reality
                  </motion.span>
                </motion.h1>

                {/* Floating elements around text */}
                <motion.div
                  className="absolute top-1/4 left-0 w-6 h-6 text-purple-500"
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Sparkles className="w-full h-full" />
                </motion.div>

                <motion.div
                  className="absolute bottom-1/4 right-0 w-8 h-8 text-green-500"
                  animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, -180, 0],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                >
                  <Heart className="w-full h-full" />
                </motion.div>
              </div>

              {/* Animated subtitle */}
              <motion.p
                className="text-2xl text-gray-600 mb-12 max-w-3xl mx-auto font-light"
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                Where imagination meets infinite possibilities
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20"
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.4, duration: 0.8 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <button
                    
                    className="bg-black hover:bg-gray-800 text-white text-xl px-12 py-8 rounded-full font-medium group relative overflow-hidden"
                  >
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10 flex items-center">
                      Start Creating
                      <motion.div
                        className="ml-3"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <ArrowRight className="w-6 h-6" />
                      </motion.div>
                    </span>
                  </button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <button
                    
                    
                    className="text-xl px-12 py-8 border-2 border-gray-300 hover:bg-gray-50 bg-transparent text-black rounded-full font-medium group"
                  >
                    <Play className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                    Watch Magic
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Interactive Canvas Preview */}
            <motion.div
              className="relative max-w-6xl mx-auto "
              initial={{ opacity: 0, scale: 0.8, y: 100 }}
              animate={isHeroInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: 1.6, duration: 1.2, ease: [0.6, 0.01, 0.05, 0.95] }}
            >
              <div className="relative bg-white rounded-[2rem] shadow-2xl border border-gray-200 p-8 ">
                {/* Floating UI elements */}
                <motion.div
                  className="absolute -top-6 left-1/4 bg-white rounded-2xl shadow-lg p-4 border border-gray-200"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Live</span>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -top-6 right-1/4 bg-black text-white rounded-2xl shadow-lg p-4"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                >
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm font-medium">5 online</span>
                  </div>
                </motion.div>

                {/* Canvas */}
                <div className="bg-gray-50 rounded-2xl h-96 relative overflow-hidden">
                  <svg viewBox="0 0 800 400" className="w-full h-full">
                    {/* Animated grid */}
                    <defs>
                      <pattern id="animatedGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                        <motion.path
                          d="M 30 0 L 0 0 0 30"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="0.5"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 0.5, 0] }}
                          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                        />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#animatedGrid)" />

                    {/* Animated drawings with creative paths */}
                    <motion.path
                      d="M100,200 Q200,100 300,200 T500,200"
                      fill="none"
                      stroke="#000000"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 3, delay: 2 }}
                    />

                    <motion.circle
                      cx="350"
                      cy="150"
                      r="50"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0, opacity: 0, scale: 0 }}
                      animate={{ pathLength: 1, opacity: 1, scale: 1 }}
                      transition={{ duration: 2, delay: 3 }}
                    />

                    <motion.polygon
                      points="600,100 650,180 550,180"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="3"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 2, delay: 4 }}
                    />

                    {/* Collaborative cursors with trails */}
                    <motion.g>
                      <motion.circle
                        cx="250"
                        cy="250"
                        r="4"
                        fill="#8b5cf6"
                        animate={{
                          cx: [250, 300, 350, 300, 250],
                          cy: [250, 200, 250, 300, 250],
                        }}
                        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, delay: 5 }}
                      />
                      <motion.path
                        d="M250,250 L260,270 L240,270 Z"
                        fill="#8b5cf6"
                        animate={{
                          x: [0, 50, 100, 50, 0],
                          y: [0, -50, 0, 50, 0],
                        }}
                        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, delay: 5 }}
                      />
                    </motion.g>

                    {/* Magic sparkles */}
                    {[...Array(8)].map((_, i) => (
                      <motion.circle
                        key={i}
                        cx={100 + i * 80}
                        cy={80 + Math.sin(i) * 40}
                        r="2"
                        fill="#fbbf24"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: [0, 1, 0],
                          scale: [0, 1.5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.3 + 6,
                        }}
                      />
                    ))}
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Creative Features Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          {/* Floating feature cards in organic layout */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl font-bold mb-6 text-black">Pure Magic</h2>
          </motion.div>

          <div className="relative max-w-7xl mx-auto h-[800px]">
            {/* Feature 1 - Floating top left */}
            <motion.div
              className="absolute top-0 left-0 w-80 bg-white rounded-3xl p-8 shadow-xl border border-gray-100 transform -rotate-6"
              initial={{ opacity: 0, x: -100, rotate: -20 }}
              whileInView={{ opacity: 1, x: 0, rotate: -6 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
            >
              <motion.div
                className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Zap className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 text-black">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">
                60fps rendering with zero lag. Your ideas flow as fast as you think.
              </p>

              {/* Animated progress bars */}
              <div className="mt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Performance</span>
                  <span>99%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-blue-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "99%" }}
                    transition={{ duration: 2, delay: 1 }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Feature 2 - Floating center */}
            <motion.div
              className="absolute top-32 right-20 w-96 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 shadow-xl border border-purple-100 transform rotate-3"
              initial={{ opacity: 0, y: 100, rotate: 10 }}
              whileInView={{ opacity: 1, y: 0, rotate: 3 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              >
                <Users className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 text-black">Live Collaboration</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Work together in real-time with live cursors and instant sync.
              </p>

              {/* Animated avatars */}
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-sm"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: i * 0.1 + 1.5 }}
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                  >
                    {String.fromCharCode(65 + i)}
                  </motion.div>
                ))}
                <motion.div
                  className="w-10 h-10 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center text-gray-500 text-sm font-bold"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  +5
                </motion.div>
              </div>
            </motion.div>

            {/* Feature 3 - Floating bottom left */}
            <motion.div
              className="absolute bottom-20 left-32 w-72 bg-black text-white rounded-3xl p-8 shadow-xl transform rotate-2"
              initial={{ opacity: 0, x: -100, rotate: -10 }}
              whileInView={{ opacity: 1, x: 0, rotate: 2 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
            >
              <motion.div
                className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6"
                whileHover={{ rotate: -360 }}
                transition={{ duration: 0.8 }}
              >
                <Palette className="w-8 h-8 text-black" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">Infinite Canvas</h3>
              <p className="text-gray-300 leading-relaxed">
                Zoom, pan, and create without boundaries. Your imagination is the only limit.
              </p>

              {/* Animated zoom indicator */}
              <div className="mt-6 flex items-center space-x-2">
                <span className="text-sm text-gray-400">Zoom:</span>
                <motion.div
                  className="flex-1 bg-gray-700 rounded-full h-2 relative"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                >
                  <motion.div
                    className="absolute top-0 left-0 h-2 bg-white rounded-full"
                    animate={{ width: ["20%", "80%", "20%"] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  />
                </motion.div>
                <span className="text-sm text-gray-400">∞</span>
              </div>
            </motion.div>

            {/* Floating decorative elements */}
            <motion.div
              className="absolute top-1/2 left-1/2 w-4 h-4 bg-yellow-400 rounded-full"
              animate={{
                y: [0, -30, 0],
                scale: [1, 1.5, 1],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            />

            <motion.div
              className="absolute bottom-1/4 right-1/4 w-6 h-6 border-2 border-green-500 rounded-lg"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
        </div>
      </section>

      {/* Creative Stats Section */}
      <section className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {/* Curved layout for stats */}
            <motion.div
              className="relative h-96"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              {/* Central hub */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-black rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <Sparkles className="w-12 h-12 text-white" />
              </motion.div>

              {/* Orbiting stats */}
              {[
                { number: "50K+", label: "Creators", angle: 0, color: "bg-blue-500" },
                { number: "1M+", label: "Drawings", angle: 120, color: "bg-green-500" },
                { number: "99.9%", label: "Uptime", angle: 240, color: "bg-purple-500" },
              ].map((stat, index) => {
                const radius = 140
                const x = Math.cos((stat.angle * Math.PI) / 180) * radius
                const y = Math.sin((stat.angle * Math.PI) / 180) * radius

                return (
                  <motion.div
                    key={stat.label}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    style={{ x, y }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.2 + 1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 text-center min-w-[120px]">
                      <div className={`w-8 h-8 ${stat.color} rounded-full mx-auto mb-3`}></div>
                      <div className="text-2xl font-bold text-black mb-1">{stat.number}</div>
                      <div className="text-sm text-gray-500">{stat.label}</div>
                    </div>
                  </motion.div>
                )
              })}

              {/* Connecting lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {[0, 120, 240].map((angle, index) => {
                  const radius = 140
                  const x1 = 50 + (Math.cos((angle * Math.PI) / 180) * radius) / 6
                  const y1 = 50 + (Math.sin((angle * Math.PI) / 180) * radius) / 6
                  const x2 = 50 + (Math.cos((angle * Math.PI) / 180) * (radius - 60)) / 6
                  const y2 = 50 + (Math.sin((angle * Math.PI) / 180) * (radius - 60)) / 6

                  return (
                    <motion.line
                      key={angle}
                      x1={`${x1}%`}
                      y1={`${y1}%`}
                      x2={`${x2}%`}
                      y2={`${y2}%`}
                      stroke="#e5e7eb"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: index * 0.3 + 1.5 }}
                      viewport={{ once: true }}
                    />
                  )
                })}
              </svg>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Creative CTA Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          {/* Animated background shapes */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <motion.div
          className="container mx-auto px-6 text-center relative z-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-6xl md:text-7xl font-bold text-white mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to Create
            <motion.span
              className="block text-gray-400 relative"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              Magic?
              <motion.div
                className="absolute -right-16 top-1/2 text-4xl"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              >
                ✨
              </motion.div>
            </motion.span>
          </motion.h2>

          <motion.div
            className="flex flex-col sm:flex-row gap-8 justify-center items-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                
                className="bg-white text-black hover:bg-gray-100 text-xl px-12 py-8 rounded-full font-medium relative overflow-hidden group"
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center">
                  <Download className="w-6 h-6 mr-3" />
                  Start for Free
                </span>
              </button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                
                
                className="border-white text-white hover:bg-white hover:text-black text-xl px-12 py-8 bg-transparent rounded-full font-medium"
              >
                Try in Browser
                <ArrowUpRight className="w-6 h-6 ml-3" />
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-12 text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            viewport={{ once: true }}
          >
            Free forever • No limits • Pure magic
          </motion.div>
        </motion.div>
      </section>

      {/* Creative Footer */}
      <footer className="bg-gray-900 text-white py-16 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <motion.div className="flex items-center space-x-3 mb-8 md:mb-0" whileHover={{ scale: 1.05 }}>
              <motion.div
                className="w-12 h-12 bg-white rounded-3xl flex items-center justify-center transform rotate-12"
                animate={{ rotate: [12, 17, 12] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              >
                <Pencil className="w-6 h-6 text-black -rotate-12" />
              </motion.div>
              <span className="text-2xl font-bold">Draft Space</span>
            </motion.div>

            <div className="flex items-center space-x-6">
              {[Twitter, Github].map((Icon, index) => (
                <motion.div key={index} whileHover={{ scale: 1.2, rotate: 5 }} whileTap={{ scale: 0.9 }}>
                  <Link
                    href="#"
                    className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center text-gray-400 border-t border-gray-800 pt-8">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              &copy; 2024 Draft Space. Made with ❤️ for creators everywhere.
            </motion.p>
          </div>
        </div>

        {/* Floating footer elements */}
        <motion.div
          className="absolute bottom-4 left-4 w-3 h-3 bg-blue-500 rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute top-4 right-4 w-2 h-2 bg-green-500 rounded-full"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        />
      </footer>
    </div>
  )
}
