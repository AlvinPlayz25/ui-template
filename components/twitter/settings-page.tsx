"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette,
  Moon,
  Sun,
  ArrowLeft
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { GradientToggle } from "@/components/gradient-toggle"
import { StyleSwitcher } from "@/components/style-switcher"
import { AnimatedBackground } from "@/components/custom/animated-background"
import type { Database } from "@/lib/supabase"

type Profile = Database['public']['Tables']['profiles']['Row']

interface SettingsPageProps {
  profile: Profile
  onBack: () => void
}

export function SettingsPage({ profile, onBack }: SettingsPageProps) {
  const [notifications, setNotifications] = useState({
    likes: true,
    retweets: true,
    follows: true,
    mentions: true,
    directMessages: true,
  })

  const [privacy, setPrivacy] = useState({
    privateAccount: false,
    allowTagging: true,
    showActivity: true,
  })

  return (
    <div className="flex-1 border-r border-border relative">
      <AnimatedBackground variant="dots" className="absolute inset-0 opacity-20" />
      
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border p-4 z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-xl font-bold">Settings</h2>
            <p className="text-sm text-muted-foreground">Manage your account preferences</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 p-4 space-y-6 max-w-2xl">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>Update your public profile information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile.avatar_url || undefined} />
                <AvatarFallback className="text-lg">
                  {profile.full_name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline">Change Photo</Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" defaultValue={profile.full_name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue={profile.username} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea 
                id="bio" 
                placeholder="Tell the world about yourself"
                defaultValue={profile.bio || ""}
                maxLength={160}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  placeholder="Where are you located?"
                  defaultValue={profile.location || ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input 
                  id="website" 
                  placeholder="https://yourwebsite.com"
                  defaultValue={profile.website || ""}
                />
              </div>
            </div>

            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Appearance
            </CardTitle>
            <CardDescription>Customize how Twitter Clone looks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Toggle between light and dark themes</p>
              </div>
              <ThemeToggle />
            </div>

            <Separator />

            <div>
              <Label className="text-base font-medium">Color Theme</Label>
              <p className="text-sm text-muted-foreground mb-4">Choose your preferred color scheme</p>
              <ThemeSwitcher />
            </div>

            <Separator />

            <div>
              <Label className="text-base font-medium">Style Variant</Label>
              <p className="text-sm text-muted-foreground mb-4">Customize the visual style</p>
              <StyleSwitcher />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Gradient Effects</Label>
                <p className="text-sm text-muted-foreground">Enable beautiful gradient backgrounds</p>
              </div>
              <GradientToggle />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Choose what notifications you receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when someone {key.toLowerCase().replace(/([A-Z])/g, ' $1')} your content
                  </p>
                </div>
                <Switch
                  checked={value}
                  onCheckedChange={(checked) =>
                    setNotifications(prev => ({ ...prev, [key]: checked }))
                  }
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy & Safety
            </CardTitle>
            <CardDescription>Control who can see your content and interact with you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(privacy).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <div>
                  <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</Label>
                  <p className="text-sm text-muted-foreground">
                    {key === 'privateAccount' && 'Only approved followers can see your tweets'}
                    {key === 'allowTagging' && 'Allow others to tag you in photos'}
                    {key === 'showActivity' && 'Show your activity status to others'}
                  </p>
                </div>
                <Switch
                  checked={value}
                  onCheckedChange={(checked) =>
                    setPrivacy(prev => ({ ...prev, [key]: checked }))
                  }
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Account Actions</CardTitle>
            <CardDescription>Manage your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              Download your data
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Deactivate account
            </Button>
            <Button variant="destructive" className="w-full justify-start">
              Delete account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}