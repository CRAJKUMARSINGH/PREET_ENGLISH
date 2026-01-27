# Project Structure

PREET_ENGLISH follows a monorepo architecture with clear separation of concerns between client, server, and shared code.

## Root Directory Structure
```
├── client/                 # React frontend application
├── server/                 # Express.js backend API
├── shared/                 # Shared TypeScript schemas and types
├── scripts/                # Database migration and content generation scripts
├── tests/                  # Test suites and utilities
├── migrations/             # Database migration files
├── archived_prep/          # Legacy preparation and audit files
└── types/                  # Additional TypeScript type definitions
```

## Client Structure (`client/`)
```
client/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ui/            # Base UI components (shadcn/ui)
│   │   ├── HindiComponents/    # Hindi-specific components
│   │   ├── gamification/  # Gamification-related components
│   │   └── [feature]/     # Feature-specific component groups
│   ├── pages/             # Route-level page components
│   │   ├── Labs/          # Experimental features
│   │   └── Admin/         # Administrative interfaces
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions and services
│   ├── data/              # Static data files and constants
│   └── services/          # API service layers
├── public/                # Static assets
└── index.html             # Entry HTML file
```

## Server Structure (`server/`)
```
server/
├── index.ts               # Main server entry point
├── routes.ts              # API route definitions
├── auth.ts                # Authentication logic
├── db.ts                  # Database connection setup
├── storage.ts             # Data access layer
├── static.ts              # Static file serving
├── vite.ts                # Vite integration for development
├── admin/                 # Admin-specific routes
└── lib/                   # Server utilities
    ├── ai/                # AI integration services
    ├── cache.ts           # Caching utilities
    ├── concurrency.ts     # Concurrency management
    └── SRS.ts             # Spaced Repetition System
```

## Shared Code (`shared/`)
```
shared/
├── schema.ts              # Database schema definitions (Drizzle)
└── routes.ts              # API route type definitions
```

## Component Organization Patterns

### Feature-Based Grouping
Components are organized by feature area:
- `HindiComponents/` - Hindi language specific UI
- `HindiConversation/` - Conversation practice features
- `HindiVocabulary/` - Vocabulary learning components
- `HindiGames/` - Gamified learning activities
- `gamification/` - XP, achievements, streaks

### UI Component Hierarchy
- `ui/` - Base components (Button, Card, Dialog, etc.)
- Feature components - Compose base components
- Page components - Orchestrate feature components

## Data Flow Architecture

### Client-Server Communication
1. **API Routes**: RESTful endpoints in `server/routes.ts`
2. **Shared Types**: Common interfaces in `shared/schema.ts`
3. **Data Layer**: Database operations in `server/storage.ts`
4. **Client Hooks**: Data fetching in `client/src/hooks/`

### Database Schema Organization
- **Core Tables**: users, lessons, vocabulary, progress
- **Gamification**: userStats, achievements, dailyGoals, leaderboard
- **Speaking Practice**: speakingSessions, speakingAttempts, userSpeakingProfiles
- **Content**: stories, scenarios, quizzes, conversations

## File Naming Conventions
- **Components**: PascalCase (e.g., `HindiLearningCard.tsx`)
- **Hooks**: camelCase with `use` prefix (e.g., `use-speaking-practice.ts`)
- **Utilities**: camelCase (e.g., `audioService.ts`)
- **Pages**: PascalCase (e.g., `HindiConversation.tsx`)
- **Types**: PascalCase interfaces, camelCase for variables

## Import Path Aliases
```typescript
"@/*": ["./client/src/*"]        # Client source files
"@shared/*": ["./shared/*"]      # Shared schemas and types
```

## Script Organization
- **Migration Scripts**: `scripts/migrate-*.ts` for data operations
- **Generation Scripts**: `scripts/generate-*.ts` for content creation
- **Audit Scripts**: `scripts/audit-*.ts` for quality assurance
- **Test Scripts**: `scripts/*-test.ts` for automated testing

## Configuration Files
- `vite.config.ts` - Frontend build configuration
- `drizzle.config.ts` - Database migration configuration
- `tailwind.config.ts` - Styling system configuration
- `tsconfig.json` - TypeScript compiler options
- `components.json` - shadcn/ui component configuration

## Development Workflow
1. **Database Changes**: Update `shared/schema.ts` → Run `npm run db:push`
2. **New Features**: Create components in appropriate feature folder
3. **API Changes**: Update `server/routes.ts` and `shared/routes.ts`
4. **Testing**: Add tests in `tests/` matching source structure
5. **Content**: Use scripts in `scripts/` for bulk operations