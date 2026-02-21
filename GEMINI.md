# AI Agent Control Panel - Gemini Context

This document provides architectural context and development guidelines for the AI Agent Control Panel, a SaaS application designed for managing and executing AI agents.

## Project Overview

The project is a modern web application built with **Next.js 15+** (App Router) and **TypeScript**. It allows users to create, configure, and monitor AI agents, with integrated workflow automation and Telegram webhook support.

### Core Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **UI Framework:** Material UI (MUI) v7+, Framer Motion for animations, Recharts for analytics.
- **Backend & Database:** Supabase (PostgreSQL, Auth, Edge Functions/SSR).
- **AI Integration:** OpenAI API.
- **Background Tasks:** Upstash QStash for reliable workflow execution.
- **Testing:** Playwright for End-to-End testing.
- **Internationalization:** Multi-language support (English and Ukrainian) located in `lib/i18n`.

## Directory Structure

- `app/`: Next.js App Router directory.
  - `api/`: Backend endpoints (Agents execution, Telegram webhooks, QStash workers).
  - `dashboard/`: User-facing dashboard pages.
  - `contexts/`: React context providers (e.g., `SettingsContext`).
- `components/`: Shared UI components.
- `lib/`: Utility functions, Supabase clients, theme configuration, and i18n.
- `supabase/`: Database migrations and schema definitions.
- `tests/`: End-to-end tests using Playwright.
- `public/`: Static assets.

## Building and Running

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run start
```

### Testing
```bash
npx playwright test
```

### Linting
```bash
npm run lint
```

## Development Conventions

- **Server-Side Supabase:** Always use `lib/supabase/server.ts` for operations inside Server Components and API Routes.
- **UI Components:** Prefer MUI components for consistent styling. Use `ThemeRegistry` for theme-related wrappers.
- **AI Execution:** Agent logic is centralized in `app/api/agents/[id]/execute/route.ts`. Always log execution status and results to the `executions` table in Supabase.
- **Workflows:** Long-running or multi-step tasks should be handled via Upstash QStash (`app/api/workflows/worker/route.ts`).
- **I18n:** Add new strings to `lib/i18n/en.ts` and `lib/i18n/uk.ts`.

## Environment Variables
The following environment variables are required:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `OPENAI_API_KEY`
- `QSTASH_TOKEN`, `QSTASH_CURRENT_SIGNING_KEY`, `QSTASH_NEXT_SIGNING_KEY` (for workflows)

## Schema Notes
- `agents`: Stores agent configurations (system prompts, models, temperature).
- `executions`: Logs of agent runs, including status, logs, and results.
- `teams`: For multi-user collaboration (implied by `app/dashboard/teams`).
