const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("Deleting all workout logs...");
    // Note: Cascade deletion is set on WorkoutLogEntry and Set in schema.prisma
    const result = await prisma.workoutLog.deleteMany({});
    console.log(`Successfully deleted ${result.count} workout logs.`);
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
