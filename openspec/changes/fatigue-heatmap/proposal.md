## Why

A key part of effective training is recovery and balanced muscle development. Currently, users have to manually recall which muscles they've trained recently. A visual "Fatigue Heatmap" on the dashboard provides an at-a-glance summary of which muscle groups have been targeted most intensely over the last 7 days, helping users plan their next session more intelligently and avoid overtraining specific areas.

## What

Implement a Muscle Group Fatigue Heatmap on the main Dashboard. This visualization will aggregate data from the last 7 days of workout logs, calculating the number of sets performed for each `muscleGroup`. The UI will reflect this "fatigue level" using a color-graded heatmap—higher volume muscle groups will appear more "heated" (e.g., deeper reds/ambers).

## Scope

**In-Scope:**
- Aggregation of `muscleGroup` set counts from the last 7 days via `stats.service.ts`.
- A new `FatigueHeatmap` component on the Dashboard using a human body silhouette or a sophisticated list/grid pattern.
- Automatic updates as new workouts are logged.
- Mobile-responsive layout for the heatmap.

**Out-of-Scope:**
- Per-muscle fiber detail (staying at the 14 standard muscle group level).
- Individual muscle recovery timers (beyond the general 7-day volume lookback).
- Integration with external biological data (e.g., heart rate variability).

## Impact

- **`stats.service.ts`**: Addition of a `getMuscleFatigueData` method (re-using part of the `getMuscleDistribution` logic).
- **Dashboard (`app/page.tsx`)**: Integration of the new `FatigueHeatmap` component.
- **UI Components**: New `FatigueHeatmap.tsx` and associated styles.
