## 1. Backend: Service Alignment

- [x] 1.1 Import `startOfWeek` from `date-fns` in `services/stats.service.ts`
- [x] 1.2 Update `getDashboardStats` to calculate `activityDays` starting from the current week's Sunday
- [x] 1.3 Update the `dayDiff` logic to map to fixed indices [0..6] (Sunday to Saturday)

## 2. Frontend: Component Optimization

- [x] 2.1 Replace dynamic label generation in `ConsistencyChart.tsx` with a static `["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]` array
- [x] 2.2 Ensure the 7-column grid is visually aligned with these static labels

## 3. Verification

- [x] 3.1 Verify dashboard consistency chart starts on Sunday
- [x] 3.2 Confirm a workout logged today (Wednesday) appears under the "Wed" label
- [x] 3.3 Confirm "Weekly Volume" reflects the calendar week total
