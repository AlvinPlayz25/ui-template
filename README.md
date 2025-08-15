# UI Component Library - Next.js Template

A comprehensive, production-ready component library built with Next.js 15, Tailwind CSS v4, and TypeScript. Features multiple design themes, beautiful gradients, smooth animations, and accessibility-first design principles.

![Component Library Preview](https://via.placeholder.com/1200x600/6366f1/ffffff?text=UI+Component+Library)

## ✨ Features

- **🎨 Multiple Design Themes** - 6 unique themes: Default, Catppuccin, Neo-Brutalism, Neumorphism, Neo-Purplism, and Claymorphism
- **🌈 Advanced Gradient System** - Pre-built gradient presets with toggleable functionality
- **⚡ Smooth Animations** - Custom keyframes, shimmer effects, and animation utilities
- **♿ Accessibility First** - WCAG AA compliant with proper ARIA attributes
- **📱 Fully Responsive** - Mobile-first design approach
- **🌙 Dark Mode Support** - Seamless light/dark theme switching for all themes
- **🔧 TypeScript Ready** - Full type safety and IntelliSense support
- **📦 Tree Shakeable** - Import only what you need
- **🚀 Performance Optimized** - Minimal bundle size and efficient rendering

## 🎨 Design Themes

### Default Theme
Clean, modern shadcn/ui design with subtle shadows and professional aesthetics.

### Catppuccin Theme
Warm, soothing pastel colors inspired by the popular Catppuccin color palette. Features both light (Latte) and dark (Mocha) variants.

### Neo-Brutalism Theme
Bold, high-contrast design with thick borders, harsh shadows, and vibrant colors (yellow, red, blue, green, purple). Raw functionality with intentionally "undesigned" aesthetics.

### Neumorphism Theme
Soft, extruded UI elements that appear to push through the surface using subtle shadows to create a physical, tactile feel. Monochromatic palette with minimal depth.

### Neo-Purplism Theme
Vibrant purple and cyan theme with bold Archivo Black typography, sharp edges, and harsh shadows. Similar to Neo-Brutalism but with a purple color scheme.

### Claymorphism Theme
Soft, puffy clay-like elements with large border radius (20px), gentle inner and outer shadows, and beautiful pastel colors (lavender, mint green, baby blue, soft peach). Playful and squeezable appearance.

## 🚀 Quick Start

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/ui-component-library.git
   cd ui-component-library
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the component showcase.

## 🎛️ Theme System

### Theme Switching
The library includes a comprehensive theme switching system that allows users to choose between different design aesthetics:

\`\`\`tsx
import { ThemeProvider, useTheme } from "@/components/theme-provider"

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  )
}

function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  
  return (
    <select value={theme} onChange={(e) => setTheme(e.target.value)}>
      <option value="default">Default</option>
      <option value="catppuccin">Catppuccin</option>
      <option value="neo-brutalism">Neo-Brutalism</option>
      <option value="neumorphism">Neumorphism</option>
      <option value="neo-purplism">Neo-Purplism</option>
      <option value="claymorphism">Claymorphism</option>
    </select>
  )
}
\`\`\`

### Dark/Light Mode
Each theme supports both light and dark modes:

\`\`\`tsx
import { ThemeToggle } from "@/components/theme-toggle"

<ThemeToggle /> // Toggles between light and dark mode
\`\`\`

## 📚 Component Documentation

### Custom Components

#### GradientCard
A beautiful card component with gradient accents and customizable styling.

\`\`\`tsx
import { GradientCard } from "@/components/custom/gradient-card"

<GradientCard
  title="Pro Plan"
  description="Perfect for growing businesses"
  price="$29"
  gradient="purple"
  badge="Popular"
  features={[
    "Unlimited projects",
    "Priority support",
    "Advanced features"
  ]}
/>
\`\`\`

#### AnimatedCounter
A smooth counting animation component with customizable formatting.

\`\`\`tsx
import { AnimatedCounter } from "@/components/custom/animated-counter"

<AnimatedCounter
  value={1234}
  prefix="$"
  suffix="K"
  duration={2000}
/>
\`\`\`

#### Timeline
A vertical timeline component for displaying chronological events.

\`\`\`tsx
import { Timeline } from "@/components/custom/timeline"

const events = [
  {
    title: "Project Started",
    description: "Initial planning and setup",
    date: "2024-01-01",
    status: "completed"
  }
]

<Timeline events={events} />
\`\`\`

#### TestimonialCard
Display customer testimonials with avatars and ratings.

\`\`\`tsx
import { TestimonialCard } from "@/components/custom/testimonial-card"

<TestimonialCard
  name="John Doe"
  role="CEO, Company"
  content="This library is amazing!"
  avatar="/avatar.jpg"
  rating={5}
/>
\`\`\`

#### FileUpload
Drag and drop file upload component with progress tracking.

\`\`\`tsx
import { FileUpload } from "@/components/custom/file-upload"

<FileUpload
  onUpload={(files) => console.log(files)}
  accept="image/*"
  maxSize={5 * 1024 * 1024} // 5MB
/>
\`\`\`

#### SearchBar
Advanced search component with filtering and suggestions.

\`\`\`tsx
import { SearchBar } from "@/components/custom/search-bar"

<SearchBar
  placeholder="Search components..."
  onSearch={(query) => console.log(query)}
  suggestions={["Button", "Card", "Input"]}
/>
\`\`\`

## 🌈 Gradient System

### Gradient Toggle
Users can toggle gradients on/off across the entire application:

\`\`\`tsx
import { GradientProvider, GradientToggle } from "@/components/gradient-provider"

<GradientProvider>
  <GradientToggle /> // Toggle gradients on/off
  <YourApp />
</GradientProvider>
\`\`\`

### Background Gradients
Use pre-defined gradient classes:

\`\`\`tsx
<div className="gradient-blue">Blue gradient background</div>
<div className="gradient-purple">Purple gradient background</div>
<div className="gradient-green">Green gradient background</div>
\`\`\`

### Programmatic Usage
\`\`\`tsx
import { getGradient, getGradientText } from "@/lib/gradients"

const bgClass = getGradient("blue")
const textClass = getGradientText("purple")
\`\`\`

## ⚡ Animation System

### Built-in Animations
\`\`\`tsx
<div className="animate-fade-in">Fade in animation</div>
<div className="animate-fade-in-up">Fade in from bottom</div>
<div className="animate-slide-in-left">Slide in from left</div>
<div className="animate-scale-in">Scale in animation</div>
<div className="animate-shimmer">Shimmer effect</div>
\`\`\`

### Theme-Specific Animations
Each theme includes unique animation styles that match its aesthetic:

- **Default**: Subtle, professional animations
- **Catppuccin**: Smooth, warm transitions
- **Neo-Brutalism**: Sharp, immediate transitions
- **Neumorphism**: Soft, tactile animations
- **Neo-Purplism**: Bold, vibrant effects
- **Claymorphism**: Bouncy, playful animations

## 🏗️ Project Structure

\`\`\`
├── app/
│   ├── globals.css          # Global styles and animations
│   ├── layout.tsx           # Root layout with providers
│   └── page.tsx             # Main template page
├── components/
│   ├── ui/                  # Basic UI components (shadcn/ui)
│   ├── custom/              # Custom components
│   │   ├── gradient-card.tsx
│   │   ├── animated-counter.tsx
│   │   ├── timeline.tsx
│   │   ├── testimonial-card.tsx
│   │   ├── file-upload.tsx
│   │   ├── search-bar.tsx
│   │   └── notification-toast.tsx
│   ├── theme-provider.tsx   # Theme switching system
│   ├── gradient-provider.tsx # Gradient toggle system
│   ├── style-provider.tsx   # Style variant system
│   ├── theme-switcher.tsx   # Theme selection UI
│   └── navigation.tsx       # Navigation component
├── themes/                  # Theme CSS files
│   ├── catppuccin.css
│   ├── neo-brutalism.css
│   ├── neumorphism.css
│   ├── neo-purplism.css
│   └── claymorphism.css
└── lib/
    ├── utils.ts             # Utility functions
    └── gradients.ts         # Gradient utilities
\`\`\`

## 🎯 Usage Examples

### Basic Setup
\`\`\`tsx
import { ThemeProvider } from "@/components/theme-provider"
import { GradientProvider } from "@/components/gradient-provider"
import { StyleProvider } from "@/components/style-provider"

function App() {
  return (
    <ThemeProvider>
      <GradientProvider>
        <StyleProvider>
          <YourApp />
        </StyleProvider>
      </GradientProvider>
    </ThemeProvider>
  )
}
\`\`\`

### Theme-Aware Component
\`\`\`tsx
import { useTheme } from "@/components/theme-provider"

function MyComponent() {
  const { theme } = useTheme()
  
  return (
    <div className={`component ${theme === 'neo-brutalism' ? 'brutal-style' : 'default-style'}`}>
      Content adapts to current theme
    </div>
  )
}
\`\`\`

## 🧪 Best Practices

### Theme Development
- Each theme should support both light and dark modes
- Use CSS custom properties for consistent theming
- Test accessibility across all themes
- Maintain visual hierarchy in each design system

### Performance
- Themes are loaded dynamically to reduce initial bundle size
- Components are tree-shakeable
- Animations use CSS transforms for optimal performance
- Gradient system is optimized for minimal runtime overhead

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Adding New Themes
1. Create a new CSS file in the `themes/` directory
2. Define CSS custom properties for your theme
3. Add the theme to the `ThemeProvider` configuration
4. Test with both light and dark modes
5. Update documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the foundational component system
- [Catppuccin](https://catppuccin.com/) for the beautiful color palette inspiration
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Next.js](https://nextjs.org/) for the React framework

---

Made with ❤️ for the developer community
