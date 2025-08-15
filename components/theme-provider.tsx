"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useTheme as useNextTheme } from "next-themes"

export type Theme = "default" | "catppuccin" | "neo-brutalism" | "neumorphism" | "neo-purplism" | "claymorphism"

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("default")
  const { theme: darkMode } = useNextTheme() // Get dark/light mode from next-themes

  // Load theme preference from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("color-theme") as Theme
    if (
      saved &&
      ["default", "catppuccin", "neo-brutalism", "neumorphism", "neo-purplism", "claymorphism"].includes(saved)
    ) {
      setTheme(saved)
    }
  }, [])

  // Save theme preference to localStorage and update document class
  useEffect(() => {
    localStorage.setItem("color-theme", theme)

    // Remove all theme classes
    const themes = ["default", "catppuccin", "neo-brutalism", "neumorphism", "neo-purplism", "claymorphism"]
    themes.forEach((t) => {
      document.documentElement.classList.remove(`theme-${t}`)
    })

    // Add current theme class
    if (theme !== "default") {
      document.documentElement.classList.add(`theme-${theme}`)
    }

    // Import theme CSS files
    if (theme === "catppuccin") {
      import("../themes/catppuccin.css")
    } else if (theme === "neo-brutalism") {
      import("../themes/neo-brutalism.css")
    } else if (theme === "neumorphism") {
      import("../themes/neumorphism.css")
    } else if (theme === "neo-purplism") {
      import("../themes/neo-purplism.css")
    } else if (theme === "claymorphism") {
      import("../themes/claymorphism.css")
    }
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

// Theme configurations
export const themes = {
  default: {
    name: "Default",
    description: "Standard shadcn/ui theme with neutral colors",
    preview: "bg-background text-foreground border border-border",
  },
  catppuccin: {
    name: "Catppuccin",
    description: "Soothing pastel theme with warm colors",
    preview: "bg-[#eff1f5] text-[#4c4f69] dark:bg-[#181825] dark:text-[#cdd6f4]",
  },
  "neo-brutalism": {
    name: "Neo-Brutalism",
    description: "Bold colors, high contrast, thick borders, raw functionality",
    preview: "bg-[#ffeb3b] text-black border-4 border-black shadow-[4px_4px_0px_0px_#000]",
  },
  neumorphism: {
    name: "Neumorphism",
    description: "Soft, extruded UI elements with subtle shadows",
    preview:
      "bg-[#e6e6e6] text-[#3c3c3c] shadow-[inset_-4px_-4px_8px_rgba(255,255,255,0.8),inset_4px_4px_8px_rgba(0,0,0,0.1)]",
  },
  "neo-purplism": {
    name: "Neo-Purplism",
    description: "Vibrant purple and cyan colors with bold typography and harsh shadows",
    preview: "bg-[#f0f0f0] text-black border-4 border-[#ff00ff] shadow-[4px_4px_0px_0px_#ff00ff]",
  },
  claymorphism: {
    name: "Claymorphism",
    description: "Soft, puffy clay-like elements with gentle shadows and pastel colors",
    preview:
      "bg-[#f8fafc] text-[#475569] shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)] rounded-2xl",
  },
} as const
