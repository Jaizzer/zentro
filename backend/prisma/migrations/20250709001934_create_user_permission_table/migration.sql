-- CreateTable
CREATE TABLE "user_permissions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "file_id" TEXT NOT NULL,

    CONSTRAINT "user_permissions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_permissions" ADD CONSTRAINT "user_permissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_permissions" ADD CONSTRAINT "user_permissions_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
