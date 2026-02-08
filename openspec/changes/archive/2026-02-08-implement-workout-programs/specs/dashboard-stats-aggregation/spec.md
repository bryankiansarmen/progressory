## ADDED Requirements

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
