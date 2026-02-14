/**
 * Estimates the One-Rep Max (1RM) using the Brzycki formula.
 * Formula: 1RM = Weight * (36 / (37 - Reps))
 * 
 * @param weight The weight lifted
 * @param reps The number of repetitions (best accuracy between 1-12)
 * @returns The estimated 1RM, rounded to 1 decimal place.
 */
export const calculateBrzycki1RM = (weight: number, reps: number): number => {
    if (reps === 1) return weight;
    if (reps <= 0) return 0;

    // Brzycki is most accurate up to 12 reps
    const oneRepMax = weight * (36 / (37 - reps));
    return Math.round(oneRepMax * 10) / 10;
};
