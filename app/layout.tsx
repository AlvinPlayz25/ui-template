import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeProvider as ColorThemeProvider } from "@/components/theme-provider"
import { GradientProvider } from "@/components/gradient-provider"
import { StyleProvider } from "@/components/style-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "UI Component Library - Next.js Template",
  description:
    "A comprehensive collection of reusable React components built with Next.js, Tailwind CSS, and modern design principles.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ColorThemeProvider>
            <GradientProvider>
              <StyleProvider>{children}</StyleProvider>
            </GradientProvider>
          </ColorThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
