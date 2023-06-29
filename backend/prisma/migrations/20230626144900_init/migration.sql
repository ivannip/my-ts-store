-- CreateTable
CREATE TABLE "transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "purchaseDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" INTEGER NOT NULL,
    "orderId" INTEGER,
    CONSTRAINT "transaction_productId_fkey" FOREIGN KEY ("productId") REFERENCES "fruit_product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "transaction_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customer" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "createDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deliveryDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deliveryAddress" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending'
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_fruit_product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "price" REAL NOT NULL DEFAULT 0,
    "quantity" INTEGER NOT NULL DEFAULT 100
);
INSERT INTO "new_fruit_product" ("id", "imgUrl", "name", "price") SELECT "id", "imgUrl", "name", "price" FROM "fruit_product";
DROP TABLE "fruit_product";
ALTER TABLE "new_fruit_product" RENAME TO "fruit_product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
