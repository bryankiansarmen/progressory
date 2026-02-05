# Tasks: Implement Database Schema

## 1. Setup

- [x] 1.1 Install dependencies (`prisma`, `@prisma/client`).
- [x] 1.2 Initialize Prisma with SQLite (`npx prisma init --datasource-provider sqlite`).

## 2. Model Definition

- [x] 2.1 Update `prisma/schema.prisma` with `User`, `Workout`, `Exercise`, `WorkoutLog` models.
- [x] 2.2 Run migration to create database file (`npx prisma migrate dev --name init`).

## 3. Client Implementation

- [x] 3.1 Create `lib/db/index.ts` (or `lib/db.ts`) for singleton PrismaClient instance.

## 4. Verify

- [x] 4.1 Verify `node_modules/.prisma` exists (client generated).
- [x] 4.2 Verify `prisma/dev.db` exists.
