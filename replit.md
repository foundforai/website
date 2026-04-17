# Found For AI - AI SEO Consulting Platform

## Overview

Found For AI is a web application designed to help businesses optimize their online presence for AI-driven search engines such as ChatGPT, Perplexity, and Google's AI Overviews. The platform offers AI readiness audits, consulting services, and educational resources, focusing on schema markup, GEO optimization, and structured data implementation. It functions as a conversion-focused marketing website, integrating lead capture forms and showcasing service offerings. The project aims to provide innovative solutions for businesses navigating the evolving landscape of AI-powered search, positioning itself as a leader in AI SEO consulting.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The frontend is built with React 18 and TypeScript, using Vite for fast builds and development. It implements Server-Side Rendering (SSR) via Wouter for improved SEO, with pages pre-rendered by an Express server. UI components are developed using shadcn/ui and Radix UI, styled with Tailwind CSS, following a professional SaaS aesthetic with Montserrat and Lato fonts. TanStack Query manages server state and API interactions, complemented by React hooks for local state. The site includes marketing pages (Home, What Is AI SEO, AEO, Services), lead generation (AI visibility audit form at `/audit`), and educational content (Blog, Insights). A hybrid funnel strategy is employed with dual CTAs (free audit and direct purchase). Interactive elements include an AEO explainer block and an AI Lab demo illustrating AI optimization results.

### Backend Architecture

The backend uses Express.js with Node.js, leveraging ESM throughout. API endpoints are RESTful, primarily handling form submissions (audit, contact) with Zod for validation and JSON responses. Development uses Vite in middleware mode for HMR, with static files served from `dist/public` in production.

### Data Storage Solutions

Currently, in-memory storage (MemStorage class) handles user, audit, and contact submissions. Published reports are persisted to PostgreSQL via Drizzle ORM (using `@neondatabase/serverless`) in a `reports` table. The database schema is defined using Drizzle, supporting future scalability for user, audit, contact, and readiness report data models.

### SEO & Discoverability

The platform includes static `robots.txt` and `llms.txt`, extensive Schema.org markup (Organization, WebPage, FAQPage), and Open Graph/Twitter Card meta tags. It enforces canonical URLs via 301 redirects (WWW to apex domain, HTTP to HTTPS) and manages a `sitemap.xml`. Specific pages, like `/readiness-report`, are configured with `noindex, nofollow` to prevent indexing of temporary content.

## External Dependencies

### Third-Party Services

- **Formspree**: Email delivery for audit and contact forms.
- **Google Fonts CDN**: Delivers Montserrat and Lato typefaces.
- **Neon Database**: Serverless PostgreSQL (configured but primarily used for report persistence).

### Development Tools

- **Replit Plugins**: Development banner, Cartographer, runtime error overlay.
- **Drizzle Kit**: Database migrations and schema management.
- **esbuild**: Production bundler for server code.

### Analytics & Tracking

- Placeholder for future analytics integration (e.g., for form conversions).

### Email/Notification System

- Future integration planned for email delivery (e.g., SendGrid, Resend) for form submissions.