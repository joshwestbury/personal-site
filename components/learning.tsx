"use client"

import { useEffect, useState } from "react"
import { supabase, type LearningProgress } from "@/lib/supabase"
import { Code, Box, Server, Brain, Zap, Smartphone } from "lucide-react"

const iconMap: Record<string, any> = {
  Code,
  Box,
  Server,
  Brain,
  Zap,
  Smartphone,
}

export default function Learning() {
  const [learning, setLearning] = useState<LearningProgress[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLearning() {
      const { data, error } = await supabase
        .from('learning_progress')
        .select('*')
        .eq('active', true)
        .order('display_order')

      if (error) {
        console.error('Error fetching learning progress:', error)
      } else {
        setLearning(data || [])
      }
      setLoading(false)
    }

    fetchLearning()
  }, [])

  return (
    <section id="learning" className="py-20 md:py-32 space-y-12 relative">
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-accent-tertiary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="space-y-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold">
          What I'm <span className="gradient-text">Learning</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Continuously expanding my skillset and staying up-to-date with the latest technologies.
        </p>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass rounded-xl p-6 animate-pulse">
              <div className="h-10 w-10 bg-secondary rounded-lg mb-4" />
              <div className="h-6 bg-secondary rounded w-2/3 mb-2" />
              <div className="h-4 bg-secondary rounded w-full mb-4" />
              <div className="h-2 bg-secondary rounded w-full" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {learning.map((item, idx) => {
            const Icon = iconMap[item.icon || 'Code']
            return (
              <div
                key={item.id}
                className="group glass rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${item.color}20`, color: item.color }}
                >
                  {Icon && <Icon size={24} />}
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4">
                  {item.description || item.category}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold" style={{ color: item.color }}>
                      {item.progress}%
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${item.progress}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
