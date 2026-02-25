## Context

The current consistency chart implementation calculates a rolling 7-day window. This results in the "end" of the chart always being "Today", which leads to confusing label mapping when using static day-of-week names. The user desires a standard calendar-week view (Sunday to Saturday).

## Goals / Non-Goals

**Goals:**
- Align the Weekly Consistency chart to a fixed Sunday-to-Saturday grid.
- Ensure workout volume and sessions are calculated for the current calendar week.
- Simplify frontend label generation.

**Non-Goals:**
- Historical week-over-week navigation (remain focused on the *current* week).
- Changing timezone handling (keep existing application defaults).

## Decisions

- **Start of Week**: Use `date-fns/startOfWeek` with `weekStartsOn: 0` (Sunday) to define the fetching window.
- **Fixed Index Mapping**: The backend will return an array where index `i` corresponds to the activity on the `i`-th day of the week (Sunday=0, Saturday=6).
- **Static Frontend Labels**: Since the data is now index-aligned to a standard week, the frontend will use a static `dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]`.

## Risks / Trade-offs

- **Risk**: A user who works out late Sunday night (after midnight) might see it on Monday.
  - **Mitigation**: This is standard behavior for date-based logging; ensure `startOfDay` is consistently used.
- **Risk**: Early in the week (e.g., Sunday morning), the chart will look "empty" compared to the previous rolling view.
  - **Mitigation**: This is the expected behavior of a calendar-week chart; the "Don't break the streak" messaging remains relevant as the week fills up.
