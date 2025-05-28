/*
  # Add Genie Users Table

  1. New Tables
    - `genie_users`
      - `id` (uuid, primary key)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text, unique)
      - `newsletter_opt_in` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for user access
    - Set up automatic timestamp updates
*/

CREATE TABLE IF NOT EXISTS genie_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  newsletter_opt_in boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE genie_users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can insert genie users"
  ON genie_users
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can view own data"
  ON genie_users
  FOR SELECT
  TO public
  USING (email = current_setting('request.jwt.claims')::json->>'email');

-- Create trigger for updated_at
CREATE TRIGGER update_genie_users_updated_at
  BEFORE UPDATE ON genie_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();