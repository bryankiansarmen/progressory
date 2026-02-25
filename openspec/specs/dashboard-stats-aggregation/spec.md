# dashboard-stats-aggregation Specification

## Purpose
TBD - created by archiving change implement-home-dashboard. Update Purpose after archive.
## Requirements
### Requirement: Weekly Volume Calculation
The system SHALL support calculating the total training volume (Sum of Weight * Reps) for the current calendar week (starting Sunday).

#### Scenario: Volume Summary
- **WHEN** the dashboard is loaded
- **THEN** it SHALL display the total kilograms lifted in the current calendar week.

### Requirement: Personal Record (PR) Identification
The system SHALL identify new Personal Records achieved in exercises.

#### Scenario: Highlighting Achievements
- **WHEN** a user logs a set with a weight higher than the previous maximum for that exercise
- **THEN** it SHALL be flagged as a PR and displayed on the dashboard.

### Requirement: Workout Frequency
The system SHALL aggregate the completion status of workout sessions for each day of the current calendar week (Sunday through Saturday).

#### Scenario: Consistency tracking
- **WHEN** summarizing user activity
- **THEN** it SHALL provide a boolean array of 7 elements representing activity from Sunday (index 0) to Saturday (index 6) for the current week.

### Requirement: Active Program Progress Overview
The system SHALL display progress metrics for the currently active training program on the dashboard.

#### Scenario: Display Progress
- **WHEN** the dashboard is loaded and a program is active
- **THEN** it SHALL display the percentage of completed days in the current program.

### Requirement: Next Scheduled Workout
The system SHALL identify and display the next workout in the active program sequence.

#### Scenario: Dashboard Next Up
- **WHEN** the user views the dashboard
- **THEN** it SHALL show the name of the workout template scheduled for the "next" program day.

