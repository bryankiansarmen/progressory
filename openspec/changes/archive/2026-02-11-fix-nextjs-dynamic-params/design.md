## Context

Next.js 15 introduced a breaking change where `params` and `searchParams` are now asynchronous. The newly implemented program management routes were using the old synchronous pattern, leading to `undefined` IDs being passed to Prisma services.

## Goals / Non-Goals

**Goals:**
- Update all program management dynamic routes to correctly await `params`.
- Ensure type safety by updating prop interfaces.
- Restore functionality to Program Details and Program Edit views.

**Non-Goals:**
- Refactoring the service layer.
- Changing the data fetching strategy (e.g., moving to Client Components).

## Decisions

### 1. Await Params in Component Body
We will use the standard Next.js 15 pattern for awaiting `params` in the component body.

- **Rationale**: This is the recommended upgrade path for Next.js 15.
- **Implementation**:
    ```tsx
    export default async function Page({ params }: { params: Promise<{ id: string }> }) {
        const { id } = await params;
        // ... use id
    }
    ```

## Risks / Trade-offs

- **[Risk] Missing Routes** → **Mitigation**: A comprehensive sweep was performed during exploration to identify all affected routes. Only the newly added program routes were found to be missing this pattern.
