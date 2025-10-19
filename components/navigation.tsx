"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Moon, Sun } from "lucide-react"
import ScrambleText from "./scramble-text"

interface NavigationProps {
  isDark: boolean
  toggleTheme: () => void
}

export default function Navigation({ isDark, toggleTheme }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Learning", href: "#learning" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30 w-full">
      <div className="container max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold hover:text-accent transition-colors"
        >
          <ScrambleText
            texts={[
              "NetSuite Developer",
              "Problem Solver",
              "Digital Craftsman",
              "AI Enthusiast",
              "Integrations Developer"
            ]}
            defaultText="Josh Westbury"
            className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent"
          />
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-all duration-200"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            className="ml-2 p-2 hover:bg-secondary/50 rounded-lg transition-all duration-200"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-secondary/50 rounded-lg transition-all duration-200"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-secondary/50 rounded-lg transition-all duration-200"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden glass border-t border-border/30 animate-slide-up">
          <div className="container max-w-7xl mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
