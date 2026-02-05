# Spec: Service Layer Pattern

## ADDED Requirements

### Requirement: Service Abstraction
All business logic MUST be contained within service functions, shielding the UI from direct database access.

#### Scenario: Database Isolation
- **WHEN** a component needs to fetch or mutate data
- **THEN** it MUST call a service function
- **AND** it SHALL NOT import the `PrismaClient` directly

### Requirement: Uniform Data Access
Services MUST utilize the singleton `PrismaClient` from `@/lib/db`.

#### Scenario: Singleton Usage
- **WHEN** a service function is executed
- **THEN** it MUST utilize the shared database instance
- **AND** it MUST NOT instantiate its own client
