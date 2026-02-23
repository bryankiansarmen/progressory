export type FatigueLevel = 0 | 1 | 2 | 3; // 0=rest, 1=cool, 2=active, 3=fatigued

export interface MuscleFatigueEntry {
    muscleGroup: string;
    setCount: number;
    level: FatigueLevel;
}

/**
 * Normalizes a set count to a fatigue intensity level.
 * 0 sets -> 0 (Rest), 1-3 sets -> 1 (Cool), 4-7 sets -> 2 (Active), 8+ sets -> 3 (Fatigued)
 */
export function normalizeFatigueLevel(setCount: number): FatigueLevel {
    if (setCount === 0) return 0;
    if (setCount <= 3) return 1;
    if (setCount <= 7) return 2;
    return 3;
}
