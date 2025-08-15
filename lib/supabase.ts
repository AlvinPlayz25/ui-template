import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          full_name: string
          avatar_url: string | null
          bio: string | null
          website: string | null
          location: string | null
          followers_count: number
          following_count: number
          tweets_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          full_name: string
          avatar_url?: string | null
          bio?: string | null
          website?: string | null
          location?: string | null
          followers_count?: number
          following_count?: number
          tweets_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          full_name?: string
          avatar_url?: string | null
          bio?: string | null
          website?: string | null
          location?: string | null
          followers_count?: number
          following_count?: number
          tweets_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      tweets: {
        Row: {
          id: string
          user_id: string
          content: string
          image_url: string | null
          reply_to: string | null
          retweet_of: string | null
          likes_count: number
          retweets_count: number
          replies_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content: string
          image_url?: string | null
          reply_to?: string | null
          retweet_of?: string | null
          likes_count?: number
          retweets_count?: number
          replies_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content?: string
          image_url?: string | null
          reply_to?: string | null
          retweet_of?: string | null
          likes_count?: number
          retweets_count?: number
          replies_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      likes: {
        Row: {
          id: string
          user_id: string
          tweet_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tweet_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tweet_id?: string
          created_at?: string
        }
      }
      follows: {
        Row: {
          id: string
          follower_id: string
          following_id: string
          created_at: string
        }
        Insert: {
          id?: string
          follower_id: string
          following_id: string
          created_at?: string
        }
        Update: {
          id?: string
          follower_id?: string
          following_id?: string
          created_at?: string
        }
      }
    }
  }
}