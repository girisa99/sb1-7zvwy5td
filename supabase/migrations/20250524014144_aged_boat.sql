/*
  # Fix Newsletter Subscribers RLS Policies

  1. Security Changes
    - Enable RLS on newsletter_subscribers table
    - Add policy for public inserts
    - Add policy for authenticated users to view subscribers
*/

-- Drop existing policies if they exist
DO $$ BEGIN
  DROP POLICY IF EXISTS "Anyone can insert subscribers" ON newsletter_subscribers;
  DROP POLICY IF EXISTS "Authenticated users can view subscribers" ON newsletter_subscribers;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

-- Ensure RLS is enabled
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow public inserts
CREATE POLICY "Anyone can insert subscribers"
  ON newsletter_subscribers
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow authenticated users to view subscribers
CREATE POLICY "Authenticated users can view subscribers"
  ON newsletter_subscribers
  FOR SELECT
  TO authenticated
  USING (true);