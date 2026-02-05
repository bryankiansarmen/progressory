# Implementation Plan: Exercise Library UI

## Goal
Create a modern, searchable, and interactive Exercise Library where users can browse existing movements and create their own custom exercises.

## Proposed Changes

### UI & Pages
- **[NEW] `app/exercises/page.tsx`**: The main route for the exercise library.
- **[NEW] `components/exercise/ExerciseLibraryContainer.tsx`**: Client-side state manager for search/filters.
- **[NEW] `components/exercise/ExerciseCard.tsx`**: Individual exercise display component.
- **[NEW] `components/exercise/ExerciseFilters.tsx`**: Search input and selection filters.
- **[NEW] `components/exercise/CreateExerciseDialog.tsx`**: Dialog/Form for custom exercise creation.

### Style & Aesthetics
- Implement vibrant tags for muscle groups (e.g., Chest = Blue, Legs = Green).
- Add smooth hover effects and glassmorphism elements to the cards.
- Ensure full dark-mode support.

## Verification Plan

### Automated Verification
- Run `npx tsc --noEmit` to ensure type safety between the new UI and the existing service layer.

### Manual Verification
1. **Browse & Search**:
    - Open `/exercises`.
    - Type "Bench" in the search bar. Verify only bench-related exercises appear.
    - Select "Legs" from the muscle group filter. Verify only leg exercises appear.
2. **Custom Exercise Creation**:
    - Click "Add Exercise".
    - Fill out the form with "My Custom Push-up" (Muscle: Chest, Category: Strength).
    - Save and verify it appears in the list with a "Custom" badge.
    - Check the SQLite database via `npx prisma studio` to confirm persistence.
