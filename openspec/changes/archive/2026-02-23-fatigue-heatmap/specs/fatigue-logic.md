# ADDED Requirements

### Requirement: Muscle Group Fatigue Aggregation
The system MUST calculate a "fatigue score" for each muscle group based on recent training volume.

#### Scenario: 7-Day Lookback
- **WHEN** the dashboard is loaded
- **THEN** the system MUST retrieve all `WorkoutLogEntry` records from the last 7 days.
- **AND** it MUST sum the total number of sets performed for each `muscleGroup`.
- **AND** it MUST normalize these counts (e.g., 0-10+ sets) to determine the fatigue intensity.

### Requirement: Fatigue Color Graduation
The system MUST represent fatigue levels using a clear, color-graded visual scale.

#### Scenario: Intensity Scale
- **WHEN** a muscle group has 0 sets: **THEN** it MUST be neutral/transparent.
- **WHEN** a muscle group has 1-3 sets: **THEN** it MUST be "Cool" (e.g., light blue/green).
- **WHEN** a muscle group has 4-7 sets: **THEN** it MUST be "Active" (e.g., amber/orange).
- **WHEN** a muscle group has 8+ sets: **THEN** it MUST be "Fatigued" (e.g., deep red).

### Requirement: Visual Mapping
The system MUST display the fatigue data on a visual representation of the human body or a structured muscle-group grid.

#### Scenario: Interactive Silhouette
- **WHEN** the user views the heatmap
- **THEN** each major muscle group (Chest, Back, Quads, etc.) MUST be visually distinct.
- **AND** it MUST apply the intensity color directly to that group's region.
- **AND** tapping a muscle group SHOULD display the specific set count for the week.
