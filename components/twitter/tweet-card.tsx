"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  Heart, 
  MessageCircle, 
  Repeat2, 
  Share, 
  MoreHorizontal,
  Trash2
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { likeTweet, unlikeTweet, retweet, deleteTweet } from "@/lib/tweets"
import { AnimatedCounter } from "@/components/custom/animated-counter"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Database } from "@/lib/supabase"

type Tweet = Database['public']['Tables']['tweets']['Row'] & {
  profiles: Database['public']['Tables']['profiles']['Row']
  is_liked?: boolean
  is_retweeted?: boolean
}

interface TweetCardProps {
  tweet: Tweet
  currentUserId: string
  onUpdate: () => void
  onReply: (tweet: Tweet) => void
  className?: string
}

export function TweetCard({ tweet, currentUserId, onUpdate, onReply, className = "" }: TweetCardProps) {
  const [isLiking, setIsLiking] = useState(false)
  const [isRetweeting, setIsRetweeting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const isOwner = tweet.user_id === currentUserId

  const handleLike = async () => {
    if (isLiking) return
    setIsLiking(true)

    try {
      if (tweet.is_liked) {
        await unlikeTweet(tweet.id, currentUserId)
      } else {
        await likeTweet(tweet.id, currentUserId)
      }
      onUpdate()
    } catch (error) {
      console.error('Error toggling like:', error)
    } finally {
      setIsLiking(false)
    }
  }

  const handleRetweet = async () => {
    if (isRetweeting) return
    setIsRetweeting(true)

    try {
      await retweet(tweet.id, currentUserId)
      onUpdate()
    } catch (error) {
      console.error('Error retweeting:', error)
    } finally {
      setIsRetweeting(false)
    }
  }

  const handleDelete = async () => {
    if (isDeleting) return
    setIsDeleting(true)

    try {
      await deleteTweet(tweet.id, currentUserId)
      onUpdate()
    } catch (error) {
      console.error('Error deleting tweet:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Card className={`border-0 border-b border-border rounded-none hover:bg-muted/50 transition-colors cursor-pointer ${className}`}>
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={tweet.profiles.avatar_url || undefined} />
            <AvatarFallback>
              {tweet.profiles.full_name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold hover:underline cursor-pointer">
                {tweet.profiles.full_name}
              </span>
              <span className="text-muted-foreground">@{tweet.profiles.username}</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground text-sm">
                {formatDistanceToNow(new Date(tweet.created_at), { addSuffix: true })}
              </span>
              
              <div className="ml-auto">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {isOwner && (
                      <DropdownMenuItem 
                        onClick={handleDelete}
                        className="text-destructive"
                        disabled={isDeleting}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Tweet
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem>
                      <Share className="h-4 w-4 mr-2" />
                      Share Tweet
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Retweet indicator */}
            {tweet.retweet_of && (
              <div className="flex items-center gap-2 mb-2 text-muted-foreground text-sm">
                <Repeat2 className="h-4 w-4" />
                <span>Retweeted</span>
              </div>
            )}

            {/* Tweet content */}
            <div className="mb-3">
              <p className="text-base leading-relaxed whitespace-pre-wrap">
                {tweet.content}
              </p>
              
              {tweet.image_url && (
                <div className="mt-3">
                  <img
                    src={tweet.image_url}
                    alt="Tweet image"
                    className="rounded-lg max-h-96 w-full object-cover border border-border"
                  />
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between max-w-md">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 text-muted-foreground hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950"
                onClick={() => onReply(tweet)}
              >
                <MessageCircle className="h-4 w-4" />
                {tweet.replies_count > 0 && (
                  <AnimatedCounter value={tweet.replies_count} className="text-xs" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center gap-2 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-950 ${
                  tweet.is_retweeted ? 'text-green-500' : 'text-muted-foreground'
                }`}
                onClick={handleRetweet}
                disabled={isRetweeting}
              >
                <Repeat2 className="h-4 w-4" />
                {tweet.retweets_count > 0 && (
                  <AnimatedCounter value={tweet.retweets_count} className="text-xs" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center gap-2 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 ${
                  tweet.is_liked ? 'text-red-500' : 'text-muted-foreground'
                }`}
                onClick={handleLike}
                disabled={isLiking}
              >
                <Heart className={`h-4 w-4 ${tweet.is_liked ? 'fill-current' : ''}`} />
                {tweet.likes_count > 0 && (
                  <AnimatedCounter value={tweet.likes_count} className="text-xs" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 text-muted-foreground hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950"
              >
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}