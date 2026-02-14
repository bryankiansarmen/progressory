## Context

Currently, Progressory has a hardcoded "Strength Score" placeholder on the dashboard. To make it meaningful, we need an automated way to:
1. Identify key "Core Lifts" (Squat, Bench, Deadlift, OHP).
2. Estimate the One-Rep Max (1RM) for these lifts from historical logs.
3. Aggregate these 1RMs into a cumulative score.

## Goals / Non-Goals

**Goals:**
- Automate Strength Score calculation based on the "Big 4" compound lifts.
- Provide a reliable 1RM estimation using the Brzycki Formula.
- Update the Dashboard to show real, data-driven stats.
- Lay the groundwork for longitudinal analytics (tracking the score over time).

**Non-Goals:**
- Implementing multi-user support (out of scope for now).
- Implementing bodyweight-relative scoring (Sinclair/Wilks) in this phase (requires bodyweight tracking).
- Advanced AI-driven predictions.

## Decisions

### 1. Schema Extension: `Exercise.isCoreLift`
**Decision**: Add an `isCoreLift` Boolean field to the `Exercise` model.
**Rationale**: Hardcoding exercise names (e.g., "Bench Press") is brittle. Marking exercises as "Core" in the database allows the score to stay accurate even if exercises are renamed or variations are added.
**Alternatives Considered**: Hardcoded ID list (inflexible), Muscle group-based auto-selection (too broad).

### 2. Service Layer: `stats.service.ts` Enhancements
**Decision**: Create a dedicated `calculateStrengthScore(userId)` function in `stats.service.ts`.
**Rationale**: Keeps the business logic for analytics separate from raw logging or exercise management.
**Logic**:
  1. Fetch all `isCoreLift` exercises.
  2. For each exercise, find the maximum estimated 1RM from the set history.
  3. Sum the 4 highest 1RMs.

### 3. Formula: Brzycki
**Decision**: `1RM = Weight × (36 / (37 - Reps))`
**Rationale**: Widely accepted as accurate for rep ranges between 1 and 10, which covers most strength-focused training.
**Alternatives Considered**: Epley (good for high reps, less accurate for strength), Lander (similar but slightly different coefficients).

## Risks / Trade-offs

- **[Risk]** Inaccurate 1RM for high-rep sets (12+) ΓåÆ **Mitigation**: Filter 1RM calculations to only consider sets with reps <= 12.
- **[Risk]** Performance impact of calculating stats on every dashboard load ΓåÆ **Mitigation**: Cache the result with a 1-hour TTL or re-calculate only when a new log is created.
- **[Risk]** Missing Core Lifts (user hasn't performed one) ΓåÆ **Mitigation**: Default to 0 and show "Action Required" state on dashboard to encourage filling in the gaps.
