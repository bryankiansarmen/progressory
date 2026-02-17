# Implementation Tasks: Smart Predictive Entry

## 1. Service Layer
- [x] 1.1 Implement `getExerciseTrends(userId, exerciseId, count=3)` in `logging.service.ts`.
- [x] 1.2 Update `getLatestLogsForExercises` to potentially leverage the new trend data or provide a `trends` map.

## 2. Prediction Logic (Utils)
- [x] 2.1 Create `lib/prediction-engine.ts` to house `calculatePrediction` logic.
- [x] 2.2 Implement logic to detect "Successful Session" (all sets performed) vs "Stall".
- [x] 2.3 Add support for configurable progression increments (default +2.5kg).

## 3. UI Implementation
- [x] 3.1 Update `ExerciseLoggingCard` to accept a `prediction` prop.
- [x] 3.2 Add "Goal" badge UI to the set row.
- [x] 3.3 Style the predicted values as "ghost" text when unedited.

## 4. Orchestration
- [x] 4.1 Update `WorkoutPlayerContainer` to apply predictions in the `useEffect` initialization (if no draft exists).
- [x] 4.2 Ensure `syncDraftSession` is NOT triggered purely by predictive pre-filling (only on user interaction).

## 5. Verification
- [x] 5.1 Verify that a first-time exercise shows "Goal: +2.5kg" from last session.
- [x] 5.2 Verify that clicking "Done" on a predicted row accepts the value.
- [x] 5.3 Verify that resuming a draft overrides predictive data.
