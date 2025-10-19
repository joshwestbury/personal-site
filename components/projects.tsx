"use client"

import { useEffect, useState } from "react"
import { ExternalLink, Github } from "lucide-react"
import { supabase, type Project } from "@/lib/supabase"

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order')

      if (error) {
        console.error('Error fetching projects:', error)
      } else {
        setProjects(data || [])
      }
      setLoading(false)
    }

    fetchProjects()
  }, [])

  return (
    <section id="projects" className="py-20 md:py-32 space-y-12 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="space-y-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl">
          A showcase of my recent work and side projects, demonstrating expertise across the full stack.
        </p>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass rounded-2xl overflow-hidden animate-pulse">
              <div className="h-64 bg-secondary" />
              <div className="p-6 space-y-4">
                <div className="h-8 bg-secondary rounded w-2/3" />
                <div className="h-4 bg-secondary rounded w-full" />
                <div className="h-4 bg-secondary rounded w-5/6" />
                <div className="flex gap-2">
                  <div className="h-6 bg-secondary rounded-full w-20" />
                  <div className="h-6 bg-secondary rounded-full w-24" />
                  <div className="h-6 bg-secondary rounded-full w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8 relative z-10">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="group glass rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="relative h-64 overflow-hidden bg-secondary">
                {project.image_url && (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {project.featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-accent text-accent-foreground text-xs font-semibold rounded-full">
                    Featured
                  </div>
                )}
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => {
                    const colorClasses = [
                      "bg-accent/10 text-accent border-accent/20",
                      "bg-accent-secondary/10 text-accent-secondary border-accent-secondary/20",
                      "bg-accent-tertiary/10 text-accent-tertiary border-accent-tertiary/20"
                    ]
                    return (
                      <span
                        key={tag}
                        className={`px-3 py-1 text-xs font-medium rounded-full border transition-all duration-300 ${
                          colorClasses[i % 3]
                        }`}
                      >
                        {tag}
                      </span>
                    )
                  })}
                </div>

                <div className="flex gap-4 pt-2">
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all duration-300 font-semibold text-sm"
                    >
                      View Project
                      <ExternalLink size={16} />
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground hover:gap-3 transition-all duration-300 font-semibold text-sm"
                    >
                      Code
                      <Github size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
