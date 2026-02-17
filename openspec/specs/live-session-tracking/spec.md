# live-session-tracking Specification

## Purpose
TBD - created by archiving change implement-workout-player. Update Purpose after archive.
## Requirements
### Requirement: Session Initialization
The system SHALL support starting a workout session from a previously created `Workout` template.

#### Scenario: Start from Template
- **WHEN** the user selects "Start" on a workout template
- **THEN** the system SHALL navigate to `/workouts/active`
- **AND** load all exercises associated with that template.

### Requirement: Workout Timer
The system SHALL maintain a live timer calculating the elapsed time from the moment the session started.

#### Scenario: Timer visibility
- **WHEN** a session is active
- **THEN** the header SHALL display an incrementing timer in `MM:SS` format.

### Requirement: Session Completion
The system SHALL allow users to finish and persist their workout data.

#### Scenario: Finish Workout
- **WHEN** the user clicks "Finish"
- **THEN** the system SHALL calculate total duration
- **AND** save the workout session using the `logging.service.ts`.

### Requirement: Automatic State Persistence
The system must automatically save the current workout state to persistent storage on every state change and periodically to the server to prevent data loss.

#### Scenario: Real-time Save on Set Completion
- **GIVEN** an active workout session is in progress
- **WHEN** the user marks a set as "done"
- **THEN** the `sessionData` and `restTimeRemaining` must be immediately serialized and stored in `localStorage`.

#### Scenario: Heartbeat Synchronization
- **GIVEN** a user is in an active workout session
- **WHEN** 30 seconds have elapsed since the last sync
- **OR** a set is marked as completed
- **THEN** the system SHALL invoke the `syncDraftSession` server action with the current state.

### Requirement: Session Hydration on Mount
The system must detect and load any existing active session from both `localStorage` and the server when the workout player is initialized.

#### Scenario: Seamless Recovery after Refresh
- **GIVEN** the user has an active session persisted
- **WHEN** the user refreshes the page or reloads the player
- **THEN** the workout player should hydrate its state from the most recent source (favoring server-side drafts if they are newer).
- **AND** the timer and active exercise index SHALL be preserved.

### Requirement: Conflict Resolution
The system must detect when starting a new workout would overwrite an existing in-progress session on any device.

#### Scenario: Existing Session Mismatch
- **GIVEN** the user has an active session in progress
- **WHEN** the user attempts to start a different workout template
- **THEN** the system SHALL display a selection modal
- **AND** allow the user to "Resume" the existing session or "Discard and Start New".

### Requirement: Strategic State Clearance
The system must clear the persisted session data from both local and server storage only when the workout is explicitly finalized or abandoned.

#### Scenario: Clearance on Session Finish
- **GIVEN** the user is viewing the session summary after clicking "Finish"
- **WHEN** the `logWorkout` service call succeeds
- **THEN** the session data must be removed from `localStorage` AND the server-side draft storage.

