import { CheckCircle2 } from "lucide-react"

export default function Skills() {
  const skillCategories = [
    {
      category: "Frontend",
      skills: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Vue.js"],
      icon: "🎨",
    },
    {
      category: "Backend",
      skills: ["Node.js", "Python", "PostgreSQL", "REST APIs", "GraphQL"],
      icon: "⚙️",
    },
    {
      category: "Tools & DevOps",
      skills: ["Git", "Docker", "VS Code", "Figma", "AWS"],
      icon: "🛠️",
    },
  ]

  return (
    <section id="skills" className="py-20 md:py-32 space-y-12 w-full">
      <div className="space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold">Skills & Technologies</h2>
        <p className="text-lg text-muted-foreground max-w-2xl">
          A comprehensive overview of the technologies and tools I work with to build modern applications.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {skillCategories.map((cat) => (
          <div key={cat.category} className="border border-border rounded-lg p-8 hover:border-accent transition-colors">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-accent">{cat.category}</h3>
              <ul className="space-y-3">
                {cat.skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 size={18} className="text-accent flex-shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 border-t border-border pt-16 space-y-8">
        <h3 className="text-3xl font-bold">Academic & Professional Work</h3>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="border border-border rounded-lg p-8 space-y-4">
            <h4 className="text-xl font-semibold">Education</h4>
            <div className="space-y-4">
              <div>
                <p className="font-medium">Bachelor of Science in Computer Science</p>
                <p className="text-sm text-muted-foreground">University Name • 2020 - 2024</p>
              </div>
              <div>
                <p className="font-medium">Relevant Coursework</p>
                <p className="text-sm text-muted-foreground">
                  Data Structures, Algorithms, Web Development, Database Design
                </p>
              </div>
            </div>
          </div>

          <div className="border border-border rounded-lg p-8 space-y-4">
            <h4 className="text-xl font-semibold">Certifications</h4>
            <div className="space-y-4">
              <div>
                <p className="font-medium">AWS Certified Cloud Practitioner</p>
                <p className="text-sm text-muted-foreground">Amazon Web Services • 2023</p>
              </div>
              <div>
                <p className="font-medium">Full Stack Web Development</p>
                <p className="text-sm text-muted-foreground">Online Course Provider • 2022</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
