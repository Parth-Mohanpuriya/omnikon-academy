# Missing Pages Implementation Prompt

## Context
You are working on **Omnikon Academy**, a Next.js 16.3 education platform with React 19, TypeScript, Tailwind CSS v4, and Framer Motion. The project already has 4 working pages (Landing, Courses, Dashboard, Lesson Player) with a dark theme (#030303 background), monospace font styling, and glow effects.

The existing codebase uses:
- `lib/mock-data.ts` for all data (interfaces: User, Course, Lesson, Module, LearningPath, Activity)
- Client-side state with localStorage persistence
- Framer Motion for animations
- Lucide React for icons
- Tailwind CSS v4 with custom utilities (glow-card, glow-btn-red, grid-bg)

## Task
Create the following missing pages with full implementations matching the existing design system:

---

### 1. Profile Page (`app/profile/page.tsx`)

**Route:** `/profile`

**Requirements:**
- Display user profile information from `mockUser` data
- Show user avatar, name, email, role
- Display enrolled courses with progress bars
- Show learning path progress
- Display recent activity/history
- Include stats: courses completed, hours learned, certificates earned
- Add edit profile button (mock - opens modal or inline edit)
- Use same design patterns as Dashboard page (glow-card, terminal-style headers, monospace font)

**Sections to include:**
1. Profile header with avatar and basic info
2. Stats cards (courses, progress, certificates)
3. Enrolled courses grid with progress
4. Activity timeline
5. Achievements/badges section (mock data)

---

### 2. Settings Page (`app/settings/page.tsx`)

**Route:** `/settings`

**Requirements:**
- Tabbed interface for different settings categories
- Use terminal/CLI aesthetic for section headers
- Toggle switches and form inputs with dark theme styling

**Tabs/Sections:**
1. **Account Settings**
   - Email display (read-only)
   - Display name input
   - Bio textarea
   - Save button

2. **Notification Preferences**
   - Toggle: Email notifications
   - Toggle: Course updates
   - Toggle: Activity feed alerts
   - Toggle: Newsletter subscription

3. **Appearance**
   - Theme selector (Dark/Light/System) - mock only dark for now
   - Font size selector
   - Sidebar position toggle

4. **Privacy**
   - Profile visibility toggle
   - Show activity status toggle
   - Data sharing preferences

5. **Danger Zone**
   - Export data button (mock)
   - Delete account button (mock with confirmation)

---

### 3. Blog Page (`app/blog/page.tsx`)

**Route:** `/blog`

**Requirements:**
- Blog listing page with mock articles
- Search/filter functionality
- Responsive grid layout

**Mock Data to add to `lib/mock-data.ts`:**
```typescript
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  featured: boolean;
}
```

Create 6-8 mock blog posts about:
- React 19 Server Components
- Go microservices
- Docker best practices
- Kubernetes deployment
- Career advice for developers
- Open source contributions

**Sections:**
1. Hero/header with title
2. Featured post card (larger)
3. Blog grid with cards (title, excerpt, tags, read time, date)
4. Search bar for filtering
5. Tag filter buttons

---

### 4. Individual Blog Post (`app/blog/[slug]/page.tsx`)

**Route:** `/blog/[slug]`

**Requirements:**
- Dynamic route for individual posts
- Full article layout
- Back to blog link
- Author info
- Related posts section

**Layout:**
1. Header with title, author, date, read time
2. Tags display
3. Article content (mock lorem ipsum or real content)
4. Share buttons (mock)
5. Related posts grid at bottom

---

### 5. About Page (`app/about/page.tsx`)

**Route:** `/about`

**Requirements:**
- Company/mission page
- Team members section
- Values/principles
- Timeline/history

**Sections:**
1. Hero section with mission statement
2. "What We Stand For" - 4 core values cards
3. Team members grid (mock 6-8 people with:
   - Avatar placeholder
   - Name
   - Role
   - Short bio
   - Social links)
4. Company timeline/milestones
5. Call to action to join community

**Mock Data to add:**
```typescript
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  social: {
    github?: string;
    twitter?: string;
    linkedin?: string;
  };
}
```

---

## Design System Reference

### Colors (from globals.css)
- Background: `#030303`
- Card background: `#08080a`, `#060608`
- Border: `border-white/5`
- Text primary: `text-white`
- Text secondary: `text-zinc-400`, `text-zinc-500`
- Accent: `text-red-500`, `bg-red-500`
- Success: `text-emerald-500`
- Glow effect: `glow-card` class

### Typography
- Headers: `font-mono font-bold text-white`
- Body: `text-sm text-zinc-400`
- Labels: `text-[10px] font-mono text-zinc-500 uppercase tracking-widest`
- Section headers: `text-xs font-mono text-red-500 uppercase tracking-widest`

### Components to Reuse
- `Navbar` - Already implemented
- `Footer` - Already implemented
- `glow-card` class for cards
- `glow-btn-red` class for primary buttons
- Terminal-style section headers (e.g., `> SECTION_NAME`)

### Animation Pattern
```tsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {/* Content */}
</motion.div>
```

---

## Data Updates Required

Add to `lib/mock-data.ts`:

1. Blog posts array
2. Team members array
3. User settings interface and mock data
4. Extended user profile data

---

## Implementation Checklist

- [ ] Add new mock data to `lib/mock-data.ts`
- [ ] Create `app/profile/page.tsx`
- [ ] Create `app/settings/page.tsx`
- [ ] Create `app/blog/page.tsx`
- [ ] Create `app/blog/[slug]/page.tsx`
- [ ] Create `app/about/page.tsx`
- [ ] Update Navbar links if needed
- [ ] Update Footer links if needed
- [ ] Test all pages render correctly
- [ ] Ensure responsive design works
- [ ] Add proper TypeScript types
- [ ] Add loading states where appropriate

---

## Notes

- Keep the terminal/CLI aesthetic consistent
- Use mock data only - no real backend calls
- All interactive elements should use local state
- Follow existing code patterns and naming conventions
- Ensure all pages are mobile responsive
- Add smooth page transitions with Framer Motion
