-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Endereco" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cep" TEXT,
    "rua" TEXT,
    "numero" TEXT,
    "complemento" TEXT,
    "bairro" TEXT,
    "cidade" TEXT,
    "uf" TEXT,
    "usuario_id" INTEGER NOT NULL,
    CONSTRAINT "Endereco_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Endereco" ("bairro", "cep", "cidade", "complemento", "id", "numero", "rua", "uf", "usuario_id") SELECT "bairro", "cep", "cidade", "complemento", "id", "numero", "rua", "uf", "usuario_id" FROM "Endereco";
DROP TABLE "Endereco";
ALTER TABLE "new_Endereco" RENAME TO "Endereco";
CREATE TABLE "new_Carrinho" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "valor_total" DECIMAL,
    "usuario_id" INTEGER NOT NULL,
    CONSTRAINT "Carrinho_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Carrinho" ("id", "usuario_id", "valor_total") SELECT "id", "usuario_id", "valor_total" FROM "Carrinho";
DROP TABLE "Carrinho";
ALTER TABLE "new_Carrinho" RENAME TO "Carrinho";
CREATE UNIQUE INDEX "Carrinho_usuario_id_key" ON "Carrinho"("usuario_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
