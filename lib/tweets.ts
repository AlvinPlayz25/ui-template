import { supabase } from './supabase'
import type { Database } from './supabase'

type Tweet = Database['public']['Tables']['tweets']['Row'] & {
  profiles: Database['public']['Tables']['profiles']['Row']
  is_liked?: boolean
  is_retweeted?: boolean
}

export async function getTweets(userId?: string) {
  let query = supabase
    .from('tweets')
    .select(`
      *,
      profiles:user_id (
        id,
        username,
        full_name,
        avatar_url
      )
    `)
    .order('created_at', { ascending: false })

  const { data, error } = await query

  if (error) throw error

  // Check if user has liked/retweeted each tweet
  if (userId && data) {
    const tweetIds = data.map(tweet => tweet.id)
    
    const { data: likes } = await supabase
      .from('likes')
      .select('tweet_id')
      .eq('user_id', userId)
      .in('tweet_id', tweetIds)

    const { data: retweets } = await supabase
      .from('tweets')
      .select('retweet_of')
      .eq('user_id', userId)
      .in('retweet_of', tweetIds)

    const likedTweetIds = new Set(likes?.map(like => like.tweet_id))
    const retweetedTweetIds = new Set(retweets?.map(rt => rt.retweet_of))

    return data.map(tweet => ({
      ...tweet,
      is_liked: likedTweetIds.has(tweet.id),
      is_retweeted: retweetedTweetIds.has(tweet.id)
    }))
  }

  return data as Tweet[]
}

export async function createTweet(content: string, userId: string, imageUrl?: string, replyTo?: string) {
  const { data, error } = await supabase
    .from('tweets')
    .insert({
      content,
      user_id: userId,
      image_url: imageUrl,
      reply_to: replyTo,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function likeTweet(tweetId: string, userId: string) {
  const { error } = await supabase
    .from('likes')
    .insert({
      tweet_id: tweetId,
      user_id: userId,
    })

  if (error) throw error
}

export async function unlikeTweet(tweetId: string, userId: string) {
  const { error } = await supabase
    .from('likes')
    .delete()
    .eq('tweet_id', tweetId)
    .eq('user_id', userId)

  if (error) throw error
}

export async function retweet(tweetId: string, userId: string, content?: string) {
  const { data, error } = await supabase
    .from('tweets')
    .insert({
      content: content || '',
      user_id: userId,
      retweet_of: tweetId,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteTweet(tweetId: string, userId: string) {
  const { error } = await supabase
    .from('tweets')
    .delete()
    .eq('id', tweetId)
    .eq('user_id', userId)

  if (error) throw error
}

export async function getTweetReplies(tweetId: string) {
  const { data, error } = await supabase
    .from('tweets')
    .select(`
      *,
      profiles:user_id (
        id,
        username,
        full_name,
        avatar_url
      )
    `)
    .eq('reply_to', tweetId)
    .order('created_at', { ascending: true })

  if (error) throw error
  return data as Tweet[]
}

export async function getUserTweets(userId: string) {
  const { data, error } = await supabase
    .from('tweets')
    .select(`
      *,
      profiles:user_id (
        id,
        username,
        full_name,
        avatar_url
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Tweet[]
}