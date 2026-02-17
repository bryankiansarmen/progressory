# Session Recovery Specification

## Purpose
Ensure that users can reliably resume workouts even after accidental navigation, device failure, or switching templates.

## Requirements

### Requirement: Conflict Resolution
The system must detect when starting a new workout would overwrite an existing in-progress session.

#### Scenario: Existing Session Mismatch
- **GIVEN** the user has an active "Push Day" session in progress
- **WHEN** the user attempts to start a "Pull Day" workout
- **THEN** the system SHALL display a selection modal
- **AND** allow the user to "Resume Push Day" or "Discard and Start Pull Day".

### Requirement: Heartbeat Synchronization
The system must periodically persist session state to the server to enable cross-device recovery.

#### Scenario: Background Sync
- **GIVEN** a user is in an active workout session
- **WHEN** the user marks a set as completed
- **OR** 30 seconds have elapsed since the last sync
- **THEN** the system SHALL invoke the `syncDraftSession` server action with the current state.

### Requirement: Resilience to Refresh
The system must seamlessly restore the timer and exercise state upon page reload.

#### Scenario: Seamless Recovery
- **GIVEN** an active session with a timer at 15:42
- **WHEN** the user refreshes the page
- **THEN** the timer SHALL resume from 15:42 (accounting for refresh duration if possible)
- **AND** the active exercise index SHALL be preserved.
