/*
  Warnings:

  - You are about to drop the `ProdutosOnCarrinho` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "ProdutosOnCarrinho";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "CarrinhoItem" (
    "carrinho_id" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "preco_unitario" REAL NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TEXT,

    PRIMARY KEY ("carrinho_id", "produto_id"),
    CONSTRAINT "CarrinhoItem_carrinho_id_fkey" FOREIGN KEY ("carrinho_id") REFERENCES "Carrinho" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CarrinhoItem_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
