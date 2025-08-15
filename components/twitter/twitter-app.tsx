"use client"

import { useState, useEffect } from "react"
import { AuthForm } from "./auth-form"
import { Sidebar } from "./sidebar"
import { Timeline } from "./timeline"
import { TrendingSidebar } from "./trending-sidebar"
import { ComposeModal } from "./compose-modal"
import { ProfilePage } from "./profile-page"
import { ExplorePage } from "./explore-page"
import { NotificationsPage } from "./notifications-page"
import { MessagesPage } from "./messages-page"
import { SettingsPage } from "./settings-page"
import { getCurrentUser, getUserProfile } from "@/lib/auth"
import { supabase } from "@/lib/supabase"
import { Loader2 } from "lucide-react"
import { AnimatedBackground } from "@/components/custom/animated-background"
import Galaxy from "@/components/blocks/Backgrounds/Galaxy/Galaxy"
import type { Database } from "@/lib/supabase"

type Tweet = Database['public']['Tables']['tweets']['Row'] & {
  profiles: Database['public']['Tables']['profiles']['Row']
  is_liked?: boolean
  is_retweeted?: boolean
}

type Profile = Database['public']['Tables']['profiles']['Row']

export default function TwitterApp() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState("home")
  const [isComposeOpen, setIsComposeOpen] = useState(false)
  const [replyToTweet, setReplyToTweet] = useState<Tweet | null>(null)
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null)

  useEffect(() => {
    async function initializeAuth() {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          setUser(session.user)
          const userProfile = await getUserProfile(session.user.id)
          setProfile(userProfile)
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user)
        try {
          const userProfile = await getUserProfile(session.user.id)
          setProfile(userProfile)
        } catch (error) {
          console.error('Error loading profile:', error)
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleAuthSuccess = async () => {
    const user = await getCurrentUser()
    if (user) {
      setUser(user)
      const userProfile = await getUserProfile(user.id)
      setProfile(userProfile)
    }
  }

  const handleCompose = () => {
    setIsComposeOpen(true)
  }

  const handleReply = (tweet: Tweet) => {
    setReplyToTweet(tweet)
    setIsComposeOpen(true)
  }

  const handleComposeClose = () => {
    setIsComposeOpen(false)
    setReplyToTweet(null)
  }

  const handleTweetCreated = () => {
    // Refresh timeline or handle tweet creation
  }

  const handlePageChange = (page: string) => {
    setCurrentPage(page)
    setSelectedProfile(null)
  }

  const handleProfileView = (profileToView: Profile) => {
    setSelectedProfile(profileToView)
    setCurrentPage("profile")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading Twitter Clone...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <AuthForm onSuccess={handleAuthSuccess} />
  }

  const renderMainContent = () => {
    switch (currentPage) {
      case "home":
        return <Timeline onReply={handleReply} />
      case "explore":
        return <ExplorePage onReply={handleReply} />
      case "notifications":
        return <NotificationsPage />
      case "messages":
        return <MessagesPage />
      case "settings":
        return profile ? (
          <SettingsPage
            profile={profile}
            onBack={() => setCurrentPage("home")}
          />
        ) : null
      case "profile":
        if (selectedProfile) {
          return (
            <ProfilePage
              profile={selectedProfile}
              currentUserId={user.id}
              onBack={() => setCurrentPage("home")}
              onReply={handleReply}
            />
          )
        }
        return profile ? (
          <ProfilePage
            profile={profile}
            currentUserId={user.id}
            onBack={() => setCurrentPage("home")}
            onReply={handleReply}
          />
        ) : null
      default:
        return <Timeline onReply={handleReply} />
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <Galaxy 
          transparent={true}
          mouseInteraction={true}
          glowIntensity={0.2}
          density={0.5}
          hueShift={140}
        />
      </div>
      
      <div className="relative z-10 flex min-h-screen bg-background/80 backdrop-blur-sm">
        {/* Sidebar */}
        <Sidebar
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onCompose={handleCompose}
        />

        {/* Main Content */}
        {renderMainContent()}

        {/* Trending Sidebar */}
        <TrendingSidebar />

        {/* Compose Modal */}
        <ComposeModal
          isOpen={isComposeOpen}
          onClose={handleComposeClose}
          profile={profile}
          onTweetCreated={handleTweetCreated}
          replyTo={replyToTweet}
        />
      </div>
    </div>
  )
}