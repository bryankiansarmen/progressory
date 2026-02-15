# rest-timer-management Specification

## Purpose
The Rest Timer system ensures consistent recovery between sets by providing automated and manual timing controls within the workout session, based on exercise-specific preferences.

## Requirements

### Requirement: Automated Auto-Start
The timer MUST automatically start whenever a set is marked as "Done".

#### Scenario: Marking Set as Done
- **GIVEN** a user is in the workout player
- **WHEN** they toggle a set's status to "Done"
- **THEN** the timer MUST be set to the exercise's specific rest time (defaulting to 90s if unspecified)
- **AND** the countdown MUST begin immediately.

### Requirement: Manual Controls
Users MUST be able to prematurely skip, restart, or adjust the timer's duration.

#### Scenario: Adjusting Time
- **GIVEN** the rest timer is active
- **WHEN** the user clicks "+30s"
- **THEN** the remaining time MUST increase by 30 seconds.

### Requirement: Session Persistence
The timer progress MUST survive state changes within the workout player, such as switching between different exercises in the same session.

#### Scenario: Switching Exercises
- **GIVEN** the rest timer is active
- **WHEN** the user navigates to a different exercise in the session
- **THEN** the timer MUST continue to display and countdown accurately.

### Requirement: Visual/Audio Completion
The system MUST provide clear sensory feedback when the rest period has elapsed.

#### Scenario: Timer Elapse
- **GIVEN** the timer reaches 0
- **THEN** the UI MUST provide a visual indicator (e.g., pulsing or color change)
- **AND** an audio cue SHOULD be triggered to indicate the user is ready for the next set.

