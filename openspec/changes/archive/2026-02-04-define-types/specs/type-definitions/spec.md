# Spec: Type Definitions

## ADDED Requirements

### Requirement: Exercise Type Definition

The application MUST define a shared `Exercise` interface in `types/index.ts` to ensure type safety across all components.

#### Scenario: Type Properties

- **WHEN** the `Exercise` type is used
- **THEN** it MUST include `id` (string), `name` (string), `category` (string), and `muscleGroup` (string)
- **AND** it MUST include an optional `equipment` (string) field

#### Scenario: Export Visibility

- **WHEN** a component imports from `@/types`
- **THEN** `Exercise` MUST be a named export
