-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProdutosOnCarrinho" (
    "carrinho_id" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TEXT,

    PRIMARY KEY ("carrinho_id", "produto_id"),
    CONSTRAINT "ProdutosOnCarrinho_carrinho_id_fkey" FOREIGN KEY ("carrinho_id") REFERENCES "Carrinho" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProdutosOnCarrinho_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProdutosOnCarrinho" ("carrinho_id", "created_at", "produto_id", "quantidade", "updated_at") SELECT "carrinho_id", "created_at", "produto_id", "quantidade", "updated_at" FROM "ProdutosOnCarrinho";
DROP TABLE "ProdutosOnCarrinho";
ALTER TABLE "new_ProdutosOnCarrinho" RENAME TO "ProdutosOnCarrinho";
CREATE TABLE "new_CategoriasOnProdutos" (
    "categoria_id" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "created_at" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TEXT,

    PRIMARY KEY ("categoria_id", "produto_id"),
    CONSTRAINT "CategoriasOnProdutos_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "Categoria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CategoriasOnProdutos_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CategoriasOnProdutos" ("categoria_id", "created_at", "produto_id", "updated_at") SELECT "categoria_id", "created_at", "produto_id", "updated_at" FROM "CategoriasOnProdutos";
DROP TABLE "CategoriasOnProdutos";
ALTER TABLE "new_CategoriasOnProdutos" RENAME TO "CategoriasOnProdutos";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
