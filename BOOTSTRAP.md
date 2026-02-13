# 🚀 Bootstrapping Your App with Buzz Stack

This guide will help you quickly bootstrap a new application using Buzz Stack.

---

## Quick Start (5 minutes)

### 1. Clone or Fork

**Option A: Use as Template (Recommended)**
```bash
# On GitHub, click "Use this template" button
# Or clone and remove git history:
git clone https://github.com/yourusername/buzz-stack.git my-awesome-app
cd my-awesome-app
rm -rf .git
git init
git add .
git commit -m "Initial commit from Buzz Stack"
```

**Option B: Fork**
```bash
# Fork on GitHub, then:
git clone https://github.com/yourusername/buzz-stack.git
cd buzz-stack
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Start Development
```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) - you should see the Buzz Stack welcome page!

---

## Customization Checklist

### ✅ Step 1: Update Project Info

**Update `package.json`:**
```json
{
  "name": "your-app-name",
  "version": "0.1.0",
  "description": "Your app description",
  ...
}
```

**Update `app/layout.tsx` metadata:**
```tsx
export const metadata: Metadata = {
  title: "Your App Name",
  description: "Your app description",
  keywords: ["your", "keywords"],
  authors: [{ name: "Your Name" }],
  // ... update all fields
};
```

### ✅ Step 2: Customize Branding

**Update header in `components/Header.tsx`:**
- Change default props (title, subtitle, emoji)
- Or customize the entire component

**Update GitHub link:**
- Edit `components/GitHubLink.tsx` default props
- Set your repository URL

**Update theme colors:**
- Edit `tailwind.config.ts` for theme
- Edit gradient in `app/page.tsx`
- Update themeColor in `app/layout.tsx`

### ✅ Step 3: Replace Welcome Page

**Edit `app/page.tsx`:**
- Remove or customize the welcome content
- Add your app's landing page or dashboard
- Keep the structure you like, remove what you don't need

### ✅ Step 4: Configure Environment

**Create `.env.local`:**
```bash
# API URLs
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Feature flags
NEXT_PUBLIC_FEATURE_X=true

# Third-party services
NEXT_PUBLIC_ANALYTICS_ID=your-id-here
```

**Update `constants/index.ts`:**
```tsx
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
export const FEATURE_X_ENABLED = process.env.NEXT_PUBLIC_FEATURE_X === 'true';
```

### ✅ Step 5: Update Documentation

- Update `README.md` with your project details
- Update `CONTRIBUTING.md` if you have specific guidelines
- Keep or remove `AGENTS.md` depending on if you work with AI coding assistants
- Clean up or remove example documentation in `/docs`

---

## Adding Features

### Add a New Page

Create a new file in `/app`:

```tsx
// app/about/page.tsx
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white">About Us</h1>
        {/* Your content */}
      </div>
    </div>
  );
}
```

### Add API Routes

Create API routes in `/app/api`:

```tsx
// app/api/hello/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello World' });
}
```

### Add a Component

Create in `/components`:

```tsx
// components/Card.tsx
interface CardProps {
  title: string;
  description: string;
}

export default function Card({ title, description }: CardProps) {
  return (
    <div className="bg-white/10 rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}
```

### Add a Custom Hook

Create in `/hooks`:

```tsx
// hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(error);
    }
  }, [key]);

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}
```

Don't forget to export from `hooks/index.ts`:
```tsx
export { useLocalStorage } from './useLocalStorage';
```

### Add an API Service

Create in `/lib` for external APIs:

```tsx
// lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function fetchUser(id: string) {
  const response = await fetch(`${API_BASE}/users/${id}`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
}
```

Add business logic in `/services`:

```tsx
// services/userService.ts
import { fetchUser } from '@/lib/api';

// Add caching, validation, error handling
export const userService = {
  async getUser(id: string) {
    // Add your business logic here
    return fetchUser(id);
  }
};
```

### Add Types

Create in `/types`:

```tsx
// types/index.d.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}
```

---

## Styling Guide

### Tailwind Utilities

Buzz Stack uses Tailwind CSS. Common patterns:

**Layout:**
```tsx
<div className="container mx-auto px-4 py-8">
  <div className="max-w-4xl mx-auto">
    {/* Content */}
  </div>
</div>
```

**Buttons:**
```tsx
<button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors">
  Click Me
</button>
```

**Cards:**
```tsx
<div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
  {/* Card content */}
</div>
```

**Responsive:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Items */}
</div>
```

### Custom Styles

Add to `app/globals.css` for custom CSS:
```css
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors;
  }
}
```

---

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy!

### Other Platforms

**Docker:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm build
CMD ["pnpm", "start"]
```

**Build Manually:**
```bash
pnpm build
# Upload .next, public, package.json to your server
pnpm start
```

---

## Best Practices

### ✅ Do's

- **Keep Server Components** - Only add `'use client'` when needed
- **Use TypeScript strictly** - No `any` types
- **Follow folder structure** - Keep concerns separated
- **Write accessible HTML** - Use semantic tags, ARIA labels
- **Add loading states** - Use `loading.tsx` files
- **Handle errors** - Use `error.tsx` files
- **Test responsive design** - Mobile-first approach

### ❌ Don'ts

- Don't use `any` type
- Don't skip accessibility
- Don't use inline styles (use Tailwind)
- Don't ignore TypeScript errors
- Don't forget error handling
- Don't hardcode sensitive values

---

## Getting Help

- 📖 Read [AGENTS.md](AGENTS.md) for architecture details
- 🔍 Check [docs/](docs/) for comprehensive guides
- 🐛 [Open an issue](https://github.com/yourusername/buzz-stack/issues)
- 💬 [Start a discussion](https://github.com/yourusername/buzz-stack/discussions)

---

## Next Steps

1. ✅ Complete customization checklist above
2. 🎨 Design your app's UI/UX
3. 🔧 Add your features
4. 🧪 Test thoroughly
5. 🚀 Deploy to production
6. 📈 Iterate and improve

**Happy building! ⚡**
