"use client"

import { useEffect, useRef } from 'react'
import baffle from 'baffle'

interface ScrambleTextProps {
  texts: string[]
  defaultText?: string
  className?: string
}

export default function ScrambleText({ texts, defaultText, className = "" }: ScrambleTextProps) {
  const textRef = useRef<HTMLSpanElement>(null)
  const baffleInstance = useRef<any>(null)
  const currentIndexRef = useRef(0)
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

  const handleMouseEnter = () => {
    if (!baffleInstance.current || texts.length === 0) return

    // Stop any ongoing animation
    baffleInstance.current.stop()
    isAnimating.current = true

    // Get the current text from the sequence
    const selectedText = texts[currentIndexRef.current]

    // Increment index for next time (wrap around using modulo)
    currentIndexRef.current = (currentIndexRef.current + 1) % texts.length

    baffleInstance.current.start()
    baffleInstance.current.text(() => selectedText)
    setTimeout(() => {
      baffleInstance.current.reveal(500)
      setTimeout(() => {
        isAnimating.current = false
      }, 500)
    }, 500)
  }

  const handleMouseLeave = () => {
    if (!baffleInstance.current || !defaultText) return

    // Stop any ongoing animation and return to default
    baffleInstance.current.stop()
    isAnimating.current = true

    baffleInstance.current.start()
    baffleInstance.current.text(() => defaultText)
    setTimeout(() => {
      baffleInstance.current.reveal(500)
      setTimeout(() => {
        isAnimating.current = false
      }, 500)
    }, 500)
  }

  return (
    <span
      ref={textRef}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: 'pointer' }}
    >
      {defaultText || texts[0]}
    </span>
  )
}
