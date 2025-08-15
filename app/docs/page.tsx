import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { ComponentDocs } from "@/components/component-docs"
import { Navigation } from "@/components/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { ArrowLeft, Book, Code, Palette, Zap } from "lucide-react"
import Link from "next/link"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <Book className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-lg">Documentation</h1>
                <p className="text-xs text-muted-foreground">Component Guide</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Navigation />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-12">
        <div className="max-w-3xl">
          <Badge variant="secondary" className="mb-4">
            Documentation
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight mb-4">Component Documentation</h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            Complete guide to using our component library. Learn how to install, customize, and implement each component
            in your projects.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Code className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-base">Easy to Use</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Copy and paste components with clear examples.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                    <Palette className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle className="text-base">Customizable</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Extensive theming and styling options.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <Zap className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-base">Performance</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Optimized for speed and bundle size.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator />

      {/* Documentation Content */}
      <ComponentDocs />
    </div>
  )
}
