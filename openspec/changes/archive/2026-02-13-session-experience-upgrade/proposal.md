# Session Experience Upgrade

## Summary
Enhance the active workout session experience by adding historical context (previous set data) and "juicy" feedback mechanisms including audio cues, haptic feedback, and a celebration effect upon completion.

## Motivation
The current workout logging experience is functional but lacks the "premium" feel and immediate feedback that makes tracking satisfying. Adding these features will reduce cognitive load (by showing history) and increase user delight (through audio/visual feedback).

## Proposed Capabilities

### New Capabilities
- `workout-history-context`: Display the previous session's weight and reps for each exercise directly in the logging interface.
- `audio-feedback`: Play sound effects for timer completion.
- `haptic-feedback`: Trigger device vibration on set completion and timer finish.
- `celebration-effect`: Trigger a confetti animation when a workout session is completed.

### Modified Capabilities
- `active-workout-logging`: Updated to include the new feedback mechanisms and history display.

## Impact
- **Dependencies**: Adds `canvas-confetti` and `use-sound` (or similar audio library).
- **UI/UX**: Significant improvements to the active session view (`WorkoutPlayerContainer`, `SetLoggingRow`).
- **Performance**: minimal impact; audio/confetti assets are small.
