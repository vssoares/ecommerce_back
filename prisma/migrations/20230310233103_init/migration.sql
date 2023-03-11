/*
  Warnings:

  - You are about to drop the column `carrinho_id` on the `Endereco` table. All the data in the column will be lost.
  - Added the required column `endereco_id` to the `Carrinho` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Endereco" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cep" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "pais" TEXT NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    CONSTRAINT "Endereco_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Endereco" ("bairro", "cep", "cidade", "complemento", "id", "numero", "pais", "rua", "uf", "usuario_id") SELECT "bairro", "cep", "cidade", "complemento", "id", "numero", "pais", "rua", "uf", "usuario_id" FROM "Endereco";
DROP TABLE "Endereco";
ALTER TABLE "new_Endereco" RENAME TO "Endereco";
CREATE TABLE "new_Carrinho" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "usuario_id" INTEGER NOT NULL,
    "endereco_id" INTEGER NOT NULL,
    CONSTRAINT "Carrinho_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Carrinho_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "Endereco" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Carrinho" ("id", "usuario_id") SELECT "id", "usuario_id" FROM "Carrinho";
DROP TABLE "Carrinho";
ALTER TABLE "new_Carrinho" RENAME TO "Carrinho";
CREATE UNIQUE INDEX "Carrinho_usuario_id_key" ON "Carrinho"("usuario_id");
CREATE UNIQUE INDEX "Carrinho_endereco_id_key" ON "Carrinho"("endereco_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
