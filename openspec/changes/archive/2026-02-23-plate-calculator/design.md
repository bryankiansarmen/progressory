## Context

Currently, `SetLoggingRow.tsx` contains the weight input. We need to add a specialized trigger here that opens a calculation view.

## Design

### 1. Calculation Algorithm
A new utility function `calcBarbellPlates` will be implemented:

```typescript
function calcBarbellPlates(totalWeight: number, barWeight: number, plateUnits: number[]) {
    let weightPerSide = (totalWeight - barWeight) / 2;
    if (weightPerSide <= 0) return [];
    
    const result = [];
    for (const plate of plateUnits) {
        const count = Math.floor(weightPerSide / plate);
        if (count > 0) {
            result.push({ weight: plate, count });
            weightPerSide %= plate;
        }
    }
    return result;
}
```

### 2. UI Components
- **`PlateCalculatorPopover.tsx`**: A new component using Radix UI/Shadcn `Popover`.
    - **Header**: Visual representation of the barbell.
    - **Body**: List of plates per side with counts and icons.
    - **Footer**: Toggle for Bar Weight.
- **`SetLoggingRow.tsx`**: Addition of the `PlateCalculatorPopover` trigger next to the weight input.

### 3. State Management
- The `PlateCalculatorPopover` will be ephemeral. It reads the current weight from the parent `SetLoggingRow` props.
- Bar weight preference can be kept in local state or defaulted to 20kg.

## Risks / Trade-offs

- **Non-standard Plates**: Users in gyms with unique increments (e.g., 1.5kg) won't have exact accurate results. We will stick to competition/standard plates for the MVP.
- **Imperial vs Metric**: We must ensure the correct constants are used based on the user's project settings (currently kg-first).
