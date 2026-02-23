# Logic Implementation

- [x] 1.1 Audit `WorkoutPlayerContainer.tsx` and ensure `trendsData` is correctly typed for comparison.
- [x] 1.2 Update `handleToggleSetDone` to calculate the current set's 1RM using `calculateBrzycki1RM`.
- [x] 1.3 Compare current 1RM with the historical max 1RM from `trendsData`.
- [x] 1.4 Add local state `achievedPrSetIds` to `WorkoutPlayerContainer` to prevent double-calculations and celebrations.

# UI & Feedback

- [x] 2.1 Integrate `canvas-confetti` to trigger a celebration burst on PR detection.
- [x] 2.2 Update `SetLoggingRow` to accept an `isPR` prop and display a visual indicator (e.g., a "PR" badge or emerald glow).
- [x] 2.3 Implement haptic feedback using `navigator.vibrate` for supported devices.
- [x] 2.4 Add a "New Personal Record!" toast notification.

# Verification

- [x] 3.1 Start a workout and log a set that is clearly higher than previous history.
- [x] 3.2 Verify that the celebration effects (confetti, toast, haptics) trigger immediately upon marking the set as done.
- [x] 3.3 Verify that toggling the set off and on again does not re-trigger the celebration for the same set.
