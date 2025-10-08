-- MathArena Database Schema
-- Run this in your Supabase SQL Editor to set up the database

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  skill_level TEXT CHECK (skill_level IN ('school', 'college')) DEFAULT 'school',
  total_points INTEGER DEFAULT 0,
  challenges_completed INTEGER DEFAULT 0,
  badges TEXT[] DEFAULT '{}',
  avg_score DECIMAL DEFAULT 0,
  rank INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Challenge submissions table
CREATE TABLE IF NOT EXISTS challenge_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  challenge_type TEXT NOT NULL,
  score INTEGER NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  submission_data JSONB
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_total_points ON users(total_points DESC);
CREATE INDEX IF NOT EXISTS idx_users_skill_level ON users(skill_level);
CREATE INDEX IF NOT EXISTS idx_submissions_user_id ON challenge_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_challenge_type ON challenge_submissions(challenge_type);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenge_submissions ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can view leaderboard"
  ON users FOR SELECT
  USING (true);

-- Challenge submissions policies
CREATE POLICY "Users can view their own submissions"
  ON challenge_submissions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own submissions"
  ON challenge_submissions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Sample data for testing (optional)
-- INSERT INTO users (id, name, email, skill_level, total_points, challenges_completed, badges)
-- VALUES 
--   (gen_random_uuid(), 'Demo User 1', 'demo1@example.com', 'school', 250, 3, ARRAY['first_challenge', 'graph_master']),
--   (gen_random_uuid(), 'Demo User 2', 'demo2@example.com', 'college', 400, 5, ARRAY['first_challenge', 'trig_expert', 'calc_genius']);

