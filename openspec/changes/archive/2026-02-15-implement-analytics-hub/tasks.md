# Tasks: Implement Analytics Hub

## 1. Service Layer Expansion
- [x] 1.1 Implement `getVolumeTrends(userId, weeks)` in `services/stats.service.ts`.
- [x] 1.2 Implement `getMuscleDistribution(userId)` with categorical grouping.

## 2. Shared Charting Components
- [x] 2.1 Create `components/charts/AreaChart.tsx` (Generic SVG component).
- [x] 2.2 Create `components/charts/DistributionBar.tsx`.

## 3. Page Implementation
- [x] 3.1 Create top-level `/analytics` page.
- [x] 3.2 Implement server-side data fetching and hydrate the charts.
- [x] 3.3 Add navigation link to the layout.

## 4. Verification
- [x] 4.1 Verify volume totals match manual calculations for the selected time range.
- [x] 4.2 Validate chart responsiveness on mobile devices.
- [x] 4.3 Check empty state behavior for new users.
