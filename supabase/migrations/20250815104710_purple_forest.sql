/*
  # Twitter Clone Database Schema

  1. New Tables
    - `profiles` - User profiles with social media data
    - `tweets` - Tweet posts with content and metadata
    - `likes` - User likes on tweets
    - `follows` - User follow relationships

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Secure user data access

  3. Functions
    - Update follower/following counts
    - Update tweet engagement counts
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  full_name text NOT NULL,
  avatar_url text,
  bio text,
  website text,
  location text,
  followers_count integer DEFAULT 0,
  following_count integer DEFAULT 0,
  tweets_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create tweets table
CREATE TABLE IF NOT EXISTS tweets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  image_url text,
  reply_to uuid REFERENCES tweets(id) ON DELETE CASCADE,
  retweet_of uuid REFERENCES tweets(id) ON DELETE CASCADE,
  likes_count integer DEFAULT 0,
  retweets_count integer DEFAULT 0,
  replies_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create likes table
CREATE TABLE IF NOT EXISTS likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  tweet_id uuid REFERENCES tweets(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, tweet_id)
);

-- Create follows table
CREATE TABLE IF NOT EXISTS follows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  following_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tweets ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Tweets policies
CREATE POLICY "Tweets are viewable by everyone"
  ON tweets FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own tweets"
  ON tweets FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tweets"
  ON tweets FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tweets"
  ON tweets FOR DELETE
  USING (auth.uid() = user_id);

-- Likes policies
CREATE POLICY "Likes are viewable by everyone"
  ON likes FOR SELECT
  USING (true);

CREATE POLICY "Users can manage own likes"
  ON likes FOR ALL
  USING (auth.uid() = user_id);

-- Follows policies
CREATE POLICY "Follows are viewable by everyone"
  ON follows FOR SELECT
  USING (true);

CREATE POLICY "Users can manage own follows"
  ON follows FOR ALL
  USING (auth.uid() = follower_id);

-- Functions to update counts
CREATE OR REPLACE FUNCTION update_tweet_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Update likes count
    IF TG_TABLE_NAME = 'likes' THEN
      UPDATE tweets SET likes_count = likes_count + 1 WHERE id = NEW.tweet_id;
    END IF;
    
    -- Update retweets count
    IF TG_TABLE_NAME = 'tweets' AND NEW.retweet_of IS NOT NULL THEN
      UPDATE tweets SET retweets_count = retweets_count + 1 WHERE id = NEW.retweet_of;
    END IF;
    
    -- Update replies count
    IF TG_TABLE_NAME = 'tweets' AND NEW.reply_to IS NOT NULL THEN
      UPDATE tweets SET replies_count = replies_count + 1 WHERE id = NEW.reply_to;
    END IF;
    
    -- Update user tweets count
    IF TG_TABLE_NAME = 'tweets' THEN
      UPDATE profiles SET tweets_count = tweets_count + 1 WHERE id = NEW.user_id;
    END IF;
    
    RETURN NEW;
  END IF;
  
  IF TG_OP = 'DELETE' THEN
    -- Update likes count
    IF TG_TABLE_NAME = 'likes' THEN
      UPDATE tweets SET likes_count = likes_count - 1 WHERE id = OLD.tweet_id;
    END IF;
    
    -- Update retweets count
    IF TG_TABLE_NAME = 'tweets' AND OLD.retweet_of IS NOT NULL THEN
      UPDATE tweets SET retweets_count = retweets_count - 1 WHERE id = OLD.retweet_of;
    END IF;
    
    -- Update replies count
    IF TG_TABLE_NAME = 'tweets' AND OLD.reply_to IS NOT NULL THEN
      UPDATE tweets SET replies_count = replies_count - 1 WHERE id = OLD.reply_to;
    END IF;
    
    -- Update user tweets count
    IF TG_TABLE_NAME = 'tweets' THEN
      UPDATE profiles SET tweets_count = tweets_count - 1 WHERE id = OLD.user_id;
    END IF;
    
    RETURN OLD;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Function to update follow counts
CREATE OR REPLACE FUNCTION update_follow_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE profiles SET following_count = following_count + 1 WHERE id = NEW.follower_id;
    UPDATE profiles SET followers_count = followers_count + 1 WHERE id = NEW.following_id;
    RETURN NEW;
  END IF;
  
  IF TG_OP = 'DELETE' THEN
    UPDATE profiles SET following_count = following_count - 1 WHERE id = OLD.follower_id;
    UPDATE profiles SET followers_count = followers_count - 1 WHERE id = OLD.following_id;
    RETURN OLD;
  END IF;
  
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create triggers
CREATE TRIGGER update_tweet_counts_trigger
  AFTER INSERT OR DELETE ON likes
  FOR EACH ROW EXECUTE FUNCTION update_tweet_counts();

CREATE TRIGGER update_tweet_counts_tweets_trigger
  AFTER INSERT OR DELETE ON tweets
  FOR EACH ROW EXECUTE FUNCTION update_tweet_counts();

CREATE TRIGGER update_follow_counts_trigger
  AFTER INSERT OR DELETE ON follows
  FOR EACH ROW EXECUTE FUNCTION update_follow_counts();

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_tweets_user_id ON tweets(user_id);
CREATE INDEX IF NOT EXISTS idx_tweets_created_at ON tweets(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_tweets_reply_to ON tweets(reply_to);
CREATE INDEX IF NOT EXISTS idx_tweets_retweet_of ON tweets(retweet_of);
CREATE INDEX IF NOT EXISTS idx_likes_tweet_id ON likes(tweet_id);
CREATE INDEX IF NOT EXISTS idx_likes_user_id ON likes(user_id);
CREATE INDEX IF NOT EXISTS idx_follows_follower_id ON follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following_id ON follows(following_id);
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);