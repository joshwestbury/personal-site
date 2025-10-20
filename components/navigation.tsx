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
    <nav className="glass border-border/30 fixed top-0 right-0 left-0 z-50 w-full border-b">
      <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <Link href="/" className="hover:text-accent text-xl font-bold transition-colors">
          <ScrambleText
            key="nav-scramble"
            texts={[
              "NetSuite Developer",
              "Problem Solver",
              "Digital Craftsman",
              "AI Enthusiast",
              "Integrations Developer",
            ]}
            defaultText="Technical Consultant"
            className="from-accent to-accent-secondary bg-gradient-to-r bg-clip-text text-transparent"
          />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            className="hover:bg-secondary/50 ml-2 rounded-lg p-2 transition-all duration-200"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleTheme}
            className="hover:bg-secondary/50 rounded-lg p-2 transition-all duration-200"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hover:bg-secondary/50 rounded-lg p-2 transition-all duration-200"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="glass border-border/30 animate-slide-up border-t md:hidden">
          <div className="container mx-auto max-w-7xl space-y-2 px-4 py-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-muted-foreground hover:text-foreground hover:bg-secondary/50 block rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200"
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
