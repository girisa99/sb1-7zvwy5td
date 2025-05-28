/*
  # Fix RAG Content Relationships

  1. Changes
    - Update author_id reference to point to user_profiles instead of auth.users
    - Add missing foreign key relationships
    - Update RLS policies

  2. Security
    - Maintain existing RLS policies
    - Ensure proper access control
*/

-- Drop existing foreign key if it exists
ALTER TABLE rag_content 
DROP CONSTRAINT IF EXISTS rag_content_author_id_fkey;

-- Update the foreign key relationship
ALTER TABLE rag_content
ADD CONSTRAINT rag_content_author_id_fkey
FOREIGN KEY (author_id) REFERENCES user_profiles(id);

-- Update the select policy to include author information
DROP POLICY IF EXISTS "Content reviewers can view all content" ON rag_content;

CREATE POLICY "Content reviewers can view all content"
  ON rag_content
  FOR SELECT
  TO authenticated
  USING (
    (auth.jwt() ->> 'role'::text) = 'content_reviewer'::text OR
    status = 'approved'
  );