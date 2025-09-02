/*
  Warnings:

  - You are about to drop the column `isPrivate` on the `folders` table. All the data in the column will be lost.
  - You are about to drop the column `parentFolderId` on the `folders` table. All the data in the column will be lost.
  - Added the required column `parent_folder_id` to the `folders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "folders" DROP CONSTRAINT "folders_parentFolderId_fkey";

-- AlterTable
ALTER TABLE "folders" DROP COLUMN "isPrivate",
DROP COLUMN "parentFolderId",
ADD COLUMN     "is_private" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "parent_folder_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "folders" ADD CONSTRAINT "folders_parent_folder_id_fkey" FOREIGN KEY ("parent_folder_id") REFERENCES "folders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
