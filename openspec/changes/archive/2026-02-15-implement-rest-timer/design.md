# Design: Rest Timer Logic

## Architecture

The rest timer will be implemented as a specialized state within the `WorkoutPlayerContainer` to ensure it persists across exercise swaps and navigation within the workout player.

### Component Structure
- `RestTimerDisplay`: A floating or sticky UI component that shows the countdown.
- `useRestTimer` (Optional Hook): To encapsulate interval management and sound/haptic triggers.

### State Management
- `restTimeRemaining`: Number (null when inactive).
- `isResting`: Boolean.
- `timerEndTime`: Date (to calculate remaining time accurately if the app loses focus or re-renders).

## Implementation Details

### Data Model Changes
```prisma
model Exercise {
  // ... existing fields
  restTime Int @default(90) // Default rest time in seconds
}
```

### Logical Flow
1. User completes a set in `ExerciseLoggingCard`.
2. `onToggleDone` called in `WorkoutPlayerContainer`.
3. If new state is `done`:
   - Fetch `restTime` for the current exercise.
   - Set `restTimeRemaining` and start `setInterval`.
4. Visual cues:
   - Progress ring around the timer.
   - Color shifts (e.g., amber for resting, green when ready).

## Risks & Trade-offs

- **Risk**: Precision on mobile browser backgrounding.
  - **Solution**: Use `timerEndTime` comparison instead of just decrementing a state variable.
- **Trade-off**: Putting state in `WorkoutPlayerContainer` instead of a global Store.
  - **Decision**: `WorkoutPlayerContainer` is sufficient for now since the timer is only relevant during an active session.
