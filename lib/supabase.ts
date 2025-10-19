import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  read_time: string
  published_at: string
  view_count: number
  featured: boolean
  tags: string[]
  cover_image?: string
  created_at: string
  updated_at: string
}

export type Project = {
  id: string
  title: string
  slug: string
  description: string
  long_description?: string
  tags: string[]
  category?: string
  live_url?: string
  github_url?: string
  image_url?: string
  images: string[]
  featured: boolean
  display_order: number
  status: string
  created_at: string
  updated_at: string
}

export type ContactMessage = {
  id?: string
  name: string
  email: string
  phone?: string
  message: string
  status?: string
  created_at?: string
  read_at?: string
}

export type LearningProgress = {
  id: string
  title: string
  category: string
  progress: number
  description?: string
  icon?: string
  color?: string
  started_at: string
  display_order: number
  active: boolean
  created_at: string
  updated_at: string
}
