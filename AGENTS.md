# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

PREET ENGLISH is a Grade 9+ certified AI-powered English learning platform specifically designed for Hindi speakers. It's a production-ready, bilingual educational platform with comprehensive AI integration, gamification, and 1625+ interactive lessons.

**Tech Stack:** React 18.3.1 + TypeScript 5.6.3 | Vite 7.3.0 | Express.js 4.21.2 | Drizzle ORM | SQLite/PostgreSQL | OpenAI API 6.15.0

**Key Differentiator:** Complete Hindi-English bilingual support throughout the entire platform with cultural context integration.

## Architecture

### Monorepo Structure
```
├── client/                 # React frontend (Vite-based)
│   ├── src/
│   │   ├── components/    # UI components (Radix UI, shadcn/ui)
│   │   ├── pages/         # Route-based pages (Wouter routing)
│   │   ├── hooks/         # React hooks (auth, bilingual, etc.)
│   │   ├── lib/           # Utilities (analytics, audio, grammar)
│   │   ├── data/          # Static content data
│   │   └── services/      # API client services
│   └── public/
│       └── locales/       # i18next translation files (en, hi)
├── server/                # Express.js backend
│   ├── routes.ts          # API route handlers
│   ├── auth.ts            # Passport.js authentication
│   ├── storage.ts         # Drizzle ORM data access layer
│   ├── db.ts              # Database connection (SQLite/PostgreSQL)
│   └── lib/
│       └── ai/            # OpenAI integration
├── shared/                # Shared TypeScript schemas
│   └── schema.ts          # Drizzle ORM schemas with Zod validation
├── scripts/               # Database migration & content generation
└── tests/                 # Jest test suites (components, integration, e2e)
```

### Database Architecture
- **Development:** SQLite (file:sqlite.db)
- **Production:** PostgreSQL (Vercel/Neon/Supabase)
- **ORM:** Drizzle ORM with shared TypeScript schemas
- **Key Tables:** users, lessons, vocabulary, progress, userStats, quizzes, scenarios, stories, speakingTopics
- **Design Pattern:** Each table has typed interfaces exported from `shared/schema.ts`

### Bilingual System
The entire platform uses a custom bilingual implementation (`useBilingual` hook) that provides:
- Seamless Hindi-English language switching
- Cultural context integration for Indian learners
- Devanagari typography optimization (Noto Sans Devanagari font)
- Translation files: `client/public/locales/{en,hi}/translation.json`

### AI Integration (Triple-Deep)
1. **OpenAI Chat API** (`server/chat-service.ts`): Real-time conversation practice
2. **AI Video Call System** (`/api/ai/video-chat`): Saraswati AI tutor with visual interactions
3. **Story Generation** (`/labs/stories`): Personalized content generation

**Fallback Mode:** System gracefully degrades when OpenAI API key is unavailable

## Development Commands

### Core Development
```bash
npm run dev              # Start dev server (port 5000, Vite HMR on 3000)
npm run build            # Production build (client + server)
npm run start            # Start production server
npm run check            # TypeScript type checking (skipped in deployment)
npm run check:full       # Full TypeScript validation
```

### Database Operations
```bash
npm run db:push          # Push Drizzle schema changes to database
npm run migrate          # Run lesson migration scripts
npm run backup:db        # Backup current database
npm run backup:list      # List all database backups
```

### Testing
```bash
npm test                 # Run all Jest tests (maxWorkers=1)
npm run test:components  # Component tests only
npm run test:integration # Integration tests only
npm run test:e2e         # End-to-end tests
npm run test:ci          # CI-optimized test run
npm run test:coverage    # Generate coverage report
npm run test:debug       # Debug mode with verbose output
```

**Important:** Tests run with `maxWorkers=1` and `forceExit=true` to prevent hanging. Test timeout is 15000ms.

### Content Management
```bash
npm run generate:lessons # Generate new lesson content (AI-powered)
npm run audit:lessons    # Audit lesson quality (Grade 9+ validation)
npm run enrich:lessons   # Enrich existing lessons with enhanced content
```

### Quality Assurance
```bash
npm run quality:pipeline      # Comprehensive quality audit
npm run test:real-world       # Real-world user flow testing
npm run test:performance      # Performance monitoring
npm run cache:protect         # Protect critical cache files
```

## Building and Running

### Development Mode
The dev server runs both frontend (Vite on port 3000) and backend (Express on port 5000) concurrently:
```bash
npm run dev
```
- Frontend proxies `/api/*` requests to backend (configured in `vite.config.ts`)
- Vite HMR (Hot Module Replacement) enabled for fast development

### Production Build
```bash
npm run build            # Builds both client and server
npm run start            # Runs production server
```
- Client builds to `dist/public/`
- Server builds to `dist/index.cjs` (esbuild)
- Static files served from `dist/public/` in production

### Environment Variables Required
```env
DATABASE_URL=           # PostgreSQL URL (production) or file:sqlite.db (dev)
OPENAI_API_KEY=         # OpenAI API key (optional, graceful fallback)
SESSION_SECRET=         # Express session secret
NODE_ENV=               # development | production | test
```

## Testing Strategy

### Test Organization
```
tests/
├── components/         # React component tests (@testing-library/react)
├── integration/        # API integration tests (supertest)
├── e2e/               # End-to-end tests
├── data/              # Data validation tests
├── load/              # Load testing (k6 scripts)
└── setup.ts           # Jest setup with @testing-library/jest-dom
```

### Running Specific Tests
```bash
npm run test:utils              # Utils tests only
npm run test -- --watch         # Watch mode
npm run test -- LessonCard      # Run specific test file
```

### Test Configuration
- Environment: `jsdom`
- Framework: Jest 30.2.0 with ts-jest
- Path aliases: `@/*` → `client/src/*`, `@shared/*` → `shared/*`
- Coverage thresholds: 60% across all metrics

## Code Patterns & Conventions

### Path Aliases (TypeScript & Vite)
```typescript
import { Button } from "@/components/ui/button"          // Client components
import { users, lessons } from "@shared/schema"          // Shared schemas
import { storage } from "@server/storage"                // Server modules
```

### Component Structure
- **UI Components:** Radix UI primitives + shadcn/ui styling
- **Routing:** Wouter (lightweight, ~1KB)
- **State Management:** TanStack Query (React Query) for server state
- **Styling:** Tailwind CSS 3.4.17 with custom utilities
- **Animations:** Framer Motion 11.13.1

### API Patterns
All backend routes follow RESTful conventions in `server/routes.ts`:
- `GET /api/lessons` - Fetch all lessons
- `GET /api/lessons/:id` - Fetch single lesson with vocabulary
- `POST /api/progress/:lessonId` - Mark lesson complete (authenticated)
- `POST /api/chat` - AI chat endpoint
- `POST /api/ai/video-chat` - AI video call endpoint

**Authentication:** Passport.js local strategy. Protected routes check `req.isAuthenticated()`

### Data Access Layer
Always use `storage` abstraction (`server/storage.ts`) instead of direct DB queries:
```typescript
// Good
const lessons = await storage.getLessons()
await storage.markLessonComplete(userId, lessonId, true)

// Avoid direct DB access
const lessons = await db.select().from(lessons) // Only use in storage.ts
```

## Grade 9+ Quality System

The platform implements a comprehensive quality validation system:
- **Content Completeness:** All lessons must have Hindi translations, vocabulary, and exercises
- **Pedagogical Value:** Lessons follow progressive difficulty (Beginner → Advanced)
- **Bilingual Support:** Every UI element has Hindi translation
- **Accessibility:** WCAG 2.1 AA compliant
- **Performance:** Lighthouse score 95+ target

Quality audit script: `scripts/comprehensive-lesson-audit.ts`

## Critical Files & Their Purposes

### Configuration
- `vite.config.ts` - Vite build configuration with optimized chunking for learning app
- `tsconfig.json` - TypeScript config with path aliases
- `jest.config.cjs` - Jest configuration with path mapping
- `drizzle.config.ts` - Drizzle ORM configuration

### Core Application
- `server/index.ts` - Express server entry point with health monitoring
- `client/src/App.tsx` - React app entry with lazy-loaded routes
- `shared/schema.ts` - Single source of truth for database schema

### Deployment
- `Dockerfile` - Production container build
- `vercel.json` - Vercel deployment configuration
- `.github/workflows/ci.yml` - CI/CD pipeline (tests, linting, security audit)

## OpenAI Integration Details

**Service File:** `server/lib/ai/index.ts` or `server/chat-service.ts`

The AI service has built-in resilience:
- Automatic fallback to mock responses if API key missing
- Rate limiting protection (100 requests per 15 minutes)
- Error handling with graceful degradation
- Health check endpoint: `GET /api/ai/health`

When working with AI features:
1. Check `process.env.OPENAI_API_KEY` availability
2. Use try-catch for all AI calls
3. Provide Hindi translations for all AI-generated content
4. Log AI errors to `server/logger.ts`

## Hindi Learning Features

The platform includes specialized Hindi learning components in `client/src/components/`:
- `HindiComponents/` - Core bilingual UI components
- `HindiLearning/` - Interactive Hindi learning modules
- `HindiStories/` - Story-based learning
- `HindiGames/` - Gamified learning exercises
- `gamification/` - XP, levels, streaks, achievements

All Hindi content uses:
- **Font:** Noto Sans Devanagari (optimized rendering)
- **Transliteration:** Roman to Devanagari where helpful
- **Cultural Context:** Examples relevant to Indian learners

## Deployment

### Production Platforms
- **Primary:** Vercel (configured via `vercel.json`)
- **Database:** Neon/Supabase PostgreSQL
- **Build Command:** `npm run vercel-build`
- **Start Command:** `npm run start`

### Pre-deployment Checklist
1. Run `npm run check:full` - Verify no TypeScript errors
2. Run `npm test` - All tests passing
3. Run `npm run audit:lessons` - Content quality validation
4. Verify `.env` variables are set in platform
5. Run `npm run build` locally to test build

### Health Monitoring
Production endpoints:
- `GET /api/health` - Enhanced health check with DB, memory, CPU status
- `GET /api/status` - Detailed system status
- `GET /api/ai/health` - OpenAI service health

## Performance Optimization

### Build Optimization (Vite)
The app uses manual chunking strategy:
- `vendor-react` - React, Wouter
- `vendor-query` - TanStack Query
- `vendor-ui-radix` - Radix UI components
- `vendor-animations` - Framer Motion
- `grammar-engine` - Grammar logic utilities
- `audio-engine` - Speech/audio services
- `learning-components` - Hindi components

### Frontend Performance
- Lazy loading for all routes
- Code splitting by feature
- Asset inlining for files < 4KB
- Web Vitals monitoring enabled
- Preloading critical resources (audio, grammar engine)

### Backend Performance
- Response caching for lesson data
- Database query optimization (Drizzle ORM)
- Rate limiting on all `/api/*` routes
- Compression middleware in production

## Common Development Tasks

### Adding a New Lesson Category
1. Update `shared/schema.ts` if new fields needed
2. Add category to `lessons` table via migration
3. Create content in `client/src/data/` or use `npm run generate:lessons`
4. Add Hindi translations to both content and UI
5. Run `npm run audit:lessons` to validate

### Adding a New API Endpoint
1. Define route in `server/routes.ts`
2. Add data access method in `server/storage.ts` if needed
3. Update shared types in `shared/schema.ts`
4. Create integration test in `tests/integration/`
5. Update API client in `client/src/services/`

### Modifying Database Schema
1. Update `shared/schema.ts` with new fields/tables
2. Run `npm run db:push` to apply changes
3. Create migration script in `scripts/` if data transformation needed
4. Update TypeScript types (auto-generated from schema)
5. Update `server/storage.ts` data access methods

### Adding Tests
1. Component tests: `tests/components/ComponentName.test.tsx`
2. Use `@testing-library/react` for component testing
3. Mock API calls with MSW (configured in `tests/setup.ts`)
4. Follow existing patterns for auth mocking and route wrapping
5. Ensure all tests clean up properly (no open handles)

## Troubleshooting

### Build Errors
- **TypeScript errors:** Run `npm run check:full` to see all errors
- **Module resolution:** Check path aliases in `tsconfig.json` and `vite.config.ts`
- **Dependency issues:** Delete `node_modules/` and run `npm install`

### Test Failures
- **Hanging tests:** Tests use `maxWorkers=1` and `forceExit` - check for unclosed connections
- **Import errors:** Verify path aliases in `jest.config.cjs` match tsconfig
- **Timeout errors:** Increase `testTimeout` in jest.config or optimize async operations

### Database Issues
- **Schema mismatch:** Run `npm run db:push` to sync schema
- **Connection errors:** Verify `DATABASE_URL` in `.env.local`
- **SQLite vs PostgreSQL:** Code handles both - check `server/db.ts` for switching logic

### AI Service Issues
- **API key missing:** System falls back to mock mode gracefully
- **Rate limiting:** Check `/api/ai/health` endpoint
- **Timeout errors:** Default timeout is 30s - may need adjustment for complex prompts
