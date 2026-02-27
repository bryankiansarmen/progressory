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

    const exercises = [
    {
        "id": "9312e7df-5a7f-4ac2-a81b-b08eda54566f",
        "name": "Back Squat",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Barbell",
        "isCoreLift": true,
        "restTime": 180,
        "parentId": null
    },
    {
        "id": "3f335205-0f1e-4712-a49b-2377859c0afc",
        "name": "Barbell Row",
        "category": "Strength",
        "muscleGroup": "Back",
        "equipment": "Barbell",
        "isCoreLift": true,
        "restTime": 120,
        "parentId": null
    },
    {
        "id": "b94971d2-2ddb-41e7-bc62-e61b7ce8d65e",
        "name": "Bench Press",
        "category": "Strength",
        "muscleGroup": "Chest",
        "equipment": "Barbell",
        "isCoreLift": true,
        "restTime": 180,
        "parentId": null
    },
    {
        "id": "980df162-5fee-4678-9d5c-8c2931cc1385",
        "name": "Bicep Curl",
        "category": "Strength",
        "muscleGroup": "Arms",
        "equipment": "Dumbbell",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": null
    },
    {
        "id": "c9c34e67-8eb7-4112-b60a-747e0cc0aca9",
        "name": "Calf Raise",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Machine",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": null
    },
    {
        "id": "94a61dc8-6b17-4ce5-b1e7-2050da78643d",
        "name": "Chest Fly",
        "category": "Strength",
        "muscleGroup": "Chest",
        "equipment": "Mixed",
        "isCoreLift": false,
        "restTime": 60,
        "parentId": null
    },
    {
        "id": "bf05f7f9-71df-4f19-9a67-7af0addabaa1",
        "name": "Deadlift",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Barbell",
        "isCoreLift": true,
        "restTime": 240,
        "parentId": null
    },
    {
        "id": "4f7e881b-7e10-414c-a6c0-5e2530a5b87d",
        "name": "Hip Abduction",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Machine",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": null
    },
    {
        "id": "32e6b4ee-218e-4d66-83cf-8ed54d92bf8e",
        "name": "Hip Adduction",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Machine",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": null
    },
    {
        "id": "8ae1507d-3ac4-45c5-9a3e-81b7c9b649fb",
        "name": "Hip Thrust",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Barbell",
        "isCoreLift": true,
        "restTime": 180,
        "parentId": null
    },
    {
        "id": "2e692d62-ce80-4b58-be5a-9556f9857f34",
        "name": "Lat Pulldown",
        "category": "Strength",
        "muscleGroup": "Back",
        "equipment": "Machine",
        "isCoreLift": true,
        "restTime": 90,
        "parentId": null
    },
    {
        "id": "a7fdfaa8-f2c1-4001-ae35-3159aa6e21c7",
        "name": "Lateral Raise",
        "category": "Strength",
        "muscleGroup": "Shoulders",
        "equipment": "Mixed",
        "isCoreLift": false,
        "restTime": 60,
        "parentId": null
    },
    {
        "id": "e5f53c96-43d5-4cc7-8182-2c3d65201695",
        "name": "Leg Curl",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Machine",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": null
    },
    {
        "id": "5b9e965a-9071-4046-869f-737756545ed3",
        "name": "Leg Extension",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Machine",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": null
    },
    {
        "id": "44e8a10e-ca44-4369-a1e1-0d60c716c726",
        "name": "Plank",
        "category": "Strength",
        "muscleGroup": "Core",
        "equipment": "Bodyweight",
        "isCoreLift": false,
        "restTime": 60,
        "parentId": null
    },
    {
        "id": "6c3da776-724c-4cae-96c3-67dd5711b535",
        "name": "Pull Up",
        "category": "Strength",
        "muscleGroup": "Back",
        "equipment": "Bodyweight",
        "isCoreLift": true,
        "restTime": 120,
        "parentId": null
    },
    {
        "id": "3241e990-5f3f-478f-a177-a4c4a8502470",
        "name": "Rear Delt Fly",
        "category": "Strength",
        "muscleGroup": "Shoulders",
        "equipment": "Machine",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": null
    },
    {
        "id": "72c6239e-d4de-4289-adbf-ba82b48c6f81",
        "name": "Shoulder Press",
        "category": "Strength",
        "muscleGroup": "Shoulders",
        "equipment": "Mixed",
        "isCoreLift": true,
        "restTime": 120,
        "parentId": null
    },
    {
        "id": "7915eabd-3a18-474b-840a-4b252b8ceb25",
        "name": "Tricep Extension",
        "category": "Strength",
        "muscleGroup": "Arms",
        "equipment": "Mixed",
        "isCoreLift": false,
        "restTime": 60,
        "parentId": null
    },
    {
        "id": "62235ce5-9858-4d37-a6b5-f97d2ba838b7",
        "name": "Box Squat",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Barbell",
        "isCoreLift": false,
        "restTime": 180,
        "parentId": "9312e7df-5a7f-4ac2-a81b-b08eda54566f"
    },
    {
        "id": "c9a74134-501d-4bdb-8ff1-a0264ef89991",
        "name": "Front Squat",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Barbell",
        "isCoreLift": false,
        "restTime": 180,
        "parentId": "9312e7df-5a7f-4ac2-a81b-b08eda54566f"
    },
    {
        "id": "2351f527-e6a4-451c-b1eb-4e24b739ce69",
        "name": "Goblet Squat",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Dumbbell",
        "isCoreLift": false,
        "restTime": 120,
        "parentId": "9312e7df-5a7f-4ac2-a81b-b08eda54566f"
    },
    {
        "id": "0d578968-f27b-4e39-84e9-197592aa5950",
        "name": "Hack Squat",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Machine",
        "isCoreLift": false,
        "restTime": 180,
        "parentId": "9312e7df-5a7f-4ac2-a81b-b08eda54566f"
    },
    {
        "id": "cf3dc465-5580-44bb-b593-c4cd80f73ca9",
        "name": "Pause Squat",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Barbell",
        "isCoreLift": false,
        "restTime": 180,
        "parentId": "9312e7df-5a7f-4ac2-a81b-b08eda54566f"
    },
    {
        "id": "564498f3-3474-4d98-b2e2-0a9c0aedc551",
        "name": "Safety Bar Squat",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Machine",
        "isCoreLift": false,
        "restTime": 180,
        "parentId": "9312e7df-5a7f-4ac2-a81b-b08eda54566f"
    },
    {
        "id": "c6546919-81d0-440e-a51b-ada278964031",
        "name": "Zercher Squat",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Barbell",
        "isCoreLift": false,
        "restTime": 180,
        "parentId": "9312e7df-5a7f-4ac2-a81b-b08eda54566f"
    },
    {
        "id": "12d44cc5-d94a-4b03-9d0f-148343109114",
        "name": "Chest Supported Row",
        "category": "Strength",
        "muscleGroup": "Back",
        "equipment": "Machine",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "3f335205-0f1e-4712-a49b-2377859c0afc"
    },
    {
        "id": "392b8d1a-7534-44d8-91e0-adf3396210be",
        "name": "Dumbbell Row",
        "category": "Strength",
        "muscleGroup": "Back",
        "equipment": "Dumbbell",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "3f335205-0f1e-4712-a49b-2377859c0afc"
    },
    {
        "id": "a137eb2f-a979-49e7-9136-9915d115c5be",
        "name": "Machine Row",
        "category": "Strength",
        "muscleGroup": "Back",
        "equipment": "Machine",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "3f335205-0f1e-4712-a49b-2377859c0afc"
    },
    {
        "id": "d1ef4c96-8ab8-4294-ae8c-fdce7efdf7c5",
        "name": "Pendlay Row",
        "category": "Strength",
        "muscleGroup": "Back",
        "equipment": "Barbell",
        "isCoreLift": false,
        "restTime": 120,
        "parentId": "3f335205-0f1e-4712-a49b-2377859c0afc"
    },
    {
        "id": "726fcb79-92d7-4cc1-ab37-c1c934173615",
        "name": "Seated Cable Row",
        "category": "Strength",
        "muscleGroup": "Back",
        "equipment": "Cable",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "3f335205-0f1e-4712-a49b-2377859c0afc"
    },
    {
        "id": "1cc497d9-61bc-41c6-8b8c-2934103143d6",
        "name": "T-Bar Row",
        "category": "Strength",
        "muscleGroup": "Back",
        "equipment": "Machine",
        "isCoreLift": false,
        "restTime": 120,
        "parentId": "3f335205-0f1e-4712-a49b-2377859c0afc"
    },
    {
        "id": "e0dd09c3-371d-424f-87c2-957ad00e4ede",
        "name": "Incline Bench Press",
        "category": "Strength",
        "muscleGroup": "Chest",
        "equipment": "Dumbbell",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "b94971d2-2ddb-41e7-bc62-e61b7ce8d65e"
    },
    {
        "id": "80c499ba-9497-4a94-8a64-cc7c3ae0381d",
        "name": "Flat Bench Press",
        "category": "Strength",
        "muscleGroup": "Chest",
        "equipment": "Dumbbell",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "b94971d2-2ddb-41e7-bc62-e61b7ce8d65e"
    },
    {
        "id": "87402bfc-e1b5-4623-8c7b-0874c2b64d0c",
        "name": "Barbell Bicep Curl",
        "category": "Strength",
        "muscleGroup": "Arms",
        "equipment": "Barbell",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "980df162-5fee-4678-9d5c-8c2931cc1385"
    },
    {
        "id": "d4c62c45-d75d-4359-a6e0-1bea0d740297",
        "name": "Cable Bicep Curl",
        "category": "Strength",
        "muscleGroup": "Arms",
        "equipment": "Cable",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "980df162-5fee-4678-9d5c-8c2931cc1385"
    },
    {
        "id": "c5d8bc93-d5a5-4e19-bc98-18b9c7de07a0",
        "name": "Concentration Curl",
        "category": "Strength",
        "muscleGroup": "Arms",
        "equipment": "Dumbbell",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "980df162-5fee-4678-9d5c-8c2931cc1385"
    },
    {
        "id": "a8a81480-d1be-44f4-9a56-f15cf468da6e",
        "name": "Dumbbell Bicep Curl",
        "category": "Strength",
        "muscleGroup": "Arms",
        "equipment": "Dumbbell",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "980df162-5fee-4678-9d5c-8c2931cc1385"
    },
    {
        "id": "d0bbf064-3e85-4532-9302-11c8dc92a85f",
        "name": "Hammer Curl",
        "category": "Strength",
        "muscleGroup": "Arms",
        "equipment": "Dumbbell",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "980df162-5fee-4678-9d5c-8c2931cc1385"
    },
    {
        "id": "c0f4b43f-ed20-4f1c-95bb-e50d4c0d93a5",
        "name": "Incline Dumbbell Curl",
        "category": "Strength",
        "muscleGroup": "Arms",
        "equipment": "Dumbbell",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "980df162-5fee-4678-9d5c-8c2931cc1385"
    },
    {
        "id": "26744bc5-b500-4a91-a459-3022ee5b2536",
        "name": "Preacher Curl",
        "category": "Strength",
        "muscleGroup": "Arms",
        "equipment": "Machine",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "980df162-5fee-4678-9d5c-8c2931cc1385"
    },
    {
        "id": "0cbe62f6-3821-44c1-9da6-77998a9cd417",
        "name": "Donkey Calf Raise",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Machine",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "c9c34e67-8eb7-4112-b60a-747e0cc0aca9"
    },
    {
        "id": "f5a8dc80-0ae1-422c-bb57-e0a942c0d55c",
        "name": "Leg Press Calf Raise",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Machine",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "c9c34e67-8eb7-4112-b60a-747e0cc0aca9"
    },
    {
        "id": "e1e531da-eb18-44d1-9b57-8eb182ecff85",
        "name": "Seated Calf Raise",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Machine",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "c9c34e67-8eb7-4112-b60a-747e0cc0aca9"
    },
    {
        "id": "ee5b516b-8e8c-47df-9470-a85e46d0e1a3",
        "name": "Single Leg Calf Raise",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Bodyweight",
        "isCoreLift": false,
        "restTime": 60,
        "parentId": "c9c34e67-8eb7-4112-b60a-747e0cc0aca9"
    },
    {
        "id": "1177133b-9f33-4b9d-b25d-dcfb0dc60056",
        "name": "Standing Calf Raise",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Machine",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "c9c34e67-8eb7-4112-b60a-747e0cc0aca9"
    },
    {
        "id": "ed6462f6-e263-4083-b6be-07c945c080a8",
        "name": "Cable Chest Fly",
        "category": "Strength",
        "muscleGroup": "Chest",
        "equipment": "Cable",
        "isCoreLift": false,
        "restTime": 60,
        "parentId": "94a61dc8-6b17-4ce5-b1e7-2050da78643d"
    },
    {
        "id": "5f87542f-4927-41ad-b137-00856c6852dc",
        "name": "Dumbbell Chest Fly",
        "category": "Strength",
        "muscleGroup": "Chest",
        "equipment": "Dumbbells",
        "isCoreLift": false,
        "restTime": 60,
        "parentId": "94a61dc8-6b17-4ce5-b1e7-2050da78643d"
    },
    {
        "id": "a8a877cd-43be-4112-b59d-be6841c310f0",
        "name": "Machine Chest Fly",
        "category": "Strength",
        "muscleGroup": "Chest",
        "equipment": "Machine",
        "isCoreLift": false,
        "restTime": 60,
        "parentId": "94a61dc8-6b17-4ce5-b1e7-2050da78643d"
    },
    {
        "id": "b5bf673a-4169-4430-b458-fbeebf09aecd",
        "name": "Deficit Deadlift",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Barbell",
        "isCoreLift": false,
        "restTime": 240,
        "parentId": "bf05f7f9-71df-4f19-9a67-7af0addabaa1"
    },
    {
        "id": "444a61f2-2e65-4cad-a5b8-b82002334891",
        "name": "Rack Pull",
        "category": "Strength",
        "muscleGroup": "Back",
        "equipment": "Barbell",
        "isCoreLift": false,
        "restTime": 180,
        "parentId": "bf05f7f9-71df-4f19-9a67-7af0addabaa1"
    },
    {
        "id": "242c8d4a-5077-4e2d-9a09-ebbefedeeadd",
        "name": "Romanian Deadlift",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Barbell",
        "isCoreLift": false,
        "restTime": 180,
        "parentId": "bf05f7f9-71df-4f19-9a67-7af0addabaa1"
    },
    {
        "id": "b72f16b5-2769-4703-99f6-6eccf73fbee3",
        "name": "Single Leg Romanian Deadlift",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Dumbbell",
        "isCoreLift": false,
        "restTime": 120,
        "parentId": "bf05f7f9-71df-4f19-9a67-7af0addabaa1"
    },
    {
        "id": "e3debb4b-319e-4dca-904b-7de19671c596",
        "name": "Stiff Legged Deadlift",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Barbell",
        "isCoreLift": false,
        "restTime": 180,
        "parentId": "bf05f7f9-71df-4f19-9a67-7af0addabaa1"
    },
    {
        "id": "9038b10a-ac5d-471c-9c62-6e1884c4aa92",
        "name": "Sumo Deadlift",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Barbell",
        "isCoreLift": false,
        "restTime": 240,
        "parentId": "bf05f7f9-71df-4f19-9a67-7af0addabaa1"
    },
    {
        "id": "bd5f9852-e4a6-4017-a45e-b937b4c7071c",
        "name": "Trap Bar Deadlift",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Barbell",
        "isCoreLift": false,
        "restTime": 240,
        "parentId": "bf05f7f9-71df-4f19-9a67-7af0addabaa1"
    },
    {
        "id": "5e99a3ce-3bb7-4b69-a439-5668172f875f",
        "name": "Banded Clamshell",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Band",
        "isCoreLift": false,
        "restTime": 60,
        "parentId": "4f7e881b-7e10-414c-a6c0-5e2530a5b87d"
    },
    {
        "id": "5c44411d-d9a4-44ef-976c-ddd6e2b8df63",
        "name": "Cable Hip Abduction",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Cable",
        "isCoreLift": false,
        "restTime": 60,
        "parentId": "4f7e881b-7e10-414c-a6c0-5e2530a5b87d"
    },
    {
        "id": "c569bb2b-c8ab-44ad-a833-c7b086bd2e73",
        "name": "Lying Hip Abduction",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Bodyweight",
        "isCoreLift": false,
        "restTime": 60,
        "parentId": "4f7e881b-7e10-414c-a6c0-5e2530a5b87d"
    },
    {
        "id": "dc5deee2-d628-40d9-8265-79f9ee33cf1b",
        "name": "Seated Abductor Machine",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Machine",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "4f7e881b-7e10-414c-a6c0-5e2530a5b87d"
    },
    {
        "id": "83ed5587-3563-4ec5-aecf-64064155a643",
        "name": "Cable Hip Adduction",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Cable",
        "isCoreLift": false,
        "restTime": 60,
        "parentId": "32e6b4ee-218e-4d66-83cf-8ed54d92bf8e"
    },
    {
        "id": "b091f2bf-a6ec-48b2-9871-54fa17ec24f7",
        "name": "Copenhagen Plank",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Bodyweight",
        "isCoreLift": false,
        "restTime": 60,
        "parentId": "32e6b4ee-218e-4d66-83cf-8ed54d92bf8e"
    },
    {
        "id": "f3475197-76e8-4ddd-8acd-80d67afecc8b",
        "name": "Lying Hip Adduction",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Bodyweight",
        "isCoreLift": false,
        "restTime": 60,
        "parentId": "32e6b4ee-218e-4d66-83cf-8ed54d92bf8e"
    },
    {
        "id": "a17cd110-3e20-4e23-89e1-4addab4a814a",
        "name": "Seated Adductor Machine",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Machine",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "32e6b4ee-218e-4d66-83cf-8ed54d92bf8e"
    },
    {
        "id": "ab5c4a67-f72e-42b2-9eac-2c7f46f7129b",
        "name": "B-Stance Hip Thrust",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Barbell",
        "isCoreLift": false,
        "restTime": 120,
        "parentId": "8ae1507d-3ac4-45c5-9a3e-81b7c9b649fb"
    },
    {
        "id": "28f9dbfa-d3c0-4c98-9a3c-3dc913db3184",
        "name": "Barbell Hip Thrust",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Barbell",
        "isCoreLift": false,
        "restTime": 180,
        "parentId": "8ae1507d-3ac4-45c5-9a3e-81b7c9b649fb"
    },
    {
        "id": "45da4e52-38ad-436e-88dc-e5d2e900214d",
        "name": "Cable Pull Through",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Cable",
        "isCoreLift": false,
        "restTime": 120,
        "parentId": "8ae1507d-3ac4-45c5-9a3e-81b7c9b649fb"
    },
    {
        "id": "244bf440-f4d9-4944-9838-bcae1ff24aa1",
        "name": "Dumbbell Hip Thrust",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Dumbbell",
        "isCoreLift": false,
        "restTime": 120,
        "parentId": "8ae1507d-3ac4-45c5-9a3e-81b7c9b649fb"
    },
    {
        "id": "648ab702-34f8-4eb3-abc0-c39f3936dd73",
        "name": "Glute Bridge",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Bodyweight",
        "isCoreLift": false,
        "restTime": 120,
        "parentId": "8ae1507d-3ac4-45c5-9a3e-81b7c9b649fb"
    },
    {
        "id": "62b1fdf6-4209-4e92-98d8-925d625c5511",
        "name": "Machine Hip Thrust",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Machine",
        "isCoreLift": false,
        "restTime": 120,
        "parentId": "8ae1507d-3ac4-45c5-9a3e-81b7c9b649fb"
    },
    {
        "id": "a45b591d-875a-44ef-b24d-7a6c54e54461",
        "name": "Single Leg Hip Thrust",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Bodyweight",
        "isCoreLift": false,
        "restTime": 120,
        "parentId": "8ae1507d-3ac4-45c5-9a3e-81b7c9b649fb"
    },
    {
        "id": "e6b1c87c-97dd-4b94-a4b9-46c6f1f1754e",
        "name": "Behind the Neck Lat Pulldown",
        "category": "Strength",
        "muscleGroup": "Back",
        "equipment": "Machine",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "2e692d62-ce80-4b58-be5a-9556f9857f34"
    },
    {
        "id": "3f7f203a-19e8-41e3-9703-b7b6f234fc24",
        "name": "Close Grip Lat Pulldown",
        "category": "Strength",
        "muscleGroup": "Back",
        "equipment": "Machine",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "2e692d62-ce80-4b58-be5a-9556f9857f34"
    },
    {
        "id": "288958f8-4d1a-42fc-a031-60094a46c6e7",
        "name": "Neutral Grip Lat Pulldown",
        "category": "Strength",
        "muscleGroup": "Back",
        "equipment": "Machine",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "2e692d62-ce80-4b58-be5a-9556f9857f34"
    },
    {
        "id": "a6f182a9-9c03-48a6-8040-c13aab891392",
        "name": "Single Arm Lat Pulldown",
        "category": "Strength",
        "muscleGroup": "Back",
        "equipment": "Machine",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "2e692d62-ce80-4b58-be5a-9556f9857f34"
    },
    {
        "id": "6d397a69-c3ad-44a2-a8af-5c43908af351",
        "name": "Wide Grip Lat Pulldown",
        "category": "Strength",
        "muscleGroup": "Back",
        "equipment": "Machine",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "2e692d62-ce80-4b58-be5a-9556f9857f34"
    },
    {
        "id": "1898e3fc-f318-47e2-a827-4b2d658e8c91",
        "name": "Cable Lateral Raise",
        "category": "Strength",
        "muscleGroup": "Shoulders",
        "equipment": "Cable",
        "isCoreLift": false,
        "restTime": 60,
        "parentId": "a7fdfaa8-f2c1-4001-ae35-3159aa6e21c7"
    },
    {
        "id": "fad600ce-076b-40bf-958d-247318e95ba4",
        "name": "Dumbbell Lateral Raise",
        "category": "Strength",
        "muscleGroup": "Shoulders",
        "equipment": "Dumbbells",
        "isCoreLift": false,
        "restTime": 60,
        "parentId": "a7fdfaa8-f2c1-4001-ae35-3159aa6e21c7"
    },
    {
        "id": "53c211ae-fb08-4171-87a1-ca1a0bbeec20",
        "name": "Machine Lateral Raise",
        "category": "Strength",
        "muscleGroup": "Shoulders",
        "equipment": "Machine",
        "isCoreLift": false,
        "restTime": 60,
        "parentId": "a7fdfaa8-f2c1-4001-ae35-3159aa6e21c7"
    },
    {
        "id": "83bae1ab-3059-4d63-aa9e-08fcbbaf98b7",
        "name": "Cable Leg Curl",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Cable",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "e5f53c96-43d5-4cc7-8182-2c3d65201695"
    },
    {
        "id": "44e9e026-4a75-440e-afdd-37b21ae87b01",
        "name": "Lying Leg Curl",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Machine",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "e5f53c96-43d5-4cc7-8182-2c3d65201695"
    },
    {
        "id": "cbf9d982-2302-4c00-9a60-39affd10b562",
        "name": "Nordic Hamstring Curl",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Bodyweight",
        "isCoreLift": false,
        "restTime": 120,
        "parentId": "e5f53c96-43d5-4cc7-8182-2c3d65201695"
    },
    {
        "id": "21b3981b-fdd1-4ddb-ac84-5cc78aff4fe5",
        "name": "Seated Leg Curl",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Machine",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "e5f53c96-43d5-4cc7-8182-2c3d65201695"
    },
    {
        "id": "89aefd23-1dc9-4f34-907b-1bf084d67530",
        "name": "Standing Leg Curl",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Machine",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "e5f53c96-43d5-4cc7-8182-2c3d65201695"
    },
    {
        "id": "fedbca73-17c0-4eb3-9578-695db0e1e13b",
        "name": "Cable Leg Extension",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Cable",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "5b9e965a-9071-4046-869f-737756545ed3"
    },
    {
        "id": "a69f618d-3001-4374-93e6-c9c578353c59",
        "name": "Seated Leg Extension",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Machine",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "5b9e965a-9071-4046-869f-737756545ed3"
    },
    {
        "id": "9641f48e-f3a6-4b3b-b02c-80b291935c03",
        "name": "Single Leg Extension",
        "category": "Strength",
        "muscleGroup": "Legs",
        "equipment": "Machine",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "5b9e965a-9071-4046-869f-737756545ed3"
    },
    {
        "id": "0033ea96-dc74-4650-b948-d6a2c95e24c7",
        "name": "Ab Wheel Rollout",
        "category": "Strength",
        "muscleGroup": "Core",
        "equipment": "Other",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "44e8a10e-ca44-4369-a1e1-0d60c716c726"
    },
    {
        "id": "cdda973a-483d-48cf-83cd-f60fb00b9dc9",
        "name": "Cable Crunch",
        "category": "Strength",
        "muscleGroup": "Core",
        "equipment": "Cable",
        "isCoreLift": false,
        "restTime": 60,
        "parentId": "44e8a10e-ca44-4369-a1e1-0d60c716c726"
    },
    {
        "id": "6fa8e5fe-efbe-4b30-becf-f046641f7e8f",
        "name": "Dead Bug",
        "category": "Strength",
        "muscleGroup": "Core",
        "equipment": "Bodyweight",
        "isCoreLift": false,
        "restTime": 60,
        "parentId": "44e8a10e-ca44-4369-a1e1-0d60c716c726"
    },
    {
        "id": "1f4799b7-0440-4e17-bb27-a5349f307f9d",
        "name": "Decline Sit Up",
        "category": "Strength",
        "muscleGroup": "Core",
        "equipment": "Bodyweight",
        "isCoreLift": false,
        "restTime": 60,
        "parentId": "44e8a10e-ca44-4369-a1e1-0d60c716c726"
    },
    {
        "id": "9e54b6f3-118f-4827-ab3d-69ad05a095c1",
        "name": "Hanging Leg Raise",
        "category": "Strength",
        "muscleGroup": "Core",
        "equipment": "Bodyweight",
        "isCoreLift": false,
        "restTime": 60,
        "parentId": "44e8a10e-ca44-4369-a1e1-0d60c716c726"
    },
    {
        "id": "77965733-4487-46ce-906c-33f34cb0945f",
        "name": "Side Plank",
        "category": "Strength",
        "muscleGroup": "Core",
        "equipment": "Bodyweight",
        "isCoreLift": false,
        "restTime": 60,
        "parentId": "44e8a10e-ca44-4369-a1e1-0d60c716c726"
    },
    {
        "id": "9bb8e1da-8005-400d-af34-d3bb06a0b0e9",
        "name": "Assisted Pull Up",
        "category": "Strength",
        "muscleGroup": "Back",
        "equipment": "Machine",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "6c3da776-724c-4cae-96c3-67dd5711b535"
    },
    {
        "id": "bd6fca06-d148-4e2d-b410-c4c6e6c8d5e6",
        "name": "Chin Up",
        "category": "Strength",
        "muscleGroup": "Back",
        "equipment": "Bodyweight",
        "isCoreLift": false,
        "restTime": 120,
        "parentId": "6c3da776-724c-4cae-96c3-67dd5711b535"
    },
    {
        "id": "0afed1b3-fa68-429e-92fc-89cc4a6da61c",
        "name": "Neutral Grip Pull Up",
        "category": "Strength",
        "muscleGroup": "Back",
        "equipment": "Bodyweight",
        "isCoreLift": false,
        "restTime": 120,
        "parentId": "6c3da776-724c-4cae-96c3-67dd5711b535"
    },
    {
        "id": "7c863476-9ae2-4503-a3e6-963cbd346880",
        "name": "Weighted Pull Up",
        "category": "Strength",
        "muscleGroup": "Back",
        "equipment": "Bodyweight",
        "isCoreLift": false,
        "restTime": 120,
        "parentId": "6c3da776-724c-4cae-96c3-67dd5711b535"
    },
    {
        "id": "b5f010e1-d1bd-4039-85d9-95198ff2fcbe",
        "name": "Wide Grip Pull Up",
        "category": "Strength",
        "muscleGroup": "Back",
        "equipment": "Bodyweight",
        "isCoreLift": false,
        "restTime": 120,
        "parentId": "6c3da776-724c-4cae-96c3-67dd5711b535"
    },
    {
        "id": "050b8c3f-579d-4fbd-8e73-1f3bc00e8195",
        "name": "Cable Rear Delt Fly",
        "category": "Strength",
        "muscleGroup": "Shoulders",
        "equipment": "Cable",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "3241e990-5f3f-478f-a177-a4c4a8502470"
    },
    {
        "id": "ad3ce5b2-83f6-4433-9a15-f8a1276a61ab",
        "name": "Dumbbell Rear Delt Fly",
        "category": "Strength",
        "muscleGroup": "Shoulders",
        "equipment": "Dumbbell",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "3241e990-5f3f-478f-a177-a4c4a8502470"
    },
    {
        "id": "191f0d7b-5d9c-466c-9e17-85e75a64d292",
        "name": "Face Pull",
        "category": "Strength",
        "muscleGroup": "Shoulders",
        "equipment": "Cable",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "3241e990-5f3f-478f-a177-a4c4a8502470"
    },
    {
        "id": "4e342aa2-99a1-4d1b-88c5-cc8d00314188",
        "name": "Lying Rear Delt Fly",
        "category": "Strength",
        "muscleGroup": "Shoulders",
        "equipment": "Dumbbell",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "3241e990-5f3f-478f-a177-a4c4a8502470"
    },
    {
        "id": "1afa41a9-0eb6-4be8-8bb9-c3e412a4cefb",
        "name": "Machine Reverse Pec Deck",
        "category": "Strength",
        "muscleGroup": "Shoulders",
        "equipment": "Machine",
        "isCoreLift": false,
        "restTime": 90,
        "parentId": "3241e990-5f3f-478f-a177-a4c4a8502470"
    },
    {
        "id": "b401357e-f2e7-4671-95d8-ca803ecb0b03",
        "name": "Dumbbell Shoulder Press",
        "category": "Strength",
        "muscleGroup": "Shoulders",
        "equipment": "Dumbbells",
        "isCoreLift": false,
        "restTime": 120,
        "parentId": "72c6239e-d4de-4289-adbf-ba82b48c6f81"
    },
    {
        "id": "d39507ec-1acd-4942-af90-4cbc937f2fa3",
        "name": "Machine Shoulder Press",
        "category": "Strength",
        "muscleGroup": "Shoulders",
        "equipment": "Machine",
        "isCoreLift": false,
        "restTime": 120,
        "parentId": "72c6239e-d4de-4289-adbf-ba82b48c6f81"
    },
    {
        "id": "c6fc9eda-820f-43fb-8834-a4b43580fb86",
        "name": "Overhead Press",
        "category": "Strength",
        "muscleGroup": "Shoulders",
        "equipment": "Barbell",
        "isCoreLift": true,
        "restTime": 120,
        "parentId": "72c6239e-d4de-4289-adbf-ba82b48c6f81"
    },
    {
        "id": "5af2bd4e-a47b-4e07-824b-4e1cb4bf2ce3",
        "name": "Smith Machine Shoulder Press",
        "category": "Strength",
        "muscleGroup": "Shoulders",
        "equipment": "Smith Machine",
        "isCoreLift": false,
        "restTime": 120,
        "parentId": "72c6239e-d4de-4289-adbf-ba82b48c6f81"
    },
    {
        "id": "4a957190-da08-4326-b732-a5a05b4b3e9e",
        "name": "Cable Tricep Pushdown",
        "category": "Strength",
        "muscleGroup": "Arms",
        "equipment": "Cable",
        "isCoreLift": false,
        "restTime": 60,
        "parentId": "7915eabd-3a18-474b-840a-4b252b8ceb25"
    },
    {
        "id": "389e4688-d30e-450c-b54d-56915b487b0f",
        "name": "Dumbbell Overhead Tricep Extension",
        "category": "Strength",
        "muscleGroup": "Arms",
        "equipment": "Dumbbells",
        "isCoreLift": false,
        "restTime": 60,
        "parentId": "7915eabd-3a18-474b-840a-4b252b8ceb25"
    },
    {
        "id": "e0ce3e49-85c7-4662-b073-3547df27d15c",
        "name": "Rope Tricep Pushdown",
        "category": "Strength",
        "muscleGroup": "Arms",
        "equipment": "Cable",
        "isCoreLift": false,
        "restTime": 60,
        "parentId": "7915eabd-3a18-474b-840a-4b252b8ceb25"
    },
    {
        "id": "abec91d2-c236-41f4-b7e1-7dd71b7cdd72",
        "name": "Skull Crushers",
        "category": "Strength",
        "muscleGroup": "Arms",
        "equipment": "Barbell",
        "isCoreLift": false,
        "restTime": 60,
        "parentId": "7915eabd-3a18-474b-840a-4b252b8ceb25"
    }
];

    for (const ex of exercises) {
        await prisma.exercise.upsert({
            where: { id: ex.id },
            update: {
                name: ex.name,
                category: ex.category,
                muscleGroup: ex.muscleGroup,
                equipment: ex.equipment,
                isCoreLift: ex.isCoreLift,
                restTime: ex.restTime,
                parentId: ex.parentId
            },
            create: {
                id: ex.id,
                name: ex.name,
                category: ex.category,
                muscleGroup: ex.muscleGroup,
                equipment: ex.equipment,
                isCoreLift: ex.isCoreLift,
                restTime: ex.restTime,
                parentId: ex.parentId
            },
        });
    }

    console.log(`${exercises.length} exercises seeded.`);
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
