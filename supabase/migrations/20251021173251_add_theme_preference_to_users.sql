/*
  # Add theme preference to users table

  1. Changes
    - Add `theme_preference` column to `users` table
      - Default value is 'dark'
      - Allows users to choose between 'light' and 'dark' themes
  
  2. Notes
    - This enables theme persistence across sessions
    - Theme choice is stored per user
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'theme_preference'
  ) THEN
    ALTER TABLE users ADD COLUMN theme_preference text DEFAULT 'dark';
  END IF;
END $$;
