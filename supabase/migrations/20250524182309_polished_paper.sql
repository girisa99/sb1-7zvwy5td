/*
  # RAG Content Management System

  1. New Tables
    - `rag_content`
      - Enhanced with additional fields for publication
    - `rag_comments`
      - For storing and managing user comments
    - `rag_categories`
      - For organizing content by topic
    - `social_shares`
      - For tracking social media shares and engagement

  2. Security
    - Enable RLS
    - Add policies for content management
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS rag_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enhance RAG content table
ALTER TABLE rag_content 
ADD COLUMN IF NOT EXISTS title text,
ADD COLUMN IF NOT EXISTS slug text UNIQUE,
ADD COLUMN IF NOT EXISTS summary text,
ADD COLUMN IF NOT EXISTS category_id uuid REFERENCES rag_categories(id),
ADD COLUMN IF NOT EXISTS author_id uuid REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS published_at timestamptz,
ADD COLUMN IF NOT EXISTS linkedin_post_id text,
ADD COLUMN IF NOT EXISTS tags text[];

-- Create comments table
CREATE TABLE IF NOT EXISTS rag_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id uuid REFERENCES rag_content(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  comment text NOT NULL,
  source text NOT NULL, -- 'platform' or 'linkedin'
  source_comment_id text, -- For LinkedIn comments
  sentiment text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create social shares table
CREATE TABLE IF NOT EXISTS social_shares (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id uuid REFERENCES rag_content(id) ON DELETE CASCADE,
  platform text NOT NULL,
  share_id text,
  engagement_count int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE rag_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE rag_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_shares ENABLE ROW LEVEL SECURITY;

-- Policies for categories
CREATE POLICY "Public can view categories"
  ON rag_categories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Admins can manage categories"
  ON rag_categories
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Policies for comments
CREATE POLICY "Public can view comments"
  ON rag_comments
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can add comments"
  ON rag_comments
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can manage own comments"
  ON rag_comments
  FOR ALL
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Policies for social shares
CREATE POLICY "Public can view social shares"
  ON social_shares
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "System can manage social shares"
  ON social_shares
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'service_role')
  WITH CHECK (auth.jwt() ->> 'role' = 'service_role');

-- Update triggers
CREATE TRIGGER update_rag_categories_updated_at
  BEFORE UPDATE ON rag_categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rag_comments_updated_at
  BEFORE UPDATE ON rag_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_social_shares_updated_at
  BEFORE UPDATE ON social_shares
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();