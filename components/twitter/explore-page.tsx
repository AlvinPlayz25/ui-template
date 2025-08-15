"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Hash, Play, Newspaper, Users } from "lucide-react"
import { SearchBar } from "@/components/custom/search-bar"
import { FeatureGrid } from "@/components/custom/feature-grid"
import { AnimatedBackground } from "@/components/custom/animated-background"
import { AnimatedCounter } from "@/components/custom/animated-counter"
import MagicBento from "@/components/blocks/Components/MagicBento/MagicBento"

const trendingData = [
  { topic: "#ReactJS", tweets: 45600, category: "Technology", growth: 12.5 },
  { topic: "#NextJS", tweets: 23400, category: "Technology", growth: 8.2 },
  { topic: "#TypeScript", tweets: 18900, category: "Programming", growth: 15.7 },
  { topic: "#TailwindCSS", tweets: 12300, category: "Design", growth: 22.1 },
  { topic: "#WebDev", tweets: 67800, category: "Technology", growth: 5.3 },
  { topic: "#JavaScript", tweets: 89200, category: "Programming", growth: 3.8 },
  { topic: "#CSS", tweets: 34500, category: "Design", growth: 9.4 },
  { topic: "#HTML", tweets: 28700, category: "Programming", growth: 4.2 },
]

const newsItems = [
  {
    title: "New React 19 Features Announced",
    description: "React team unveils exciting new features for the upcoming major release",
    category: "Technology",
    time: "2h",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop"
  },
  {
    title: "Next.js 15 Performance Improvements",
    description: "Significant performance boosts and new developer experience features",
    category: "Development",
    time: "4h",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=200&fit=crop"
  },
  {
    title: "Tailwind CSS v4 Alpha Released",
    description: "Major rewrite brings new engine and improved performance",
    category: "Design",
    time: "6h",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop"
  }
]

interface ExplorePageProps {
  onReply: (tweet: any) => void
}

export function ExplorePage({ onReply }: ExplorePageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const features = [
    {
      title: "Trending Topics",
      description: "Discover what's happening around the world",
      icon: <TrendingUp className="h-5 w-5" />,
      gradient: "blue" as const,
    },
    {
      title: "Live Events",
      description: "Follow breaking news and live events",
      icon: <Play className="h-5 w-5" />,
      gradient: "purple" as const,
    },
    {
      title: "Communities",
      description: "Connect with like-minded people",
      icon: <Users className="h-5 w-5" />,
      gradient: "green" as const,
    },
  ]

  return (
    <div className="flex-1 border-r border-border relative">
      <AnimatedBackground variant="particles" className="absolute inset-0 opacity-20" />
      
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border p-4 z-10">
        <h2 className="text-xl font-bold mb-4">Explore</h2>
        <SearchBar
          placeholder="Search Twitter"
          filters={["Top", "Latest", "People", "Photos", "Videos"]}
          onSearch={(query, filters) => {
            setSearchQuery(query)
            setActiveFilters(filters)
          }}
        />
      </div>

      <div className="relative z-10">
        <Tabs defaultValue="trending" className="w-full">
          <div className="border-b border-border">
            <TabsList className="w-full h-auto p-0 bg-transparent rounded-none">
              <TabsTrigger 
                value="trending"
                className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Trending
              </TabsTrigger>
              <TabsTrigger 
                value="news"
                className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                News
              </TabsTrigger>
              <TabsTrigger 
                value="sports"
                className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Sports
              </TabsTrigger>
              <TabsTrigger 
                value="entertainment"
                className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
              >
                Entertainment
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="trending" className="mt-0">
            {/* Feature Grid */}
            <div className="p-4">
              <FeatureGrid features={features} columns={3} />
            </div>

            {/* Magic Bento */}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-4">Discover</h3>
              <MagicBento 
                enableStars={true}
                enableSpotlight={true}
                enableBorderGlow={true}
                clickEffect={true}
                enableMagnetism={true}
              />
            </div>

            {/* Trending Topics */}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-4">Trending for you</h3>
              <div className="space-y-2">
                {trendingData.map((trend, index) => (
                  <Card key={index} className="hover:bg-muted/50 transition-colors cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {index + 1}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{trend.category}</span>
                          </div>
                          <h4 className="font-semibold text-lg">{trend.topic}</h4>
                          <p className="text-sm text-muted-foreground">
                            <AnimatedCounter value={trend.tweets} /> tweets
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant={trend.growth > 10 ? "default" : "secondary"}
                            className="text-xs"
                          >
                            +{trend.growth}%
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="news" className="mt-0">
            <div className="p-4 space-y-4">
              <h3 className="text-lg font-semibold">Latest News</h3>
              {newsItems.map((news, index) => (
                <Card key={index} className="hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {news.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{news.time}</span>
                        </div>
                        <h4 className="font-semibold mb-2">{news.title}</h4>
                        <p className="text-sm text-muted-foreground">{news.description}</p>
                      </div>
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sports" className="mt-0">
            <Card className="m-4">
              <CardContent className="p-8 text-center">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Sports News</h3>
                <p className="text-muted-foreground">Latest sports updates will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="entertainment" className="mt-0">
            <Card className="m-4">
              <CardContent className="p-8 text-center">
                <Play className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Entertainment</h3>
                <p className="text-muted-foreground">Entertainment news will appear here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}