# Design: Analytics Hub

## Context
We need to group historical `WorkoutLog` and `WorkoutLogEntry` data into meaningful time-series and categorical buckets.

## Goals
- Provide a responsive, high-fidelity visualization of progress.
- Minimize dependencies by using custom SVG-based charting.
- Ensure data fetching is efficient for multiple weeks/months of history.

## Decisions

### 1. Data Aggregation (Service Layer)
- **Time Brackets**: Fetch data grouped by week (starting on Mondays).
- **Metric Selection**: Focus on **Volume** (Load * Reps) and **Frequency** as the primary trend lines.
- **Muscle Logic**: Group exercises by their `muscleGroup` property.

### 2. Charting Architecture
- **VolumeChart**: Use `<svg>` for a smooth Area Chart with linear gradients.
- **MuscleDistribution**: A semi-donut or horizontal bar chart to show focus areas.
- **Interactivity**: Add hover states that surface precise numbers using a lightweight overlay.

### 3. Page Layout
- **Dashboard Grid**: Use a 12-column grid. Trends take priority (8 columns), proportions as a sidecar (4 columns).

## Risks / Trade-offs
- **Custom Charting**: Takes more effort than a library but allows 100% control over the "premium" look and reduces bundle size.
- **Data Load**: Fetching all logs at once might slow down for users with years of data. We will default to a 12-week lookback.
