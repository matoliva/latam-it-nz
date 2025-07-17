# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a bilingual (English/Spanish) Next.js 15 application for Latam IT NZ, a platform connecting Latin American IT professionals with job opportunities in New Zealand. The site includes:

- Job listings with filtering and search
- PDF guide generation for IT professionals
- Internationalization (i18n) support for English and Spanish
- PayloadCMS for content management
- PDF export functionality using Puppeteer

## Development Commands

- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build production version
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## Testing

- E2E tests: `npx playwright test` (configured for mobile Chromium)
- Test directory: `e2e/`
- Base URL for testing: http://localhost:3000 (configurable via E2E_BASE_URL env var)

## Architecture

### Core Technologies
- **Next.js 15** with App Router and React 19
- **PayloadCMS 3.x** for content management with MongoDB
- **Tailwind CSS 4** for styling with theme support
- **TypeScript** for type safety
- **MDX** for content authoring

### Key Features
- **Internationalization**: Default locale is Spanish ('es'), supports English ('en')
- **Content Management**: PayloadCMS with collections for JobPositions, Technologies, Media, and Users
- **PDF Generation**: Server-side PDF generation using Puppeteer and Chromium
- **Theme System**: Dark/light mode support with next-themes

### File Structure
- `app/[lang]/` - Internationalized pages with locale routing
- `app/(payload)/` - PayloadCMS admin interface
- `collections/` - PayloadCMS collection definitions
- `components/` - Reusable React components with UI components in `components/ui/`
- `dictionaries/` - Translation files (en.json, es.json)
- `lib/` - Utility functions and dictionary helpers

### Important Configuration Files
- `payload.config.ts` - PayloadCMS configuration with MongoDB adapter
- `i18n.config.ts` - Internationalization settings (default: 'es', locales: ['en', 'es'])
- `middleware.ts` - Next.js middleware for locale detection and routing
- `playwright.config.ts` - E2E testing configuration

### Collections Schema
**JobPositions**: Core job listing entity with fields for title, description, location, modality (onsite/hybrid/remote), technologies array, company info, salary, job type, seniority level, and referral information.

### Environment Variables Required
- `PAYLOAD_SECRET` - PayloadCMS secret key
- `DATABASE_URI` - MongoDB connection string
- `E2E_BASE_URL` - Base URL for E2E tests (optional, defaults to localhost:3000)

### Deployment
- Configured for Vercel deployment
- Uses Vercel Analytics for tracking
- PayloadCloud plugin enabled for hosting