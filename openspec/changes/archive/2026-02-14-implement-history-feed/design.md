# Design: Implement History Feed

## Architecture Overview
The History Feed will follow the existing Service Layer pattern, utilizing Next.js Server Actions to fetch data from Prisma.

## Components

### 1. `HistoryPage` (`app/history/page.tsx`)
- Refactor from a placeholder to a Server Component.
- Fetch history data using the `getHistory` service action.
- Pass data to a `HistoryFeed` component.

### 2. `HistoryFeed` (`components/history/HistoryFeed.tsx`) [NEW]
- A container component that iterates over the logs.
- Implements empty states for users with no history.

### 3. `HistoryLogCard` (`components/history/HistoryLogCard.tsx`) [NEW]
- A card component for individual sessions.
- Displays:
    - Date (formatted)
    - Workout Template Name
    - Total Volume (calculated from sets)
    - Session duration
    - Exercise count

## Service Layer

### `stats.service.ts` (Expansion)
We will expand the existing `stats.service.ts` to include history retrieval logic, rather than creating a new service file, as history and stats are closely linked in the domain.

- **New Function**: `getHistory(userId, limit, offset)`
    - Fetches `WorkoutLog` entries.
    - Includes `entries`, `sets`, and `workout` (template) relations.
    - Orders by `date` DESC.

## Data Layer Refinement
No schema changes are required as the `WorkoutLog`, `WorkoutLogEntry`, and `Set` tables already exist and contain the necessary fields.

## Risks & Considerations
- **Performance**: Deeply nested includes in Prisma (`workoutLog` -> `entries` -> `sets`) can be heavy. We should use `select` to minimize payload size if history grows large.
- **Pagination**: Initial implementation will be simple, but the design should support `limit` and `offset` for future scalability.
