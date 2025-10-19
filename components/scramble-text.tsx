"use client"

import { useEffect, useRef, useState } from 'react'
import baffle from 'baffle'

interface ScrambleTextProps {
  texts: string[]
  defaultText?: string
  className?: string
}

export default function ScrambleText({ texts, defaultText, className = "" }: ScrambleTextProps) {
  const textRef = useRef<HTMLSpanElement>(null)
  const baffleInstance = useRef<any>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const isAnimating = useRef(false)

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
      characters: '░█▓ ▓▒░<>/',
      speed: 60
    })

    // Initial reveal animation
    if (defaultText) {
      baffleInstance.current.start()
      baffleInstance.current.text(() => defaultText)
      setTimeout(() => {
        baffleInstance.current.reveal(500)
      }, 500)
    }

    return () => {
      if (baffleInstance.current) {
        baffleInstance.current.stop()
      }
    }
  }, [defaultText])

  const handleMouseOver = () => {
    if (!baffleInstance.current || isAnimating.current) return

    // Prevent overlapping animations
    isAnimating.current = true

    // Get the current text from the sequence
    const selectedText = texts[currentIndex]

    // Increment index for next hover (wrap around to 0 if we reach the end)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length)

    baffleInstance.current.start()
    baffleInstance.current.text(() => selectedText)
    setTimeout(() => {
      baffleInstance.current.reveal(500)
      // Mark animation as complete after reveal finishes
      setTimeout(() => {
        isAnimating.current = false
      }, 500)
    }, 500)
  }

  const handleMouseLeave = () => {
    if (!baffleInstance.current || !defaultText || isAnimating.current) return

    // Prevent overlapping animations
    isAnimating.current = true

    // Return to default text
    baffleInstance.current.start()
    baffleInstance.current.text(() => defaultText)
    setTimeout(() => {
      baffleInstance.current.reveal(500)
      // Mark animation as complete after reveal finishes
      setTimeout(() => {
        isAnimating.current = false
      }, 500)
    }, 500)
  }

  return (
    <span
      ref={textRef}
      className={className}
      onMouseEnter={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: 'pointer' }}
    >
      {defaultText || texts[0]}
    </span>
  )
}
