# performance-logging Specification

## Purpose
TBD - created by archiving change implement-workout-player. Update Purpose after archive.
## Requirements
### Requirement: Set Entry
The system SHALL allow users to log individual sets for each exercise in the active session.

#### Scenario: Logging a set
- **WHEN** the user enters "80" kg and "10" reps
- **AND** clicks the "Checkmark" (Done)
- **THEN** that set SHALL be marked as complete
- **AND** the values SHALL be saved locally until the session is finished.

### Requirement: History Visualization
The system SHALL display previous session performance (last weight/reps) for the same exercise if available.

#### Scenario: Progress context
- **WHEN** the user is logging a set for "Bench Press"
- **THEN** the system SHALL show "Last: 75kg x 10" as a reference.

### Requirement: Real-time PR Comparison
The system MUST compare the performance of each completed set against historical data to identify personal records immediately.

#### Scenario: Calculating and Comparing 1RM
- **WHEN** a set is marked as completed (`isDone: true`) in the workout player
- **THEN** the system MUST calculate the estimated 1RM for that set using the Brzycki formula: `weight * (36 / (37 - reps))`
- **AND** it MUST compare this to the all-time personal best 1RM for that exercise.
- **AND** if the new 1RM is greater than the previous best, it MUST mark the set as a PR (`isPR: true`).
- **AND** it MUST trigger immediate visual and haptic feedback (confetti, toast, vibration).

