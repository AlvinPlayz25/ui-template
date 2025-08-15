"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { 
  Home, 
  Search, 
  Bell, 
  Mail, 
  Bookmark, 
  User, 
  Settings, 
  Twitter,
  PlusCircle,
  TrendingUp,
  Users
} from "lucide-react"
import { signOut, getCurrentUser, getUserProfile } from "@/lib/auth"
import { AnimatedCounter } from "@/components/custom/animated-counter"
import { StatsCard } from "@/components/custom/stats-card"
import type { Database } from "@/lib/supabase"

type Profile = Database['public']['Tables']['profiles']['Row']

interface SidebarProps {
  currentPage: string
  onPageChange: (page: string) => void
  onCompose: () => void
}

export function Sidebar({ currentPage, onPageChange, onCompose }: SidebarProps) {
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    async function loadProfile() {
      try {
        const user = await getCurrentUser()
        if (user) {
          const userProfile = await getUserProfile(user.id)
          setProfile(userProfile)
        }
      } catch (error) {
        console.error('Error loading profile:', error)
      }
    }

    loadProfile()
  }, [])

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Search },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: 3 },
    { id: 'messages', label: 'Messages', icon: Mail },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const handleSignOut = async () => {
    try {
      await signOut()
      window.location.reload()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <div className="w-64 h-screen bg-background border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <Twitter className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold">Twitter Clone</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={currentPage === item.id ? "default" : "ghost"}
              className="w-full justify-start gap-3 h-12"
              onClick={() => onPageChange(item.id)}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-base">{item.label}</span>
              {item.badge && (
                <Badge variant="destructive" className="ml-auto">
                  {item.badge}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Compose Button */}
        <Button 
          onClick={onCompose}
          className="w-full mt-6 h-12 text-base font-semibold bg-primary hover:bg-primary/90"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Tweet
        </Button>

        {/* Stats Cards */}
        {profile && (
          <div className="mt-6 space-y-3">
            <StatsCard
              title="Tweets"
              value={profile.tweets_count}
              gradient="blue"
              className="text-xs"
            />
            <StatsCard
              title="Following"
              value={profile.following_count}
              gradient="purple"
              className="text-xs"
            />
            <StatsCard
              title="Followers"
              value={profile.followers_count}
              gradient="green"
              className="text-xs"
            />
          </div>
        )}
      </nav>

      {/* User Profile */}
      {profile && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
            <Avatar>
              <AvatarImage src={profile.avatar_url || undefined} />
              <AvatarFallback>
                {profile.full_name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{profile.full_name}</p>
              <p className="text-sm text-muted-foreground truncate">@{profile.username}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      )}
    </div>
  )
}