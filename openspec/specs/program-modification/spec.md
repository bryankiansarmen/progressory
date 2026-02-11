# program-modification Specification

## Purpose
Modification and lifecycle management of training programs.

## Requirements

### Requirement: Update Program Metadata
The system SHALL allow users to update the name and description of an existing program.

#### Scenario: Update name and description
- **WHEN** the user modifies the name or description in the Edit view
- **AND** clicks "Save"
- **THEN** the system SHALL update the `Program` record in the database
- **AND** the UI SHALL reflect the changes immediately.

### Requirement: Smart Sync Program Days
The system SHALL update the sequence of workouts in a program while preserving links to existing workout logs.

#### Scenario: Reordering days with existing logs
- **WHEN** a user reorders days in an existing program
- **AND** some days already have associated `WorkoutLog` entries
- **THEN** the system SHALL update the `dayNumber` and `workoutId` of the `ProgramDay` records
- **AND** ensure existing `WorkoutLog` entries remain associated with their respective `ProgramDay` IDs.

### Requirement: Management Entry Points
The system SHALL provide accessible "Edit" and "Delete" actions within the program management interface.

#### Scenario: Accessing Edit mode from Details
- **WHEN** the user is viewing a program's details
- **THEN** they SHALL see an "Edit" button that navigates to `/programs/[id]/edit`.
