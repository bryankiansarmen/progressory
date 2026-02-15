import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database...");

    const defaultUser = await prisma.user.upsert({
        where: { email: "test@progressory.com" },
        update: {},
        create: {
            id: "user_123",
            email: "test@progressory.com",
            name: "Test User",
        },
    });

    console.log(`Default user created/verified: ${defaultUser.id}`);

    const coreExercises = [
        { name: "Bench Press", category: "Strength", muscleGroup: "Chest", equipment: "Barbell", restTime: 180 },
        { name: "Back Squat", category: "Strength", muscleGroup: "Legs", equipment: "Barbell", restTime: 180 },
        { name: "Deadlift", category: "Strength", muscleGroup: "Legs", equipment: "Barbell", restTime: 240 },
        { name: "Overhead Press", category: "Strength", muscleGroup: "Shoulders", equipment: "Barbell", restTime: 120 },
    ];

    for (const ex of coreExercises) {
        await prisma.exercise.upsert({
            where: { id: ex.name.toLowerCase().replace(/\s+/g, '-') },
            update: { isCoreLift: true },
            create: {
                id: ex.name.toLowerCase().replace(/\s+/g, '-'),
                ...ex,
                isCoreLift: true,
            },
        });
    }

    console.log("Core exercises seeded.");
    console.log("Seeding complete.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
