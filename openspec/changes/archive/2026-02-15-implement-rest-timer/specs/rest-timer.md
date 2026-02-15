# rest-timer Specification

## Summary
The Rest Timer system ensures consistent recovery between sets by providing automated and manual timing controls within the workout session.

## Requirements

### Requirement: Automated Auto-Start
The timer MUST automatically start whenever a set is marked as "Done".

#### Scenario: Marking Set as Done
- **GIVEN** a user is on the `ExerciseLoggingCard`
- **WHEN** they toggle a set's status to "Done"
- **THEN** the `restTimeRemaining` MUST be set to the exercise's default rest time
- **AND** the countdown MUST begin immediately.

### Requirement: Manual Controls
Users MUST be able to prematurely skip, restart, or adjust the timer's duration.

#### Scenario: Adjusting Time
- **GIVEN** the rest timer is active with 45 seconds remaining
- **WHEN** the user clicks "+30s"
- **THEN** the `restTimeRemaining` MUST update to 75 seconds.

### Requirement: Session Persistence
The timer progress MUST survive state changes within the `WorkoutPlayerContainer`, such as swapping exercises or changing active exercise index.

#### Scenario: Switching Exercises
- **GIVEN** the rest timer is active
- **WHEN** the user navigates to a DIFFERENT active exercise
- **THEN** the timer MUST continue to display and countdown accurately in the header or overlay.

### Requirement: Visual/Audio Completion
The system MUST provide a clear indication when the rest period has elapsed.

#### Scenario: Timer Elapse
- **GIVEN** the timer reaches 0
- **WHEN** the countdown finishes
- **THEN** the timer UI MUST pulse or change color (e.g., to green)
- **AND** a "Rest Over" notification or sound SHOULD be triggered.
