-- DropForeignKey
ALTER TABLE "folders" DROP CONSTRAINT "folders_parent_folder_id_fkey";

-- AlterTable
ALTER TABLE "folders" ALTER COLUMN "parent_folder_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "folders" ADD CONSTRAINT "folders_parent_folder_id_fkey" FOREIGN KEY ("parent_folder_id") REFERENCES "folders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
