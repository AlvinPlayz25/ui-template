export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      {/* <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">UI</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">Component Library</h1>
              <p className="text-xs text-muted-foreground">Next.js Template</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Navigation />
            <StyleSwitcher />
            <GradientToggle />
            <ThemeToggle />
          </div>
        </div>
      </header> */}

      <main className="container flex items-center justify-center min-h-screen">
        <h1 className="text-6xl md:text-8xl font-bold text-center">UI-TEMPLATE</h1>
      </main>
    </div>
  )
}
