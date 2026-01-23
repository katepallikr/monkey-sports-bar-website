# 5 Monkeys Sports Bar & Restaurant

## Overview

A full-stack web application for 5 Monkeys Sports Bar & Restaurant - a sports-themed bar and restaurant chain. The application serves as the public-facing website featuring menu browsing, location finder, daily specials, email newsletter subscription (5M Club), and company information pages. Built with React frontend and Express backend, using PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state caching and synchronization
- **Styling**: Tailwind CSS with custom theme configuration supporting dark mode and brand colors (orange primary #F15A24)
- **UI Components**: shadcn/ui component library (New York style) built on Radix UI primitives
- **Animations**: Framer Motion for page transitions and interactive elements
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers
- **Typography**: Oswald (display/headings) and Open Sans (body text) from Google Fonts

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Build System**: 
  - Development: tsx for TypeScript execution
  - Production: esbuild for server bundling, Vite for client bundling
- **API Structure**: RESTful endpoints defined in `shared/routes.ts` with Zod schemas for request/response validation
- **File Uploads**: Uppy with presigned URL flow to Google Cloud Storage via Replit's object storage integration

### Data Storage
- **Database**: PostgreSQL via Drizzle ORM
- **Schema Location**: `shared/schema.ts` - defines tables for categories, menuItems, locations, specials, and subscribers
- **Migrations**: Drizzle Kit with `db:push` command for schema synchronization
- **Relationships**: Categories have many menu items (one-to-many relation)

### Key Data Models
- **Categories**: Menu sections (appetizers, entrees, etc.) with sort order
- **Menu Items**: Individual dishes with pricing (stored in cents), calories, allergens, and featured/new flags
- **Locations**: Restaurant locations with addresses, hours (JSON), coordinates, and features array
- **Specials**: Daily deals with day-of-week association and date ranges
- **Subscribers**: Email newsletter signups

### Project Structure
```
├── client/           # React frontend
│   └── src/
│       ├── components/   # Reusable UI components
│       ├── hooks/        # Custom React hooks (use-menu, use-locations, etc.)
│       ├── pages/        # Route components (Home, Menu, Locations, etc.)
│       └── lib/          # Utilities and query client
├── server/           # Express backend
│   ├── routes.ts     # API route handlers
│   ├── storage.ts    # Database access layer (IStorage interface)
│   └── db.ts         # Drizzle database connection
├── shared/           # Code shared between client/server
│   ├── schema.ts     # Drizzle table definitions
│   └── routes.ts     # API route definitions with Zod schemas
└── migrations/       # Database migrations
```

## External Dependencies

### Database
- **PostgreSQL**: Primary data store, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries and schema management

### Cloud Services
- **Google Cloud Storage**: File/image uploads via Replit's object storage sidecar (localhost:1106)
- **Uppy**: Client-side file upload handling with presigned URL workflow

### Third-Party UI Libraries
- **Radix UI**: Headless UI primitives (dialogs, dropdowns, tabs, etc.)
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel component
- **Vaul**: Drawer component
- **cmdk**: Command palette component

### Development Tools
- **Vite**: Frontend build tool with HMR
- **esbuild**: Server bundling for production
- **TypeScript**: Full-stack type safety with path aliases (@/, @shared/)