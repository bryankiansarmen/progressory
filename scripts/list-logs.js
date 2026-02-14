const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const logs = await prisma.workoutLog.findMany({
        include: {
            workout: true,
            user: true,
        },
        take: 10,
        orderBy: { date: 'desc' }
    });
    console.log(JSON.stringify(logs, null, 2));
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
