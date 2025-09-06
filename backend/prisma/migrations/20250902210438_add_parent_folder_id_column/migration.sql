/*
  Warnings:

  - Added the required column `parentFolderId` to the `folders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "folders" DROP CONSTRAINT "folders_id_fkey";

-- AlterTable
ALTER TABLE "folders" ADD COLUMN     "parentFolderId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "folders" ADD CONSTRAINT "folders_parentFolderId_fkey" FOREIGN KEY ("parentFolderId") REFERENCES "folders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
