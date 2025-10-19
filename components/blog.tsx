"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { supabase, type BlogPost } from "@/lib/supabase"

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(4)

      if (error) {
        console.error('Error fetching blog posts:', error)
      } else {
        setPosts(data || [])
      }
      setLoading(false)
    }

    fetchPosts()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <section id="blog" className="py-20 md:py-32 space-y-12 relative">
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-accent-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="space-y-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold">
          Latest <span className="gradient-text">Articles</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Thoughts on web development, design, and technology. Sharing insights and tutorials.
        </p>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="glass rounded-xl p-6 animate-pulse">
              <div className="flex gap-2 mb-4">
                <div className="h-6 bg-secondary rounded-full w-20" />
                <div className="h-6 bg-secondary rounded-full w-16" />
              </div>
              <div className="h-8 bg-secondary rounded w-3/4 mb-3" />
              <div className="h-4 bg-secondary rounded w-full mb-2" />
              <div className="h-4 bg-secondary rounded w-5/6" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 relative z-10">
          {posts.map((post, idx) => (
            <a
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group glass rounded-xl p-6 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full border border-accent/20">
                    {post.category}
                  </span>
                  {post.featured && (
                    <span className="px-3 py-1 bg-accent-secondary/10 text-accent-secondary text-xs font-semibold rounded-full border border-accent-secondary/20">
                      Featured
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold group-hover:text-accent transition-colors">
                  {post.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{formatDate(post.published_at)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{post.read_time}</span>
                    </div>
                  </div>
                  <ArrowRight
                    size={20}
                    className="text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
                  />
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-muted-foreground"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>
      )}

      <div className="pt-8 relative z-10">
        <a
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-accent hover:text-accent-foreground rounded-xl transition-all duration-300 font-medium group"
        >
          View all articles
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  )
}
