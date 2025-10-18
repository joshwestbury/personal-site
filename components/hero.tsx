"use client"

import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <section className="py-20 md:py-40 space-y-8 relative w-full" style={{
      background: 'radial-gradient(ellipse 800px 800px at 90% 20%, oklch(0.55 0.22 200 / 0.35), transparent 70%)'
    }}>
      <div className="px-4 md:px-8">
      <div className="space-y-6 relative z-10">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-7xl font-bold text-balance leading-tight">
            Hi, I'm <span className="gradient-text">Your Name</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl text-balance leading-relaxed">
            A full-stack developer crafting beautiful, functional digital experiences. I specialize in modern web
            technologies and love turning ideas into reality.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <a
            href="#projects"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-accent-foreground rounded-lg hover:shadow-lg hover:shadow-accent/30 hover:scale-105 transition-all duration-300 font-semibold text-lg"
          >
            View My Work
            <ArrowRight size={20} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-accent text-accent hover:bg-accent/10 rounded-lg transition-all duration-300 font-semibold text-lg"
          >
            Get in Touch
          </a>
        </div>
      </div>

      <div className="pt-8 md:pt-12 relative z-10">
        <div className="inline-flex items-center gap-3 px-5 py-3 bg-accent/10 border border-accent/30 rounded-full text-sm font-medium text-accent backdrop-blur-sm">
          <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          Available for freelance & full-time opportunities
        </div>
      </div>
      </div>
    </section>
  )
}
