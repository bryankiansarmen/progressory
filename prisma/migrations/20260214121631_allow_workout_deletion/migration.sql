-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WorkoutLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER,
    "userId" TEXT NOT NULL,
    "workoutId" TEXT,
    "programDayId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "WorkoutLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "WorkoutLog_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "WorkoutLog_programDayId_fkey" FOREIGN KEY ("programDayId") REFERENCES "ProgramDay" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_WorkoutLog" ("createdAt", "date", "duration", "id", "programDayId", "updatedAt", "userId", "workoutId") SELECT "createdAt", "date", "duration", "id", "programDayId", "updatedAt", "userId", "workoutId" FROM "WorkoutLog";
DROP TABLE "WorkoutLog";
ALTER TABLE "new_WorkoutLog" RENAME TO "WorkoutLog";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
