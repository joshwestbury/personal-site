export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 space-y-12 w-full">
      <h2 className="text-4xl md:text-5xl font-bold">About Me</h2>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p>
            I'm a full-stack developer with a passion for creating elegant solutions to complex problems. With
            experience in JavaScript, TypeScript, Python, and modern web frameworks, I love building applications that
            are both beautiful and performant.
          </p>
          <p>
            Beyond coding, I'm interested in learning new technologies, sharing knowledge through writing, and exploring
            how design and engineering intersect to create exceptional user experiences.
          </p>
          <p>
            When I'm not coding, you can find me reading, exploring new ideas, or contributing to open-source projects.
          </p>
        </div>
        <div className="bg-secondary rounded-lg h-64 md:h-80 flex items-center justify-center text-muted-foreground border border-border">
          [Your Photo Here]
        </div>
      </div>
    </section>
  )
}
