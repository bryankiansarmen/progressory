# Logic Implementation

- [x] 1.1 Create `getMuscleFatigueData(userId: string)` in `stats.service.ts` to aggregate set counts by muscle group for the last 7 days.
- [x] 1.2 Implement a normalization utility to map set counts to intensity levels (0-3).
- [x] 1.3 Add a unit test or verification script for the data aggregation logic.

# UI & Feedback

- [x] 2.1 Create the `FatigueHeatmap.tsx` component.
- [x] 2.2 Implement the visual representation (Silhouette or Grid) with dynamic color fill based on fatigue intensity.
- [x] 2.3 Integrate the `FatigueHeatmap` onto the Dashboard (`app/page.tsx`).
- [x] 2.4 Add tooltips or labels to show specific set counts when interacting with the heatmap.

# Verification

- [x] 3.1 Log a workout for a specific muscle group and verify that the heatmap updates on the dashboard.
- [x] 3.2 Verify that the color graduation shifts correctly as volume increases for a specific muscle group.
- [x] 3.3 Ensure the heatmap is responsive and fits well within the Dashboard layout on mobile and desktop.
