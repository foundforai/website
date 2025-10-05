# Design Guidelines for FoundForAI.com

## Design Approach
**Reference-Based Approach** drawing from modern SaaS and professional consulting platforms (Webflow, Stripe, Vercel) - emphasizing clean professionalism with tech-forward credibility. This B2B consulting site prioritizes conversion optimization while maintaining technical sophistication.

---

## Color Palette

### Light Mode
- **Primary Brand**: 220 85% 25% (Deep professional blue - trust and expertise)
- **Primary Hover**: 220 85% 20% (Darker blue for interactions)
- **Accent**: 160 75% 45% (Teal - modern, AI-forward without being cliché)
- **Background**: 0 0% 98% (Soft white)
- **Surface**: 0 0% 100% (Pure white for cards)
- **Text Primary**: 220 20% 15% (Near-black with subtle blue tint)
- **Text Secondary**: 220 15% 45% (Medium gray)
- **Border**: 220 15% 90% (Subtle dividers)

### Dark Mode
- **Primary Brand**: 220 75% 55% (Brighter blue for dark backgrounds)
- **Primary Hover**: 220 80% 60% (Lighter for dark mode interactions)
- **Accent**: 160 70% 50% (Slightly brighter teal)
- **Background**: 220 20% 8% (Deep blue-black)
- **Surface**: 220 15% 12% (Elevated surfaces)
- **Text Primary**: 220 10% 95% (Off-white)
- **Text Secondary**: 220 10% 65% (Light gray)
- **Border**: 220 15% 20% (Subtle dark borders)

---

## Typography

### Font Families
- **Headlines**: Montserrat (600, 700 weights) - Google Fonts CDN
- **Body**: Lato (400, 500, 700 weights) - Google Fonts CDN

### Type Scale
- **Hero H1**: text-5xl md:text-6xl lg:text-7xl font-bold (Montserrat)
- **Page H1**: text-4xl md:text-5xl font-bold (Montserrat)
- **H2**: text-3xl md:text-4xl font-semibold (Montserrat)
- **H3**: text-2xl md:text-3xl font-semibold (Montserrat)
- **Body Large**: text-lg md:text-xl (Lato)
- **Body**: text-base (Lato)
- **Small**: text-sm (Lato)
- **CTA Buttons**: text-base md:text-lg font-medium (Lato)

---

## Layout System

### Spacing Primitives
Use Tailwind units: **2, 4, 6, 8, 12, 16, 20, 24** for consistent rhythm
- Component padding: p-6 to p-8
- Section padding: py-16 md:py-24 lg:py-32
- Container gaps: gap-8 to gap-12
- Card spacing: p-6 md:p-8

### Grid & Containers
- **Max width**: max-w-7xl mx-auto (1280px)
- **Content width**: max-w-4xl (readable text)
- **Section container**: px-4 md:px-6 lg:px-8
- **Value cards grid**: grid-cols-1 md:grid-cols-3 gap-6
- **Blog grid**: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8

---

## Component Library

### Navigation
- Sticky top nav with blur backdrop (backdrop-blur-md bg-white/90 dark:bg-slate-900/90)
- Logo left, links center, "Get My Free Audit" CTA button right
- Mobile: Hamburger menu with slide-in drawer
- CTA button: Primary color with rounded-lg px-6 py-2.5

### Hero Section (Homepage)
- **Layout**: Two-column on desktop (60/40 split), stacked on mobile
- **Left**: Headline, subheadline, primary CTA, trust indicator text
- **Right**: Illustration or abstract visual representing AI/schema connectivity (geometric nodes/network pattern in brand colors)
- **Background**: Subtle gradient from white to very light blue (220 40% 98% to 220 30% 96%)
- **Height**: min-h-[600px] md:min-h-[700px] with natural content flow

### Value Cards
- **Style**: White cards (dark: slate-800) with subtle shadow, rounded-xl border
- **Icon**: Accent-colored icon at top (h-12 w-12)
- **Title**: H3 in brand color
- **Description**: Two sentences, text-secondary color
- **Hover**: Subtle lift (hover:shadow-lg transform hover:-translate-y-1 transition-all)

### Scorecard Section
- **Container**: bg-gradient-to-br from primary-50 to accent-50 (dark: from-slate-800 to-slate-900)
- **Grid**: Four category boxes with label, grade letter, and progress indicator
- **Visual**: Use colored bars or radial progress indicators
- **Grades**: Color-coded (A: green, B: accent, C: orange, F: red)

### Forms (Audit Page)
- **Container**: Centered max-w-2xl with shadow-xl rounded-2xl card
- **Fields**: Stacked with label above, rounded-lg inputs with focus:ring-2 focus:ring-primary
- **Spacing**: space-y-6 between fields
- **Submit**: Full-width primary button, text-lg font-semibold
- **Validation**: Red text-sm below fields for errors
- **Dark mode**: Ensure input backgrounds are slate-700 with white text

### Comparison Table (What Is AI SEO)
- **Style**: Clean bordered table with alternating row backgrounds
- **Headers**: Primary color background with white text
- **Columns**: Old SEO (text-red-600) vs AI SEO (text-accent)
- **Visual**: Use → arrow or icon to show transition

### Blog Cards
- **Image**: Rounded-t-xl aspect-video object-cover
- **Content**: p-6 with title, date, excerpt
- **Hover**: Image scale (hover:scale-105) with overflow-hidden on container
- **Read more**: Accent color link with arrow →

### Footer
- **Layout**: Three columns (Brand/NAP, Quick Links, Social)
- **Background**: bg-slate-50 dark:bg-slate-900 border-t
- **Text**: text-sm text-secondary
- **Social icons**: Hover to accent color

---

## Animations & Interactions

**Minimal Motion** - Use sparingly:
- Smooth scroll behavior (scroll-smooth)
- Card hover lifts (transition-transform duration-200)
- Button hover states (built-in, no custom animation)
- Page transitions: Simple fade-in for content (opacity-0 to opacity-100, duration-500)
- No parallax, no scroll-triggered animations, no background effects

---

## Images

### Hero Image
- **Type**: Illustration or abstract visualization (NOT a photo)
- **Content**: Geometric network/connection pattern suggesting AI analysis, schema graphs, or data connectivity
- **Style**: Line art or minimalist shapes in brand colors (primary + accent)
- **Placement**: Right side of hero on desktop, hidden on mobile
- **Alternative**: Could use animated SVG with subtle motion (optional)

### About Page
- **Founder photo placeholder**: Circular frame (rounded-full), 200x200px, professional headshot
- **Placement**: Left of bio text on desktop, above on mobile

### Blog Posts
- **OG Images**: 1200x630px graphics with brand elements
- **Post headers**: 16:9 aspect ratio hero images, related to content topic
- **Lazy loading**: All images below fold

### Assets Folder
- logo.png (transparent background, primary color, 200px height)
- og-default.jpg (1200x630, brand colors with tagline)
- office.jpg placeholder (for LocalBusiness schema)

---

## Accessibility & Quality

- **Contrast**: WCAG AA minimum (4.5:1 text, 3:1 UI)
- **Focus states**: 2px ring in accent color on all interactive elements
- **Form labels**: Always visible, proper for/id associations
- **Semantic HTML**: nav, main, section, article, footer hierarchy
- **Skip links**: "Skip to main content" for keyboard users
- **Dark mode**: Complete implementation across all components, inputs, and states

---

## Mobile-First Responsive Breakpoints

- **Mobile**: Base styles (375px+)
- **Tablet**: md: (768px+) - Two-column layouts emerge
- **Desktop**: lg: (1024px+) - Full multi-column layouts, larger type
- **Wide**: xl: (1280px+) - Max container widths, enhanced spacing

**Critical**: Stack all multi-column layouts to single column on mobile, increase touch targets to min 44x44px, ensure readable 16px+ body text on small screens.