## ADDED Requirements

### Requirement: Server-Side Cache Invalidation
The system SHALL use server-side cache invalidation to ensure data freshness after mutations.

#### Scenario: Revalidate Path
- **WHEN** a workout or program is created, updated, or deleted via a server action or service
- **THEN** the system SHALL call `revalidatePath` for the affected routes (e.g., `/workouts`, `/programs`)
- **AND** the next navigation to those routes SHALL show the updated data without requiring a manual client-side refresh.
