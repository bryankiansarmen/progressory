## Why

The current "Weekly Consistency" chart uses a rolling "Last 7 Days" window ([D-6...Today]). While technically accurate, users find it confusing because workout habits are typically viewed within the context of a standard calendar week (Sunday to Saturday). Currently, a workout logged on Wednesday appears correctly in the local data index but maps to the wrong static label (e.g., Sunday) in the UI, or requires complex dynamic label generation that feels less intuitive than a fixed weekly grid.

## What Changes

- **Calendar Week Alignment**: Modify the dashboard statistics service to fetch and aggregate data starting from the current week's Sunday rather than exactly 7 days ago.
- **Fixed Layout**: Revert the consistency chart to a fixed `Sun` through `Sat` layout.
- **Data Indexing**: Ensure the boolean activity array returned by the service matches the 0-6 day indexing (Sunday = 0, Saturday = 6).

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `dashboard-stats-aggregation`: Change the time-window for weekly consistency from "rolling last 7 days" to "current calendar week (startOfWeek Sunday)".
- `activity-visualization`: Transition the UI from a dynamic/rolling day label system to a fixed calendar week (Sun-Sat) grid.

## Impact

- **Backend**: `getDashboardStats` in `services/stats.service.ts` will need use `startOfWeek` from `date-fns`.
- **Frontend**: `ConsistencyChart.tsx` will be simplified to use a static label array and fixed 7-column grid aligned with the calendar.
