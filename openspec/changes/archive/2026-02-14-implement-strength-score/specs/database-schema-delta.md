# database-schema Delta Specification

## Summary
Extend the `Exercise` model to support identifying core compound lifts for analytics.

## Requirements

### Requirement: Core Lift Identification
The system MUST allow tagging specific exercises as part of the core strength metrics.

#### Scenario: Marking an Exercise as Core
- **GIVEN** an exercise definition
- **WHEN** the `isCoreLift` flag is set to `true`
- **THEN** it MUST be included in the dynamic Strength Score calculation.

### Schema Changes (Prisma)
```prisma
model Exercise {
  // ... existing fields
  isCoreLift  Boolean  @default(false)
}
```
