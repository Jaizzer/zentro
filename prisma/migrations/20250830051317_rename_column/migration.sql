/*
  Warnings:

  - You are about to drop the column `isRoot` on the `folders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "folders" DROP COLUMN "isRoot",
ADD COLUMN     "is_root" BOOLEAN NOT NULL DEFAULT false;
