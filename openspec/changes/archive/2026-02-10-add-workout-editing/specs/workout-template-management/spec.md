## ADDED Requirements

### Requirement: Edit Existing Template
The system SHALL allow users to modify the name and exercises of an existing workout template.

#### Scenario: Edit Flow
- **WHEN** the user navigates to `/workouts/[id]/edit`
- **THEN** the builder loads with the template's current name and exercises
- **WHEN** the user modifies the list and clicks "Save"
- **THEN** the changes are persisted to the database
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
