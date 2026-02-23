export type PlateUnit = "kg" | "lbs";

export interface PlateResult {
    weight: number;
    count: number;
}

const METRIC_PLATES = [25, 20, 15, 10, 5, 2.5, 1.25];
const IMPERIAL_PLATES = [55, 45, 35, 25, 10, 5, 2.5];

/**
 * Calculates the smallest number of standard plates required to reach a target weight given a specific barbell weight.
 *
 * @param totalWeight The target total weight including the bar
 * @param barWeight The weight of the empty barbell (e.g., 20 or 45)
 * @param unit The unit of measurement ("kg" or "lbs")
 * @returns Array of PlateResult detailing the weight and count of each plate to load ON EACH SIDE.
 */
export function calcBarbellPlates(totalWeight: number, barWeight: number, unit: PlateUnit = "kg"): PlateResult[] {
    let weightPerSide = (totalWeight - barWeight) / 2;

    // If the target weight is less than or equal to the bar weight, no plates are needed.
    if (weightPerSide <= 0) return [];

    const plateUnits = unit === "kg" ? METRIC_PLATES : IMPERIAL_PLATES;
    const result: PlateResult[] = [];

    for (const plate of plateUnits) {
        // Handle floating point imprecision when checking if plate fits
        const roundedWeightPerSide = Math.round(weightPerSide * 100) / 100;
        const count = Math.floor(roundedWeightPerSide / plate);

        if (count > 0) {
            result.push({ weight: plate, count });
            weightPerSide -= count * plate;
            // Round again after subtraction to prevent floating point accumulation issues like 0.0000000001
            weightPerSide = Math.round(weightPerSide * 100) / 100;
        }
    }

    return result;
}
