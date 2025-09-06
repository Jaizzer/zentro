/*
  Warnings:

  - You are about to drop the `favorites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_permissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_file_id_fkey";

-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_permissions" DROP CONSTRAINT "user_permissions_file_id_fkey";

-- DropForeignKey
ALTER TABLE "user_permissions" DROP CONSTRAINT "user_permissions_user_id_fkey";

-- DropTable
DROP TABLE "favorites";

-- DropTable
DROP TABLE "user_permissions";

-- CreateTable
CREATE TABLE "user_file_permissions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,

    CONSTRAINT "user_file_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorite_files" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,

    CONSTRAINT "favorite_files_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_file_permissions" ADD CONSTRAINT "user_file_permissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_file_permissions" ADD CONSTRAINT "user_file_permissions_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_files" ADD CONSTRAINT "favorite_files_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_files" ADD CONSTRAINT "favorite_files_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
