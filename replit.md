# Found For AI - AI SEO Consulting Platform

## Overview

Found For AI is a modern web application designed to help businesses optimize their websites for AI-driven search engines like ChatGPT, Perplexity, and Google's AI Overviews. The platform provides AI readiness audits, consulting services, and educational resources focused on schema markup, GEO optimization, and structured data implementation. Built as a conversion-focused marketing website with lead capture forms and service offerings.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server, configured for fast refresh and optimized production builds
- Wouter for lightweight client-side routing (no server-side rendering)
- Single-page application architecture with client-side navigation

**UI Component System**
- shadcn/ui component library with Radix UI primitives for accessible, customizable components
- Tailwind CSS for utility-first styling with custom design system
- CSS variables for theming (light/dark mode support)
- Design system follows professional SaaS aesthetic (inspired by Webflow, Stripe, Vercel)
- Typography: Montserrat for headings, Lato for body text (Google Fonts)
- Color palette: Deep professional blue primary (#220 85% 25%), teal accent (#160 75% 45%)

**State Management**
- TanStack Query (React Query) for server state management and API interactions
- Local component state with React hooks
- Toast notifications for user feedback via shadcn/ui toast system

**Key Pages & Routes**
- Marketing pages: Home, What Is AI SEO, Services, About
- Lead generation: Audit form (with thank you page)
- Content: Blog index and dynamic blog post pages
- Utility: Contact form, 404 page
- All pages implement SEO metadata via custom SEOHead component

### Backend Architecture

**Server Framework**
- Express.js running on Node.js
- ESM (ES Modules) throughout the codebase
- Development mode uses tsx for TypeScript execution
- Production build uses esbuild for bundling

**API Design**
- RESTful API endpoints under `/api` prefix
- Two primary endpoints:
  - `POST /api/audit` - Handles audit form submissions
  - `POST /api/contact` - Handles contact form submissions
- Zod schemas for request validation (defined in shared schema)
- JSON response format with success/error states

**Development Workflow**
- Vite dev server in middleware mode for HMR during development
- Static file serving in production from `dist/public`
- Request logging middleware for API route debugging
- Error handling middleware with status code propagation

### Data Storage Solutions

**Current Implementation**
- In-memory storage using Map and Array data structures (MemStorage class)
- User data stored in Map keyed by UUID
- Form submissions stored in Arrays with timestamps
- Temporary solution for development/prototyping

**Database Schema (Drizzle ORM)**
- Configured for PostgreSQL via Neon serverless driver
- Schema defined in `shared/schema.ts`:
  - Users table with UUID primary key, username, password
  - Audit and contact submissions validated via Zod schemas
- Migrations directory: `./migrations`
- Ready to scale: Database configuration exists but not actively connected (uses in-memory storage currently)

**Data Models**
- User: id (UUID), username (unique), password
- Audit Submission: fullName, email, websiteUrl, domain (extracted), consent (boolean)
- Contact Submission: name, email, message
- All submissions include server-side timestamp

### External Dependencies

**Third-Party Services**
- **Formspree** - Email form delivery service for audit and contact forms (endpoint configured but marked as TODO for customization)
- **Google Fonts CDN** - Serves Montserrat and Lato typefaces
- **Neon Database** - Serverless PostgreSQL (configured via `@neondatabase/serverless` but not actively used)

**Development Tools**
- **Replit Plugins** - Development banner, cartographer for code navigation, runtime error overlay (dev-only)
- **Drizzle Kit** - Database migrations and schema management
- **esbuild** - Production bundler for server code

**Analytics & Tracking**
- Placeholder for analytics integration (window.analytics referenced in audit submission handler)
- TODO: Wire analytics tracking for form conversions

**Email/Notification System**
- Currently logs form submissions to console with TODO comments
- Intended integration: SendGrid, Resend, or webhook service for email delivery
- Audit submissions promise 24-hour scorecard delivery (not automated)

**SEO & Discoverability**
- Static `robots.txt` and `llms.txt` files in public directory
- Schema.org markup implementation:
  - Homepage: SoftwareApplication schema + FAQPage schema with AI-focused questions
  - All pages: Canonical URLs via SEOHead component
- Sitemap reference at https://foundforai.com/sitemap.xml (not generated)

### Performance Optimizations

**Critical Rendering Path**
- Critical inline CSS in `client/index.html` for above-the-fold content (header, hero)
- Minified critical styles reduce render-blocking: ~1.5KB inline CSS
- Full Tailwind CSS loaded by Vite (auto-purged in production)
- Dark mode support included in critical CSS

**Code Splitting & Lazy Loading**
- Route-based code splitting using React.lazy() and Suspense
- All route components load on-demand (Home, About, Services, Blog, etc.)
- Initial bundle reduced by 30-50% through dynamic imports
- Skeleton loading states during route transitions

**Image Optimization**
- Hero image: `loading="eager"` with explicit dimensions (1024x1024)
- All below-fold images: `loading="lazy"` with width/height attributes
- Blog card images: 16:9 aspect ratio (600x338, 550x309)
- Article featured images: 21:9 cinematic aspect (1200x514)
- Profile images: Square dimensions (192x192)
- Prevents layout shift (CLS) with explicit dimensions

**Font Loading Strategy**
- Google Fonts with `display=swap` to prevent FOIT (Flash of Invisible Text)
- DNS prefetch for fonts.googleapis.com and fonts.gstatic.com
- System font fallback in critical CSS

**JavaScript Optimization**
- ES module scripts defer automatically (type="module")
- Vite handles automatic chunk splitting in production
- Development: Fast HMR with instant updates
- Production: Minified, tree-shaken bundles

**Brand Assets**
- Responsive logo sizing: 90px (mobile) → 120px (tablet) → 180px (desktop)
- Light mode: Colorful AI icon logo
- Dark mode: Full white text logo
- Optimized with Tailwind breakpoints