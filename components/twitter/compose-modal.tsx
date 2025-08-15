"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TweetComposer } from "./tweet-composer"
import type { Database } from "@/lib/supabase"

type Tweet = Database['public']['Tables']['tweets']['Row'] & {
  profiles: Database['public']['Tables']['profiles']['Row']
}

type Profile = Database['public']['Tables']['profiles']['Row']

interface ComposeModalProps {
  isOpen: boolean
  onClose: () => void
  profile: Profile | null
  onTweetCreated: () => void
  replyTo?: Tweet
}

export function ComposeModal({ isOpen, onClose, profile, onTweetCreated, replyTo }: ComposeModalProps) {
  const handleTweetCreated = () => {
    onTweetCreated()
    onClose()
  }

  if (!profile) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {replyTo ? `Reply to @${replyTo.profiles.username}` : 'Compose Tweet'}
          </DialogTitle>
        </DialogHeader>
        
        {replyTo && (
          <div className="p-4 bg-muted/50 rounded-lg mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold">{replyTo.profiles.full_name}</span>
              <span className="text-muted-foreground">@{replyTo.profiles.username}</span>
            </div>
            <p className="text-sm">{replyTo.content}</p>
          </div>
        )}

        <TweetComposer
          profile={profile}
          onTweetCreated={handleTweetCreated}
          replyTo={replyTo?.id}
          placeholder={replyTo ? "Tweet your reply" : "What's happening?"}
        />
      </DialogContent>
    </Dialog>
  )
}