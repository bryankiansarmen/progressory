# ADDED Requirements

### Requirement: Real-time PR Comparison
The system MUST compare the performance of each completed set against historical data to identify personal records immediately.

#### Scenario: Calculating and Comparing 1RM
- **WHEN** a set is marked as completed (`isDone: true`) in the workout player
- **THEN** the system MUST calculate the estimated 1RM for that set using the Brzycki formula: `weight * (36 / (37 - reps))`
- **AND** it MUST compare this 1RM against the highest 1RM found in the `trendsData` for that specific exercise
- **AND** if the new 1RM is higher, the set MUST be flagged as a "New PR" for the current session

### Requirement: Personal Record Celebration
The system MUST provide immediate, high-impact visual feedback to the user when a PR is achieved.

#### Scenario: Triggering Celebration Effects
- **WHEN** a set is flagged as a "New PR"
- **THEN** the system MUST trigger a full-screen confetti effect using `canvas-confetti`
- **AND** it MUST display a toast or badge labeled "New Personal Record!"
- **AND** it SHOULD trigger a unique haptic feedback pattern on supported mobile devices
