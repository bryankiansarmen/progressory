# project-structure Specification

## Purpose
TBD - created by archiving change create-project-structure. Update Purpose after archive.
## Requirements
### Requirement: Service Layer
The architecture MUST include a dedicated `services/` directory to decouple business logic from Next.js framework code.

#### Scenario: Service Usage
- **WHEN** a developer implements business logic
- **THEN** it MUST be placed in `services/`
- **AND** it MUST be importable via `@/services`

### Requirement: Directory Layout
The project MUST organize code into the following structure to ensure Separation of Concerns:
- `app/`: Next.js App Router (Routes & Layouts)
- `components/`: UI and Feature Components (Shared `ui/`, Domain `workout/`, `exercise/`)
- `lib/`: Core utilities (`db/`, `validations/`, `utils/`)
- `types/`: Shared TypeScript definitions
- `services/`: Business Logic

#### Scenario: Code Organization
- **WHEN** a new file is added
- **THEN** it MUST be placed in the appropriate directory per the layout definition

