## ADDED Requirements

### Requirement: Automatic State Persistence
The system must automatically save the current workout state to persistent storage on every state change to prevent data loss.

#### Scenario: Real-time Save on Set Completion
- **GIVEN** an active workout session is in progress
- **WHEN** the user marks a set as "done"
- **THEN** the `sessionData` and `restTimeRemaining` must be immediately serialized and stored in `localStorage`.

### Requirement: Session Hydration on Mount
The system must detect and load any existing active session from storage when the workout player is initialized.

#### Scenario: Seamless Recovery after Refresh
- **GIVEN** the user has an active session persisted in `localStorage`
- **WHEN** the user refreshes the page while on the active workout route
- **THEN** the workout player should hydrate its state from `localStorage` and resume from the exact exercise and timer point.

### Requirement: Strategic State Clearance
The system must clear the persisted session data only when the workout is explicitly finalized or abandoned.

#### Scenario: Clearance on Session Finish
- **GIVEN** the user is viewing the session summary after clicking "Finish"
- **WHEN** the `logWorkout` service call succeeds
- **THEN** the session data must be removed from `localStorage` to prevent stale recovery on the next visit.
