export const gradientPresets = {
  blue: "bg-gradient-to-br from-blue-500 to-cyan-500",
  purple: "bg-gradient-to-br from-purple-500 to-pink-500",
  green: "bg-gradient-to-br from-green-500 to-emerald-500",
  orange: "bg-gradient-to-br from-orange-500 to-red-500",
  pink: "bg-gradient-to-br from-pink-500 to-rose-500",
  sunset: "bg-gradient-to-br from-orange-400 via-red-500 to-pink-500",
  ocean: "bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-500",
  forest: "bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600",
  cosmic: "bg-gradient-to-br from-purple-400 via-pink-500 to-red-500",
  aurora: "bg-gradient-to-br from-green-300 via-blue-500 to-purple-600",
} as const

export const gradientTextPresets = {
  blue: "bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent",
  purple: "bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent",
  green: "bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent",
  orange: "bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent",
  pink: "bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent",
  sunset: "bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent",
  ocean: "bg-gradient-to-r from-blue-400 via-cyan-500 to-teal-500 bg-clip-text text-transparent",
  forest: "bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 bg-clip-text text-transparent",
  cosmic: "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent",
  aurora: "bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent",
} as const

export const animationPresets = {
  fadeIn: "animate-fade-in",
  fadeInUp: "animate-fade-in-up",
  fadeInDown: "animate-fade-in-down",
  slideInLeft: "animate-slide-in-left",
  slideInRight: "animate-slide-in-right",
  scaleIn: "animate-scale-in",
  float: "animate-float",
  shimmer: "animate-shimmer",
  pulseGlow: "animate-pulse-glow",
} as const

export type GradientPreset = keyof typeof gradientPresets
export type GradientTextPreset = keyof typeof gradientTextPresets
export type AnimationPreset = keyof typeof animationPresets

export function getGradient(preset: GradientPreset): string {
  return gradientPresets[preset]
}

export function getGradientText(preset: GradientTextPreset): string {
  return gradientTextPresets[preset]
}

export function getAnimation(preset: AnimationPreset): string {
  return animationPresets[preset]
}

// Utility function to create custom gradients
export function createGradient(
  direction: "to-r" | "to-l" | "to-t" | "to-b" | "to-br" | "to-bl" | "to-tr" | "to-tl",
  colors: string[],
): string {
  return `bg-gradient-${direction} ${colors.join(" ")}`
}

// Animation delay utilities
export const animationDelays = {
  none: "delay-0",
  short: "delay-75",
  medium: "delay-150",
  long: "delay-300",
  extraLong: "delay-500",
} as const

export type AnimationDelay = keyof typeof animationDelays

export function getAnimationDelay(delay: AnimationDelay): string {
  return animationDelays[delay]
}
