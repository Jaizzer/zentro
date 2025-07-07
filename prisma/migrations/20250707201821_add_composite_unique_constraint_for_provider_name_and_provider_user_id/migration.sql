/*
  Warnings:

  - A unique constraint covering the columns `[provider,provider_user_id]` on the table `linked_accounts` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "linked_accounts_provider_provider_user_id_key" ON "linked_accounts"("provider", "provider_user_id");
