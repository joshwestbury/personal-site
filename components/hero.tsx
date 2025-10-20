"use client"

import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"

export default function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="bg-accent/10 absolute top-0 right-1/4 h-[600px] w-[600px] animate-pulse rounded-full blur-3xl" />
        <div className="bg-accent-secondary/10 absolute bottom-0 left-1/4 h-[500px] w-[500px] animate-pulse rounded-full blur-3xl delay-1000" />
      </div>

      <div className="container max-w-6xl px-4 py-20 md:px-8 md:py-32">
        <div className="animate-fade-in space-y-8">
          <div className="space-y-6">
            <h1 className="text-5xl leading-[1.1] font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              Hi, I'm <span className="gradient-text">Josh Westbury</span>
            </h1>

            <p className="text-muted-foreground max-w-3xl text-xl leading-relaxed sm:text-2xl md:text-3xl">
              I'm a Solution Architect specializing in system integrations, NetSuite development,
              and AI-driven automation
            </p>
          </div>

          <div className="flex flex-col gap-4 pt-4 sm:flex-row">
            <a
              href="#projects"
              className="group bg-accent text-accent-foreground hover:shadow-accent/30 inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              View My Work
              <span className="sr-only">Navigate to projects section</span>
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="border-border bg-card hover:bg-secondary hover:border-accent inline-flex items-center justify-center rounded-xl border-2 px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              Get in Touch
              <span className="sr-only">Navigate to contact form</span>
            </a>
          </div>

          <div className="flex items-center gap-4 pt-8">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary hover:bg-accent hover:text-accent-foreground rounded-lg p-3 transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary hover:bg-accent hover:text-accent-foreground rounded-lg p-3 transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-secondary hover:bg-accent hover:text-accent-foreground rounded-lg p-3 transition-all duration-300 hover:scale-110"
              aria-label="X (formerly Twitter)"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="mailto:hello@example.com"
              className="bg-secondary hover:bg-accent hover:text-accent-foreground rounded-lg p-3 transition-all duration-300 hover:scale-110"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
          <span className="sr-only">Scroll down to about section</span>
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </a>
      </div>
    </section>
  )
}
