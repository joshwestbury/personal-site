"use client"

import type React from "react"
import { useState } from "react"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData)
      setSubmitted(true)
      setIsLoading(false)
      setTimeout(() => {
        setFormData({ name: "", email: "", message: "" })
        setSubmitted(false)
      }, 3000)
    }, 1000)
  }

  return (
    <section id="contact" className="py-20 md:py-32 space-y-12 w-full">
      <div className="space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold">Get in Touch</h2>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Have a project in mind or just want to chat? I'd love to hear from you. Reach out and let's create something
          amazing together.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="border border-border rounded-lg p-6 space-y-3">
          <Mail className="text-accent" size={24} />
          <h3 className="font-semibold">Email</h3>
          <a href="mailto:hello@example.com" className="text-muted-foreground hover:text-accent transition-colors">
            hello@example.com
          </a>
        </div>
        <div className="border border-border rounded-lg p-6 space-y-3">
          <Phone className="text-accent" size={24} />
          <h3 className="font-semibold">Phone</h3>
          <a href="tel:+1234567890" className="text-muted-foreground hover:text-accent transition-colors">
            +1 (234) 567-890
          </a>
        </div>
        <div className="border border-border rounded-lg p-6 space-y-3">
          <MapPin className="text-accent" size={24} />
          <h3 className="font-semibold">Location</h3>
          <p className="text-muted-foreground">City, Country</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6 border border-border rounded-lg p-8 bg-secondary/30">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
            placeholder="Your message..."
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity font-medium disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <span className="animate-spin">⏳</span>
              Sending...
            </>
          ) : submitted ? (
            "Message Sent!"
          ) : (
            <>
              Send Message
              <Send size={18} />
            </>
          )}
        </button>
      </form>
    </section>
  )
}
