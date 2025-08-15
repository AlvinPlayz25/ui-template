import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle, Info, X, Zap, Shield, Palette, BarChart3, Users, Rocket } from "lucide-react"
import { AnimatedCounter } from "@/components/custom/animated-counter"
import { FeatureGrid } from "@/components/custom/feature-grid"
import { StatsCard } from "@/components/custom/stats-card"
import { InteractiveDemo } from "@/components/custom/interactive-demo"
import { PricingTable } from "@/components/custom/pricing-table"
import { CardSkeleton, AvatarSkeleton, TableSkeleton } from "@/components/custom/loading-skeleton"
import { TestimonialCard } from "@/components/custom/testimonial-card"
import { Timeline } from "@/components/custom/timeline"
import { Breadcrumb } from "@/components/custom/breadcrumb"
import { FileUpload } from "@/components/custom/file-upload"
import { SearchBar } from "@/components/custom/search-bar"
import { ToastContainer } from "@/components/custom/notification-toast"
import { NeoBrutalism } from "@/components/custom/neo-brutalism"

export function ComponentShowcase() {
  const features = [
    {
      title: "Lightning Fast",
      description: "Optimized for performance with minimal bundle size and efficient rendering patterns.",
      icon: <Zap className="h-5 w-5" />,
      gradient: "blue" as const,
      badge: "New",
    },
    {
      title: "Secure by Default",
      description: "Built with security best practices and regular vulnerability assessments.",
      icon: <Shield className="h-5 w-5" />,
      gradient: "green" as const,
    },
    {
      title: "Highly Customizable",
      description: "Easy to theme and customize with CSS variables and Tailwind utility classes.",
      icon: <Palette className="h-5 w-5" />,
      gradient: "purple" as const,
    },
    {
      title: "Analytics Ready",
      description: "Built-in analytics hooks and tracking capabilities for better insights.",
      icon: <BarChart3 className="h-5 w-5" />,
      gradient: "orange" as const,
    },
    {
      title: "Team Collaboration",
      description: "Designed for teams with shared component libraries and design systems.",
      icon: <Users className="h-5 w-5" />,
      gradient: "pink" as const,
    },
    {
      title: "Production Ready",
      description: "Battle-tested components used by thousands of developers worldwide.",
      icon: <Rocket className="h-5 w-5" />,
      gradient: "blue" as const,
    },
  ]

  const timelineItems = [
    {
      id: "1",
      title: "Project Started",
      description: "Initial project setup and planning phase completed.",
      date: "Jan 15, 2024",
      status: "completed" as const,
      badge: "Milestone",
    },
    {
      id: "2",
      title: "Development Phase",
      description: "Core features implementation in progress.",
      date: "Feb 1, 2024",
      status: "in-progress" as const,
    },
    {
      id: "3",
      title: "Testing & QA",
      description: "Comprehensive testing and quality assurance.",
      date: "Mar 1, 2024",
      status: "upcoming" as const,
    },
  ]

  const breadcrumbItems = [
    { label: "Components", href: "/components" },
    { label: "UI Elements", href: "/components/ui" },
    { label: "Breadcrumb" },
  ]

  return (
    <section className="container py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Component Showcase</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our comprehensive collection of UI components. Each component is fully customizable and accessible.
        </p>
      </div>

      <div className="space-y-16">
        {/* Custom Components Section */}
        <div id="custom">
          <h3 className="text-2xl font-semibold mb-6">Custom Components</h3>

          {/* Neo-Brutalism component showcase */}
          <div className="mb-8">
            <h4 className="text-xl font-semibold mb-4">Neo-Brutalism Design</h4>
            <NeoBrutalism />
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Users"
              value={12543}
              change={12.5}
              icon={<Users className="h-4 w-4" />}
              gradient="blue"
            />
            <StatsCard
              title="Revenue"
              value={45678}
              prefix="$"
              change={8.2}
              icon={<BarChart3 className="h-4 w-4" />}
              gradient="green"
            />
            <StatsCard
              title="Projects"
              value={234}
              change={-2.1}
              icon={<Rocket className="h-4 w-4" />}
              gradient="purple"
            />
            <StatsCard
              title="Conversion"
              value={3.2}
              suffix="%"
              change={15.3}
              icon={<Zap className="h-4 w-4" />}
              gradient="orange"
            />
          </div>

          {/* Feature Grid */}
          <div className="mb-8">
            <h4 className="text-xl font-semibold mb-4">Feature Grid</h4>
            <FeatureGrid features={features} columns={3} />
          </div>

          {/* Interactive Demo */}
          <InteractiveDemo
            title="Animated Counter"
            description="A smooth counting animation component with customizable duration and formatting"
            component={
              <div className="text-center space-y-4">
                <div className="text-4xl font-bold">
                  <AnimatedCounter value={1234} prefix="$" suffix="K" />
                </div>
                <p className="text-muted-foreground">Revenue this month</p>
              </div>
            }
            code={`<AnimatedCounter 
  value={1234} 
  prefix="$" 
  suffix="K" 
  duration={2000} 
/>`}
            className="mb-8"
          />

          {/* Loading Skeletons */}
          <div className="mb-8">
            <h4 className="text-xl font-semibold mb-4">Loading Skeletons</h4>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h5 className="text-sm font-medium mb-2">Card Skeleton</h5>
                <CardSkeleton />
              </div>
              <div>
                <h5 className="text-sm font-medium mb-2">Avatar Skeleton</h5>
                <div className="p-6 border rounded-lg">
                  <AvatarSkeleton />
                </div>
              </div>
              <div>
                <h5 className="text-sm font-medium mb-2">Table Skeleton</h5>
                <div className="p-6 border rounded-lg">
                  <TableSkeleton />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Components Section */}
        <div id="advanced-components">
          <h3 className="text-2xl font-semibold mb-6">Advanced Components</h3>

          {/* Testimonial Cards */}
          <div className="mb-8">
            <h4 className="text-xl font-semibold mb-4">Testimonial Cards</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <TestimonialCard
                name="Sarah Johnson"
                role="Product Manager"
                company="TechCorp"
                avatar="/placeholder.svg?height=48&width=48"
                rating={5}
                testimonial="These components have transformed our development workflow. The quality and attention to detail is outstanding."
                verified={true}
              />
              <TestimonialCard
                name="Michael Chen"
                role="Lead Developer"
                company="StartupXYZ"
                rating={4}
                testimonial="Excellent component library with great documentation. Saved us weeks of development time."
              />
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-8">
            <h4 className="text-xl font-semibold mb-4">Timeline</h4>
            <Timeline items={timelineItems} />
          </div>

          {/* Breadcrumb */}
          <div className="mb-8">
            <h4 className="text-xl font-semibold mb-4">Breadcrumb Navigation</h4>
            <Breadcrumb items={breadcrumbItems} />
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <h4 className="text-xl font-semibold mb-4">Advanced Search</h4>
            <SearchBar
              placeholder="Search components..."
              filters={["React", "TypeScript", "Tailwind", "Accessible", "Animated"]}
              onSearch={(query, filters) => console.log("Search:", query, filters)}
            />
          </div>

          {/* File Upload */}
          <div className="mb-8">
            <h4 className="text-xl font-semibold mb-4">File Upload</h4>
            <FileUpload
              accept="image/*,.pdf,.doc,.docx"
              multiple={true}
              maxSize={5}
              onFilesChange={(files) => console.log("Files:", files)}
            />
          </div>

          {/* Toast Notifications */}
          <div className="mb-8">
            <h4 className="text-xl font-semibold mb-4">Toast Notifications</h4>
            <ToastContainer />
          </div>
        </div>

        {/* Pricing Section */}
        <div id="pricing">
          <h3 className="text-2xl font-semibold mb-6">Pricing Components</h3>
          <PricingTable />
        </div>

        {/* Buttons Section */}
        <div id="buttons">
          <h3 className="text-2xl font-semibold mb-6">Buttons</h3>
          <Card>
            <CardHeader>
              <CardTitle>Button Variants</CardTitle>
              <CardDescription>Different button styles for various use cases</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Forms Section */}
        <div id="forms">
          <h3 className="text-2xl font-semibold mb-6">Form Components</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Input Fields</CardTitle>
                <CardDescription>Various input types and configurations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Enter password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Type your message here" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Selection Controls</CardTitle>
                <CardDescription>Checkboxes, radio buttons, and switches</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Switch id="notifications" />
                  <Label htmlFor="notifications">Enable notifications</Label>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms">Accept terms and conditions</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="marketing" />
                    <Label htmlFor="marketing">Subscribe to marketing emails</Label>
                  </div>
                </div>

                <RadioGroup defaultValue="option-one">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-one" id="option-one" />
                    <Label htmlFor="option-one">Option One</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option-two" id="option-two" />
                    <Label htmlFor="option-two">Option Two</Label>
                  </div>
                </RadioGroup>

                <div className="space-y-2">
                  <Label>Select an option</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                      <SelectItem value="option3">Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Layout Section */}
        <div id="layout">
          <h3 className="text-2xl font-semibold mb-6">Layout Components</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Card</CardTitle>
                <CardDescription>A simple card with header and content</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This is a basic card component that can contain any content.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">John Doe</CardTitle>
                    <CardDescription>Software Engineer</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Card with avatar and user information.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Progress Card
                  <Badge>75%</Badge>
                </CardTitle>
                <CardDescription>Track your progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={75} />
                <div className="space-y-2">
                  <Label>Adjust value</Label>
                  <Slider defaultValue={[75]} max={100} step={1} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Feedback Section */}
        <div id="feedback">
          <h3 className="text-2xl font-semibold mb-6">Feedback Components</h3>
          <div className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>This is an informational alert with additional context.</AlertDescription>
            </Alert>

            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Something went wrong. Please try again later.</AlertDescription>
            </Alert>

            <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>Your action was completed successfully!</AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </section>
  )
}
