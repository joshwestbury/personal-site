import { ArrowRight, Calendar } from "lucide-react"

export default function Blog() {
  const posts = [
    {
      title: "Getting Started with TypeScript",
      excerpt: "Learn the basics of TypeScript and why it's worth using in your projects.",
      date: "Oct 15, 2024",
      readTime: "5 min read",
      slug: "getting-started-typescript",
      category: "Tutorial",
    },
    {
      title: "Building Scalable APIs",
      excerpt: "Best practices for designing APIs that can grow with your application.",
      date: "Oct 8, 2024",
      readTime: "8 min read",
      slug: "building-scalable-apis",
      category: "Best Practices",
    },
    {
      title: "React Performance Tips",
      excerpt: "Practical techniques to optimize your React applications for better performance.",
      date: "Sep 30, 2024",
      readTime: "6 min read",
      slug: "react-performance-tips",
      category: "Performance",
    },
    {
      title: "Modern CSS Techniques",
      excerpt: "Explore the latest CSS features and how to use them in your projects.",
      date: "Sep 22, 2024",
      readTime: "7 min read",
      slug: "modern-css-techniques",
      category: "CSS",
    },
  ]

  return (
    <section id="blog" className="py-20 md:py-32 space-y-12 w-full">
      <div className="space-y-4">
        <h2 className="text-4xl md:text-5xl font-bold">Latest Articles</h2>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Thoughts on web development, design, and technology. Updated regularly with new insights and tutorials.
        </p>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block border border-border rounded-lg p-6 hover:border-accent hover:bg-secondary/50 transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                </div>
                <h3 className="text-2xl font-semibold group-hover:text-accent transition-colors">{post.title}</h3>
                <p className="text-muted-foreground">{post.excerpt}</p>
              </div>
              <div className="flex flex-col items-end gap-2 whitespace-nowrap">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar size={16} />
                  {post.date}
                </div>
                <ArrowRight size={20} className="text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="pt-8">
        <a
          href="/blog"
          className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium"
        >
          View all articles
          <ArrowRight size={18} />
        </a>
      </div>
    </section>
  )
}
