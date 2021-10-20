/*
  Warnings:

  - You are about to drop the `EventSet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `relatedSetId` on the `Event` table. All the data in the column will be lost.
  - Added the required column `relatedUserId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "EventSet_relatedUserId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "EventSet";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "beginningDate" TEXT NOT NULL,
    "endingDate" TEXT NOT NULL,
    "relatedUserId" INTEGER NOT NULL,
    CONSTRAINT "Event_relatedUserId_fkey" FOREIGN KEY ("relatedUserId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("beginningDate", "description", "endingDate", "id") SELECT "beginningDate", "description", "endingDate", "id" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
