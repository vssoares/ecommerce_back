/*
  Warnings:

  - You are about to drop the column `assignedAt` on the `ProdutosOnCarrinho` table. All the data in the column will be lost.
  - You are about to drop the column `assignedBy` on the `ProdutosOnCarrinho` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `ProdutosOnCarrinho` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProdutosOnCarrinho" (
    "carrinho_id" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TEXT NOT NULL,

    PRIMARY KEY ("carrinho_id", "produto_id"),
    CONSTRAINT "ProdutosOnCarrinho_carrinho_id_fkey" FOREIGN KEY ("carrinho_id") REFERENCES "Carrinho" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProdutosOnCarrinho_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProdutosOnCarrinho" ("carrinho_id", "produto_id") SELECT "carrinho_id", "produto_id" FROM "ProdutosOnCarrinho";
DROP TABLE "ProdutosOnCarrinho";
ALTER TABLE "new_ProdutosOnCarrinho" RENAME TO "ProdutosOnCarrinho";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
