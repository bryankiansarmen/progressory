# Design: Database Schema

## Context
We are introducing the persistence layer. We've chosen Prisma ORM. Currently, there is no database setup.

## Goals / Non-Goals

**Goals:**
- operational Prisma Client instance.
- SQLite database file created.
- Schema matching the Specs.

**Non-Goals:**
- Deployment to production DB (Postgres/MySQL) - sticking to SQLite for local dev MVP.
- Complex auth tables (NextAuth/Auth.js specific tables) - minimal User model for now.

## Decisions

### Decision 1: SQLite for Storage
We will use SQLite (file-based).
- **Reasoning**: Zero config, easy to share (gitignored, but easy to recreate), perfect for version 1.
- **Trade-off**: Not scalable for multi-region, but fine for single-instance MVP.

### Decision 2: ID Format
We will use CUIDs (Collision Resistant Unique Identifiers) for primary keys.
- **Reasoning**: Better than auto-increment integers for security (unguessable) and distributed systems.
- **Example**: `id String @id @default(cuid())`

### Decision 3: Singleton Client
We will implement the PrismaClient as a singleton in `lib/db/index.ts`.
- **Reasoning**: Next.js hot-reloading can exhaust database connections if we create a new client on every file save.

## Risks / Trade-offs
- **Risk**: SQLite limitations (no enums in older versions, limited concurrency).
- **Mitigation**: Standard Prisma abstractions usually handle this well; we aren't using complex features yet.
