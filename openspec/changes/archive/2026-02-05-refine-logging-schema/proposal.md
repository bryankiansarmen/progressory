# Proposal: Refine Logging Schema

## Why
The current workout logging structure is too simplified (placeholder). To support progress tracking, strength analytics, and a "checkmark" based user experience, we need a relational structure that tracks individual sets and their completion status.

## What Changes
- Introduce `Set` and `WorkoutLogEntry` models.
- Establish relationships between `WorkoutLog`, `WorkoutLogEntry`, and `Set`.
- Enable set-by-set tracking with completion status (`isDone`).

## Capabilities

### New Capabilities
- **Granular Logging**: Requirements for tracking individual sets, reps, and weight within a workout session.

### Modified Capabilities
- **Database Schema**: Update the data model to support normalized logging instead of catch-all logs.

## Impact
- `prisma/schema.prisma`: Significant schema update and migration.
- `types/index.ts`: Update TypeScript interfaces to match new relational structure.
