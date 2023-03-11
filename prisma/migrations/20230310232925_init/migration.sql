/*
  Warnings:

  - Added the required column `carrinho_id` to the `Endereco` table without a default value. This is not possible if the table is not empty.

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
    "carrinho_id" INTEGER NOT NULL,
    CONSTRAINT "Endereco_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Endereco_carrinho_id_fkey" FOREIGN KEY ("carrinho_id") REFERENCES "Carrinho" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Endereco" ("bairro", "cep", "cidade", "complemento", "id", "numero", "pais", "rua", "uf", "usuario_id") SELECT "bairro", "cep", "cidade", "complemento", "id", "numero", "pais", "rua", "uf", "usuario_id" FROM "Endereco";
DROP TABLE "Endereco";
ALTER TABLE "new_Endereco" RENAME TO "Endereco";
CREATE UNIQUE INDEX "Endereco_carrinho_id_key" ON "Endereco"("carrinho_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
