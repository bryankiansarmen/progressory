## Context

The `ExercisePicker` component is currently a "dumb" component that receives all exercises as a prop. This causes issues when the dataset exceeds the default server-side limit (currently 20). The `ExerciseLibraryContainer` already implements an infinite scroll pattern with `IntersectionObserver` and server-side fetching, but this logic is not shared with the `ExercisePicker`.

## Goals / Non-Goals

**Goals:**
- Implement infinite scroll and server-side search within `ExercisePicker`.
- Decouple `WorkoutBuilderContainer` from initial exercise data fetching.
- Reuse logic from `ExerciseLibraryContainer` where possible to maintain consistency.
- Ensure the picker remains performant with high-frequency search input (debouncing).

**Non-Goals:**
- Modifying the `exercise.service.ts` API.
- Changing the visual design of the `ExercisePicker` (only internal logic changes).
- Implementing caching beyond the current session's state.

## Decisions

- **Internal Data Management**: `ExercisePicker` will use `useEffect` and `useState` to manage its own list of exercises, search query, and pagination state (offset, hasMore, isLoading).
- **Intersection Observer**: An invisible "sentinel" div will be placed at the bottom of the picker's scrollable area to trigger `loadMore` calls.
- **Search Debouncing**: Implement a 300ms debounce on the search input to prevent excessive API calls.
- **Service Integration**: Directly call `getExercises` from `services/exercise.service.ts`. Note: This is a "use server" function, so it can be called directly from client components in Next.js.

## Risks / Trade-offs

- **[Risk] State Complexity** → The `ExercisePicker` will become more complex as it now manages its own side effects. This will be mitigated by keeping the pagination logic clean and similar to the existing `ExerciseLibraryContainer`.
- **[Risk] Multiple API calls** → If a user opens/closes the picker frequently, it might re-fetch data. However, since the builder is usually a focused task, this is acceptable compared to loading 1000+ items upfront.
- **[Trade-off] Client-side vs Server-side** → Moving data fetching to the picker makes it a heavier "smart" component, but simplifies the parent page and builder container.

## Open Questions

- Should we implement a global cache/store for exercises to avoid re-fetching when the picker is closed and reopened? *Decision: For now, keeping it simple within the component state. We can add a cache later if performance becomes an issue.*
