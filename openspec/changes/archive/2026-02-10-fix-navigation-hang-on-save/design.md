## Context

The application currently relies on a client-side navigation pattern (`router.push()` followed by `router.refresh()`) to update the UI after a mutation. In Next.js 15, this creates a race condition where the router attempts to navigate while simultaneously refreshing the outgoing page's data, leading to a "rendering..." hang. We need to move the data freshness responsibility to the server.

## Goals / Non-Goals

**Goals:**
- Eliminate the UI hang after saving workouts or programs.
- Adhere to Next.js 15 best practices for data revalidation.
- Ensure the user sees updated data immediately after redirection.

**Non-Goals:**
- Implementing optimistic UI updates (outside the scope of this bug fix).
- Full migration to `useActionState` (we will keep the current `services` structure for now but improve revalidation).

## Decisions

### 1. Server-Side Revalidation with `revalidatePath`
We will add `revalidatePath` calls directly within our server action/service functions (`workout.service.ts` and `program.service.ts`).
- **Rationale**: This is the official Next.js recommendation for ensuring that the client-side router cache is invalidated for specific paths after a mutation. When the client subsequently navigates to those paths, the browser will fetch fresh data from the server.
- **Paths to revalidate**:
    - `/workouts`: Revalidate when templates are created, updated, or deleted.
    - `/programs`: Revalidate when programs are created or when a user enrolls in a program.

### 2. Removal of `router.refresh()` from Client Builders
We will remove `router.refresh()` from `WorkoutBuilderContainer.tsx` and `ProgramBuilder.tsx`.
- **Rationale**: `router.refresh()` is intended to refresh the *current* route's data. Since we are immediately navigating away using `router.push()`, calling `refresh()` is not only redundant but actively harmful as it triggers the reported race condition.

### 3. Streamlining `ProgramCard` Enrollment
The "Set Active" logic in `ProgramCard.tsx` also uses `router.refresh()`. We will move this to server-side revalidation as well.
- **Rationale**: Consistency across the app. This ensures that the program list (which shows active status) is updated on the server before the client sees it.

## Risks / Trade-offs

- **Risk**: Over-revalidation could lead to unnecessary server load.
  - **Mitigation**: We are targeting specific paths (`/workouts`, `/programs`) rather than using a global revalidation, keeping the impact minimal.
- **Trade-off**: The user might see a brief loading state on the target page if the revalidation takes time.
  - **Verdict**: This is preferable to an indefinite hang on the source page.
