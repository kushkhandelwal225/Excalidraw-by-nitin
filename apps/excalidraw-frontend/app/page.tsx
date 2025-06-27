"use client"

import { Button } from "@repo/ui/button"
import { ArrowRight, Users, Zap, Palette, Github, Play, Sparkles, MousePointer2 } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Animated cursor trail */}
      <div
        className="fixed w-4 h-4 bg-blue-500 rounded-full pointer-events-none z-50 transition-all duration-100 ease-out opacity-60"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: `scale(${isDrawing ? 1.5 : 1})`,
        }}
      />

      {/* Floating geometric shapes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-16 h-16 border-2 border-blue-200 rounded-lg animate-float opacity-30" />
        <div className="absolute top-40 right-20 w-12 h-12 border-2 border-green-200 rounded-full animate-float-delayed opacity-30" />
        <div className="absolute bottom-40 left-20 w-8 h-8 bg-purple-200 rotate-45 animate-bounce-slow opacity-30" />
        <div className="absolute bottom-20 right-40 w-20 h-1 bg-yellow-200 animate-pulse opacity-30" />
      </div>

      {/* Header */}
      <header className="relative z-50 px-4 lg:px-6 h-16 flex items-center border-b border-gray-100 backdrop-blur-sm bg-white/80">
        <div className="flex items-center space-x-2 group">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center transition-transform group-hover:rotate-12 group-hover:scale-110">
            <Palette className="w-4 h-4 text-white transition-transform group-hover:rotate-12" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
            Draft Space
          </span>
        </div>
        <nav className="ml-auto flex gap-6">
          <Link
            href="#features"
            className="text-sm font-medium hover:text-gray-600 transition-all hover:scale-105 relative group"
          >
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full" />
          </Link>
          <Link
            href="#demo"
            className="text-sm font-medium hover:text-gray-600 transition-all hover:scale-105 relative group"
          >
            Demo
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all group-hover:w-full" />
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium hover:text-gray-600 transition-all hover:scale-105 relative group"
          >
            Pricing
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full" />
          </Link>
        </nav>
        <div className="ml-6 flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="hover:scale-105 transition-transform">
            Sign In
          </Button>
          <Button size="sm" className="hover:scale-105 transition-all hover:shadow-lg">
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-grid-pattern animate-grid-move" />
        </div>

        {/* Animated sketched elements */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
            <path
              d="M100 200 Q 200 100 300 200 T 500 200"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="animate-draw-line"
              strokeDasharray="400"
              strokeDashoffset="400"
            />
            <circle
              cx="800"
              cy="150"
              r="50"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="animate-draw-circle"
              strokeDasharray="314"
              strokeDashoffset="314"
            />
            <rect
              x="900"
              y="300"
              width="100"
              height="80"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              transform="rotate(15 950 340)"
              className="animate-draw-rect"
              strokeDasharray="360"
              strokeDashoffset="360"
            />
            <path
              d="M200 500 L 300 400 L 400 500 L 350 600 L 250 600 Z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="animate-draw-polygon"
              strokeDasharray="500"
              strokeDashoffset="500"
            />
          </svg>
        </div>

        <div className="relative px-4 py-20 lg:py-32">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full px-4 py-2 text-sm border border-blue-100 hover:scale-105 transition-transform cursor-pointer">
                    <Sparkles className="w-4 h-4 text-blue-500 animate-pulse" />
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-medium">
                      Now with real-time collaboration
                    </span>
                  </div>

                  <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                    <span className="inline-block animate-slide-up">Draw Ideas</span>
                    <br />
                    <span className="relative inline-block animate-slide-up-delayed">
                      Into Reality
                      <svg
                        className="absolute -bottom-2 left-0 w-full h-4 animate-draw-underline"
                        viewBox="0 0 300 20"
                        fill="none"
                      >
                        <path
                          d="M5 15 Q 150 5 295 15"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray="300"
                          strokeDashoffset="300"
                        />
                      </svg>
                    </span>
                  </h1>

                  <p className="text-xl text-gray-600 max-w-lg animate-fade-in-up">
                    The infinite canvas for visual thinking. Sketch, wireframe, and collaborate with your team in
                    real-time.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up-delayed">
                  <Button
                    size="lg"
                    className="text-lg px-8 py-6 hover:scale-105 transition-all hover:shadow-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onMouseEnter={() => setIsDrawing(true)}
                    onMouseLeave={() => setIsDrawing(false)}
                  >
                    Start Drawing Free
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 py-6 bg-transparent hover:scale-105 transition-all hover:shadow-lg hover:bg-gray-50 group"
                  >
                    <Play className="mr-2 w-5 h-5 transition-transform group-hover:scale-110" />
                    Watch Demo
                  </Button>
                </div>

                <div className="flex items-center space-x-8 text-sm text-gray-500 animate-fade-in">
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white animate-bounce-gentle"></div>
                      <div className="w-8 h-8 bg-green-500 rounded-full border-2 border-white animate-bounce-gentle-delayed"></div>
                      <div className="w-8 h-8 bg-purple-500 rounded-full border-2 border-white animate-bounce-gentle-more-delayed"></div>
                    </div>
                    <span>10k+ creators</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>★★★★★</span>
                    <span>4.9/5 rating</span>
                  </div>
                </div>
              </div>

              {/* Interactive Canvas Preview */}
              <div className="relative animate-slide-in-right">
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border-2 border-dashed border-gray-200 hover:border-blue-300 transition-all hover:scale-105 hover:shadow-xl">
                  <div className="aspect-square bg-white rounded-xl shadow-lg p-6 relative overflow-hidden group">
                    {/* Animated drawing elements */}
                    <svg className="w-full h-full" viewBox="0 0 300 300" fill="none">
                      <rect
                        x="50"
                        y="50"
                        width="80"
                        height="60"
                        stroke="#3B82F6"
                        strokeWidth="2"
                        fill="rgba(59, 130, 246, 0.1)"
                        rx="4"
                        className="animate-draw-element"
                        strokeDasharray="280"
                        strokeDashoffset="280"
                      />
                      <rect
                        x="170"
                        y="80"
                        width="80"
                        height="60"
                        stroke="#10B981"
                        strokeWidth="2"
                        fill="rgba(16, 185, 129, 0.1)"
                        rx="4"
                        className="animate-draw-element-delayed"
                        strokeDasharray="280"
                        strokeDashoffset="280"
                      />
                      <path
                        d="M130 80 L170 110"
                        stroke="#6B7280"
                        strokeWidth="2"
                        markerEnd="url(#arrowhead)"
                        className="animate-draw-arrow"
                        strokeDasharray="50"
                        strokeDashoffset="50"
                      />
                      <circle
                        cx="90"
                        cy="200"
                        r="30"
                        stroke="#F59E0B"
                        strokeWidth="2"
                        fill="rgba(245, 158, 11, 0.1)"
                        className="animate-draw-circle-delayed"
                        strokeDasharray="188"
                        strokeDashoffset="188"
                      />
                      <rect
                        x="170"
                        y="180"
                        width="60"
                        height="40"
                        stroke="#EF4444"
                        strokeWidth="2"
                        fill="rgba(239, 68, 68, 0.1)"
                        rx="4"
                        className="animate-draw-element-more-delayed"
                        strokeDasharray="200"
                        strokeDashoffset="200"
                      />
                      <path
                        d="M120 200 L170 200"
                        stroke="#6B7280"
                        strokeWidth="2"
                        markerEnd="url(#arrowhead)"
                        className="animate-draw-arrow-delayed"
                        strokeDasharray="50"
                        strokeDashoffset="50"
                      />

                      <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" fill="#6B7280" />
                        </marker>
                      </defs>
                    </svg>

                    {/* Animated floating cursors */}
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <div className="relative">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-cursor-float"></div>
                        <MousePointer2 className="w-4 h-4 text-blue-500 absolute -top-1 -left-1 animate-cursor-wiggle" />
                      </div>
                      <div className="relative">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-cursor-float-delayed"></div>
                        <MousePointer2 className="w-4 h-4 text-green-500 absolute -top-1 -left-1 animate-cursor-wiggle-delayed" />
                      </div>
                    </div>

                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                  </div>

                  {/* Animated toolbar */}
                  <div className="mt-4 flex justify-center">
                    <div className="bg-white rounded-lg shadow-md p-2 flex space-x-2 hover:shadow-lg transition-shadow">
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center hover:bg-blue-100 transition-colors cursor-pointer group">
                        <div className="w-4 h-4 border-2 border-gray-400 group-hover:border-blue-500 transition-colors"></div>
                      </div>
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center hover:bg-green-100 transition-colors cursor-pointer group">
                        <div className="w-4 h-4 rounded-full border-2 border-gray-400 group-hover:border-green-500 transition-colors"></div>
                      </div>
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                        <div className="w-4 h-1 bg-blue-500 animate-pulse"></div>
                      </div>
                      <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center hover:bg-purple-100 transition-colors cursor-pointer group">
                        <div className="text-xs font-bold text-gray-600 group-hover:text-purple-600 transition-colors">
                          T
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 border border-blue-200 rounded-full animate-spin-slow" />
          <div className="absolute bottom-10 right-10 w-24 h-24 border border-purple-200 rounded-lg animate-pulse" />
        </div>

        <div className="max-w-6xl mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 animate-fade-in-up">
              Everything you need to
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                visualize
              </span>
            </h2>
            <p className="text-xl text-gray-600 animate-fade-in-up-delayed">
              Powerful tools that feel natural and intuitive
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 group animate-slide-up">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-transform">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Collaboration</h3>
              <p className="text-gray-600 mb-4">
                Work together seamlessly with your team. See cursors, edits, and comments in real-time.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 group-hover:bg-blue-50 transition-colors">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <div className="flex -space-x-1">
                    <div className="w-6 h-6 bg-blue-400 rounded-full border-2 border-white animate-pulse"></div>
                    <div
                      className="w-6 h-6 bg-green-400 rounded-full border-2 border-white animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                  </div>
                  <span>2 people editing</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 group animate-slide-up-delayed">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-transform">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
              <p className="text-gray-600 mb-4">
                Optimized for speed and performance. No lag, no delays - just pure creative flow.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 group-hover:bg-green-50 transition-colors">
                <div className="text-sm text-gray-500">
                  <div className="flex justify-between mb-1">
                    <span>Performance</span>
                    <span>99.9%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full animate-progress" style={{ width: "99.9%" }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300 group animate-slide-up-more-delayed">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-transform">
                <Palette className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Infinite Canvas</h3>
              <p className="text-gray-600 mb-4">
                Never run out of space. Pan, zoom, and create without boundaries on our infinite canvas.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 relative overflow-hidden group-hover:bg-purple-50 transition-colors">
                <div className="grid grid-cols-4 gap-1 opacity-30">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 border border-gray-300 animate-grid-fade"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    ></div>
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-2xl text-gray-500 animate-spin-slow">∞</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 animate-fade-in-up">See it in action</h2>
          <p className="text-xl text-gray-600 mb-12 animate-fade-in-up-delayed">
            Watch how Draft Space transforms the way teams collaborate visually
          </p>

          <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all hover:scale-105 group">
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-100 hover:scale-110 transition-all group-hover:shadow-xl z-10"
              >
                <Play className="mr-2 w-6 h-6 group-hover:scale-110 transition-transform" />
                Play Demo Video
              </Button>

              {/* Animated play button background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Animated browser chrome */}
            <div className="absolute top-4 left-4 flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div
                className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
            </div>

            {/* Floating elements */}
            <div className="absolute top-20 right-20 w-4 h-4 bg-blue-400 rounded-full animate-float opacity-60" />
            <div className="absolute bottom-20 left-20 w-6 h-6 border-2 border-purple-400 rounded-lg animate-spin-slow opacity-60" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
            <defs>
              <pattern id="animated-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="animate-pulse"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#animated-grid)" />
          </svg>
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full animate-spin-slow" />
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-white/20 rounded-lg animate-bounce-slow" />
          <div className="absolute top-1/2 left-10 w-16 h-16 bg-white/5 rounded-full animate-pulse" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6 animate-fade-in-up">
            Ready to start
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {" "}
              creating?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto animate-fade-in-up-delayed">
            Join thousands of creators, designers, and teams who use Draft Space to bring their ideas to life.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up-more-delayed">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6 hover:scale-105 transition-all hover:shadow-xl group"
            >
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-6 bg-transparent hover:scale-105 transition-all group"
            >
              <Github className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
              View on GitHub
            </Button>
          </div>

          <div className="text-sm text-gray-400 animate-fade-in">
            No credit card required • Free forever plan available
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 group">
                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <Palette className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold">Draft Space</span>
              </div>
              <p className="text-gray-600">The infinite canvas for visual thinking and collaboration.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <Link href="#" className="block hover:text-gray-900 transition-colors hover:translate-x-1">
                  Features
                </Link>
                <Link href="#" className="block hover:text-gray-900 transition-colors hover:translate-x-1">
                  Pricing
                </Link>
                <Link href="#" className="block hover:text-gray-900 transition-colors hover:translate-x-1">
                  Templates
                </Link>
                <Link href="#" className="block hover:text-gray-900 transition-colors hover:translate-x-1">
                  Integrations
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <Link href="#" className="block hover:text-gray-900 transition-colors hover:translate-x-1">
                  About
                </Link>
                <Link href="#" className="block hover:text-gray-900 transition-colors hover:translate-x-1">
                  Blog
                </Link>
                <Link href="#" className="block hover:text-gray-900 transition-colors hover:translate-x-1">
                  Careers
                </Link>
                <Link href="#" className="block hover:text-gray-900 transition-colors hover:translate-x-1">
                  Contact
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <Link href="#" className="block hover:text-gray-900 transition-colors hover:translate-x-1">
                  Help Center
                </Link>
                <Link href="#" className="block hover:text-gray-900 transition-colors hover:translate-x-1">
                  Community
                </Link>
                <Link href="#" className="block hover:text-gray-900 transition-colors hover:translate-x-1">
                  Status
                </Link>
                <Link href="#" className="block hover:text-gray-900 transition-colors hover:translate-x-1">
                  Privacy
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">© 2024 Draft Space. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link href="#" className="text-gray-400 hover:text-gray-600 hover:scale-110 transition-all">
                <Github className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
