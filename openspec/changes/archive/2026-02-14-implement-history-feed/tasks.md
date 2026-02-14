# Tasks: Implement History Feed

## 1. Service Layer Expansion
- [x] 1.1 Implement `getHistory` function in `services/stats.service.ts`.
- [x] 1.2 Ensure `getHistory` includes `entries`, `sets`, and `workout` relations.
- [x] 1.3 Add calculation logic for total weight/volume per session in the service or component.

## 2. Component Implementation
- [x] 2.1 Create `components/history/HistoryLogCard.tsx` with metrics display.
- [x] 2.2 Create `components/history/HistoryFeed.tsx` to wrap the list.
- [x] 2.3 Implement the "Empty History" state in `HistoryFeed`.

## 3. UI Integration & Refactoring
- [x] 3.1 Refactor `app/history/page.tsx` into a Server Component.
- [x] 3.2 Inject the `userId` (hardcoded for now as per current project pattern) into the `getHistory` call.
- [x] 3.3 Validate formatting for dates and weights.

## 4. Verification
- [x] 4.1 Verify that logs appear in reverse-chronological order.
- [x] 4.2 Validate that clicking a workout (if implemented) or viewing the card shows correct calculated volume.
- [x] 4.3 Smoke test with a user having 0 logs to see the empty state.
