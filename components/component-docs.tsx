"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Copy, Check, ExternalLink } from "lucide-react"
import { GradientCard } from "@/components/custom/gradient-card"
import { AnimatedCounter } from "@/components/custom/animated-counter"
import { StatsCard } from "@/components/custom/stats-card"

interface CodeBlockProps {
  code: string
  language?: string
}

function CodeBlock({ code, language = "tsx" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <Button size="sm" variant="ghost" className="absolute right-2 top-2 z-10" onClick={copyToClipboard}>
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  )
}

interface PropTableProps {
  props: Array<{
    name: string
    type: string
    default?: string
    description: string
    required?: boolean
  }>
}

function PropTable({ props }: PropTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2 font-medium">Prop</th>
            <th className="text-left p-2 font-medium">Type</th>
            <th className="text-left p-2 font-medium">Default</th>
            <th className="text-left p-2 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, index) => (
            <tr key={index} className="border-b">
              <td className="p-2">
                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                  {prop.name}
                  {prop.required && <span className="text-red-500 ml-1">*</span>}
                </code>
              </td>
              <td className="p-2">
                <code className="text-xs bg-muted px-1 py-0.5 rounded">{prop.type}</code>
              </td>
              <td className="p-2">
                {prop.default ? (
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">{prop.default}</code>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </td>
              <td className="p-2 text-muted-foreground">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function ComponentDocs() {
  return (
    <section className="container py-16">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Installation */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Getting Started</h2>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Installation</CardTitle>
              <CardDescription>Add the component library to your Next.js project</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">1. Install dependencies</h4>
                <CodeBlock
                  code="npm install @radix-ui/react-* lucide-react class-variance-authority clsx tailwind-merge"
                  language="bash"
                />
              </div>

              <div>
                <h4 className="font-medium mb-2">2. Configure Tailwind CSS</h4>
                <CodeBlock
                  code={`// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // ... other colors
      },
    },
  },
  plugins: [],
}`}
                />
              </div>

              <div>
                <h4 className="font-medium mb-2">3. Add CSS variables</h4>
                <CodeBlock
                  code={`/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    /* ... other variables */
  }
}`}
                  language="css"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* Gradient Card Documentation */}
        <div>
          <h2 className="text-3xl font-bold mb-6">GradientCard</h2>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>
                A beautiful card component with gradient accents and customizable styling
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="preview">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                  <TabsTrigger value="props">Props</TabsTrigger>
                </TabsList>

                <TabsContent value="preview" className="mt-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <GradientCard
                      title="Pro Plan"
                      description="Perfect for growing businesses"
                      price="$29"
                      gradient="purple"
                      badge="Popular"
                      features={["Unlimited projects", "Priority support", "Advanced features"]}
                    />
                    <GradientCard
                      title="Enterprise"
                      description="For large organizations"
                      price="$99"
                      gradient="green"
                      features={["Custom solutions", "Dedicated support", "SLA guarantee"]}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="code" className="mt-4">
                  <CodeBlock
                    code={`import { GradientCard } from "@/components/custom/gradient-card"

export function Example() {
  return (
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
  )
}`}
                  />
                </TabsContent>

                <TabsContent value="props" className="mt-4">
                  <PropTable
                    props={[
                      { name: "title", type: "string", description: "Card title", required: true },
                      { name: "description", type: "string", description: "Card description", required: true },
                      { name: "price", type: "string", description: "Price to display" },
                      { name: "features", type: "string[]", description: "List of features", default: "[]" },
                      { name: "badge", type: "string", description: "Badge text to display" },
                      {
                        name: "gradient",
                        type: "'blue' | 'purple' | 'green' | 'orange' | 'pink'",
                        description: "Gradient color scheme",
                        default: "'blue'",
                      },
                      { name: "featured", type: "boolean", description: "Whether card is featured", default: "false" },
                      { name: "className", type: "string", description: "Additional CSS classes" },
                    ]}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* Animated Counter Documentation */}
        <div>
          <h2 className="text-3xl font-bold mb-6">AnimatedCounter</h2>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>A smooth counting animation component with customizable formatting</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="preview">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                  <TabsTrigger value="props">Props</TabsTrigger>
                </TabsList>

                <TabsContent value="preview" className="mt-4">
                  <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold mb-2">
                        <AnimatedCounter value={1234} />
                      </div>
                      <p className="text-sm text-muted-foreground">Total Users</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-2">
                        <AnimatedCounter value={5678} prefix="$" />
                      </div>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-2">
                        <AnimatedCounter value={98} suffix="%" />
                      </div>
                      <p className="text-sm text-muted-foreground">Satisfaction</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="code" className="mt-4">
                  <CodeBlock
                    code={`import { AnimatedCounter } from "@/components/custom/animated-counter"

export function Example() {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold">
        <AnimatedCounter 
          value={1234} 
          prefix="$" 
          suffix="K"
          duration={2000}
        />
      </div>
      <p className="text-muted-foreground">Revenue this month</p>
    </div>
  )
}`}
                  />
                </TabsContent>

                <TabsContent value="props" className="mt-4">
                  <PropTable
                    props={[
                      { name: "value", type: "number", description: "Target number to count to", required: true },
                      {
                        name: "duration",
                        type: "number",
                        description: "Animation duration in milliseconds",
                        default: "2000",
                      },
                      { name: "prefix", type: "string", description: "Text to show before the number", default: "''" },
                      { name: "suffix", type: "string", description: "Text to show after the number", default: "''" },
                      { name: "className", type: "string", description: "Additional CSS classes" },
                    ]}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* Stats Card Documentation */}
        <div>
          <h2 className="text-3xl font-bold mb-6">StatsCard</h2>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>Display key metrics with animated counters and trend indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="preview">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                  <TabsTrigger value="props">Props</TabsTrigger>
                </TabsList>

                <TabsContent value="preview" className="mt-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <StatsCard title="Total Revenue" value={45678} prefix="$" change={12.5} gradient="green" />
                    <StatsCard title="Active Users" value={1234} change={-2.1} gradient="blue" />
                  </div>
                </TabsContent>

                <TabsContent value="code" className="mt-4">
                  <CodeBlock
                    code={`import { StatsCard } from "@/components/custom/stats-card"

export function Example() {
  return (
    <StatsCard
      title="Total Revenue"
      value={45678}
      prefix="$"
      change={12.5}
      changeLabel="vs last month"
      gradient="green"
    />
  )
}`}
                  />
                </TabsContent>

                <TabsContent value="props" className="mt-4">
                  <PropTable
                    props={[
                      { name: "title", type: "string", description: "Card title", required: true },
                      { name: "value", type: "number", description: "Numeric value to display", required: true },
                      { name: "prefix", type: "string", description: "Text before the value", default: "''" },
                      { name: "suffix", type: "string", description: "Text after the value", default: "''" },
                      { name: "change", type: "number", description: "Percentage change" },
                      {
                        name: "changeLabel",
                        type: "string",
                        description: "Label for the change",
                        default: "'vs last month'",
                      },
                      { name: "icon", type: "React.ReactNode", description: "Icon to display" },
                      {
                        name: "gradient",
                        type: "'blue' | 'purple' | 'green' | 'orange' | 'pink'",
                        description: "Color scheme",
                        default: "'blue'",
                      },
                      { name: "className", type: "string", description: "Additional CSS classes" },
                    ]}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* Best Practices */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Best Practices</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Accessibility</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5">
                    ✓
                  </Badge>
                  <p className="text-sm">All components include proper ARIA attributes</p>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5">
                    ✓
                  </Badge>
                  <p className="text-sm">Keyboard navigation is fully supported</p>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5">
                    ✓
                  </Badge>
                  <p className="text-sm">Color contrast meets WCAG AA standards</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5">
                    ⚡
                  </Badge>
                  <p className="text-sm">Components are tree-shakeable</p>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5">
                    ⚡
                  </Badge>
                  <p className="text-sm">Minimal runtime overhead</p>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5">
                    ⚡
                  </Badge>
                  <p className="text-sm">Optimized for bundle size</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Customization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5">
                    🎨
                  </Badge>
                  <p className="text-sm">Use CSS variables for theming</p>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5">
                    🎨
                  </Badge>
                  <p className="text-sm">Extend with Tailwind classes</p>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5">
                    🎨
                  </Badge>
                  <p className="text-sm">Override styles with className prop</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Development</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5">
                    🔧
                  </Badge>
                  <p className="text-sm">TypeScript support included</p>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5">
                    🔧
                  </Badge>
                  <p className="text-sm">ESLint and Prettier compatible</p>
                </div>
                <div className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5">
                    🔧
                  </Badge>
                  <p className="text-sm">Works with all React frameworks</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Separator />

        {/* Support */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Support & Resources</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  GitHub
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  View source code, report issues, and contribute to the project.
                </p>
                <Button variant="outline" size="sm">
                  View Repository
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Examples
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Explore real-world examples and implementation patterns.
                </p>
                <Button variant="outline" size="sm">
                  Browse Examples
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Community
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Join our community for support, discussions, and updates.
                </p>
                <Button variant="outline" size="sm">
                  Join Discord
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
