# Tasks: Implement Infinite Scroll

## 1. Core Service
- [x] 1.1 Update `getExercises` to support server-side filtering and pagination.
- [x] 1.2 Update types to match new service signature.

## 2. UI Implementation
- [x] 2.1 Refactor `ExerciseLibraryContainer` to use paginated state.
- [x] 2.2 Implement `InfiniteLoader` component using `IntersectionObserver`.
- [x] 2.3 Add loading skeletons/indicators for smoother transitions.

## 3. Verification
- [x] 3.1 Verify that scrolling to bottom loads more items.
- [x] 3.2 Verify that filters reset pagination and scroll position.
- [x] 3.3 Verify empty states when no results are found.
