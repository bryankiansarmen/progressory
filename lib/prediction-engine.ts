/**
 * Prediction Engine for Smart Predictive Entry
 * Calculates target weights and reps based on historical performance
 */

interface SetData {
    reps: number;
    weight: number;
    isDone: boolean;
}

interface WorkoutLogEntry {
    sets: SetData[];
    createdAt: Date;
}

interface PredictionResult {
    baseWeight: number;
    baseReps: number;
    targetWeight: number;
    targetReps: number;
    shouldProgress: boolean;
    progressionType: 'weight' | 'reps' | 'none';
}

const DEFAULT_WEIGHT_INCREMENT = 2.5; // kg
const DEFAULT_REP_INCREMENT = 1;

/**
 * Determine if the last session was successful (all sets completed)
 */
function wasSessionSuccessful(entry: WorkoutLogEntry): boolean {
    if (!entry || !entry.sets || entry.sets.length === 0) return false;
    return entry.sets.every(set => set.isDone);
}

/**
 * Calculate the average weight and reps from the most recent successful session
 */
function getBaselineFromLastSession(trends: WorkoutLogEntry[]): { weight: number; reps: number } | null {
    if (!trends || trends.length === 0) return null;

    const lastSession = trends[0];
    if (!lastSession.sets || lastSession.sets.length === 0) return null;

    const completedSets = lastSession.sets.filter(s => s.isDone);
    if (completedSets.length === 0) return null;

    const avgWeight = completedSets.reduce((sum, s) => sum + s.weight, 0) / completedSets.length;
    const avgReps = completedSets.reduce((sum, s) => sum + s.reps, 0) / completedSets.length;

    return { weight: avgWeight, reps: Math.round(avgReps) };
}

/**
 * Calculate prediction for an exercise based on historical trends
 */
export function calculatePrediction(
    trends: WorkoutLogEntry[],
    incrementKg: number = DEFAULT_WEIGHT_INCREMENT
): PredictionResult | null {
    const baseline = getBaselineFromLastSession(trends);

    if (!baseline) {
        return null;
    }

    const lastSessionSuccessful = trends.length > 0 && wasSessionSuccessful(trends[0]);

    // If last session was successful, recommend progression
    if (lastSessionSuccessful) {
        return {
            baseWeight: baseline.weight,
            baseReps: baseline.reps,
            targetWeight: baseline.weight + incrementKg,
            targetReps: baseline.reps,
            shouldProgress: true,
            progressionType: 'weight'
        };
    }

    // Otherwise, maintain the same target
    return {
        baseWeight: baseline.weight,
        baseReps: baseline.reps,
        targetWeight: baseline.weight,
        targetReps: baseline.reps,
        shouldProgress: false,
        progressionType: 'none'
    };
}

/**
 * Generate initial set predictions based on historical data
 */
export function generatePredictedSets(
    trends: WorkoutLogEntry[],
    setCount: number = 3
): Array<{ reps: number; weight: number; isDone: boolean }> {
    const prediction = calculatePrediction(trends);

    if (!prediction) {
        // No history, return empty sets
        return Array(setCount).fill({ reps: 0, weight: 0, isDone: false });
    }

    // Use target values for predictions
    return Array(setCount).fill({
        reps: prediction.targetReps,
        weight: prediction.targetWeight,
        isDone: false
    });
}
