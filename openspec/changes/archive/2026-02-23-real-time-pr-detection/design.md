## Context

The `WorkoutPlayerContainer` already receives `trendsData` as a prop, which contains the last few logs for each exercise. Currently, this data is used for display purposes and pre-filling. The system uses the Brzycki formula (`calculateBrzycki1RM` in `@/lib/utils/analytics`) for 1RM estimations throughout the app.

## Design

### 1. Detection Logic
The PR check will be integrated into the `handleToggleSetDone` function in `WorkoutPlayerContainer.tsx`. 

- **Calculation**: Create a small utility or use the existing `calculateBrzycki1RM` to get the 1RM of the newly completed set.
- **Comparison**: Find the `maxHistory1RM` by iterating through `trendsData[exerciseId]` sets and calculating their 1RMs.
- **Trigger**: If `current1RM > maxHistory1RM`, trigger the PR flow.

### 2. State & UI Feedback
- **Local State**: We do not necessarily need a new state burial in the database for "active session PRs", but we can keep a local `achievedPrs` set in the component to avoid re-triggering the celebration if a user toggles a set off and on again.
- **Visuals**: 
    - Use `canvas-confetti` for a burst effect.
    - Update `SetLoggingRow` to accept an `isPR` boolean to show a subtle "PR" badge/glow next to the "Done" checkmark.
- **Haptics**: Use `navigator.vibrate([100, 50, 100])` for a "double tap" feel on PR achievement.

### 3. Progressive Overload Synergy
The PR detection should leverage the `targetWeight` from the existing `prediction-engine.ts` to show the user how close they are to a PR before they even start the set.

## Risks / Trade-offs

- **Offline / No History**: If a user is starting a workout without any historical data (e.g., first time or cache cleared while offline), PR detection will not trigger. This is an acceptable trade-off for MVP.
- **Performance**: Calculating 1RM for ~3 sets on a single click is negligible on modern devices.
