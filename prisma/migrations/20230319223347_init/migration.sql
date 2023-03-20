/*
  Warnings:

  - You are about to alter the column `valor_total` on the `Carrinho` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Carrinho" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "valor_total" REAL,
    "usuario_id" INTEGER NOT NULL,
    CONSTRAINT "Carrinho_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Carrinho" ("id", "usuario_id", "valor_total") SELECT "id", "usuario_id", "valor_total" FROM "Carrinho";
DROP TABLE "Carrinho";
ALTER TABLE "new_Carrinho" RENAME TO "Carrinho";
CREATE UNIQUE INDEX "Carrinho_usuario_id_key" ON "Carrinho"("usuario_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
