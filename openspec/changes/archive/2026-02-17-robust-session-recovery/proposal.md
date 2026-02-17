# Proposal: Robust Session Recovery

## Problem
Currently, Progressory relies on a basic `localStorage` persistence strategy for active workout sessions. While this works for page refreshes, it has several critical failure modes:
1. **Accidental Overwrites**: If a user has an active session (e.g., "Pull Day") but accidentally starts a new template (e.g., "Push Day"), the existing progress is immediately overwritten in `localStorage` without warning.
2. **Device Dependency**: Progress is locked to a single browser's `localStorage`, offering no recovery if the user switches devices mid-workout.
3. **Implicit Data Loss**: There is no "Conflict Resolution" UI to handle existing session data, leading to a poor user experience if a session was left unfinished.

## Proposed Solution
Implement a "Gym Guard" recovery system that elevates session persistence from a silent background task to a robust, user-aware feature:
1. **Conflict Detection**: Update the session initialization logic to check for existing data in `localStorage`. If the `templateId` mismatches or a session is already active, present a "Resume or Discard" prompt.
2. **Heartbeat Sync**: Introduce a background sync mechanism ("Heartbeat") that persists draft session state to the database (or a more durable cache) periodically.
3. **Smart Re-hydration**: Enhance the `WorkoutPlayerContainer` to prioritize session recovery and ensure the timer and exercise state are accurately restored across refreshes and restarts.

## Impact
- **Affected Components**: `WorkoutPlayerContainer.tsx`, `logging.service.ts`, `app/workouts/active/page.tsx`.
- **Database**: Add a `DraftSession` model or a `status` field to `WorkoutLog` to track in-progress sessions.
- **UI/UX**: New modal/prompt for session conflict resolution.
