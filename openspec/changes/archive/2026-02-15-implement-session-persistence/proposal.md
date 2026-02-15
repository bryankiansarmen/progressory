## Goal
Prevent workout data loss during active sessions by automatically persisting the session state (sets, reps, weights, timer, and active exercise) to the browser's `localStorage`. This allows users to recover their progress if they accidentally navigate away from the workout player or refresh the page.

## Impact
- **Workout Player Component**: Enhanced with auto-save and hydration logic.
- **Timer Hook**: Modified to support initialization from a persisted state.
- **Local Storage**: Used as a temporary cache for active workout data.

### New Capabilities
- `session-recovery`: Enables the system to detect an interrupted session and offer recovery or auto-hydration to the user.

### Modified Capabilities
- `workout-logging`: Requirements expanded to include intermediate state persistence during the "active" phase of logging.
