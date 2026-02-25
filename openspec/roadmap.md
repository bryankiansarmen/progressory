# Progressory — Project Roadmap

> A living document tracking the development path from personal-use MVP to a multi-user fitness platform.

---

## Phase 0 — Foundations Audit ✅
> *Before building more, confirm the base is solid.*

**Goal:** Validate that the core infrastructure is production-ready and not just scaffolded.

### Checklist
- [ ] Database schema is migrated and seeded successfully in production
- [ ] All Server Actions return consistent, structured error objects
- [ ] React Query caching is working correctly (stale-while-revalidate verified)
- [ ] Zod schemas are in place at all service boundaries
- [ ] `userId` is scoped on every database query
- [ ] No hardcoded values that need to be replaced before multi-user support
- [ ] Environment variables are documented in `.env.example`
- [ ] Known shortcuts and technical debt are logged (see [Technical Debt](#technical-debt-log))

---

## Phase 1 — Core Logging Foundation ✅
> *The minimum viable workout tracker.*

**Goal:** Users can create workout templates, start sessions, log sets, and review history.

### Delivered Features
- Create and manage workout templates (Push Day, Pull Day, etc.)
- Start active workout sessions from templates
- Add exercises to sessions on-the-fly
- Log sets with reps and weight per exercise
- Reorder exercises within a workout
- Live session timer
- Browse exercise library by category and muscle group
- Search exercises by name (including variations)
- Exercise hierarchy: parent movements and their variations
- Soft-delete (archive) custom exercises
- Workout history in chronological order with date range filter
- Basic dashboard with quick stats and recent activity feed

### Success Criteria
- A full workout (template → session → sets → completion) can be logged without errors
- History view correctly reflects all past sessions
- Exercise library search returns relevant results

---

## Phase 2 — Analytics & Smart Tools ✅
> *Make the data useful.*

**Goal:** Surface insights from logged data to help the user train smarter.

### Delivered Features
- **PR Detection:** Real-time personal record detection and celebration during active workouts
- **Fatigue Heatmap:** Visual body map showing muscle group fatigue based on recent volume
- **Smart Pre-filling:** Predicts next-session weight/reps based on historical trends
- **Offline Sync:** Hybrid LocalStorage + Cloud sync for gym environments with poor connectivity
- **Plate Calculator:** On-demand barbell plate math utility
- Workout consistency and frequency visualizations

### Clarifications Needed (Before Marking Complete)
- [ ] Document the algorithm powering Smart Pre-filling (e.g., rolling average, linear progression model)
- [ ] Document the decay model for the Fatigue Heatmap (e.g., volume decays over N days)
- [ ] Confirm Offline Sync handles conflict resolution when the same session is edited on two devices

### Success Criteria
- PR detection fires correctly on a new one-rep-max or volume PR
- Fatigue heatmap updates after a completed session
- Pre-fill suggestions are plausible based on actual history

---

## Phase 3 — Programs & Periodization ✅
> *Structure for long-term training goals.*

**Goal:** Users can follow multi-week structured programs, not just ad-hoc sessions.

### Delivered Features
- Program Builder: create multi-week routines
- Assign workout templates to specific days/weeks within a program
- Active program progress and schedule shown on the Dashboard
- Automated rest timers between sets
- Advanced volume analytics and muscle group balance charts

### Clarifications Needed (Before Marking Complete)
- [ ] What happens when a user misses a day — does the program shift or stay on schedule?
- [ ] Can a user run multiple programs simultaneously?
- [ ] Are rest timers configurable per exercise or per workout?

### Success Criteria
- A 4-week program can be built, activated, and followed day by day
- Dashboard correctly shows the next scheduled workout
- Rest timer fires automatically after each logged set

---

## Phase 3.5 — Observability & Stability 🔄 *(Recommended before Phase 4)*
> *Know what's breaking before users tell you.*

**Goal:** Add lightweight monitoring and clean up technical debt so the transition to multi-user is smooth.

### Tasks
- [ ] Integrate **Sentry** for error tracking (free tier is sufficient)
- [ ] Add **Vercel Analytics** for basic page-level usage data
- [ ] Set up a monthly maintenance routine:
  - Run `npm audit` and resolve critical vulnerabilities
  - Update Prisma and Next.js to latest stable versions
  - Verify migrations are clean and reproducible
- [ ] Resolve all items in the [Technical Debt Log](#technical-debt-log)
- [ ] Write integration tests for the three most critical Server Actions (start session, log set, complete session)
- [ ] Confirm database indexes are in place: `userId`, `date`, `workoutId`, `parentId`

### Success Criteria
- Sentry is receiving error reports from production
- Zero unresolved P0 items in the technical debt log
- Core Server Actions have at least one passing integration test each

---

## Phase 4a — Authentication (Protected Single-User) 🔜
> *Lock the app before opening it up.*

**Goal:** Add auth to protect the app, without yet supporting multiple users.

This is intentionally split from full multi-user support — auth and multi-tenancy are two different problems.

### Tasks
- [ ] Integrate **Clerk** or **NextAuth** for authentication
- [ ] Protect all routes behind an auth gate
- [ ] Replace the hardcoded `userId` with the authenticated user's ID
- [ ] Implement CSRF protection
- [ ] Set Content Security Policy headers
- [ ] Verify all queries are correctly scoped to `userId` (no data leakage possible)
- [ ] Store session securely (JWT via Clerk/NextAuth)

### Success Criteria
- Unauthenticated users are redirected to a login page
- All data reads and writes are scoped to the authenticated user
- No route is accessible without a valid session

---

## Phase 4b — Multi-User Scaling 🔜
> *Open the doors.*

**Goal:** Support multiple independent users with proper data isolation and infrastructure scaling.

### Tasks
- [ ] Upgrade database plan (Neon or Vercel Postgres — increase connection limits and storage)
- [ ] Implement **connection pooling** (PgBouncer via Neon, or Prisma Accelerate)
- [ ] Add **rate limiting** per user/IP (Upstash Rate Limit)
- [ ] Implement **request throttling** for expensive analytics queries
- [ ] Set up a **database backup strategy** (automated daily snapshots)
- [ ] Add **Redis** (Upstash) for session storage and frequently-accessed aggregations
- [ ] Add load testing before public launch (k6 or Artillery)
- [ ] User profile management (name, preferred units, avatar)

### Success Criteria
- 50 concurrent users can log workouts simultaneously without degradation
- Rate limiting blocks abusive requests without affecting normal use
- User A cannot access User B's data under any circumstances
- Automated backups are verified and restorable

---

## Phase 5 — Social & PWA 🔮 *(Future)*
> *Make it shareable and mobile-native.*

**Goal:** Expand reach with social features and a native-quality mobile experience.

### Planned Features
- Progressive Web App (PWA) with full offline capabilities
- Share workout programs and templates publicly
- Follow other users and view their public activity
- Mobile app (React Native with Expo)

---

## Phase 6 — Long-Term Vision 🔮 *(Future)*
> *The platform endgame.*

- AI-powered workout and progression recommendations
- Integration with fitness wearables (Apple Health, Garmin)
- Nutrition tracking integration
- Video exercise demonstrations
- Marketplace for structured workout programs

---

## Technical Debt Log

> Log shortcuts taken during development here. Resolve all items before Phase 4a.

| # | Description | Severity | Introduced In | Resolved |
|---|-------------|----------|---------------|----------|
| 1 | `userId` may be hardcoded in some service calls | High | Phase 1 | ☐ |
| 2 | No pagination on workout history view | Medium | Phase 1 | ☐ |
| 3 | Pre-fill algorithm undocumented | Medium | Phase 2 | ☐ |
| 4 | Fatigue decay model undocumented | Low | Phase 2 | ☐ |
| 5 | No automated tests for any Server Actions | High | Phase 1 | ☐ |

---

## Summary Timeline

| Phase | Status | Priority |
|-------|--------|----------|
| 0 — Foundations Audit | ✅ | — |
| 1 — Core Logging | ✅ | — |
| 2 — Analytics & Smart Tools | ✅ *(needs clarification)* | — |
| 3 — Programs & Periodization | ✅ *(needs clarification)* | — |
| 3.5 — Observability & Stability | 🔄 In Progress | **Now** |
| 4a — Auth (Protected Single-User) | 🔜 Planned | **Next** |
| 4b — Multi-User Scaling | 🔜 Planned | After 4a |
| 5 — Social & PWA | 🔮 Future | — |
| 6 — Long-Term Vision | 🔮 Future | — |

---

*Last updated: February 2026*