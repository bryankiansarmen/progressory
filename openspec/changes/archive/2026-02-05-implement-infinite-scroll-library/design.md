# Design: Infinite Scroll Architecture

## Frontend State Management
`ExerciseLibraryContainer` will track:
- `page`: Current page index or skip offset.
- `hasMore`: Boolean to stop observing when end of list is reached.
- `isLoading`: Boolean to prevent multiple simultaneous requests.

## Observation Logic
We will use a small `div` at the bottom of the grid as a Sentinel.
Using `useEffect` with `IntersectionObserver`, we will call `loadMore()` when that div becomes visible.

## Filter Interaction
> [!IMPORTANT]
> When `searchQuery`, `categoryFilter`, or `muscleGroupFilter` changes, the existing list must be cleared, `page` reset to 0, and `hasMore` set to true.

## Backend Support
`getExercises` signature:
```typescript
async (params: { limit: number, skip: number, search?: string, category?: string, muscleGroup?: string })
```
We should move filtering logic to the server to make pagination effective.
