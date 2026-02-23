# activity-visualization Specification

## Purpose
TBD - created by archiving change implement-home-dashboard. Update Purpose after archive.
## Requirements
### Requirement: Consistency Chart
The dashboard SHALL display a visual representation of workout frequency over the last 7 days.

#### Scenario: Visual status
- **WHEN** viewing the main dashboard
- **THEN** a chart or a row of activity bubbles SHALL indicate which days had completed workouts.

### Requirement: Top PRs List
The system SHALL MUST display a list of the top 3 most recent Personal Records achieved by the user.

#### Scenario: Achievement overview
- **WHEN** the user scrolls to the "Achievements" section
- **THEN** the system SHALL show the exercise name, weight, and date of the PR.

### Requirement: Muscle Group Fatigue Aggregation
The system MUST calculate a "fatigue score" for each muscle group based on the total number of sets performed for that group over the last 7 days.

#### Scenario: Fatigue Color Graduation
- **WHEN** a muscle group's weekly volume is retrieved
- **THEN** the system MUST display the group in a visual heatmap with intensity colors: Cool (1-3 sets), Active (4-7 sets), and Fatigued (8+ sets).
- **AND** tapping a muscle group SHALL display the specific set count.

