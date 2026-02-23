# Logic Implementation

- [ ] 1.1 Create `calcBarbellPlates` utility in a new file (e.g., `@/lib/utils/plates.ts`).
- [ ] 1.2 Implement support for both Metric and Imperial standard plate denominations.
- [ ] 1.3 Add unit tests or simple validation for common weight combinations (e.g., 60kg, 100kg, 140kg).

# UI & Integration

- [ ] 2.1 Create `PlateCalculatorPopover.tsx` component using Shadcn `Popover`.
- [ ] 2.2 Design the visual layout for the plate breakdown (list or barbell diagram).
- [ ] 2.3 Integrate the popover trigger into `SetLoggingRow.tsx` next to the weight input.
- [ ] 2.4 Add a bar weight toggle (20kg vs 15kg) and ensure it recalculates the plates correctly.

# Verification

- [ ] 3.1 Verify calculator output against manual math for multiple weights (60kg, 82.5kg, 102.5kg).
- [ ] 3.2 Verify that the calculator works accurately for both Metric and Imperial units.
- [ ] 3.3 Ensure the popover opens/closes correctly and doesn't interfere with set completion logic.
