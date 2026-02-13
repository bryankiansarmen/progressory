# Session Experience Upgrade - Design

## Context
The current active workout session is functional but purely utilitarian. We want to increase user engagement and satisfaction by adding "juicy" feedback (audio, haptic, visual) and helpful context (historical data). This design focuses on the frontend implementation within the `WorkoutPlayerContainer` and its children.

## Goals / Non-Goals
**Goals:**
- Provide immediate feedback for user actions (completing a set, finishing a timer).
- Reduce cognitive load by showing previous performance data inline.
- Create a sense of accomplishment upon workout completion.

**Non-Goals:**
- modifying backend schema or API.
- adding complex gamification (xp, levels, streaks) beyond simple visual rewards.

## Decisions
### 1. Client-Side Only Storage for Preferences
- **Decision:** Audio and Haptic preferences (on/off) will be stored in `localStorage` or simple React state for now.
- **Rationale:** Avoids schema changes for a simple UI preference. Can be moved to User Settings later.

### 2. Audio Library Selection
- **Decision:** Use `use-sound` (or standard HTML5 Audio API if preferred to avoid deps, but `use-sound` is cleaner). *Correction: To keep it lightweight and avoid potential React 18/19 strict mode issues with external libs, we will use a simple custom hook wrapping `new Audio()`.*
- **Rationale:** Minimal overhead, full control.

### 3. Confetti Implementation
- **Decision:** `canvas-confetti` invoked programmatically on the "Session Complete" modal mount.
- **Rationale:** Industry standard, lightweight, high visual impact.

### 4. History Data Fetching
- **Decision:** Fetch history data (last log) alongside the workout template in the Server Component (`ActiveWorkoutPage`) or via a new Server Action `getLastLogsForWorkout(workoutId)`.
- **Rationale:** server-side fetching is preferred in Next.js. We will add a helper to `workout.service.ts` or `logging.service.ts` to batch fetch "last log entries" for all exercises in the workout.

## Risks / Trade-offs
- **Audio being annoying:** Users might be in a gym with music. **Mitigation:** Default audio to OFF or provide a clear mute toggle in the player header.
- **Browser Autoplay policies:** Audio usually requires user interaction first. **Mitigation:** The "start workout" click counts as interaction, unlocked the audio context.
