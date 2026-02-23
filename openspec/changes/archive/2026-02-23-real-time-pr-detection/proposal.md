## Why

Workout tracking is more engaging when accomplishments are recognized immediately. Currently, users see PRs on the dashboard after the session, but providing immediate positive reinforcement during the workout increases motivation and perceived value of the application.

## What

Implement real-time Personal Record (PR) detection and celebration within the workout player. When a user completes a set that exceeds their previous best performance for that exercise (based on estimated 1RM calculated via the Brzycki formula), the system will trigger a visual "Personal Record" celebration.

## Scope

**In-Scope:**
- Real-time comparison of completed sets against historical `trendsData` provided to the `WorkoutPlayerContainer`.
- Visual celebration UI (e.g., confetti effect, specialized toast, or badge animation).
- Haptic feedback (on supported devices) when a PR is hit.
- Update to `WorkoutPlayerContainer` to manage PR detection state.

**Out-of-Scope:**
- Changes to the persistent database schema.
- Long-term PR history charts (already handled).
- Social sharing features for PRs.

## Impact

- **`WorkoutPlayerContainer.tsx`**: Will now handle PR detection logic when a set is marked as done.
- **`ExerciseLoggingCard.tsx` / `SetLoggingRow.tsx`**: UI updates to display PR celebrations.
- **Performance**: Negligible, as history data is already fetched for predictions.
- **New Dependency**: `canvas-confetti` (already in `package.json`).
