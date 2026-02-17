# Proposal - Smart Predictive Entry (The Progressive Nudge)

Reducing the manual overhead of logging workouts by intelligently predicting and pre-filling set data based on historical performance.

## Problem
Logging every single set manually is the biggest point of friction in Progressory. Users often forget exactly what they lifted last session, leading to stagnant progress or wasted time digging through history.

## Proposed Solution
Introduce a **Smart Predictive Engine** that:
1. **Pre-fills** the active session with the user's last successful weight and rep count as placeholders.
2. Displays **Progression Nudges** (e.g., "Goal: +2.5kg") to encourage progressive overload.
3. Allows for "One-Tap Completion" of predicted sets.

## Impact
- **Enhanced UX**: Near-zero effort to log a standard "maintenance" session.
- **Improved Training Quality**: Explicitly prompts users to beat their previous performance.
- **Premium Feel**: The app feels "intelligent" and aware of the user's strength journey.

## Proposed Scope
- Update `logging.service.ts` to provide richer historical context (last 3 sessions for trend analysis).
- Add a prediction utility to calculate "recommendations" based on simple linear progression or RPE-based estimation.
- Enhance UI indicators in `ExerciseLoggingCard` with "Goal" badges.
