/*
  # Portfolio Website Schema

  ## Overview
  Creates the complete database schema for a modern portfolio website with blog posts, projects, contact messages, and learning progress tracking.

  ## New Tables

  ### `blog_posts`
  - `id` (uuid, primary key) - Unique identifier for each blog post
  - `title` (text) - Blog post title
  - `slug` (text, unique) - URL-friendly slug
  - `excerpt` (text) - Short description/preview
  - `content` (text) - Full blog post content (markdown)
  - `category` (text) - Post category (Tutorial, Best Practices, etc.)
  - `read_time` (text) - Estimated reading time
  - `published_at` (timestamptz) - Publication date
  - `view_count` (integer) - Number of views
  - `featured` (boolean) - Whether post is featured
  - `tags` (text[]) - Array of tags
  - `cover_image` (text) - Cover image URL
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `projects`
  - `id` (uuid, primary key) - Unique identifier for each project
  - `title` (text) - Project title
  - `slug` (text, unique) - URL-friendly slug
  - `description` (text) - Project description
  - `long_description` (text) - Detailed project description
  - `tags` (text[]) - Technologies used
  - `category` (text) - Project category
  - `live_url` (text) - Live project URL
  - `github_url` (text) - GitHub repository URL
  - `image_url` (text) - Main project image
  - `images` (text[]) - Additional project images
  - `featured` (boolean) - Whether project is featured
  - `display_order` (integer) - Order for display
  - `status` (text) - Project status (completed, in-progress, etc.)
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `contact_messages`
  - `id` (uuid, primary key) - Unique identifier for each message
  - `name` (text) - Sender's name
  - `email` (text) - Sender's email
  - `phone` (text) - Optional phone number
  - `message` (text) - Message content
  - `status` (text) - Message status (new, read, archived)
  - `created_at` (timestamptz) - When message was sent
  - `read_at` (timestamptz) - When message was read

  ### `learning_progress`
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - What is being learned
  - `category` (text) - Learning category (Language, Framework, Tool, etc.)
  - `progress` (integer) - Progress percentage (0-100)
  - `description` (text) - Brief description
  - `icon` (text) - Icon identifier
  - `color` (text) - Color scheme
  - `started_at` (timestamptz) - When learning started
  - `display_order` (integer) - Display order
  - `active` (boolean) - Whether currently active
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `site_analytics`
  - `id` (uuid, primary key) - Unique identifier
  - `page_path` (text) - Page URL path
  - `views` (integer) - View count
  - `unique_visitors` (integer) - Unique visitor count
  - `date` (date) - Analytics date
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  - Enable Row Level Security (RLS) on all tables
  - Public read access for blog_posts, projects, and learning_progress
  - Write access for contact_messages (public can insert)
  - Admin-only write access for blog_posts, projects, learning_progress
  - Private access for site_analytics

  ## Indexes
  - Indexes on slug fields for fast lookups
  - Indexes on timestamps for sorting
  - Index on featured and active flags
*/

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  category text NOT NULL,
  read_time text DEFAULT '5 min read',
  published_at timestamptz DEFAULT now(),
  view_count integer DEFAULT 0,
  featured boolean DEFAULT false,
  tags text[] DEFAULT '{}',
  cover_image text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  long_description text,
  tags text[] DEFAULT '{}',
  category text,
  live_url text,
  github_url text,
  image_url text,
  images text[] DEFAULT '{}',
  featured boolean DEFAULT false,
  display_order integer DEFAULT 0,
  status text DEFAULT 'completed',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now(),
  read_at timestamptz
);

-- Create learning_progress table
CREATE TABLE IF NOT EXISTS learning_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  progress integer DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  description text,
  icon text,
  color text,
  started_at timestamptz DEFAULT now(),
  display_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create site_analytics table
CREATE TABLE IF NOT EXISTS site_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path text NOT NULL,
  views integer DEFAULT 0,
  unique_visitors integer DEFAULT 0,
  date date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(page_path, date)
);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for blog_posts (public read)
CREATE POLICY "Anyone can view published blog posts"
  ON blog_posts FOR SELECT
  TO anon, authenticated
  USING (true);

-- RLS Policies for projects (public read)
CREATE POLICY "Anyone can view projects"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (true);

-- RLS Policies for contact_messages (public can insert)
CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- RLS Policies for learning_progress (public read)
CREATE POLICY "Anyone can view learning progress"
  ON learning_progress FOR SELECT
  TO anon, authenticated
  USING (active = true);

-- RLS Policies for site_analytics (read-only for authenticated)
CREATE POLICY "Authenticated users can view analytics"
  ON site_analytics FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_featured ON blog_posts(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_projects_display_order ON projects(display_order);

CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_learning_progress_active ON learning_progress(active) WHERE active = true;
CREATE INDEX IF NOT EXISTS idx_learning_progress_display_order ON learning_progress(display_order);

CREATE INDEX IF NOT EXISTS idx_site_analytics_date ON site_analytics(date DESC);
CREATE INDEX IF NOT EXISTS idx_site_analytics_page_path ON site_analytics(page_path);

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, category, read_time, tags, featured, cover_image) VALUES
  ('Getting Started with TypeScript', 'getting-started-typescript', 'Learn the basics of TypeScript and why it''s worth using in your projects.', '# Getting Started with TypeScript\n\nTypeScript has become an essential tool for modern web development...', 'Tutorial', '5 min read', ARRAY['TypeScript', 'JavaScript', 'Programming'], true, '/placeholder.jpg'),
  ('Building Scalable APIs', 'building-scalable-apis', 'Best practices for designing APIs that can grow with your application.', '# Building Scalable APIs\n\nDesigning APIs that scale requires careful planning...', 'Best Practices', '8 min read', ARRAY['API', 'Backend', 'Architecture'], true, '/placeholder.jpg'),
  ('React Performance Tips', 'react-performance-tips', 'Practical techniques to optimize your React applications for better performance.', '# React Performance Tips\n\nOptimizing React apps is crucial for user experience...', 'Performance', '6 min read', ARRAY['React', 'Performance', 'JavaScript'], false, '/placeholder.jpg'),
  ('Modern CSS Techniques', 'modern-css-techniques', 'Explore the latest CSS features and how to use them in your projects.', '# Modern CSS Techniques\n\nCSS has evolved significantly in recent years...', 'CSS', '7 min read', ARRAY['CSS', 'Design', 'Frontend'], false, '/placeholder.jpg')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample projects
INSERT INTO projects (title, slug, description, long_description, tags, category, live_url, github_url, image_url, featured, display_order, status) VALUES
  ('E-Commerce Platform', 'ecommerce-platform', 'A full-featured e-commerce platform with payment integration and admin dashboard.', 'Built a complete e-commerce solution with Next.js, featuring product management, shopping cart, Stripe payments, and an admin dashboard for managing orders and inventory.', ARRAY['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'], 'Full Stack', '#', '#', '/project-one.jpg', true, 1, 'completed'),
  ('Task Management App', 'task-management-app', 'Real-time collaborative task management with team features.', 'Developed a real-time task management application with drag-and-drop functionality, team collaboration, and real-time updates using WebSockets.', ARRAY['React', 'Node.js', 'Socket.io', 'MongoDB'], 'Full Stack', '#', '#', '/project-two.jpg', true, 2, 'completed'),
  ('AI Content Generator', 'ai-content-generator', 'AI-powered tool for generating marketing copy and blog posts.', 'Created an AI content generation platform using OpenAI API, with custom prompts, content templates, and export functionality.', ARRAY['Python', 'FastAPI', 'OpenAI', 'React'], 'AI/ML', '#', '#', '/project-three.jpg', true, 3, 'completed'),
  ('Portfolio Website Builder', 'portfolio-builder', 'No-code portfolio builder with beautiful templates.', 'Built a drag-and-drop portfolio website builder with customizable templates, allowing users to create professional portfolios without coding.', ARRAY['Vue.js', 'Firebase', 'Tailwind'], 'Frontend', '#', '#', '/project-four.jpg', false, 4, 'completed')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample learning progress
INSERT INTO learning_progress (title, category, progress, description, icon, color, display_order, active) VALUES
  ('Rust Programming', 'Language', 65, 'Learning systems programming with Rust', 'Code', '#CE422B', 1, true),
  ('Three.js & WebGL', 'Framework', 45, 'Creating 3D experiences on the web', 'Box', '#049EF4', 2, true),
  ('Kubernetes', 'DevOps', 30, 'Container orchestration and deployment', 'Server', '#326CE5', 3, true),
  ('Machine Learning', 'AI/ML', 55, 'Deep learning with TensorFlow and PyTorch', 'Brain', '#FF6F00', 4, true),
  ('Go (Golang)', 'Language', 70, 'Building high-performance backend services', 'Zap', '#00ADD8', 5, true),
  ('SwiftUI', 'Framework', 40, 'Native iOS app development', 'Smartphone', '#FA7343', 6, true)
ON CONFLICT DO NOTHING;