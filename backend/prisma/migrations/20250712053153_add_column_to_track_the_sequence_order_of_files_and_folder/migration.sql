-- AlterTable
ALTER TABLE "files" ADD COLUMN     "sequence_number" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "folders" ADD COLUMN     "sequence_number" SERIAL NOT NULL;
