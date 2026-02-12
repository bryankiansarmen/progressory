## Why

Native browser dialogs (`window.confirm` and `alert`) are visually inconsistent with Progressory's modern, glassmorphic UI and block the main execution thread. Implementing a unified, custom interaction system will provide a more polished user experience and better developer ergonomics through a promise-based API.

## What Changes

- **New Component: `ConfirmationModal`**: A styled, high-radius modal with glassmorphic backdrops for destructive and informative actions.
- **New Hook: `useConfirm`**: A context-based hook providing an asynchronous `confirm()` function to replace native dialogs.
- **Refactored Components**: Replace all instances of `window.confirm` and `alert` in `WorkoutCard`, `ProgramCard`, and `ExerciseCard` with the new unified system.
- **Global Provider**: Wrap the application in an `InteractionProvider` to manage global modal state.

## Capabilities

### New Capabilities
- `unified-interaction-system`: Provides a centralized, custom-styled system for user confirmations and alerts.

### Modified Capabilities
- `exercise-archiving`: Update requirements to specify custom modal confirmation instead of native `confirm`.
- `workout-template-management`: Update requirements for workout deletion to use the unified interaction system.
- `workout-programs`: Update requirements for program deletion to use the unified interaction system.

## Impact

- **New Files**: `components/layout/InteractionProvider.tsx`, `hooks/useInteraction.ts`.
- **Modified Components**: `WorkoutCard.tsx`, `ProgramCard.tsx`, `ExerciseCard.tsx`.
- **Global Layout**: `app/layout.tsx` will need to include the new provider.
