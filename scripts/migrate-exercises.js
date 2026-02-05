const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function migrate() {
    console.log("Starting exercise hierarchy migration...");

    const exercises = await prisma.exercise.findMany({
        where: { parentId: null }
    });

    const movements = new Map();

    // 1. Identify potential parent movements
    exercises.forEach(ex => {
        // Regex to find common equipment prefixes/suffixes
        // Matches "Barbell ", "Dumbbell ", "Machine ", " (Barbell)", etc.
        const cleanName = ex.name
            .replace(/^(Barbell|Dumbbell|Machine|Cable|Kettlebell)\s+/i, '')
            .replace(/\s+\((Barbell|Dumbbell|Machine|Cable|Kettlebell)\)$/i, '')
            .trim();

        if (!movements.has(cleanName)) {
            movements.set(cleanName, {
                name: cleanName,
                category: ex.category,
                muscleGroup: ex.muscleGroup,
                variations: []
            });
        }
        movements.get(cleanName).variations.push(ex);
    });

    for (const [name, data] of movements.entries()) {
        if (data.variations.length > 1 || (data.variations.length === 1 && data.variations[0].name !== name)) {
            console.log(`Processing movement: ${name} (${data.variations.length} variations)`);

            // Create the parent movement
            const parent = await prisma.exercise.create({
                data: {
                    name: name,
                    category: data.category,
                    muscleGroup: data.muscleGroup,
                    equipment: "Various"
                }
            });

            // Link children
            for (const child of data.variations) {
                await prisma.exercise.update({
                    where: { id: child.id },
                    data: { parentId: parent.id }
                });
            }
        } else {
            console.log(`Skipping single entry movement: ${name}`);
        }
    }

    console.log("Migration complete!");
}

migrate()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
