"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Image, X, Loader2 } from "lucide-react"
import { createTweet } from "@/lib/tweets"
import { FileUpload } from "@/components/custom/file-upload"
import type { Database } from "@/lib/supabase"

type Profile = Database['public']['Tables']['profiles']['Row']

interface TweetComposerProps {
  profile: Profile
  onTweetCreated: () => void
  replyTo?: string
  placeholder?: string
}

export function TweetComposer({ profile, onTweetCreated, replyTo, placeholder = "What's happening?" }: TweetComposerProps) {
  const [content, setContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showImageUpload, setShowImageUpload] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const maxLength = 280
  const remainingChars = maxLength - content.length

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || isLoading) return

    setIsLoading(true)
    try {
      // In a real app, you'd upload the image to storage first
      const imageUrl = selectedFiles.length > 0 ? URL.createObjectURL(selectedFiles[0]) : undefined
      
      await createTweet(content, profile.id, imageUrl, replyTo)
      setContent("")
      setSelectedFiles([])
      setShowImageUpload(false)
      onTweetCreated()
    } catch (error) {
      console.error('Error creating tweet:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-0 border-b border-border rounded-none">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src={profile.avatar_url || undefined} />
              <AvatarFallback>
                {profile.full_name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-3">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={placeholder}
                className="min-h-[100px] resize-none border-0 p-0 text-lg placeholder:text-muted-foreground focus-visible:ring-0"
                maxLength={maxLength}
              />

              {selectedFiles.length > 0 && (
                <div className="relative">
                  <img
                    src={URL.createObjectURL(selectedFiles[0])}
                    alt="Upload preview"
                    className="rounded-lg max-h-64 w-full object-cover"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => setSelectedFiles([])}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {showImageUpload && (
                <FileUpload
                  accept="image/*"
                  maxSize={5}
                  onFilesChange={setSelectedFiles}
                  className="border-dashed"
                />
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowImageUpload(!showImageUpload)}
                  >
                    <Image className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  <Badge 
                    variant={remainingChars < 20 ? "destructive" : "secondary"}
                    className="text-xs"
                  >
                    {remainingChars}
                  </Badge>
                  <Button
                    type="submit"
                    disabled={!content.trim() || remainingChars < 0 || isLoading}
                    className="px-6"
                  >
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {replyTo ? 'Reply' : 'Tweet'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}