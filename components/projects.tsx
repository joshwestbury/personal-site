import { ExternalLink, Github } from "lucide-react"

export default function Projects() {
  const projects = [
    {
      title: "Project One",
      description: "A brief description of your first project and what technologies you used.",
      tags: ["React", "TypeScript", "Tailwind"],
      link: "#",
      github: "#",
      image: "/project-one.jpg",
    },
    {
      title: "Project Two",
      description: "Another exciting project showcasing your skills and creativity.",
      tags: ["Next.js", "Node.js", "PostgreSQL"],
      link: "#",
      github: "#",
      image: "/project-two.jpg",
    },
    {
      title: "Project Three",
      description: "A third project demonstrating your full-stack capabilities.",
      tags: ["Python", "FastAPI", "React"],
      link: "#",
      github: "#",
      image: "/project-three.jpg",
    },
    {
      title: "Project Four",
      description: "An additional project showcasing diverse technical expertise.",
      tags: ["Vue.js", "Firebase", "Tailwind"],
      link: "#",
      github: "#",
      image: "/project-four.jpg",
    },
  ]

  return (
    <section id="projects" className="py-20 md:py-32 space-y-12 relative w-full overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="space-y-4 relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl">
          A selection of projects I've built, showcasing my skills in full-stack development and design.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 relative z-10">
        {projects.map((project, idx) => (
          <div
            key={idx}
            className="group border border-border rounded-xl overflow-hidden hover:border-accent transition-all duration-300 hover:shadow-xl hover:shadow-accent/20 hover-lift bg-card/50 backdrop-blur-sm"
          >
            <div className="relative h-56 bg-secondary overflow-hidden">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            <div className="p-6 space-y-4">
              <h3 className="text-2xl font-bold group-hover:text-accent transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                  <span
                    key={tag}
                    className={`px-3 py-1 text-sm rounded-full font-medium transition-all duration-300 ${
                      i % 3 === 0
                        ? "bg-accent/20 text-accent border border-accent/30"
                        : i % 3 === 1
                          ? "bg-accent-secondary/20 text-accent-secondary border border-accent-secondary/30"
                          : "bg-accent-tertiary/20 text-accent-tertiary border border-accent-tertiary/30"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 pt-4">
                <a
                  href={project.link}
                  className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-all duration-300 font-semibold text-sm hover:gap-3"
                >
                  View Project
                  <ExternalLink size={16} />
                </a>
                <a
                  href={project.github}
                  className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-300 font-semibold text-sm hover:gap-3"
                >
                  Code
                  <Github size={16} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
