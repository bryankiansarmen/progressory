# Design: Exercise Library UI

## Context
The Exercise Library will be the user's primary database of movements. It needs to be fast, searchable, and visually appealing.

## Goals / Non-Goals

**Goals:**
- Provide a responsive grid of exercises.
- Implement real-time fuzzy search and categorical filtering.
- Create a streamlined form for custom exercises using shadcn/ui components.
- Use the established Service Layer for all DB interactions.

**Non-Goals:**
- Implementing "Exercise Details" pages (will keep it modal-based or summary-based for now).
- Implementing "Add to Workout" flow (scoped to Workout Builder change).

## Decisions

### Decision 1: Client-Side Searching & Filtering
For the MVP, we will fetch all exercises once and perform search/filtering on the client.
- **Rationale**: The library is expected to be <1000 items, client-side search is near-instant and doesn't load the server.
- **Implementation**: `useMemo` for filtering the list based on state.

### Decision 2: shadcn/ui Component Usage
We will utilize `shadcn/ui` for:
- `Input`: Search bar.
- `Select` / `Badge`: Filters and tags.
- `Dialog`: Custom exercise form.
- `Card`: Individual exercise display.

### Decision 3: "Empty" States
We will implement "No exercises found" and "No custom exercises yet" states to guide the user.

## Risks / Trade-offs
- **Initial Load**: Fetching all exercises at once might grow slow if the library hits tens of thousands of items (unlikely for a fitness app library).
- **Mitigation**: Implement pagination or server-side searching if performance degrades.

## Component Hierarchy
```
ExerciseLibraryPage (Server Component)
└── ExerciseLibraryContainer (Client Component)
    ├── ExerciseFilters (Search + Selects)
    ├── ExerciseGrid
    │   └── ExerciseCard (Name, Category, Muscle Group, Tag)
    └── CreateExerciseModal (Add New Exercise Form)
```
