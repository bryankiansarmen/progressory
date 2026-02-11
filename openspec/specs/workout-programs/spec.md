# workout-programs Specification

## Purpose
Management of training programs, including creation, scheduling (days/weeks), and enrollment.

## Requirements

### Requirement: Create Workout Program
The system SHALL allow users to create a training program that groups workout templates into a structured sequence of days.

#### Scenario: Successful creation
- **WHEN** the user provides a name, description, and a list of `ProgramDay` entries (linking templates to specific days)
- **THEN** the system SHALL create a `Program` record and associate it with the user
- **AND** the system SHALL revalidate the `/programs` path on the server.

### Requirement: View Program Library
The system SHALL provide a view at `/programs` that lists all created programs for the user.

#### Scenario: List programs
- **WHEN** the user navigates to `/programs`
- **THEN** they SHALL see a list of all their training programs with their names and descriptions.

### Requirement: Enroll in Program
The system SHALL allow a user to set one program as "Active".

#### Scenario: Set active program
- **WHEN** the user selects "Start Program" on a specific program
- **THEN** the system SHALL set that program's `isActive` flag to true
- **AND** mark any other active program for that user as inactive
- **AND** the system SHALL revalidate the `/programs` path on the server.

### Requirement: Program Progress Tracking
The system SHALL track the user's progress through the active program's sequence.

#### Scenario: Progress update
- **WHEN** the user completes a workout session that is linked to a program day
- **THEN** the system SHALL calculate the completion percentage for that program.

### Requirement: Reorder Program Days via Drag and Drop
The system SHALL allow users to reorder days within a training program using a drag-and-drop interface.

#### Scenario: Reordering in Program Builder
- **WHEN** the user drags a program day card to a new position
- **THEN** the day sequence SHALL update automatically
- **AND** saving the program SHALL persist the new schedule.

### Requirement: Delete Program
The system SHALL allow users to delete their training programs with a confirmation step.

#### Scenario: Deletion Flow
- **WHEN** the user clicks "Delete" on a program card
- **AND** they confirm the action in the browser dialog
- **THEN** the system SHALL call the `deleteProgram` action
- **AND** the UI SHALL show a loading state on the button
- **AND** the program SHALL be removed from the view upon success.
- **AND** the system SHALL revalidate the `/programs` path on the server.

### Requirement: Edit Program Lifecycle
The system SHALL support the full lifecycle of a training program, allowing it to be updated after initial creation.

#### Scenario: Editing an existing program
- **WHEN** a user navigates to the Edit route for a program
- **THEN** the system SHALL load the existing program data into the `ProgramBuilder`
- **AND** allowing the user to save changes to the existing record instead of creating a new one.

### Requirement: Async Dynamic Params
The system SHALL handle `params` and `searchParams` in dynamic routes as Promises to comply with Next.js 15+ requirements.

#### Scenario: Navigating to Program Details
- **WHEN** a user navigates to `/programs/[id]`
- **THEN** the system MUST await the `params` Promise to extract the `id`
- **AND** use that `id` to fetch the program data from the database.

#### Scenario: Navigating to Program Edit
- **WHEN** a user navigates to `/programs/[id]/edit`
- **THEN** the system MUST await the `params` Promise to extract the `id`
- **AND** use that `id` to fetch the program data for the editor.
