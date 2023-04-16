/*
  Warnings:

  - Added the required column `data_nascimento` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "data_nascimento" DATETIME NOT NULL
);
INSERT INTO "new_Usuario" ("celular", "cpf", "email", "id", "name", "password", "sexo") SELECT "celular", "cpf", "email", "id", "name", "password", "sexo" FROM "Usuario";
DROP TABLE "Usuario";
ALTER TABLE "new_Usuario" RENAME TO "Usuario";
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
CREATE UNIQUE INDEX "Usuario_cpf_key" ON "Usuario"("cpf");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
