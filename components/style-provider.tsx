"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type StyleVariant = "default" | "modern" | "minimal" | "bold" | "elegant"

interface StyleContextType {
  styleVariant: StyleVariant
  setStyleVariant: (variant: StyleVariant) => void
}

const StyleContext = createContext<StyleContextType | undefined>(undefined)

export function StyleProvider({ children }: { children: ReactNode }) {
  const [styleVariant, setStyleVariant] = useState<StyleVariant>("default")

  // Load style preference from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("style-variant") as StyleVariant
    if (saved && ["default", "modern", "minimal", "bold", "elegant"].includes(saved)) {
      setStyleVariant(saved)
    }
  }, [])

  // Save style preference to localStorage and update document class
  useEffect(() => {
    localStorage.setItem("style-variant", styleVariant)

    // Remove all style variant classes
    const variants = ["default", "modern", "minimal", "bold", "elegant"]
    variants.forEach((variant) => {
      document.documentElement.classList.remove(`style-${variant}`)
    })

    // Add current style variant class
    document.documentElement.classList.add(`style-${styleVariant}`)
  }, [styleVariant])

  return <StyleContext.Provider value={{ styleVariant, setStyleVariant }}>{children}</StyleContext.Provider>
}

export function useStyle() {
  const context = useContext(StyleContext)
  if (context === undefined) {
    throw new Error("useStyle must be used within a StyleProvider")
  }
  return context
}

// Style variant configurations
export const styleVariants = {
  default: {
    name: "Default",
    description: "Classic shadcn/ui styling with balanced design",
    borderRadius: "rounded-lg",
    cardStyle: "border shadow-sm",
    buttonStyle: "rounded-md",
    colors: "default",
  },
  modern: {
    name: "Modern",
    description: "Clean lines with subtle shadows and larger radius",
    borderRadius: "rounded-xl",
    cardStyle: "border-0 shadow-lg bg-card/50 backdrop-blur-sm",
    buttonStyle: "rounded-xl shadow-md",
    colors: "modern",
  },
  minimal: {
    name: "Minimal",
    description: "Ultra-clean design with minimal borders and shadows",
    borderRadius: "rounded-sm",
    cardStyle: "border-0 bg-muted/30",
    buttonStyle: "rounded-sm border-0",
    colors: "minimal",
  },
  bold: {
    name: "Bold",
    description: "Strong borders and high contrast design",
    borderRadius: "rounded-lg",
    cardStyle: "border-2 border-foreground/20 shadow-xl",
    buttonStyle: "rounded-lg border-2 font-semibold",
    colors: "bold",
  },
  elegant: {
    name: "Elegant",
    description: "Sophisticated styling with refined details",
    borderRadius: "rounded-2xl",
    cardStyle: "border shadow-2xl bg-gradient-to-br from-card to-card/80",
    buttonStyle: "rounded-2xl shadow-lg",
    colors: "elegant",
  },
} as const
