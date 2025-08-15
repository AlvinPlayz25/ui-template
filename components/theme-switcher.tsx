"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTheme, themes, type Theme } from "./theme-provider"
import { Palette } from "lucide-react"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Theme Selection
        </CardTitle>
        <CardDescription>Choose your preferred color theme</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(themes).map(([key, config]) => (
            <div
              key={key}
              className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all hover:shadow-md ${
                theme === key ? "border-primary ring-2 ring-primary/20" : "border-border hover:border-primary/50"
              }`}
              onClick={() => setTheme(key as Theme)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{config.name}</h3>
                {theme === key && <Badge variant="default">Active</Badge>}
              </div>
              <p className="text-sm text-muted-foreground mb-3">{config.description}</p>
              <div className={`h-8 rounded ${config.preview} border`} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
