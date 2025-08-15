"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface GradientContextType {
  gradientsEnabled: boolean
  toggleGradients: () => void
}

const GradientContext = createContext<GradientContextType | undefined>(undefined)

export function GradientProvider({ children }: { children: ReactNode }) {
  const [gradientsEnabled, setGradientsEnabled] = useState(true)

  // Load gradient preference from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("gradients-enabled")
    if (saved !== null) {
      setGradientsEnabled(JSON.parse(saved))
    }
  }, [])

  // Save gradient preference to localStorage
  useEffect(() => {
    localStorage.setItem("gradients-enabled", JSON.stringify(gradientsEnabled))

    // Add/remove gradient class from document root
    if (gradientsEnabled) {
      document.documentElement.classList.add("gradients-enabled")
      document.documentElement.classList.remove("gradients-disabled")
    } else {
      document.documentElement.classList.add("gradients-disabled")
      document.documentElement.classList.remove("gradients-enabled")
    }
  }, [gradientsEnabled])

  const toggleGradients = () => {
    setGradientsEnabled(!gradientsEnabled)
  }

  return <GradientContext.Provider value={{ gradientsEnabled, toggleGradients }}>{children}</GradientContext.Provider>
}

export function useGradients() {
  const context = useContext(GradientContext)
  if (context === undefined) {
    throw new Error("useGradients must be used within a GradientProvider")
  }
  return context
}
