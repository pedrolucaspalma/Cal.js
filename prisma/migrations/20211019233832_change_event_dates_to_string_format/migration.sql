-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "beginningDate" TEXT NOT NULL,
    "endingDate" TEXT NOT NULL,
    "relatedSetId" INTEGER NOT NULL,
    CONSTRAINT "Event_relatedSetId_fkey" FOREIGN KEY ("relatedSetId") REFERENCES "EventSet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("beginningDate", "description", "endingDate", "id", "relatedSetId") SELECT "beginningDate", "description", "endingDate", "id", "relatedSetId" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
