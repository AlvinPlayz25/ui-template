import { supabase } from './supabase'

export async function followUser(followingId: string, followerId: string) {
  const { error } = await supabase
    .from('follows')
    .insert({
      follower_id: followerId,
      following_id: followingId,
    })

  if (error) throw error
}

export async function unfollowUser(followingId: string, followerId: string) {
  const { error } = await supabase
    .from('follows')
    .delete()
    .eq('follower_id', followerId)
    .eq('following_id', followingId)

  if (error) throw error
}

export async function isFollowing(followingId: string, followerId: string) {
  const { data, error } = await supabase
    .from('follows')
    .select('id')
    .eq('follower_id', followerId)
    .eq('following_id', followingId)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return !!data
}

export async function getFollowers(userId: string) {
  const { data, error } = await supabase
    .from('follows')
    .select(`
      follower_id,
      profiles:follower_id (
        id,
        username,
        full_name,
        avatar_url,
        bio
      )
    `)
    .eq('following_id', userId)

  if (error) throw error
  return data
}

export async function getFollowing(userId: string) {
  const { data, error } = await supabase
    .from('follows')
    .select(`
      following_id,
      profiles:following_id (
        id,
        username,
        full_name,
        avatar_url,
        bio
      )
    `)
    .eq('follower_id', userId)

  if (error) throw error
  return data
}