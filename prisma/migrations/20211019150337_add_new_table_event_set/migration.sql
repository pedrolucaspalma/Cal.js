/*
  Warnings:

  - You are about to drop the column `relatedUserId` on the `Event` table. All the data in the column will be lost.
  - Added the required column `relatedSetId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
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
    "beginningDate" DATETIME NOT NULL,
    "endingDate" DATETIME NOT NULL,
    "relatedSetId" INTEGER NOT NULL,
    CONSTRAINT "Event_relatedSetId_fkey" FOREIGN KEY ("relatedSetId") REFERENCES "EventSet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("beginningDate", "description", "endingDate", "id") SELECT "beginningDate", "description", "endingDate", "id" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "EventSet_relatedUserId_key" ON "EventSet"("relatedUserId");
