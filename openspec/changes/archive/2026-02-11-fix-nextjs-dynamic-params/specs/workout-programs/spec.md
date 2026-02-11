## ADDED Requirements

### Requirement: Async Dynamic Params
The system SHALL handle `params` and `searchParams` in dynamic routes as Promises to comply with Next.js 15+ requirements.

#### Scenario: Navigating to Program Details
- **WHEN** a user navigates to `/programs/[id]`
- **THEN** the system MUST await the `params` Promise to extract the `id`
- **AND** use that `id` to fetch the program data from the database.

#### Scenario: Navigating to Program Edit
- **WHEN** a user navigates to `/programs/[id]/edit`
- **THEN** the system MUST await the `params` Promise to extract the `id`
- **AND** use that `id` to fetch the program data for the editor.
