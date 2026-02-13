# Buzz Stack ⚡

A modern, production-ready **Next.js 15** boilerplate with **React 18**, **TypeScript**, and **Tailwind CSS**. Built with best practices, accessibility, and developer experience in mind.

Perfect for bootstrapping your next web application quickly without sacrificing quality.

---

## ✨ Features

- ⚡ **Next.js 15** - Latest App Router with Server Components
- ⚛️ **React 18** - Concurrent features and modern hooks
- 📘 **TypeScript** - Strict mode for type safety
- 🎨 **Tailwind CSS** - Utility-first CSS with custom configuration
- ♿ **Accessible** - WCAG 2.2 AA compliant out of the box
- 🏗️ **Well-Structured** - Organized folder structure with clear separation of concerns
- 📦 **pnpm** - Fast, disk space efficient package manager
- 🔧 **ESLint** - Code quality and consistency
- 🎯 **Production-Ready** - Error boundaries, loading states, and 404 pages included

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.0 or higher
- **pnpm** 9.0.0 or higher (recommended) or npm/yarn

### Installation

1. **Clone or use as template:**
```bash
git clone https://github.com/yourusername/buzz-stack.git my-app
cd my-app
```

2. **Install dependencies:**
```bash
pnpm install
```

3. **Run development server:**
```bash
pnpm dev
```

4. **Open your browser:**
Visit [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

---

## 📁 Project Structure

```
buzz-stack/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # Root layout with metadata
│   ├── page.tsx        # Home page
│   ├── error.tsx       # Error boundary
│   ├── loading.tsx     # Loading UI
│   ├── not-found.tsx   # 404 page
│   └── globals.css     # Global styles
├── components/          # Reusable React components
│   ├── Header.tsx
│   └── GitHubLink.tsx
├── hooks/              # Custom React hooks
│   └── useModal.ts     # Example modal hook
├── lib/                # External API clients and integrations
├── services/           # Business logic and orchestration
├── utils/              # Pure utility functions
├── types/              # TypeScript type definitions
├── constants/          # App-wide constants
├── contexts/           # React Context providers
├── middleware/         # Next.js middleware
├── public/             # Static assets
└── docs/               # Documentation
```

### Directory Purpose

- **`/app`** - Next.js 15 App Router pages, layouts, and special files
- **`/components`** - Reusable UI components with props interfaces
- **`/hooks`** - Custom React hooks for stateful logic
- **`/lib`** - Third-party integrations and API clients
- **`/services`** - Business logic layer with caching and orchestration
- **`/utils`** - Pure functions and helpers
- **`/types`** - Shared TypeScript interfaces and types
- **`/constants`** - Configuration and constant values
- **`/contexts`** - React Context for global state
- **`/middleware`** - Next.js Edge middleware
- **`/public`** - Static files served from root

---

## 🎨 Customization

### Update Branding

Edit the header in `components/Header.tsx`:
```tsx
<Header 
  title="Your App Name"
  subtitle="Your tagline"
  emoji="🚀"
/>
```

Edit metadata in `app/layout.tsx`:
```tsx
export const metadata: Metadata = {
  title: "Your App Name",
  description: "Your app description",
  // ... other metadata
};
```

### Configure GitHub Link

Update `components/GitHubLink.tsx` or pass props:
```tsx
<GitHubLink 
  repoUrl="https://github.com/yourusername/yourrepo"
  label="View on GitHub"
/>
```

### Styling

- **Tailwind Config**: Edit `tailwind.config.ts` for theme customization
- **Global Styles**: Add CSS to `app/globals.css`
- **Gradient Background**: Modify gradient in `app/page.tsx`

---

## 📚 Documentation

### For Developers

- **[AGENTS.md](AGENTS.md)** - Architecture, code style, and best practices (AI-friendly format)
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines
- **[docs/](docs/)** - Comprehensive documentation
  - Architecture patterns
  - Code structure guide
  - Development best practices
  - Next.js and Vercel features

### For AI Coding Assistants

This project follows the [Agentic AI Foundation](https://agents.md) standard:
- **[AGENTS.md](AGENTS.md)** - Main instructions for AI agents
- **[.github/copilot-instructions.md](.github/copilot-instructions.md)** - GitHub Copilot specific guidance
- Directory-specific `AGENTS.md` files for focused context

---

## 🏗️ Architecture

### Layered Architecture

```
UI Layer (Components) 
    ↓
React Integration (Hooks)
    ↓
Business Logic (Services)
    ↓
External APIs (Lib)
```

### Key Patterns

- **Server Components by default** - Use `'use client'` only when needed
- **Type Safety** - Strict TypeScript with explicit types
- **Accessibility First** - Semantic HTML, ARIA attributes, keyboard navigation
- **Performance** - Code splitting, lazy loading, optimized images
- **Separation of Concerns** - Clear boundaries between layers

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.x | React framework with App Router |
| React | 18.x | UI library with concurrent features |
| TypeScript | 5.x | Type-safe JavaScript |
| Tailwind CSS | 3.4.x | Utility-first CSS framework |
| pnpm | 9.x | Fast package manager |
| ESLint | 8.x | Code linting |

---

## 🚦 What's Included

### Next.js Features

- ✅ App Router with layouts
- ✅ Server Components by default
- ✅ Error boundaries (`error.tsx`)
- ✅ Loading states (`loading.tsx`)
- ✅ 404 page (`not-found.tsx`)
- ✅ Metadata API for SEO
- ✅ Viewport configuration

### UI/UX Features

- ✅ Responsive design (mobile-first)
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Focus indicators
- ✅ Skip to main content link
- ✅ Beautiful gradient background
- ✅ Glassmorphism effects

### Developer Experience

- ✅ TypeScript strict mode
- ✅ ESLint configuration
- ✅ Clear project structure
- ✅ Example components and hooks
- ✅ Comprehensive documentation
- ✅ AI-friendly AGENTS.md files

---

## 🔨 Building Your App

### Step 1: Customize the Home Page

Edit `app/page.tsx` to create your landing page or dashboard.

### Step 2: Add Components

Create reusable components in `/components`:
```tsx
// components/Button.tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
}

export default function Button({ label, onClick }: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
    >
      {label}
    </button>
  );
}
```

### Step 3: Add Routes

Create new pages by adding files to `/app`:
```
app/
├── page.tsx           # Home page (/)
├── about/
│   └── page.tsx      # About page (/about)
└── dashboard/
    └── page.tsx      # Dashboard page (/dashboard)
```

### Step 4: Add Business Logic

1. **API Clients** (`/lib`) - External API integrations
2. **Services** (`/services`) - Business logic with caching
3. **Hooks** (`/hooks`) - React state management
4. **Utils** (`/utils`) - Pure helper functions

---

## 🤝 Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from emoji unicode
- Inspired by modern web development best practices

---

## 🆘 Need Help?

- 📖 Read the [documentation](docs/)
- 🐛 [Open an issue](https://github.com/yourusername/buzz-stack/issues)
- 💬 Start a [discussion](https://github.com/yourusername/buzz-stack/discussions)

---

**Happy coding! ⚡** Start building amazing things with Buzz Stack.
