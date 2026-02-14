# analytics-hub Specification

## Summary
The Analytics Hub provides a high-level visual representation of a user's progress through time and categorical focus.

## Requirements

### Requirement: Multi-Week Volume Trends
The system MUST be able to aggregate total volume (weight * reps) across all sessions grouped by week.

#### Scenario: Trend Lookback
- **GIVEN** a user has logged workouts for the past 4 weeks
- **WHEN** opening the Analytics page
- **THEN** an area chart MUST be displayed showing 4 data points (one per week)
- **AND** the data points MUST accurately reflect the sum of all sets performed in those weeks.

### Requirement: Muscle Group Focus
The system MUST calculate the proportionality of sets performed for different muscle groups.

#### Scenario: Muscle Breakdown
- **GIVEN** a user has performed 20 sets of "Chest" and 10 sets of "Back"
- **WHEN** viewing the Muscle Distribution section
- **THEN** the chest MUST be represented as approximately 66% of the volume/focus.

### Requirement: UI Breadcrumbs & Navigation
The Analytics Hub MUST be easily accessible from any main page.

#### Scenario: Navigating to Analytics
- **GIVEN** the user is on the Dashboard
- **WHEN** clicking the "Analytics" link in the navigation
- **THEN** the user MUST navigate to `/analytics`.
