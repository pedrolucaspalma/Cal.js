/*
  Warnings:

  - You are about to drop the column `relatedUserId` on the `EventSet` table. All the data in the column will be lost.
  - You are about to drop the column `relatedSetId` on the `Event` table. All the data in the column will be lost.
  - Added the required column `relatedUserEmail` to the `EventSet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `relatedSetEmail` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "EventSet_relatedUserId_key";

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EventSet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "relatedUserEmail" TEXT NOT NULL,
    CONSTRAINT "EventSet_relatedUserEmail_fkey" FOREIGN KEY ("relatedUserEmail") REFERENCES "User" ("email") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_EventSet" ("id") SELECT "id" FROM "EventSet";
DROP TABLE "EventSet";
ALTER TABLE "new_EventSet" RENAME TO "EventSet";
CREATE UNIQUE INDEX "EventSet_relatedUserEmail_key" ON "EventSet"("relatedUserEmail");
CREATE TABLE "new_Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "beginningDate" DATETIME NOT NULL,
    "endingDate" DATETIME NOT NULL,
    "relatedSetEmail" TEXT NOT NULL,
    CONSTRAINT "Event_relatedSetEmail_fkey" FOREIGN KEY ("relatedSetEmail") REFERENCES "EventSet" ("relatedUserEmail") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("beginningDate", "description", "endingDate", "id") SELECT "beginningDate", "description", "endingDate", "id" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
