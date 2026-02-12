## 1. Core Implementation

- [x] 1.1 Create `ConfirmationModal` component with glassmorphic styling
- [x] 1.2 Implement `InteractionProvider` with context and state management
- [x] 1.3 Create `useConfirm` hook exposing the promise-based API
- [x] 1.4 Integrate `InteractionProvider` into `app/layout.tsx`

## 2. Refactor Workout Templates

- [x] 2.1 Update `WorkoutCard` to use `useConfirm` for deletion
- [ ] 2.2 Verify workout deletion flow with new modal

## 3. Refactor Programs

- [x] 3.1 Update `ProgramCard` to use `useConfirm` for deletion
- [x] 3.2 Verify program deletion flow with new modal

## 4. Refactor Exercises

- [x] 4.1 Update `ExerciseCard` (or relevant library component) to use `useConfirm` for archiving
- [x] 4.2 Verify exercise archiving flow with new modal

## 5. Cleanup & Verification

- [x] 5.1 Search codebase for remaining `window.confirm` or `alert` usages
- [x] 5.2 Verify keyboard accessibility (Enter/Escape) for new modals
