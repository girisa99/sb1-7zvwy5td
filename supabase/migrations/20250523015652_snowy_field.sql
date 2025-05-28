/*
  # Add RAG Content Table

  1. New Tables
    - `rag_content`
      - `id` (uuid, primary key)
      - `query` (text)
      - `response` (text)
      - `context` (jsonb)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for content management
*/

CREATE TABLE IF NOT EXISTS rag_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  query text NOT NULL,
  response text NOT NULL,
  context jsonb NOT NULL,
  status text NOT NULL DEFAULT 'pending_review',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE rag_content ENABLE ROW LEVEL SECURITY;

-- Policies for content management
CREATE POLICY "Content reviewers can view all content"
  ON rag_content
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'content_reviewer');

CREATE POLICY "Content reviewers can update content status"
  ON rag_content
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'content_reviewer');

-- Update trigger for updated_at
CREATE TRIGGER update_rag_content_updated_at
  BEFORE UPDATE ON rag_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();