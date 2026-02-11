## Context

The current training program system only allows for creation and deletion. Users cannot edit programs, which is a significant usability gap. The database schema supports `Program` and `ProgramDay` relations, where `ProgramDay` records may have associated `WorkoutLog` entries. 

## Goals / Non-Goals

**Goals:**
- Enable editing of program metadata (name, description).
- Enable adding, removing, and reordering workouts (days) within a program.
- Preserve existing workout logs during program updates (Smart Sync).
- Provide clear UI entry points for editing.

**Non-Goals:**
- Versioning of programs (keeping old versions of a program after editing).
- Bulk editing of multiple programs.
- Changing the `userId` of a program.

## Decisions

### 1. "Smart Sync" Update Strategy
To avoid orphaning `WorkoutLog` entries that point to `ProgramDay` records, we will use a "fetch-diff-apply" approach in a Prisma transaction.

- **Rationale**: Simply deleting all `ProgramDay` records and recreating them would break foreign key constraints or orphan existing logs.
- **Implementation**:
    1. Fetch current `ProgramDay` records for the program.
    2. Compare with the incoming list of days.
    3. **Update** existing days (match by ID if provided, otherwise by position) to update their `workoutId` and `dayNumber`.
    4. **Create** new `ProgramDay` records for additions.
    5. **Delete** removed `ProgramDay` records (Note: This might still fail if logs exist for that specific day, which is the correct behavior—we should warn the user or prevent deletion of days with logs).

### 2. ProgramBuilder Component Refactor
Transform `ProgramBuilder` into a dual-purpose component.

- **Rationale**: The logic for building a program (selecting workouts, reordering days) is identical for creation and editing.
- **Implementation**:
    - Add `initialData?: Program` prop.
    - Initialize state from `initialData` if present.
    - Add `id` to the `days` state objects to track existing database records.

### 3. Edit Route Pattern
Use Next.js dynamic routing: `app/programs/[id]/edit/page.tsx`.

- **Rationale**: Follows standard RESTful patterns and allows for server-side fetching of the program data to ensure a fast initial load of the editor.

## Risks / Trade-offs

- **[Risk] Deleting a day with existing logs** → **Mitigation**: In the first iteration, Prisma's `onDelete: Cascade` (if set) or foreign key constraints will prevent deletion or delete logs. We should ideally check for logs before deleting a `ProgramDay` and warn the user.
- **[Trade-off] Complexity of Update Logic** → **Rationale**: Using a single transaction with diffing logic is more complex than a "delete and recreate" but is necessary for data integrity.
