/*
  Warnings:

  - You are about to drop the `Folder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_id_fkey";

-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "files" DROP CONSTRAINT "files_folder_id_fkey";

-- DropTable
DROP TABLE "Folder";

-- CreateTable
CREATE TABLE "folders" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,

    CONSTRAINT "folders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "folders" ADD CONSTRAINT "folders_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "folders" ADD CONSTRAINT "folders_id_fkey" FOREIGN KEY ("id") REFERENCES "folders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
