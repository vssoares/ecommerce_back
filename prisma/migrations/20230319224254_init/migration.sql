/*
  Warnings:

  - You are about to alter the column `preco` on the `Produto` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "preco" REAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "imagem" TEXT NOT NULL
);
INSERT INTO "new_Produto" ("descricao", "id", "imagem", "nome", "preco") SELECT "descricao", "id", "imagem", "nome", "preco" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
