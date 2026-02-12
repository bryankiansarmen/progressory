# workout-template-management Specification

## Purpose
TBD - created by archiving change implement-workout-builder. Update Purpose after archive.
## Requirements
### Requirement: Template Dashboard
The system SHALL provide a view at `/workouts` listing all available workout templates.

#### Scenario: View List
- **WHEN** the user navigates to `/workouts`
- **THEN** they SHALL see cards for each template showing the template `name` and the number of exercises it contains.

### Requirement: Create New Template
The system SHALL allow users to create a new workout template with a unique name.

#### Scenario: Creation Flow
- **WHEN** the user submits a new workout with a name and a list of exercises
- **THEN** the system SHALL create a `Workout` record 
- **AND** create `WorkoutExercise` records for each selected exercise with correct `order`
- **AND** the system SHALL revalidate the `/workouts` path on the server.

### Requirement: Delete Template
The system SHALL allow users to delete their workout templates using the unified confirmation system.

#### Scenario: Deletion
- **WHEN** the user clicks "Delete" on a workout card
- **THEN** the system SHALL display a confirmation modal
- **WHEN** the user confirms the action in the modal
- **THEN** the system SHALL call the `deleteWorkout` action
- **AND** the UI SHALL show a loading state on the button
- **AND** the template SHALL be removed from the view upon success.
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

#### Scenario: Invalid ID
- **WHEN** the user navigates to `/workouts/non-existent-id/edit`
- **THEN** the system SHALL show a "Not Found" error.

### Requirement: Access Edit Page
The system SHALL provide a clear way to navigate to the edit page from the template list.

#### Scenario: Navigate to Edit
- **WHEN** the user views a workout card on `/workouts`
- **THEN** they see an "Edit" button
- **WHEN** they click it
- **THEN** they are navigated to `/workouts/[id]/edit`.

### Requirement: Reorder Exercises via Drag and Drop
The system SHALL allow users to reorder exercises within a workout template using a drag-and-drop interface.

#### Scenario: Reordering in Builder
- **WHEN** the user drags an exercise card to a new position in the list
- **THEN** the exercise list SHALL update to reflect the new sequence
- **AND** saving the workout SHALL persist the updated order.

