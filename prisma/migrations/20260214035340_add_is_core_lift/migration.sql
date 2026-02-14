-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exercise" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "muscleGroup" TEXT NOT NULL,
    "equipment" TEXT,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "parentId" TEXT,
    "userId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "isCoreLift" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Exercise_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Exercise" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Exercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Exercise" ("category", "createdAt", "equipment", "id", "isArchived", "muscleGroup", "name", "parentId", "updatedAt", "userId") SELECT "category", "createdAt", "equipment", "id", "isArchived", "muscleGroup", "name", "parentId", "updatedAt", "userId" FROM "Exercise";
DROP TABLE "Exercise";
ALTER TABLE "new_Exercise" RENAME TO "Exercise";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
