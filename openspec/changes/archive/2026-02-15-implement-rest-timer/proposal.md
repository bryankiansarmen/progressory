# Proposal: Implement Rest Timer Logic

## Why

Currently, the workout player allows users to log sets, but it lacks a professional-grade rest timer. Rest intervals are critical for powerlifting and bodybuilding to ensure neurological recovery and consistent intensity. Adding an automated, customizable, and visually prominent rest timer will elevate the user experience from a simple logger to a functional training partner.

## What

- **Automated Trigger**: The timer should automatically start when a set is marked as complete.
- **Customizable Intervals**: Default to a sensible duration (e.g., 90s) but allow per-exercise overrides.
- **Interactive Controls**: Users can add/subtract time (30s increments), skip the timer, or reset it.
- **Visual Feedback**: A prominent, high-aesthetic countdown in the workout player that survives exercise swaps or navigation.
- **Completion Cues**: Visual pulses and (optionally) audio/haptic feedback when rest is over.

## Impact

- **Affected Systems**: `WorkoutPlayerContainer`, `ExerciseLoggingCard`.
- **Database Changes**: Addition of `restTime` (seconds) to the `Exercise` model to store preferences.
- **Dependencies**: Uses existing `lucide-react` for icons and standard React state hooks for time management.
- **User Value**: Improved training consistency and a more "premium" feel for the live tracking experience.
