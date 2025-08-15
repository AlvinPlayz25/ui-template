# Contributing to UI Component Library

Thank you for your interest in contributing to our UI Component Library! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- Git

### Development Setup

1. **Fork and clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/ui-component-library.git
   cd ui-component-library
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/your-username/ui-component-library/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, Node.js version)

### Suggesting Features

1. Check existing [Issues](https://github.com/your-username/ui-component-library/issues) and [Discussions](https://github.com/your-username/ui-component-library/discussions)
2. Create a new issue with:
   - Clear feature description
   - Use cases and benefits
   - Possible implementation approach
   - Examples or mockups if applicable

### Code Contributions

1. **Create a feature branch**
   \`\`\`bash
   git checkout -b feature/your-feature-name
   \`\`\`

2. **Make your changes**
   - Follow our coding standards
   - Add tests for new functionality
   - Update documentation as needed

3. **Test your changes**
   \`\`\`bash
   npm run test
   npm run lint
   npm run type-check
   \`\`\`

4. **Commit your changes**
   \`\`\`bash
   git commit -m "feat: add amazing new component"
   \`\`\`

5. **Push and create a Pull Request**
   \`\`\`bash
   git push origin feature/your-feature-name
   \`\`\`

## 🎯 Coding Standards

### TypeScript

- Use TypeScript for all new components
- Define proper interfaces for component props
- Use generic types where appropriate
- Avoid `any` type - use `unknown` if necessary

\`\`\`tsx
interface ButtonProps {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
}

export function Button({ variant = 'default', size = 'md', children, ...props }: ButtonProps) {
  // Component implementation
}
\`\`\`

### Component Structure

\`\`\`tsx
// 1. Imports
import React from 'react'
import { cn } from '@/lib/utils'

// 2. Types/Interfaces
interface ComponentProps {
  // Props definition
}

// 3. Component
export function Component({ prop1, prop2, ...props }: ComponentProps) {
  // Component logic
  return (
    // JSX
  )
}

// 4. Default export (if needed)
export default Component
\`\`\`

### Styling Guidelines

- Use Tailwind CSS classes
- Follow mobile-first responsive design
- Use CSS variables for theming
- Implement proper dark mode support

\`\`\`tsx
<div className={cn(
  "base-styles",
  "responsive-styles md:different-styles",
  "dark:dark-mode-styles",
  className
)}>
\`\`\`

### Accessibility Requirements

- Include proper ARIA attributes
- Ensure keyboard navigation works
- Maintain color contrast ratios (WCAG AA)
- Use semantic HTML elements
- Add screen reader support

\`\`\`tsx
<button
  aria-label="Close dialog"
  aria-expanded={isOpen}
  role="button"
  tabIndex={0}
  onKeyDown={handleKeyDown}
>
\`\`\`

## 🧪 Testing

### Component Testing

- Write unit tests for all components
- Test accessibility features
- Test responsive behavior
- Test dark/light mode switching

\`\`\`tsx
import { render, screen } from '@testing-library/react'
import { Button } from './button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
\`\`\`

### Manual Testing Checklist

- [ ] Component renders correctly
- [ ] All props work as expected
- [ ] Responsive design works on all screen sizes
- [ ] Dark mode styling is correct
- [ ] Keyboard navigation works
- [ ] Screen reader compatibility
- [ ] Performance is acceptable

## 📝 Documentation

### Component Documentation

Each component should include:

1. **JSDoc comments**
   \`\`\`tsx
   /**
    * A customizable button component with multiple variants and sizes.
    * 
    * @param variant - The visual style variant
    * @param size - The size of the button
    * @param children - The button content
    */
   \`\`\`

2. **README section** with usage examples

3. **Props table** in documentation

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` new features
- `fix:` bug fixes
- `docs:` documentation changes
- `style:` formatting changes
- `refactor:` code refactoring
- `test:` adding tests
- `chore:` maintenance tasks

Examples:
\`\`\`
feat: add gradient card component
fix: resolve button hover state issue
docs: update installation instructions
\`\`\`

## 🔍 Code Review Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] Tests pass locally
- [ ] Documentation is updated
- [ ] No console errors or warnings
- [ ] Accessibility requirements met

### Review Criteria

Reviewers will check:

- Code quality and maintainability
- Performance implications
- Accessibility compliance
- Design consistency
- Test coverage
- Documentation completeness

## 🏷️ Release Process

1. **Version Bumping**
   - Patch: Bug fixes
   - Minor: New features (backward compatible)
   - Major: Breaking changes

2. **Changelog**
   - Update CHANGELOG.md
   - Document all changes
   - Include migration guides for breaking changes

3. **Release Notes**
   - Highlight new features
   - List bug fixes
   - Mention any breaking changes

## 💡 Component Guidelines

### Creating New Components

1. **Plan the API**
   - Define clear, intuitive props
   - Consider composition over configuration
   - Plan for extensibility

2. **Design Considerations**
   - Follow existing design patterns
   - Ensure consistency with other components
   - Consider all use cases

3. **Implementation**
   - Use existing utilities and patterns
   - Implement proper error handling
   - Add loading and error states

4. **Testing**
   - Write comprehensive tests
   - Test edge cases
   - Verify accessibility

### Component Checklist

- [ ] TypeScript interfaces defined
- [ ] Proper prop validation
- [ ] Accessibility attributes
- [ ] Responsive design
- [ ] Dark mode support
- [ ] Error handling
- [ ] Loading states
- [ ] Documentation
- [ ] Tests written
- [ ] Examples provided

## 🤔 Questions?

- Check existing [Issues](https://github.com/your-username/ui-component-library/issues)
- Join our [Discord community](https://discord.gg/yourserver)
- Start a [Discussion](https://github.com/your-username/ui-component-library/discussions)

Thank you for contributing to make this component library better! 🎉
