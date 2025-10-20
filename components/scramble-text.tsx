"use client"

import { useEffect, useRef } from "react"
import baffle from "baffle"

interface ScrambleTextProps {
  texts: string[]
  defaultText?: string
  className?: string
}

export default function ScrambleText({ texts, defaultText, className = "" }: ScrambleTextProps) {
  const textRef = useRef<HTMLSpanElement>(null)
  const baffleInstance = useRef<any>(null)
  const currentIndexRef = useRef(0)
  const timeoutRefs = useRef<NodeJS.Timeout[]>([])
  const isHovering = useRef(false)

  // Helper function to clear all pending timeouts
  const clearAllTimeouts = () => {
    timeoutRefs.current.forEach((timeout) => clearTimeout(timeout))
    timeoutRefs.current = []
  }

  // Initialize baffle on mount
  useEffect(() => {
    if (!textRef.current) return

    // Set initial text
    if (defaultText) {
      textRef.current.textContent = defaultText
    }

    // Initialize baffle
    baffleInstance.current = baffle(textRef.current)
    baffleInstance.current.set({
      characters: "░█▓ ▓▒░<>/",
      speed: 60,
    })

    // Initial reveal animation
    if (defaultText) {
      baffleInstance.current.start()
      baffleInstance.current.text(() => defaultText)
      const timeout = setTimeout(() => {
        baffleInstance.current.reveal(500)
      }, 500)
      timeoutRefs.current.push(timeout)
    }

    return () => {
      clearAllTimeouts()
      if (baffleInstance.current) {
        baffleInstance.current.stop()
      }
    }
  }, [defaultText])

  const handleMouseEnter = () => {
    if (!baffleInstance.current || texts.length === 0 || isHovering.current) return

    isHovering.current = true

    // Clear any pending timeouts and stop ongoing animation
    clearAllTimeouts()
    baffleInstance.current.stop()

    // Get the current text from the sequence
    const selectedText = texts[currentIndexRef.current]

    // Increment index for next time (wrap around using modulo)
    currentIndexRef.current = (currentIndexRef.current + 1) % texts.length

    baffleInstance.current.start()
    baffleInstance.current.text(() => selectedText)

    const timeout1 = setTimeout(() => {
      if (!baffleInstance.current) return
      baffleInstance.current.reveal(500)
    }, 500)
    timeoutRefs.current.push(timeout1)
  }

  const handleMouseLeave = () => {
    if (!baffleInstance.current || !defaultText || !isHovering.current) return

    isHovering.current = false

    // Clear any pending timeouts and stop ongoing animation
    clearAllTimeouts()
    baffleInstance.current.stop()

    baffleInstance.current.start()
    baffleInstance.current.text(() => defaultText)

    const timeout1 = setTimeout(() => {
      if (!baffleInstance.current) return
      baffleInstance.current.reveal(500)
    }, 500)
    timeoutRefs.current.push(timeout1)
  }

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="inline-block min-w-[280px] cursor-pointer"
    >
      <span ref={textRef} className={className}>
        {defaultText || texts[0]}
      </span>
    </span>
  )
}
