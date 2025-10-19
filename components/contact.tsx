"use client"

import type React from "react"
import { useState } from "react"
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const { error: submitError } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            message: formData.message,
          }
        ])

      if (submitError) throw submitError

      setSubmitted(true)
      setFormData({ name: "", email: "", phone: "", message: "" })

      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    } catch (err) {
      setError("Failed to send message. Please try again.")
      console.error("Error submitting contact form:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 md:py-32 space-y-12 relative">
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="space-y-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold">
          Get in <span className="gradient-text">Touch</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Have a project in mind or just want to chat? I'd love to hear from you. Let's create something amazing together.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 relative z-10">
        <a
          href="mailto:hello@example.com"
          className="glass rounded-xl p-6 space-y-3 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
        >
          <div className="w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center group-hover:scale-110 transition-transform">
            <Mail size={24} />
          </div>
          <h3 className="font-semibold text-lg">Email</h3>
          <p className="text-muted-foreground group-hover:text-accent transition-colors">
            hello@example.com
          </p>
        </a>

        <a
          href="tel:+1234567890"
          className="glass rounded-xl p-6 space-y-3 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
        >
          <div className="w-12 h-12 rounded-lg bg-accent-secondary/10 text-accent-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
            <Phone size={24} />
          </div>
          <h3 className="font-semibold text-lg">Phone</h3>
          <p className="text-muted-foreground group-hover:text-accent-secondary transition-colors">
            +1 (234) 567-890
          </p>
        </a>

        <div className="glass rounded-xl p-6 space-y-3 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
          <div className="w-12 h-12 rounded-lg bg-accent-tertiary/10 text-accent-tertiary flex items-center justify-center group-hover:scale-110 transition-transform">
            <MapPin size={24} />
          </div>
          <h3 className="font-semibold text-lg">Location</h3>
          <p className="text-muted-foreground">City, Country</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6 glass rounded-2xl p-8 relative z-10">
        {submitted && (
          <div className="flex items-center gap-3 p-4 bg-accent/10 border border-accent/20 rounded-lg text-accent animate-fade-in">
            <CheckCircle size={20} />
            <span className="font-medium">Message sent successfully! I'll get back to you soon.</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive animate-fade-in">
            <span className="font-medium">{error}</span>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone <span className="text-muted-foreground">(optional)</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
            placeholder="+1 (234) 567-890"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
            placeholder="Tell me about your project..."
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || submitted}
          className="w-full px-8 py-4 bg-accent text-accent-foreground rounded-xl hover:shadow-2xl hover:shadow-accent/30 hover:scale-[1.02] transition-all duration-300 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
              Sending...
            </>
          ) : submitted ? (
            <>
              <CheckCircle size={20} />
              Message Sent!
            </>
          ) : (
            <>
              Send Message
              <Send size={20} />
            </>
          )}
        </button>
      </form>
    </section>
  )
}
