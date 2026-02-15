# Tasks: Implement Rest Timer Logic

## 1. Data Layer & Schema
- [x] 1.1 Add `restTime` Int field to `Exercise` model in `schema.prisma`.
- [x] 1.2 Run `npx prisma generate` to update client types.
- [x] 1.3 Add default rest time to seed data or existing records.

## 2. Component Development
- [x] 2.1 Create `RestTimer` component with countdown and controls (+30s, Skip).
- [x] 2.2 Implement progress ring (SVG or CSS-based) for visual countdown.
- [x] 2.3 Style component with Progressory's high-aesthetic (glassmorphism, primary gradients).

## 3. Player Integration
- [x] 3.1 Update `WorkoutPlayerContainer` state to include `restTimeRemaining` and `timerEndTime`.
- [x] 3.2 Implement `useEffect` for the interval countdown logic.
- [x] 3.3 Hook into `handleToggleSetDone` to auto-trigger the timer on set completion.
- [x] 3.4 Ensure timer persists when switching between active exercises.

## 4. Polishing & Cues
- [x] 4.1 Implement color shifts and visual pulses when timer reaches zero.
- [x] 4.2 (Stretch) Integrate a "Ding" sound or notification when ready.

## 5. Verification
- [x] 5.1 Verify timer survives re-renders and exercise swaps.
- [x] 5.2 Test manual controls (Skip, Reset, Adjust).
