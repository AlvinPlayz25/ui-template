"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, TrendingUp, Users, MoreHorizontal } from "lucide-react"
import { AnimatedCounter } from "@/components/custom/animated-counter"
import { SearchBar } from "@/components/custom/search-bar"

const trendingTopics = [
  { topic: "#ReactJS", tweets: 45600, category: "Technology" },
  { topic: "#NextJS", tweets: 23400, category: "Technology" },
  { topic: "#TypeScript", tweets: 18900, category: "Programming" },
  { topic: "#TailwindCSS", tweets: 12300, category: "Design" },
  { topic: "#WebDev", tweets: 67800, category: "Technology" },
]

const suggestedUsers = [
  {
    id: "1",
    username: "vercel",
    fullName: "Vercel",
    avatar: "https://pbs.twimg.com/profile_images/1565710214019444737/if82cpbS_400x400.jpg",
    bio: "Develop. Preview. Ship.",
    verified: true
  },
  {
    id: "2", 
    username: "reactjs",
    fullName: "React",
    avatar: "https://pbs.twimg.com/profile_images/1785867863191932928/EpOqfO6d_400x400.png",
    bio: "The library for web and native user interfaces",
    verified: true
  },
  {
    id: "3",
    username: "tailwindcss", 
    fullName: "Tailwind CSS",
    avatar: "https://pbs.twimg.com/profile_images/1730334391501488129/G0R0sjHH_400x400.jpg",
    bio: "A utility-first CSS framework",
    verified: true
  }
]

export function TrendingSidebar() {
  return (
    <div className="w-80 h-screen bg-background border-l border-border p-4 space-y-4 overflow-y-auto">
      {/* Search */}
      <div className="sticky top-0 bg-background pb-4">
        <SearchBar 
          placeholder="Search Twitter"
          filters={["People", "Photos", "Videos", "News"]}
          onSearch={(query, filters) => console.log('Search:', query, filters)}
        />
      </div>

      {/* Trending Topics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            What's happening
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trendingTopics.map((trend, index) => (
            <div key={index} className="flex items-center justify-between hover:bg-muted/50 p-2 rounded-lg cursor-pointer transition-colors">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{trend.topic}</span>
                  <Badge variant="secondary" className="text-xs">
                    {index + 1}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{trend.category}</p>
                <p className="text-xs text-muted-foreground">
                  <AnimatedCounter value={trend.tweets} /> tweets
                </p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          ))}
          
          <Button variant="ghost" className="w-full justify-start text-primary">
            Show more
          </Button>
        </CardContent>
      </Card>

      {/* Who to follow */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Who to follow
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {suggestedUsers.map((user) => (
            <div key={user.id} className="flex items-start gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>
                  {user.fullName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-semibold truncate">{user.fullName}</span>
                  {user.verified && (
                    <Badge variant="secondary" className="text-xs">
                      ✓
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">@{user.username}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {user.bio}
                </p>
              </div>
              
              <Button size="sm" variant="outline">
                Follow
              </Button>
            </div>
          ))}
          
          <Button variant="ghost" className="w-full justify-start text-primary">
            Show more
          </Button>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-xs text-muted-foreground space-y-2">
        <div className="flex flex-wrap gap-2">
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Cookie Policy</a>
        </div>
        <p>© 2024 Twitter Clone. Built with Next.js and Supabase.</p>
      </div>
    </div>
  )
}