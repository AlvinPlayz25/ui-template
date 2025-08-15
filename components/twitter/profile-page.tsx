"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Calendar, 
  Link as LinkIcon, 
  MapPin, 
  MoreHorizontal,
  ArrowLeft,
  Settings
} from "lucide-react"
import { TweetCard } from "./tweet-card"
import { getUserTweets } from "@/lib/tweets"
import { followUser, unfollowUser, isFollowing } from "@/lib/follows"
import { AnimatedCounter } from "@/components/custom/animated-counter"
import { StatsCard } from "@/components/custom/stats-card"
import { formatDistanceToNow } from "date-fns"
import type { Database } from "@/lib/supabase"

type Tweet = Database['public']['Tables']['tweets']['Row'] & {
  profiles: Database['public']['Tables']['profiles']['Row']
  is_liked?: boolean
  is_retweeted?: boolean
}

type Profile = Database['public']['Tables']['profiles']['Row']

interface ProfilePageProps {
  profile: Profile
  currentUserId: string
  onBack: () => void
  onReply: (tweet: Tweet) => void
}

export function ProfilePage({ profile, currentUserId, onBack, onReply }: ProfilePageProps) {
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFollowingUser, setIsFollowingUser] = useState(false)
  const [isFollowLoading, setIsFollowLoading] = useState(false)

  const isOwnProfile = profile.id === currentUserId

  useEffect(() => {
    async function loadData() {
      try {
        const [userTweets, followingStatus] = await Promise.all([
          getUserTweets(profile.id),
          isOwnProfile ? false : isFollowing(profile.id, currentUserId)
        ])
        
        setTweets(userTweets)
        setIsFollowingUser(followingStatus)
      } catch (error) {
        console.error('Error loading profile data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [profile.id, currentUserId, isOwnProfile])

  const handleFollow = async () => {
    if (isFollowLoading) return
    setIsFollowLoading(true)

    try {
      if (isFollowingUser) {
        await unfollowUser(profile.id, currentUserId)
        setIsFollowingUser(false)
      } else {
        await followUser(profile.id, currentUserId)
        setIsFollowingUser(true)
      }
    } catch (error) {
      console.error('Error toggling follow:', error)
    } finally {
      setIsFollowLoading(false)
    }
  }

  const handleTweetUpdate = () => {
    // Reload tweets
    getUserTweets(profile.id).then(setTweets)
  }

  return (
    <div className="flex-1 border-r border-border">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border p-4 z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-xl font-bold">{profile.full_name}</h2>
            <p className="text-sm text-muted-foreground">
              <AnimatedCounter value={profile.tweets_count} /> tweets
            </p>
          </div>
        </div>
      </div>

      {/* Profile Header */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-500" />
        
        {/* Profile Info */}
        <div className="p-4">
          <div className="flex items-end justify-between -mt-16 mb-4">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src={profile.avatar_url || undefined} />
              <AvatarFallback className="text-2xl">
                {profile.full_name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex gap-2">
              {isOwnProfile ? (
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <Button 
                  onClick={handleFollow}
                  disabled={isFollowLoading}
                  variant={isFollowingUser ? "outline" : "default"}
                >
                  {isFollowingUser ? 'Following' : 'Follow'}
                </Button>
              )}
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h1 className="text-2xl font-bold">{profile.full_name}</h1>
              <p className="text-muted-foreground">@{profile.username}</p>
            </div>

            {profile.bio && (
              <p className="text-base">{profile.bio}</p>
            )}

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {profile.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.website && (
                <div className="flex items-center gap-1">
                  <LinkIcon className="h-4 w-4" />
                  <a href={profile.website} className="text-primary hover:underline">
                    {profile.website}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>
                  Joined {formatDistanceToNow(new Date(profile.created_at), { addSuffix: true })}
                </span>
              </div>
            </div>

            <div className="flex gap-6">
              <button className="hover:underline">
                <span className="font-bold">
                  <AnimatedCounter value={profile.following_count} />
                </span>
                <span className="text-muted-foreground ml-1">Following</span>
              </button>
              <button className="hover:underline">
                <span className="font-bold">
                  <AnimatedCounter value={profile.followers_count} />
                </span>
                <span className="text-muted-foreground ml-1">Followers</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 p-4">
        <StatsCard
          title="Tweets"
          value={profile.tweets_count}
          gradient="blue"
          className="text-center"
        />
        <StatsCard
          title="Following"
          value={profile.following_count}
          gradient="purple"
          className="text-center"
        />
        <StatsCard
          title="Followers"
          value={profile.followers_count}
          gradient="green"
          className="text-center"
        />
      </div>

      {/* Profile Tabs */}
      <Tabs defaultValue="tweets" className="w-full">
        <div className="border-b border-border">
          <TabsList className="w-full h-auto p-0 bg-transparent rounded-none">
            <TabsTrigger 
              value="tweets" 
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Tweets
            </TabsTrigger>
            <TabsTrigger 
              value="replies"
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Replies
            </TabsTrigger>
            <TabsTrigger 
              value="media"
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Media
            </TabsTrigger>
            <TabsTrigger 
              value="likes"
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Likes
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="tweets" className="mt-0">
          {tweets.length === 0 ? (
            <Card className="m-4">
              <CardContent className="p-8 text-center">
                <h3 className="text-lg font-semibold mb-2">No tweets yet</h3>
                <p className="text-muted-foreground">
                  {isOwnProfile ? "Share your first tweet!" : `@${profile.username} hasn't tweeted yet.`}
                </p>
              </CardContent>
            </Card>
          ) : (
            <div>
              {tweets.map((tweet) => (
                <TweetCard
                  key={tweet.id}
                  tweet={tweet}
                  currentUserId={currentUserId}
                  onUpdate={handleTweetUpdate}
                  onReply={onReply}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="replies" className="mt-0">
          <Card className="m-4">
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">No replies yet</h3>
              <p className="text-muted-foreground">Replies will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="mt-0">
          <Card className="m-4">
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">No media yet</h3>
              <p className="text-muted-foreground">Photos and videos will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="likes" className="mt-0">
          <Card className="m-4">
            <CardContent className="p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">No likes yet</h3>
              <p className="text-muted-foreground">Liked tweets will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}