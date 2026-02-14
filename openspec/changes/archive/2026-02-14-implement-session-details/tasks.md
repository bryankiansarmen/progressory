# Tasks: Implement Session Details View

## 1. Service Layer Expansion
- [x] 1.1 Implement `getWorkoutLogDetail` in `services/stats.service.ts`.
- [x] 1.2 Ensure the function includes `workout`, `entries.exercise`, and `entries.sets`.
- [x] 1.3 Add validation for the `logId` parameter.

## 2. Component Implementation
- [x] 2.1 Create `components/history/SessionDetailHeader.tsx` for summary metadata.
- [x] 2.2 Create `components/history/ExerciseLogCard.tsx` to display exercise-specific set data.
- [x] 2.3 Implement the "Back to History" button component.

## 3. UI Integration & Routing
- [x] 3.1 Create the dynamic route `app/history/[logId]/page.tsx`.
- [x] 3.2 Wire up the `getWorkoutLogDetail` call in the Server Component.
- [x] 3.3 Update `components/history/HistoryLogCard.tsx` to link to the detail page.

## 4. Verification
- [x] 4.1 Verify that navigating from the feed to a session correctly loads that session's data.
- [x] 4.2 Validate that the total volume matches the sum of all sets displayed.
- [x] 4.3 Smoke test navigation: Feed -> Details -> Back to Feed.
