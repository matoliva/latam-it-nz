# Repository Guidelines

## Project Structure & Module Organization
- `app/`: Next.js App Router code. Language routes live under `app/[lang]/` and Payload admin/API routes under `app/(payload)/`.
- `components/`: Reusable UI and page sections (`components/ui/` for primitives, `components/sections/` for feature sections).
- `collections/`: Payload CMS collection definitions (for example `JobPositions.ts`, `Technologies.ts`).
- `lib/`, `types/`, `dictionaries/`: shared utilities, TypeScript types, and i18n dictionaries.
- `e2e/`: Playwright end-to-end tests.
- `public/` and `media/`: static assets and uploaded media.

## Build, Test, and Development Commands
- `npm run dev`: starts local development server at `http://localhost:3000`.
- `npm run build`: creates a production build (includes type checks done by Next.js).
- `npm run start`: serves the production build.
- `npm run lint`: runs ESLint with Next.js + TypeScript rules.
- `npx playwright test`: runs E2E tests from `e2e/` (set `E2E_BASE_URL` to target a deployed environment).
- `npx playwright install --with-deps`: installs browser binaries needed for first-time E2E setup.

## Coding Style & Naming Conventions
- Language: TypeScript (`.ts/.tsx`) with `strict` mode enabled in `tsconfig.json`.
- Use path alias `@/*` for internal imports (example: `@/components/header`).
- Follow ESLint config in `eslint.config.mjs` (`next/core-web-vitals` + `next/typescript`).
- Naming patterns: components in `PascalCase` (e.g., `DownloadPdfLink.tsx`), utility modules in lower-case (`utils.ts`), route segments by Next.js conventions (`page.tsx`, `layout.tsx`, `route.ts`).

## Testing Guidelines
- Framework: Playwright (`@playwright/test`) with tests in `e2e/`.
- Name specs as `*.spec.ts` (example: `lang-routing.spec.ts`).
- Run tests against local app by default; CI runs them against Vercel Preview via `E2E_BASE_URL`.
- Ensure critical user flows (routing, i18n behavior, core content pages) are covered before merging.

## Commit & Pull Request Guidelines
- Prefer Conventional Commit style used in history: `feat: ...`, `fix: ...`.
- Keep commits focused and small; use imperative summaries.
- PRs should include: clear description, linked issue (if applicable), testing notes (`npm run lint`, `npx playwright test`), and screenshots for UI changes.
- Confirm no secrets are committed (`.env`, tokens, or generated credentials).
