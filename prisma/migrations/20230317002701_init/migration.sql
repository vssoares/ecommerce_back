/*
  Warnings:

  - Added the required column `quantidade` to the `ProdutosOnCarrinho` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_total` to the `Carrinho` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagem` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preco` to the `Produto` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "CategoriasOnProdutos" (
    "categoria_id" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TEXT NOT NULL,

    PRIMARY KEY ("categoria_id", "produto_id"),
    CONSTRAINT "CategoriasOnProdutos_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "Categoria" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CategoriasOnProdutos_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProdutosOnCarrinho" (
    "carrinho_id" INTEGER NOT NULL,
    "produto_id" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TEXT NOT NULL,

    PRIMARY KEY ("carrinho_id", "produto_id"),
    CONSTRAINT "ProdutosOnCarrinho_carrinho_id_fkey" FOREIGN KEY ("carrinho_id") REFERENCES "Carrinho" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProdutosOnCarrinho_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ProdutosOnCarrinho" ("carrinho_id", "created_at", "produto_id", "updated_at") SELECT "carrinho_id", "created_at", "produto_id", "updated_at" FROM "ProdutosOnCarrinho";
DROP TABLE "ProdutosOnCarrinho";
ALTER TABLE "new_ProdutosOnCarrinho" RENAME TO "ProdutosOnCarrinho";
CREATE TABLE "new_Carrinho" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "valor_total" DECIMAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "endereco_id" INTEGER NOT NULL,
    CONSTRAINT "Carrinho_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Carrinho_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "Endereco" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Carrinho" ("endereco_id", "id", "usuario_id") SELECT "endereco_id", "id", "usuario_id" FROM "Carrinho";
DROP TABLE "Carrinho";
ALTER TABLE "new_Carrinho" RENAME TO "Carrinho";
CREATE UNIQUE INDEX "Carrinho_usuario_id_key" ON "Carrinho"("usuario_id");
CREATE UNIQUE INDEX "Carrinho_endereco_id_key" ON "Carrinho"("endereco_id");
CREATE TABLE "new_Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "preco" DECIMAL NOT NULL,
    "descricao" TEXT NOT NULL,
    "imagem" TEXT NOT NULL
);
INSERT INTO "new_Produto" ("id") SELECT "id" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
