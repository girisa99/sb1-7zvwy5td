/*
  # Newsletter Subscribers Table

  1. New Tables
    - `newsletter_subscribers`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policy for public inserts
    - Add policy for authenticated viewing
*/

-- Create newsletter subscribers table if it doesn't exist
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Safely create policies
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'newsletter_subscribers' 
    AND policyname = 'Anyone can insert subscribers'
  ) THEN
    CREATE POLICY "Anyone can insert subscribers"
      ON newsletter_subscribers
      FOR INSERT
      TO public
      WITH CHECK (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'newsletter_subscribers' 
    AND policyname = 'Authenticated users can view subscribers'
  ) THEN
    CREATE POLICY "Authenticated users can view subscribers"
      ON newsletter_subscribers
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;

-- Create trigger for updating updated_at
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_newsletter_subscribers_updated_at'
  ) THEN
    CREATE TRIGGER update_newsletter_subscribers_updated_at
      BEFORE UPDATE ON newsletter_subscribers
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;