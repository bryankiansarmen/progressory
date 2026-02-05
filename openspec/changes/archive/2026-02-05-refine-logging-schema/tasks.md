# Tasks: Refine Logging Schema

## 1. Schema Updates

- [x] 1.1 Update `prisma/schema.prisma` to include `WorkoutLogEntry` and `Set` models.
- [x] 1.2 Refine `WorkoutLog` model to replace placeholder logic with relations to `WorkoutLogEntry`.
- [x] 1.3 Add `@onDelete(Cascade)` to ensure sets and entries are cleaned up with their parent log.

## 2. Migrations

- [x] 2.1 Run `npx prisma migrate dev --name refine_logging_schema` to apply changes to SQLite.

## 3. Type Sync

- [x] 3.1 Update `types/index.ts` to include `WorkoutLogEntry` and `Set` interfaces.
- [x] 3.2 Ensure proper exports for use in the service layer.

## 4. Verification

- [x] 4.1 Verify Prisma Client regeneration (`npx prisma generate`).
- [x] 4.2 Inspect `prisma/dev.db` using Prisma Studio (`npx prisma studio`) to confirm new tables.
