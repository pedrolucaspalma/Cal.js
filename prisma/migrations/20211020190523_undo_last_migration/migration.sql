/*
  Warnings:

  - You are about to drop the `eventset` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "eventset_relatedUserId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "eventset";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "EventSet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "relatedUserId" INTEGER NOT NULL,
    CONSTRAINT "EventSet_relatedUserId_fkey" FOREIGN KEY ("relatedUserId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

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

-- CreateIndex
CREATE UNIQUE INDEX "EventSet_relatedUserId_key" ON "EventSet"("relatedUserId");
