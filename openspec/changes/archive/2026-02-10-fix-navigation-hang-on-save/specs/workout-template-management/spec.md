## MODIFIED Requirements

### Requirement: Create New Template
The system SHALL allow users to create a new workout template with a unique name.

#### Scenario: Creation Flow
- **WHEN** the user submits a new workout with a name and a list of exercises
- **THEN** the system SHALL create a `Workout` record 
- **AND** create `WorkoutExercise` records for each selected exercise with correct `order`
- **AND** the system SHALL revalidate the `/workouts` path on the server.

### Requirement: Delete Template
The system SHALL allow users to delete their workout templates.

#### Scenario: Deletion
- **WHEN** the user clicks "Delete" on a workout card
- **THEN** the system SHALL remove the template and its associated exercise mappings
- **AND** the system SHALL revalidate the `/workouts` path on the server.

### Requirement: Edit Existing Template
The system SHALL allow users to modify the name and exercises of an existing workout template.

#### Scenario: Edit Flow
- **WHEN** the user navigates to `/workouts/[id]/edit`
- **THEN** the builder loads with the template's current name and exercises
- **WHEN** the user modifies the list and clicks "Save"
- **THEN** the changes are persisted to the database
- **AND** the system SHALL revalidate the `/workouts` path on the server
- **AND** the user is redirected to `/workouts`.
