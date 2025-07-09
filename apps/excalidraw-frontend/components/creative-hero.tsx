"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useInView, useMotionValue, useSpring, useTransform } from "framer-motion"
import { ArrowRight, Pencil, Github, Star, Circle, Triangle, Square } from "lucide-react"
import Link from "next/link"

export default function CreativeHero() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const { scrollYProgress } = useScroll()
    const heroRef = useRef(null)
    const featuresRef = useRef(null)
    const statsRef = useRef(null)
    const ctaRef = useRef(null)

    const isHeroInView = useInView(heroRef, { once: true })
    const isFeaturesInView = useInView(featuresRef, { once: true })
    const isStatsInView = useInView(statsRef, { once: true })
    const isCtaInView = useInView(ctaRef, { once: true })

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)
    const springX = useSpring(mouseX, { stiffness: 150, damping: 15 })
    const springY = useSpring(mouseY, { stiffness: 150, damping: 15 })

    // Parallax transforms
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100])
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -200])
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -50])

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
        <div className="min-h-screen bg-white overflow-hidden relative">


            {/* Minimal floating geometric shapes background */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(8)].map((_, i) => {
                    const shapes = [Circle, Triangle, Square, Star]
                    const Shape = shapes[i % shapes.length]
                    return (
                        <motion.div
                            key={i}
                            className="absolute opacity-2"
                            style={{
                                left: `${15 + ((i * 12) % 70)}%`,
                                top: `${15 + ((i * 15) % 70)}%`,
                            }}
                            animate={{
                                y: [0, -20, 0],
                                x: [0, 15, 0],
                                rotate: [0, 180, 360],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 15 + i * 2,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                                delay: i * 0.5,
                            }}
                        >
                            <Shape className="w-4 h-4 text-gray-100" />
                        </motion.div>
                    )
                })}
            </div>

            {/* Enhanced Header */}
            <motion.header
                className="fixed w-full z-40 bg-white/95 backdrop-blur-2xl border-b border-gray-100/50"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.6, 0.01, 0.05, 0.95] }}
            >
                <div className="container mx-auto px-6 py-3 flex items-center justify-between">
                    <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                        <motion.div
                            className="relative"
                            animate={{ rotate: [0, 12, -8, 0] }}
                            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
                        >
                            <div className="w-11 h-11 bg-gradient-to-br from-gray-900 to-black rounded-2xl flex items-center justify-center transform rotate-12 shadow-lg">
                                <Pencil className="w-5 h-5 text-white -rotate-12" />
                            </div>
                            <motion.div
                                className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                animate={{ scale: [1, 1.6, 1] }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                            />
                        </motion.div>
                        <span className="text-xl font-bold tracking-tight text-black">Draft Space</span>
                    </motion.div>

                    <nav className="hidden md:flex items-center space-x-10">
                        {["Features", "Magic", "Community"].map((item, index) => (
                            <motion.a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-gray-600 hover:text-black transition-all duration-300 relative font-medium text-lg"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 + 0.5 }}
                                whileHover={{ y: -3, scale: 1.05 }}
                            >
                                {item}
                                <motion.div
                                    className="absolute -bottom-2 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                    whileHover={{ width: "100%" }}
                                    transition={{ duration: 0.4 }}
                                />
                            </motion.a>
                        ))}
                    </nav>
                    <Link href="/signin">
                        <motion.button
                            className="bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-800 text-white px-7 py-3 rounded-full font-medium transition-all duration-300 shadow-lg cursor-pointer"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.8 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Start Creating
                        </motion.button>
                    </Link>
                </div>
            </motion.header>

            {/* Hero Section */}
            <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-32">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-7xl mx-auto">
                        {/* Revolutionary text layout */}
                        <div className="relative text-center mb-8">
                            {/* Enhanced background text */}
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={isHeroInView ? { opacity: 0.06 } : {}}
                                transition={{ delay: 0.5, duration: 1 }}
                            >
                                <span className="text-[18rem] font-black text-gray-700 select-none tracking-tighter" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.05)' }}  >CREATE</span>
                            </motion.div>

                            {/* Main heading with enhanced staggered reveal */}
                            <motion.div className="relative z-10">
                                <div className="overflow-hidden">
                                    <motion.h1
                                        className="text-7xl md:text-8xl lg:text-9xl font-black leading-none mb-6 tracking-tight"
                                        initial={{ y: "100%" }}
                                        animate={isHeroInView ? { y: 0 } : {}}
                                        transition={{ delay: 0.6, duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] }}
                                    >
                                        <span className="block relative">
                                            Draw
                                            {/* Enhanced floating pencil */}
                                            <motion.div
                                                className="absolute -top-8 -right-16 text-5xl"
                                                animate={{
                                                    rotate: [0, 20, -15, 0],
                                                    y: [0, -15, 0],
                                                    scale: [1, 1.1, 1],
                                                }}
                                                transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                                            >
                                                ✏️
                                            </motion.div>
                                        </span>
                                    </motion.h1>
                                </div>

                                <div className="overflow-hidden">
                                    <motion.h1
                                        className="text-7xl md:text-8xl lg:text-9xl font-black leading-none mb-6 text-black tracking-tight"
                                        initial={{ y: "110%" }}
                                        animate={isHeroInView ? { y: 0 } : {}}
                                        transition={{ delay: 0.8, duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] }}
                                    >
                                        <span className="block relative">
                                            Beyond
                                            {/* Enhanced orbiting elements */}
                                            <motion.div
                                                className="absolute top-1/2 -right-20 w-16 h-16"
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                            >
                                                <motion.div
                                                    className="w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 shadow-lg"
                                                    animate={{ scale: [1, 1.8, 1] }}
                                                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                                />
                                                <motion.div
                                                    className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2 shadow-lg"
                                                    animate={{ scale: [1, 1.5, 1] }}
                                                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                                                />
                                                <motion.div
                                                    className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full absolute left-0 top-1/2 transform -translate-y-1/2 shadow-lg"
                                                    animate={{ scale: [1, 1.3, 1] }}
                                                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                                                />
                                            </motion.div>
                                        </span>
                                    </motion.h1>
                                </div>

                                <div className="overflow-hidden">
                                    <motion.h1
                                        className="text-7xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight"
                                        initial={{ y: "100%" }}
                                        animate={isHeroInView ? { y: 0 } : {}}
                                        transition={{ delay: 1, duration: 0.8, ease: [0.6, 0.01, 0.05, 0.95] }}
                                    >
                                        <span className="block relative">
                                            Reality
                                            {/* Enhanced sparkle trail */}
                                            <motion.div
                                                className="absolute -bottom-6 left-0 flex space-x-3"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 2 }}
                                            >
                                                {[...Array(5)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        className="w-1.5 h-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                                                        animate={{
                                                            scale: [0, 1.5, 0],
                                                            opacity: [0, 1, 0],
                                                        }}
                                                        transition={{
                                                            duration: 2.5,
                                                            repeat: Number.POSITIVE_INFINITY,
                                                            delay: i * 0.2,
                                                        }}
                                                    />
                                                ))}
                                            </motion.div>
                                        </span>
                                    </motion.h1>
                                </div>
                            </motion.div>
                        </div>

                        {/* Enhanced animated subtitle */}
                        <motion.div
                            className="text-center mb-20"
                            initial={{ opacity: 0 }}
                            animate={isHeroInView ? { opacity: 1 } : {}}
                            transition={{ delay: 1.4, duration: 0.8 }}
                        >
                            <motion.p className="text-2xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
                                Where imagination meets infinite possibilities through the power of collaborative creation
                            </motion.p>
                        </motion.div>

                        {/* Enhanced CTA buttons */}
                        <motion.div
                            className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-24"
                            initial={{ opacity: 0, y: 50 }}
                            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 1.6, duration: 0.8 }}
                        >
                            <Link href="/signin" >
                                <motion.button
                                    className="group relative bg-gradient-to-r from-gray-900 to-black text-white px-12 py-5 rounded-full font-medium text-lg overflow-hidden shadow-xl cursor-pointer"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <motion.div
                                        className="absolute inset-0 "
                                        initial={{ x: "-100%" }}
                                        whileHover={{ x: 0 }}
                                        transition={{ duration: 0.4 }}
                                    />
                                    <span className="relative z-10 flex items-center">
                                        Start Creating
                                        <motion.div
                                            className="ml-3"
                                            animate={{ x: [0, 6, 0] }}
                                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                        >
                                            <ArrowRight className="w-5 h-5" />
                                        </motion.div>
                                    </span>
                                </motion.button>
                            </Link>
                            <a href="https://github.com/nitinn13/Excalidraw" target="_blank">
                                <motion.button
                                    className="group relative px-12 py-5 border-2 border-gray-300 hover:border-gray-900 bg-transparent text-gray-900 rounded-full font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="flex items-center">
                                        <Github className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                                        View on GitHub
                                    </span>
                                </motion.button>
                            </a>
                        </motion.div>

                        {/* Minimalistic Professional Creative Studio */}
                        <motion.div
                            className="relative max-w-5xl mx-auto h-[500px]"
                            initial={{ opacity: 0 }}
                            animate={isHeroInView ? { opacity: 1 } : {}}
                            transition={{ delay: 1.8, duration: 1.2 }}
                            id="magic"
                        >
                            {/* Central minimalistic device */}
                            <motion.div
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                                initial={{ scale: 0, rotateY: 180 }}
                                animate={isHeroInView ? { scale: 1, rotateY: 0 } : {}}
                                transition={{ delay: 2, duration: 1.2, ease: [0.6, 0.01, 0.05, 0.95] }}
                                whileHover={{ scale: 1.02, y: -5 }}
                                style={{ perspective: "1000px" }}
                            >
                                <div className="relative w-80 h-96 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                                    {/* Clean header */}
                                    <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-b border-gray-100">
                                        <div className="flex space-x-2">
                                            <div className="w-3 h-3 bg-red-500 rounded-full" />
                                            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                                            <div className="w-3 h-3 bg-green-500 rounded-full" />
                                        </div>
                                        <div className="text-sm font-medium text-gray-700">Draft Space</div>
                                    </div>

                                    {/* Clean canvas area */}
                                    <div className="p-8 h-full bg-white relative">
                                        {/* Minimalistic drawing elements */}
                                        <motion.div
                                            className="absolute top-16 left-8 w-16 h-16 border-2 border-blue-500 rounded-2xl"
                                            animate={{
                                                y: [0, -8, 0],
                                                rotate: [0, 5, 0],
                                            }}
                                            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                                        />

                                        <motion.div
                                            className="absolute top-20 right-12 w-12 h-12 bg-purple-500 rounded-full"
                                            animate={{
                                                scale: [1, 1.1, 1],
                                                y: [0, 10, 0],
                                            }}
                                            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                                        />

                                        <motion.div
                                            className="absolute bottom-20 left-12 w-20 h-8 bg-green-500 rounded-xl"
                                            animate={{
                                                x: [0, 8, 0],
                                                rotate: [0, -2, 0],
                                            }}
                                            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
                                        />

                                        {/* Central focus element */}
                                        <motion.div
                                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full"
                                            animate={{
                                                scale: [1, 1.15, 1],
                                                rotate: [0, 180, 360],
                                            }}
                                            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
                                        />

                                        {/* Minimal floating dots */}
                                        {[...Array(6)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="absolute w-2 h-2 bg-gray-400 rounded-full"
                                                style={{
                                                    left: `${20 + i * 12}%`,
                                                    top: `${30 + Math.sin(i) * 15}%`,
                                                }}
                                                animate={{
                                                    y: [0, -15, 0],
                                                    opacity: [0.3, 0.8, 0.3],
                                                }}
                                                transition={{
                                                    duration: 3,
                                                    repeat: Number.POSITIVE_INFINITY,
                                                    delay: i * 0.4,
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>

                            {/* Clean orbiting tools */}
                            {[
                                { icon: "🎨", angle: 0, radius: 180, color: "from-pink-500 to-rose-500" },
                                { icon: "✏️", angle: 90, radius: 180, color: "from-blue-500 to-cyan-500" },
                                { icon: "🖌️", angle: 180, radius: 180, color: "from-purple-500 to-indigo-500" },
                                { icon: "✨", angle: 270, radius: 180, color: "from-green-500 to-emerald-500" },
                            ].map((item, index) => {
                                const x = Math.cos((item.angle * Math.PI) / 180) * item.radius
                                const y = Math.sin((item.angle * Math.PI) / 180) * item.radius

                                return (
                                    <motion.div
                                        key={index}
                                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                        style={{ x, y }}
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={isHeroInView ? { scale: 1, opacity: 1 } : {}}
                                        transition={{ delay: 2.5 + index * 0.2, duration: 0.8 }}
                                        whileHover={{ scale: 1.2, zIndex: 30 }}
                                    >
                                        <motion.div
                                            className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl shadow-lg flex items-center justify-center text-xl cursor-pointer`}
                                            animate={{
                                                y: [0, -8, 0],
                                            }}
                                            transition={{
                                                duration: 3 + index,
                                                repeat: Number.POSITIVE_INFINITY,
                                            }}
                                        >
                                            {item.icon}
                                        </motion.div>
                                    </motion.div>
                                )
                            })}

                            {/* Clean info cards */}
                            <motion.div
                                className="absolute top-16 left-16 w-48 h-24 bg-white rounded-2xl shadow-lg p-4 border border-gray-100"
                                initial={{ opacity: 0, x: -50, rotate: -5 }}
                                animate={isHeroInView ? { opacity: 1, x: 0, rotate: -3 } : {}}
                                transition={{ delay: 3, duration: 0.8 }}
                                whileHover={{ scale: 1.02, rotate: 0, y: -2 }}
                            >
                                <div className="flex items-center space-x-2 mb-2">
                                    <motion.div
                                        className="w-2 h-2 bg-green-500 rounded-full"
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                    />
                                    <span className="text-xs font-medium text-gray-600">Live</span>
                                </div>
                                <h3 className="font-semibold text-sm text-gray-900">Active Project</h3>
                                <p className="text-xs text-gray-500 mt-1">3 collaborators</p>
                            </motion.div>

                            <motion.div
                                className="absolute top-20 right-16 w-40 h-32 bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-lg p-4 text-white"
                                initial={{ opacity: 0, x: 50, rotate: 5 }}
                                animate={isHeroInView ? { opacity: 1, x: 0, rotate: 3 } : {}}
                                transition={{ delay: 3.2, duration: 0.8 }}
                                whileHover={{ scale: 1.02, rotate: 0, y: -2 }}
                            >
                                <div className="text-xs font-medium mb-2 opacity-80">Tools</div>
                                <div className="text-sm font-semibold mb-1">Brush • Pen</div>
                                <div className="text-xs opacity-60">Ready to create</div>
                            </motion.div>

                            {/* Minimal connecting lines */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                                {[
                                    { x1: "30%", y1: "30%", x2: "50%", y2: "50%" },
                                    { x1: "70%", y1: "35%", x2: "50%", y2: "50%" },
                                ].map((line, index) => (
                                    <motion.line
                                        key={index}
                                        x1={line.x1}
                                        y1={line.y1}
                                        x2={line.x2}
                                        y2={line.y2}
                                        stroke="#6b7280"
                                        strokeWidth="1"
                                        strokeDasharray="4,4"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ delay: 4 + index * 0.5, duration: 2 }}
                                    />
                                ))}
                            </svg>
                        </motion.div>
                    </div>
                </div>

                {/* Minimal floating decorative elements */}
                <motion.div
                    className="absolute top-1/4 left-16 w-3 h-3 bg-blue-500 rounded-full opacity-40"
                    animate={{
                        y: [0, -20, 0],
                        scale: [1, 1.3, 1],
                    }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                />

                <motion.div
                    className="absolute bottom-1/4 right-16 w-4 h-4 border-2 border-purple-500 rounded-lg opacity-40"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
                />
            </section>

            {/* Minimalistic Creative Features */}
            <section ref={featuresRef} className="py-32 bg-white relative overflow-hidden" id="features">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="text-center mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.h2
                            className="text-4xl md:text-5xl font-light mb-6 text-black tracking-tight"
                            initial={{ opacity: 0 }}
                            animate={isFeaturesInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Pure Simplicity
                        </motion.h2>
                        <motion.p
                            className="text-lg text-gray-600 max-w-xl mx-auto font-light"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Everything you need, nothing you don't
                        </motion.p>
                    </motion.div>

                    {/* Clean Feature Grid */}
                    <div className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-3 gap-16">
                            {[
                                {
                                    title: "Instant",
                                    description: "Zero setup required",
                                    number: "01",
                                },
                                {
                                    title: "Collaborative",
                                    description: "Real-time together",
                                    number: "02",
                                },
                                {
                                    title: "Limitless",
                                    description: "Infinite possibilities",
                                    number: "03",
                                },
                            ].map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    className="text-center relative"
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                                    whileHover={{ y: -5 }}
                                >
                                    {/* Minimal number indicator */}
                                    <motion.div
                                        className="text-6xl font-thin text-gray-200 mb-6"
                                        whileHover={{ scale: 1.1, color: "#000" }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {feature.number}
                                    </motion.div>

                                    <h3 className="text-xl font-medium mb-3 text-black">{feature.title}</h3>
                                    <p className="text-gray-600 font-light leading-relaxed">{feature.description}</p>

                                    {/* Subtle hover line */}
                                    <motion.div
                                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-px bg-black"
                                        whileHover={{ width: "60%" }}
                                        transition={{ duration: 0.4 }}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Minimal decorative element */}
                    <motion.div
                        className="flex justify-center mt-20"
                        initial={{ opacity: 0 }}
                        animate={isFeaturesInView ? { opacity: 1 } : {}}
                        transition={{ duration: 1, delay: 1.5 }}
                    >
                        <motion.div
                            className="w-px h-16 bg-gradient-to-b from-transparent via-gray-300 to-transparent"
                            animate={{ scaleY: [1, 1.2, 1] }}
                            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                        />
                    </motion.div>
                </div>
            </section>

            {/* Minimalistic Stats */}
            <section ref={statsRef} className="py-32 bg-gray-50 relative overflow-hidden" id="community">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="max-w-4xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Clean stats layout */}
                        <div className="grid md:grid-cols-3 gap-16 text-center">
                            {[
                                { number: "50K+", label: "Creators" },
                                { number: "1M+", label: "Projects" },
                                { number: "99.9%", label: "Uptime" },
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    className="relative"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={isStatsInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                >
                                    <motion.div
                                        className="text-5xl md:text-6xl font-thin text-black mb-4"
                                        initial={{ opacity: 0 }}
                                        animate={isStatsInView ? { opacity: 1 } : {}}
                                        transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                                    >
                                        {stat.number}
                                    </motion.div>
                                    <div className="text-gray-600 font-light tracking-wide uppercase text-sm">{stat.label}</div>

                                    {/* Minimal progress indicator */}
                                    <motion.div
                                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-px bg-black"
                                        initial={{ scaleX: 0 }}
                                        animate={isStatsInView ? { scaleX: 1 } : {}}
                                        transition={{ duration: 0.8, delay: 1 + index * 0.2 }}
                                    />
                                </motion.div>
                            ))}
                        </div>

                        {/* Subtle connecting lines */}
                        <motion.div
                            className="flex justify-center items-center mt-16 space-x-8"
                            initial={{ opacity: 0 }}
                            animate={isStatsInView ? { opacity: 1 } : {}}
                            transition={{ duration: 1, delay: 1.5 }}
                        >
                            <div className="w-16 h-px bg-gray-300" />
                            <div className="w-2 h-2 bg-gray-400 rounded-full" />
                            <div className="w-16 h-px bg-gray-300" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

        </div>
    )
}
