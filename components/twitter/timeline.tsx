"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, TrendingUp, Users } from "lucide-react"
import { TweetCard } from "./tweet-card"
import { TweetComposer } from "./tweet-composer"
import { getTweets } from "@/lib/tweets"
import { getCurrentUser, getUserProfile } from "@/lib/auth"
import { AnimatedBackground } from "@/components/custom/animated-background"
import { CardSkeleton } from "@/components/custom/loading-skeleton"
import type { Database } from "@/lib/supabase"

type Tweet = Database['public']['Tables']['tweets']['Row'] & {
  profiles: Database['public']['Tables']['profiles']['Row']
  is_liked?: boolean
  is_retweeted?: boolean
}

type Profile = Database['public']['Tables']['profiles']['Row']

interface TimelineProps {
  onReply: (tweet: Tweet) => void
}

export function Timeline({ onReply }: TimelineProps) {
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentUserId, setCurrentUserId] = useState<string>("")

  const loadData = async () => {
    try {
      const user = await getCurrentUser()
      if (user) {
        setCurrentUserId(user.id)
        const [userProfile, tweetsData] = await Promise.all([
          getUserProfile(user.id),
          getTweets(user.id)
        ])
        setProfile(userProfile)
        setTweets(tweetsData)
      }
    } catch (error) {
      console.error('Error loading timeline:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleTweetCreated = () => {
    loadData()
  }

  const handleTweetUpdate = () => {
    loadData()
  }

  if (isLoading) {
    return (
      <div className="flex-1 border-r border-border">
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border p-4">
          <h2 className="text-xl font-bold">Home</h2>
        </div>
        <div className="space-y-4 p-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 border-r border-border relative">
      <AnimatedBackground variant="dots" className="absolute inset-0 opacity-30" />
      
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Home</h2>
            <Button variant="ghost" size="icon">
              <Sparkles className="h-5 w-5" />
            </Button>
          </div>
          
          <Tabs defaultValue="foryou" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="foryou">For you</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Tweet Composer */}
      {profile && (
        <TweetComposer
          profile={profile}
          onTweetCreated={handleTweetCreated}
        />
      )}

      {/* Timeline */}
      <div className="relative z-10">
        {tweets.length === 0 ? (
          <Card className="m-4">
            <CardContent className="p-8 text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Welcome to Twitter Clone!</h3>
              <p className="text-muted-foreground mb-4">
                This is where you'll see tweets from people you follow.
              </p>
              <Button>Find people to follow</Button>
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
      </div>
    </div>
  )
}