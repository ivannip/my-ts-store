-- CreateTable
CREATE TABLE "fruit_product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "price" REAL NOT NULL DEFAULT 0
);
