## Context
The current workout player stores all session progress (sets, reps, weight, time) in local React state. Navigating away or refreshing the page resets this state, leading to data loss. We need a way to persist this state across page loads without requiring a server-side "drafts" system, making `localStorage` the ideal candidate for this MVP.

## Goals / Non-Goals
**Goals:**
- Automatically persist session state on every change.
- Hydrate session state from `localStorage` on player initialization.
- Provide a seamless "resume" experience.
- Clear persisted state upon successful workout logging.

**Non-Goals:**
- Cross-device synchronization (no cloud syncing for drafts).
- Persistent state for multiple concurrent workouts (only one active session is supported).
- Persistence for ad-hoc exercises outside the player.

## Decisions

### 1. Unified Persistence Hook
We will use a specialized `useEffect` in `WorkoutPlayerContainer.tsx` that watches `sessionData`, `seconds`, `activeExerciseIndex`, and `restTimeRemaining`. Any changes will trigger a serialized update to a single `localStorage` key (e.g., `progressory_active_session`).

### 2. Hydration Strategy
On mount, the component will check for the existence of the `localStorage` key. If found, and the `template.id` matches the stored ID, it will hydrate the state.

### 3. Timer Component Refactor
The `useWorkoutTimer` hook will be updated to accept an optional `initialSeconds` parameter, allowing the timer to resume from where it left off.

## Risks / Trade-offs

- **State Desync**: There's a minor risk that `localStorage` could get corrupted or contain stale data if the user opens multiple tabs. We mitigation this by including the `template.id` in the persisted state and validating it on load.
- **Serialization Overhead**: Serializing the entire `sessionData` array on every change might have a small performance impact, but given the small size of workout data (dozen exercises max), it should be negligible.
- **Stale Rest Timer**: If the user refreshes while the rest timer is active, the countdown will start fresh from the persisted value, not accounting for the time elapsed during the refresh. This is acceptable for a first version.
