# Proposal: Implement Session Details View

## Problem
The Training History Feed provides a high-level summary of past workouts (date, volume, duration), but users cannot currently drill down to see the specific exercises, weights, and reps performed in a previous session. This limits the ability to audit progress and verify historical performance data.

## Solution
Implement a dedicated Session Details page that displays the granular data for a specific workout log. This page will serve as the primary audit view for historical logs.

### Proposed Changes

#### New Capabilities
- **Detailed Log Audit**: Users can view the exact exercises and sets completed during a past session.
- **Dynamic Routing**: Implementation of `/history/[logId]` to serve session-specific data.

#### UI Integration
- **History Feed Link**: Update the `HistoryLogCard` to link to the corresponding detail page.
- **Detail View**: Create a new page layout that displays session metadata and an exercise list with set-by-set breakdowns.

### Impact
- **APIs/Services**: Expansion of the data fetching logic to retrieve a single `WorkoutLog` with its full nested relation tree (`entries` -> `sets`).
- **User Experience**: Significant improvement in data transparency and progress auditing.

### Modified Capabilities
- `workout-log`: Extending the utility of logs from just "last session reference" to a full historical archive.
