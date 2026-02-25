## MODIFIED Requirements

### Requirement: Weekly Volume Calculation
The system SHALL support calculating the total training volume (Sum of Weight * Reps) for the current calendar week (starting Sunday).

#### Scenario: Volume Summary
- **WHEN** the dashboard is loaded
- **THEN** it SHALL display the total kilograms lifted in the current calendar week.

### Requirement: Workout Frequency
The system SHALL aggregate the completion status of workout sessions for each day of the current calendar week (Sunday through Saturday).

#### Scenario: Consistency tracking
- **WHEN** summarizing user activity
- **THEN** it SHALL provide a boolean array of 7 elements representing activity from Sunday (index 0) to Saturday (index 6) for the current week.
