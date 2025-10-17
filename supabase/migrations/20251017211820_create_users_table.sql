/*
  # Create Users Table

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - Unique identifier for each user
      - `email` (text, unique, not null) - User email address
      - `name` (text, not null) - User full name
      - `zodiac_sign` (text) - User zodiac sign
      - `gender` (text) - User gender
      - `relationship_status` (text) - User relationship status
      - `created_at` (timestamptz) - Account creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `users` table
    - Add policy for users to read their own data
    - Add policy for users to update their own data
    - Add policy for inserting new users during signup

  3. Important Notes
    - This table stores user profile information
    - Email must be unique and is used for authentication
    - RLS policies ensure users can only access their own data
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  zodiac_sign text,
  gender text,
  relationship_status text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.jwt()->>'email' = email);

CREATE POLICY "Users can insert own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt()->>'email' = email);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.jwt()->>'email' = email)
  WITH CHECK (auth.jwt()->>'email' = email);

CREATE INDEX IF NOT EXISTS users_email_idx ON users(email);
