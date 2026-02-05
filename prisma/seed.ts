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
