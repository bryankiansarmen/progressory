# Design - Smart Predictive Entry

## Context & Objectives
Empower the `WorkoutPlayerContainer` to automatically populate exercise sets with intelligent predictions based on historical data.

## Proposed Design

### 1. Enhanced History Retrieval
Update `logging.service.ts` to include a `getExerciseTrends` action that fetches the last 3 logs for a given exercise. This allows for a more stable prediction than just the single "last log".

### 2. Prediction Engine (Frontend Utility)
Create a `utils/prediction.ts` (or integrate into a hook) to calculate:
- `baseWeight`: The weight used in the most recent successful set.
- `baseReps`: The rep count used in the most recent successful set.
- `targetWeight`: `baseWeight + incrementalload` (calculating based on a 2.5kg default or percentage).

### 3. Progressive "Ghost" Entry
- When a `WorkoutPlayerContainer` is initialized without a saved draft, it will populate `sessionData` using these predictions.
- These values will be "Checkable" (clicking a checkmark accepts the prediction).

### 4. UI Components Update
- **Badge System**: Add a small indicator (e.g., a "Goal" pill) in `ExerciseLoggingCard` that shows the target weight/reps.
- **Color Coding**: Visual cues when the user matches or exceeds the prediction.

## Data Flow
1. Page `workouts/active` fetches `historyTrends` via `logging.service.ts`.
2. `WorkoutPlayerContainer` initializes state.
3. If no draft exists:
    - Apply `calculatePrediction(historyTrends)` to each exercise.
    - Set default values for `SetRecord`.
4. User interacts; sync heartbeat saves these as actual values once modified or checked.
