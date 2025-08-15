"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Repeat2, UserPlus, MessageCircle, Bell } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { AnimatedBackground } from "@/components/custom/animated-background"

const notifications = [
  {
    id: "1",
    type: "like",
    user: {
      username: "johndoe",
      fullName: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john"
    },
    content: "liked your tweet",
    tweet: "Just shipped a new feature! 🚀",
    time: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false
  },
  {
    id: "2",
    type: "retweet",
    user: {
      username: "janedoe",
      fullName: "Jane Doe", 
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane"
    },
    content: "retweeted your tweet",
    tweet: "Building something amazing with Next.js and Supabase",
    time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false
  },
  {
    id: "3",
    type: "follow",
    user: {
      username: "alexsmith",
      fullName: "Alex Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex"
    },
    content: "started following you",
    time: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    read: true
  },
  {
    id: "4",
    type: "reply",
    user: {
      username: "sarahwilson",
      fullName: "Sarah Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah"
    },
    content: "replied to your tweet",
    tweet: "This is exactly what I was looking for!",
    time: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
    read: true
  }
]

export function NotificationsPage() {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="h-4 w-4 text-red-500 fill-current" />
      case "retweet":
        return <Repeat2 className="h-4 w-4 text-green-500" />
      case "follow":
        return <UserPlus className="h-4 w-4 text-blue-500" />
      case "reply":
        return <MessageCircle className="h-4 w-4 text-blue-500" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getNotificationText = (type: string) => {
    switch (type) {
      case "like":
        return "liked your tweet"
      case "retweet":
        return "retweeted your tweet"
      case "follow":
        return "started following you"
      case "reply":
        return "replied to your tweet"
      default:
        return "sent you a notification"
    }
  }

  return (
    <div className="flex-1 border-r border-border relative">
      <AnimatedBackground variant="grid" className="absolute inset-0 opacity-20" />
      
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border p-4 z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Notifications</h2>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="mentions">Mentions</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="relative z-10">
        <Tabs defaultValue="all" className="w-full">
          <TabsContent value="all" className="mt-0">
            <div>
              {notifications.map((notification) => (
                <Card 
                  key={notification.id} 
                  className={`border-0 border-b border-border rounded-none hover:bg-muted/50 transition-colors cursor-pointer ${
                    !notification.read ? 'bg-blue-50/50 dark:bg-blue-950/20' : ''
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex gap-3 flex-1">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={notification.user.avatar} />
                          <AvatarFallback>
                            {notification.user.fullName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{notification.user.fullName}</span>
                            <span className="text-muted-foreground">@{notification.user.username}</span>
                            <span className="text-muted-foreground">·</span>
                            <span className="text-muted-foreground text-sm">
                              {formatDistanceToNow(notification.time, { addSuffix: true })}
                            </span>
                            {!notification.read && (
                              <Badge variant="default" className="h-2 w-2 p-0 rounded-full" />
                            )}
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-2">
                            {getNotificationText(notification.type)}
                          </p>
                          
                          {notification.tweet && (
                            <div className="p-3 bg-muted/50 rounded-lg text-sm">
                              {notification.tweet}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mentions" className="mt-0">
            <Card className="m-4">
              <CardContent className="p-8 text-center">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No mentions yet</h3>
                <p className="text-muted-foreground">
                  When someone mentions you, you'll see it here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}