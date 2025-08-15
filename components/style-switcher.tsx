"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Palette, Check } from "lucide-react"
import { useStyle, styleVariants, type StyleVariant } from "@/components/style-provider"

export function StyleSwitcher() {
  const { styleVariant, setStyleVariant } = useStyle()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Palette className="h-4 w-4 mr-2" />
          Style
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="p-2">
          <h4 className="font-semibold mb-2">Choose Style Variant</h4>
          <div className="space-y-2">
            {Object.entries(styleVariants).map(([key, variant]) => (
              <DropdownMenuItem
                key={key}
                onClick={() => setStyleVariant(key as StyleVariant)}
                className="flex items-start gap-3 p-3 cursor-pointer"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{variant.name}</span>
                    {styleVariant === key && <Check className="h-4 w-4 text-primary" />}
                  </div>
                  <p className="text-xs text-muted-foreground">{variant.description}</p>
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function StyleShowcase() {
  const { styleVariant } = useStyle()
  const currentStyle = styleVariants[styleVariant]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-2">Style System</h3>
        <p className="text-muted-foreground mb-4">
          Switch between different design styles to customize the look and feel
        </p>
        <Badge variant="outline" className="mb-6">
          Current: {currentStyle.name}
        </Badge>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(styleVariants).map(([key, variant]) => (
          <Card
            key={key}
            className={`transition-all duration-200 ${
              styleVariant === key ? "ring-2 ring-primary" : ""
            } hover:shadow-lg cursor-pointer`}
            onClick={() => {}}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{variant.name}</CardTitle>
                {styleVariant === key && <Check className="h-5 w-5 text-primary" />}
              </div>
              <CardDescription className="text-sm">{variant.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 bg-primary ${variant.borderRadius}`} />
                  <span className="text-xs text-muted-foreground">Border Radius</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="text-xs">
                    Button
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs bg-transparent">
                    Outline
                  </Button>
                </div>
                <div className={`p-3 text-xs ${variant.cardStyle}`}>Sample card content</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
