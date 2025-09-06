/*
  Warnings:

  - You are about to drop the column `userId` on the `linked_accounts` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `local_accounts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `linked_accounts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `local_accounts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `linked_accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `local_accounts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "linked_accounts" DROP CONSTRAINT "linked_accounts_userId_fkey";

-- DropForeignKey
ALTER TABLE "local_accounts" DROP CONSTRAINT "local_accounts_userId_fkey";

-- DropIndex
DROP INDEX "linked_accounts_userId_key";

-- DropIndex
DROP INDEX "local_accounts_userId_key";

-- AlterTable
ALTER TABLE "linked_accounts" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "local_accounts" DROP COLUMN "userId",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "linked_accounts_user_id_key" ON "linked_accounts"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "local_accounts_user_id_key" ON "local_accounts"("user_id");

-- AddForeignKey
ALTER TABLE "local_accounts" ADD CONSTRAINT "local_accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "linked_accounts" ADD CONSTRAINT "linked_accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
