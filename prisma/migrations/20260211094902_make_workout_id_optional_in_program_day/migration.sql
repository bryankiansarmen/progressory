-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProgramDay" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "programId" TEXT NOT NULL,
    "workoutId" TEXT,
    "dayNumber" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "ProgramDay_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ProgramDay_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ProgramDay" ("createdAt", "dayNumber", "id", "programId", "updatedAt", "workoutId") SELECT "createdAt", "dayNumber", "id", "programId", "updatedAt", "workoutId" FROM "ProgramDay";
DROP TABLE "ProgramDay";
ALTER TABLE "new_ProgramDay" RENAME TO "ProgramDay";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
