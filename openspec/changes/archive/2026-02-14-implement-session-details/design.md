# Design: Session Details View

## Context
The goal is to provide a granular drill-down for historical workout data. This requires a new dynamic route and deep nested data fetching using Prisma.

## Goals
- Provide full visibility into exercises, weights, and reps for any past session.
- Maintain consistent visual language with the Workout Player and History Feed.
- Implementation of a data-fetching service that retrieves all relations for a single log.

## Non-Goals
- Editing of historical logs (out of scope for this change).
- Detailed visualization of muscle group distribution (future work).

## Decisions

### 1. Data Layer: Service Expansion
Expand `services/stats.service.ts` to include `getWorkoutLogDetail`.
- **Logic**: Fetch `WorkoutLog` where `id = logId`.
- **Includes**: `workout`, `entries.exercise`, `entries.sets`.
- **Optimization**: Use Prisma's `include` for selective fetching to avoid over-fetching unrelated template data.

### 2. UI Layer: Component Architecture
- **Route**: `app/history/[logId]/page.tsx`
- **Components**:
    - `HistoryLogDetailHeader`: Displays session-level metadata (Volume, Duration, Date).
    - `ExerciseDetailCard`: Maps through session entries, displaying the exercise name and a table of sets.
    - Re-use `Card` and typography tokens for a premium "dashboard" feel.

### 3. Navigation
- Update `HistoryLogCard` in `components/history/HistoryLogCard.tsx` to be a clickable link (or contain a link) to `/history/[logId]`.

## Risks / Trade-offs
- **Deep Nesting**: Nested Prisma includes can be performance-heavy, but since we are fetching a *single* record by ID, the impact is negligible compared to list fetching.
- **Empty Logs**: Gracefully handle cases where a log exists but has no entries (e.g., a session started and immediately finished).
