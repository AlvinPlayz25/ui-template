"use client"

import { Button } from "@/components/ui/button"
import { Palette, PaletteIcon } from "lucide-react"
import { useGradients } from "@/components/gradient-provider"

export function GradientToggle() {
  const { gradientsEnabled, toggleGradients } = useGradients()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleGradients}
      className="relative"
      title={gradientsEnabled ? "Disable gradients" : "Enable gradients"}
    >
      {gradientsEnabled ? (
        <Palette className="h-4 w-4 text-purple-500" />
      ) : (
        <PaletteIcon className="h-4 w-4 text-muted-foreground" />
      )}
      <span className="sr-only">{gradientsEnabled ? "Disable gradients" : "Enable gradients"}</span>
    </Button>
  )
}
