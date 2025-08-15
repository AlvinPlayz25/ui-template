"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail, Search, MoreHorizontal, Send } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { AnimatedBackground } from "@/components/custom/animated-background"

const conversations = [
  {
    id: "1",
    user: {
      username: "johndoe",
      fullName: "John Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john"
    },
    lastMessage: "Hey! How's the project going?",
    time: new Date(Date.now() - 1000 * 60 * 30),
    unread: 2,
    online: true
  },
  {
    id: "2",
    user: {
      username: "janedoe",
      fullName: "Jane Doe",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane"
    },
    lastMessage: "Thanks for the help with the code review!",
    time: new Date(Date.now() - 1000 * 60 * 60 * 2),
    unread: 0,
    online: false
  },
  {
    id: "3",
    user: {
      username: "alexsmith",
      fullName: "Alex Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex"
    },
    lastMessage: "Let's schedule that meeting for tomorrow",
    time: new Date(Date.now() - 1000 * 60 * 60 * 4),
    unread: 1,
    online: true
  }
]

const messages = [
  {
    id: "1",
    senderId: "johndoe",
    content: "Hey! How's the project going?",
    time: new Date(Date.now() - 1000 * 60 * 30),
    isOwn: false
  },
  {
    id: "2",
    senderId: "me",
    content: "Going great! Just finished the authentication system.",
    time: new Date(Date.now() - 1000 * 60 * 25),
    isOwn: true
  },
  {
    id: "3",
    senderId: "johndoe",
    content: "Awesome! Can't wait to see it in action.",
    time: new Date(Date.now() - 1000 * 60 * 20),
    isOwn: false
  }
]

export function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return
    
    // In a real app, you'd send this to your backend
    console.log('Sending message:', newMessage)
    setNewMessage("")
  }

  return (
    <div className="flex-1 border-r border-border relative">
      <AnimatedBackground variant="gradient" className="absolute inset-0 opacity-10" />
      
      <div className="flex h-full relative z-10">
        {/* Conversations List */}
        <div className="w-80 border-r border-border">
          {/* Header */}
          <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Messages</h2>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search Direct Messages"
                className="pl-10"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="overflow-y-auto">
            {conversations.map((conversation) => (
              <Card 
                key={conversation.id}
                className={`border-0 border-b border-border rounded-none hover:bg-muted/50 transition-colors cursor-pointer ${
                  selectedConversation.id === conversation.id ? 'bg-muted/50' : ''
                }`}
                onClick={() => setSelectedConversation(conversation)}
              >
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={conversation.user.avatar} />
                        <AvatarFallback>
                          {conversation.user.fullName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-background rounded-full" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold truncate">{conversation.user.fullName}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(conversation.time, { addSuffix: true })}
                          </span>
                          {conversation.unread > 0 && (
                            <Badge variant="default" className="h-5 w-5 p-0 text-xs rounded-full">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={selectedConversation.user.avatar} />
                <AvatarFallback>
                  {selectedConversation.user.fullName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold">{selectedConversation.user.fullName}</h3>
                <p className="text-sm text-muted-foreground">@{selectedConversation.user.username}</p>
              </div>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md ${message.isOwn ? 'order-2' : 'order-1'}`}>
                  <div className={`p-3 rounded-2xl ${
                    message.isOwn 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 px-3">
                    {formatDistanceToNow(message.time, { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="border-t border-border p-4">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Start a new message"
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}