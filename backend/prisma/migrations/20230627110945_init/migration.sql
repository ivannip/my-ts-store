/*
  Warnings:

  - You are about to drop the column `quantity` on the `fruit_product` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_fruit_product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "price" REAL NOT NULL DEFAULT 0,
    "inventory" INTEGER NOT NULL DEFAULT 100
);
INSERT INTO "new_fruit_product" ("id", "imgUrl", "name", "price") SELECT "id", "imgUrl", "name", "price" FROM "fruit_product";
DROP TABLE "fruit_product";
ALTER TABLE "new_fruit_product" RENAME TO "fruit_product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
