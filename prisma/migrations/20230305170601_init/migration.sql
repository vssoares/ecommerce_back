/*
  Warnings:

  - You are about to drop the column `dislike_id` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `like_id` on the `Post` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_LikeToPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_LikeToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "Like" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_LikeToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "published" BOOLEAN DEFAULT false,
    "author_id" INTEGER,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Post_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Post" ("author_id", "content", "created_at", "id", "published", "title") SELECT "author_id", "content", "created_at", "id", "published", "title" FROM "Post";
DROP TABLE "Post";
ALTER TABLE "new_Post" RENAME TO "Post";
CREATE TABLE "new_Dislike" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "post_id" INTEGER,
    "user_id" INTEGER,
    CONSTRAINT "Dislike_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "Post" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Dislike_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Dislike" ("id", "user_id") SELECT "id", "user_id" FROM "Dislike";
DROP TABLE "Dislike";
ALTER TABLE "new_Dislike" RENAME TO "Dislike";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_LikeToPost_AB_unique" ON "_LikeToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_LikeToPost_B_index" ON "_LikeToPost"("B");
