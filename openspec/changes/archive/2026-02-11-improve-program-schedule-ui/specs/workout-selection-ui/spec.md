## ADDED Requirements

### Requirement: Searchable Workout Picker
The system SHALL provide a searchable picker component for selecting workout templates within the program builder.

#### Scenario: Searching for a workout
- **WHEN** the user types in the workout picker search field
- **THEN** the list SHALL filter to show only workout templates matching the query

### Requirement: Workout Metadata Visibility
The workout picker SHALL display the exercise count and primary muscle groups for each workout template.

#### Scenario: Viewing workout details in picker
- **WHEN** the user opens the workout picker
- **THEN** each workout item SHALL show its name, the number of exercises it contains, and its primary muscle groups

### Requirement: Rich Schedule Item Summary
The program schedule list SHALL display a detailed summary for each scheduled day, including the workout name, exercise count, and muscle groups.

#### Scenario: Viewing scheduled day summary
- **WHEN** a workout is selected for a program day
- **THEN** the day's card SHALL display the workout's name and its summary metadata (exercises and muscle groups)
