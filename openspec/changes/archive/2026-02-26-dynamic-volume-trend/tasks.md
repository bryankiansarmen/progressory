## 1. Service Layer Updates

- [x] 1.1 Create `calculateVolumeForRange` helper in `services/stats.service.ts`
- [x] 1.2 Update `getDashboardStats` to fetch volume for current and previous weeks
- [x] 1.3 Implement trend percentage calculation in `getDashboardStats`
- [x] 1.4 Handle division-by-zero/baseline cases (previous week = 0)

## 2. Dashboard Integration

- [x] 2.1 Update `DashboardStats` interface to include `volumeTrend`
- [x] 2.2 Update `app/page.tsx` to pass dynamic trend values to `DashboardStatCard`
- [x] 2.3 Verify `DashboardStatCard` renders the trend correctly (color and icons)

## 3. Verification

- [x] 3.1 Verify logic manually by creating workout logs for current and previous weeks
- [x] 3.2 Verify the "New" / "N/A" state when no previous logs exist
