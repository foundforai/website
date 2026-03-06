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
- Wouter for lightweight client-side routing with SSR support (ssrPath prop)
- Server-side rendering (SSR) for SEO: all pages pre-rendered on the server so crawlers receive full HTML
- `client/src/entry-server.tsx` exports `render(url)` function used by Express to SSR each route
- `client/src/main.tsx` detects SSR content and uses `hydrateRoot` (production) or `createRoot` (fallback)
- `DeferredToaster` in App.tsx prevents Radix Toast hydration mismatch (renders only after useEffect)
- Build: `build.sh` runs three steps: Vite client build, Vite SSR bundle (`dist/server/entry-server.js`), esbuild server bundle
- Static HTML files in `client/public/` (readiness-report.html, etc.) bypass SSR pipeline via express.static

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
- Marketing pages: Home, What Is AI SEO, What is Found For AI?, **AEO (Answer Engine Optimization)**, Services, About
- Lead generation: **Audit form at /audit** (free AI visibility check, with thank you page)
  - **/readiness-report**: Static HTML "processing" page (200 OK) with WebPage schema, auto-redirects to /purchase-complete after 5 seconds via meta refresh (for SEO/GSC indexing)
- Content: Blog index and dynamic blog post pages
- Editorial: **/insights** - References external writing and thought leadership by Dustin Crump (no CTAs, no forms, clean editorial layout with WebPage schema)
- Utility: Contact form, 404 page
- All pages implement SEO metadata via custom SEOHead component
- Brand entity page: /what-is-found-for-ai with Organization, WebPage, and FAQPage schemas
- AEO page (/aeo): Dedicated explainer page for Answer Engine Optimization with comparison tables and benefit cards

**Hybrid Funnel Strategy**
- Homepage features dual CTAs: "Run Free AI Visibility Check" (lead magnet) + "Buy Starter Fix – $495" (direct purchase)
- Free AI Visibility Check (/audit): Lead capture form for AI visibility audits
- All "Run Free AI Visibility Check" CTAs throughout the site point to /audit
- Responsive .cta-row layout collapses to full-width buttons on mobile
- .btn.ghost style provides outline button variant for secondary CTAs

**Interactive Demos & Educational Content**
- **AEO Explainer Block (Homepage)**: Educational section below hero explaining Answer Engine Optimization
  - Two-column grid layout with "Why it matters" and "What we implement" cards
  - SEO vs AEO comparison table with 4 key differences
  - Three CTAs: Free AI Visibility Check, Learn more about AEO, Buy Starter Fix
  - Intentionally NO FAQ schema to avoid duplicate FAQPage issues
  - Custom CSS styling using design tokens (responsive grid, subtle shadows)
  
- **AI Lab (Homepage)**: Sanitized interactive demo using fictional "Sparkle Floors" business
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
- Primary endpoints:
  - `POST /api/audit` - Handles audit form submissions (main lead capture)
  - `POST /api/contact` - Handles contact form submissions
  - `POST /api/readiness-report` - Legacy endpoint (kept for backward compatibility)
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
- Readiness Report Submission: name, email, url, priority (learn|soon|now), domain (extracted), score (computed)
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
  - FAQPage schemas on three pages only (Home, WhatIsFoundForAI, Pricing) - each matches visible FAQ content
  - NO duplicate FAQPage schemas (removed global schema from SEOHead.tsx)
- WWW to apex domain redirect (301) via middleware
- Sitemap.xml maintained with all public pages including /aeo
- Open Graph and Twitter Card meta tags on all pages
- Custom .btn.primary, .btn.secondary, and .btn.ghost CSS classes for consistent CTA styling
- Google AI Overview brand recognition optimization

## Recent Changes

### November 19, 2025
- **Google Search Console Redirect Fix**: Implemented proper canonical URL enforcement
  - Updated Express middleware in server/index.ts to force HTTPS and strip www subdomain
  - All non-canonical URLs now redirect with single 301 to https://foundforai.com (no chains)
  - Redirect logic handles:
    - http://foundforai.com → https://foundforai.com (301)
    - http://www.foundforai.com → https://foundforai.com (301)
    - https://www.foundforai.com → https://foundforai.com (301)
    - https://foundforai.com → no redirect (canonical)
  - Localhost/development traffic exempted from redirects
  - Fixes GSC "Page with redirect" indexing issues
  - All sitemap URLs already use canonical format (verified)
  - All internal links and canonical tags already use canonical format (verified)

### October 28, 2025
- **Readiness Report Meta Tag Update**: Added robots noindex/nofollow meta tag
  - Added `<meta name="robots" content="noindex, nofollow" />` to /readiness-report.html
  - Prevents search engines from indexing this temporary processing page
  - Page still returns 200 OK for GSC but won't appear in search results

- **Homepage AEO Section Reorganization**: Moved AEO explainer section for better conversion flow
  - Moved entire "What is AEO (Answer Engine Optimization)" section from position 2 (after hero) to position 9 (directly before final CTA)
  - New homepage structure: Hero → Proof Strip → AI Lab → Founder Note → FAQ → Stats → Starter Fix Offer → Upsell Tiles → **AEO Explainer** → Final CTA
  - Added subtle horizontal divider (border-muted-foreground/20) between AEO section and final CTA for visual separation
  - Preserved all original styling (.aeo, .aeo-lead, .aeo-grid, .aeo-card, .aeo-compare, .aeo-rows, .cta-block)
  - All three CTAs in AEO section verified working:
    - "Run Free AI Visibility Check" → /audit
    - "Learn more about AEO" → /aeo
    - "Buy Starter Fix – $495" → Square checkout (external, target="_blank")
  - Maintained note about no FAQ schema to avoid duplicate FAQPage issues
  - Verified via e2e testing: section appears in correct position above "Get Your Tech SEO & AI SEO Issues Fixed" heading

- **Logo File Reference Fix**: Corrected reversed logo file references
  - Logo image files were named backwards (white.png contains black logo, black.png contains white logo)
  - Swapped all file references throughout codebase to compensate:
    - Navigation.tsx: Light mode shows white.png (black logo), dark mode shows black.png (white logo)
    - index.html: Updated Organization schema and OG/Twitter card images
    - SEOHead.tsx: Updated default ogImage and Organization schema
    - WhatIsFoundForAI.tsx: Updated Organization schema and ogImage prop
  - Verified via e2e testing: logos now display correctly in both light and dark themes

### October 27, 2025
- **Logo and Brand Schema Updates**: Integrated new official logo files across the site
  - Added found-for-ai-logo-black.png and found-for-ai-logo-white.png to public directory
  - Updated Navigation component to use new logos with theme-aware display
  - Updated Organization schema across all pages with comprehensive brand information:
    - Added alternateName array for brand variations
    - Updated logo and image URLs to new files
    - Added founder information (Dustin Crump)
    - Updated sameAs links to company social profiles (LinkedIn, X, Facebook, Instagram)
    - Added Brand entity reference
  - Updated Open Graph and Twitter Card meta tags with new logo
  - Added favicon links in index.html
  - Updated Footer social links to company profiles
  - Default OG image now uses found-for-ai-logo-white.png (which contains the black logo)

- **Search Route Cleanup**: Removed /search route and added GSC soft 404 fix
  - Added `Disallow: /search` to robots.txt
  - Added 301 redirect from /search to / in routes.ts
  - Prevents GSC soft 404 errors for non-existent search page

### October 23, 2025
- **Readiness Report SEO Page**: Created static HTML page at /readiness-report for SEO/GSC
  - Returns 200 OK with actual content (not a redirect)
  - Shows "Preparing Your AI Visibility Report..." message
  - Auto-redirects to /purchase-complete after 5 seconds via meta refresh
  - Includes WebPage schema for proper indexing
  - Removed React route so static HTML file loads directly
  - Listed in sitemap.xml for full crawlability

- **URL Structure Update**: Updated CTAs to point to /audit
  - All "Run Free AI Visibility Check" CTAs throughout site (Home, AEO, Footer) now point to /audit
  - /audit is the primary lead capture form

- **AEO Feature Implementation**: Added comprehensive Answer Engine Optimization content
  - Created dedicated /aeo page with full explainer content, comparison tables, and CTAs
  - Added AEO explainer section to homepage below hero (no FAQ schema to avoid duplicates)
  - Custom CSS styling for .aeo, .aeo-card, .aeo-compare, .aeo-rows classes
  - Updated sitemap.xml to include /aeo page
  - Registered /aeo route in App.tsx
  
- **Fixed Duplicate FAQPage Schema Error**: Resolved duplicate schema validation issues
  - Removed global FAQPage schema from SEOHead.tsx @graph array
  - Updated Pricing.tsx FAQPage schema to match visible FAQ questions exactly
  - Verified Home, WhatIsFoundForAI, and Pricing pages each have exactly ONE FAQPage schema
  - Confirmed About and ReadinessReport pages have zero FAQPage schemas (no visible FAQs)