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