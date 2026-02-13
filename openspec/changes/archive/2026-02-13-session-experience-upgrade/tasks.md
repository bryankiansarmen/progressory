# Session Experience Upgrade - Tasks

## 1. Foundation & Dependencies
- [x] 1.1 Install `canvas-confetti`
- [x] 1.2 Create `useAudio` hook for simple sound playback (Synthesized)
- [x] 1.3 Add sound assets (beep.mp3) to `public/sounds/` (Skipped: using synthesized audio)

## 2. Backend & Data
- [x] 2.1 Implement `getLastLogsForWorkout` in `logging.service.ts`
- [x] 2.2 Update `ActiveWorkoutPage` to fetch history data

## 3. UI - History Context
- [x] 3.1 Update `WorkoutPlayerContainer` to accept `historyData` prop
- [x] 3.2 Pass history down to `ExerciseLoggingCard` and `SetLoggingRow`
- [x] 3.3 Display "Last: [weight]kg x [reps]" hint in `SetLoggingRow`

## 4. UI - Feedback & Polish
- [x] 4.1 Trigger `useAudio` beep when `RestTimerOverlay` hits 0
- [x] 4.2 Add vibration (haptics) to "Check" button in `SetLoggingRow`
- [x] 4.3 Trigger `canvas-confetti` in `SessionCompleteModal` on mount

## 5. Verification
- [ ] 5.1 Manual test: Start workout, verify history shows
- [ ] 5.2 Manual test: Complete set, verify vibration
- [ ] 5.3 Manual test: Finish workout, verify confetti
