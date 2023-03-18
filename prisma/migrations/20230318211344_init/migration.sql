-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Carrinho" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "valor_total" DECIMAL,
    "usuario_id" INTEGER NOT NULL,
    "endereco_id" INTEGER NOT NULL,
    CONSTRAINT "Carrinho_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Carrinho_endereco_id_fkey" FOREIGN KEY ("endereco_id") REFERENCES "Endereco" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Carrinho" ("endereco_id", "id", "usuario_id", "valor_total") SELECT "endereco_id", "id", "usuario_id", "valor_total" FROM "Carrinho";
DROP TABLE "Carrinho";
ALTER TABLE "new_Carrinho" RENAME TO "Carrinho";
CREATE UNIQUE INDEX "Carrinho_usuario_id_key" ON "Carrinho"("usuario_id");
CREATE UNIQUE INDEX "Carrinho_endereco_id_key" ON "Carrinho"("endereco_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
