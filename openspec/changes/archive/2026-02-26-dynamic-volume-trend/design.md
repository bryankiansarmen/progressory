## Context

The current dashboard displays a static `12%` trend for weekly volume. We need to refactor the `stats.service.ts` to fetch historical volume data and calculate a relative trend.

## Goals / Non-Goals

**Goals:**
- Add a reusable `getWeeklyVolume(userId, date)` helper to `stats.service.ts`.
- Update `getDashboardStats` to return a `volumeTrend` object `{ value: number, positive: boolean } | null`.
- Update the Dashboard UI to render the trend dynamically.

**Non-Goals:**
- Changing the database schema.
- Implementing trends for other metrics (Strength Score, Sessions) in this change.

## Decisions

### 1. Calculation Window
We will use the **Calendar Week** (Sunday to Saturday) as the primary window to match the existing `ConsistencyChart` logic. 
- **Current Week**: Start of Sunday (this week) to Now.
- **Previous Week**: Start of Sunday (last week) to End of Saturday (last week).

### 2. Service Refactoring
We will extract the volume calculation logic into a helper function `calculateVolumeForRange(userId, start, end)`. This prevents code duplication when fetching different weeks.

### 3. Baseline Handling (Zero Volume)
If the previous week has 0 volume:
- The trend will return `null`.
- The UI will interpret `null` as a "New" or "N/A" state, avoiding division by zero.

## Risks / Trade-offs

### Risk: Data Fetching Overhead
Fetching two weeks of logs instead of one doubles the DB queries for volume.
- **Mitigation**: The workout logs table is indexed on `userId` and `date`. Queries are lightweight.

### Trade-off: Precision vs Simplicity
We are using total volume (kg). This can be skewed by adding lightweight "filler" exercises if the user changes their routine.
- **Rationale**: It matches the user's intent to see "Total Weekly Volume" progress.
