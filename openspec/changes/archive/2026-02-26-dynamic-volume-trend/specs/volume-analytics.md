## ADDED Requirements

### Requirement: Calculate Weekly Volume
The system must be able to sum the total volume (weight * reps) of all completed sets within a specific date range for a given user.

#### Scenario: Single Workout Volume
- **WHEN** a user has one workout log with 2 sets of 100kg x 10 reps
- **THEN** the total volume for that range should be 2000kg

#### Scenario: Date Range Boundary
- **WHEN** calculating volume for the current week
- **THEN** it must include sessions from Sunday 00:00:00 to the current moment

### Requirement: Compute Volume Trend
The system must return a percentage change between the current week's volume and the previous week's volume.

#### Scenario: Progressive Overload
- **WHEN** Current Week Volume is 1200kg and Previous Week Volume is 1000kg
- **THEN** the trend should be +20%

#### Scenario: First Week / Empty History
- **WHEN** Previous Week Volume is 0
- **THEN** the trend should be returned as `null` or a special value indicating "No baseline"
