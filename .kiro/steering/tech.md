# Technology Stack

PREET_ENGLISH is built as a full-stack TypeScript monorepo with modern web technologies optimized for performance and scalability.

## Frontend Stack
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 7.3.0 for fast development and optimized builds
- **Styling**: Tailwind CSS 3.4.17 with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui components
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state, React hooks for local state
- **Animations**: Framer Motion for smooth interactions

## Backend Stack
- **Runtime**: Node.js with Express.js 4.21.2
- **Database**: SQLite (development) / PostgreSQL (production) with Drizzle ORM 0.39.3
- **Authentication**: Passport.js with local strategy
- **Session Management**: Express-session with MemoryStore
- **AI Integration**: OpenAI API 6.15.0 for language processing

## Development Tools
- **Package Manager**: npm with Node.js 18+
- **TypeScript**: 5.6.3 with strict configuration
- **Testing**: Jest 30.2.0 with React Testing Library
- **Database Migrations**: Drizzle Kit for schema management
- **Build**: ESBuild for server bundling, Vite for client

## Design System
- **Primary Color**: Hulu Green (#1CE783) for brand consistency
- **Theme**: Dark mode support with CSS variables
- **Typography**: Custom font stack with display, sans, and mono variants
- **Components**: Glassmorphism effects with subtle animations

## Common Commands

### Development
```bash
npm run dev              # Start development server
npm run check           # TypeScript type checking
npm run test            # Run test suite
npm run test:watch      # Run tests in watch mode
```

### Database
```bash
npm run db:push         # Push schema changes to database
npm run migrate         # Run lesson migrations
npm run backup:db       # Backup database
```

### Build & Deploy
```bash
npm run build           # Build for production
npm run start           # Start production server
npm run vercel-build    # Build for Vercel deployment
```

### Content Management
```bash
npm run generate:lessons    # Generate new lessons
npm run audit:lessons      # Audit lesson quality
npm run enrich:lessons     # Enrich existing lessons
```

## Environment Variables
Required environment variables (see `.env.example`):
- `DATABASE_URL`: Database connection string
- `OPENAI_API_KEY`: OpenAI API key for AI features
- `SESSION_SECRET`: Session encryption secret

## Architecture Patterns
- **Monorepo Structure**: Client, server, and shared code in single repository
- **API-First**: RESTful API design with shared TypeScript schemas
- **Component-Driven**: Reusable UI components with consistent design system
- **Progressive Enhancement**: Core functionality works without JavaScript
- **Responsive Design**: Mobile-first approach with desktop enhancements