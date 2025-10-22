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
- Marketing pages: Home, What Is AI SEO, What is Found For AI?, Services, About
- Lead generation: Audit form (with thank you page)
- Content: Blog index and dynamic blog post pages
- Utility: Contact form, 404 page
- All pages implement SEO metadata via custom SEOHead component
- Brand entity page: /what-is-found-for-ai with Organization, WebPage, and FAQPage schemas

**Interactive Demos**
- AI Lab (Homepage): Sanitized interactive demo using fictional "Sparkle Floors" business
  - Vanilla JavaScript implementation (not React state) within useEffect
  - Three tabs (ChatGPT, Gemini, Perplexity) showing before/after AI optimization results
  - Collapsible JSON-LD code example (hidden by default)
  - Uses sparkle-floors.example domain (NO real Found For AI production data exposed)
  - Right panel shows human-readable summary with bullet points
  - All demo data is fictional for privacy/security

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
  - Organization schema on "What is Found For AI?" page with company details (Salt Lake City, UT)
  - WebPage schema for brand entity definition
  - FAQPage schema with 3 common questions
- WWW to apex domain redirect (301) via middleware
- Sitemap.xml maintained with all public pages
- Open Graph and Twitter Card meta tags on all pages
- Custom .btn.primary and .btn.secondary CSS classes for consistent CTA styling
- Google AI Overview brand recognition optimization