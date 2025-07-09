-- CreateTable
CREATE TABLE "user_folder_permissions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "folder_id" TEXT NOT NULL,

    CONSTRAINT "user_folder_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorite_folders" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "folder_id" TEXT NOT NULL,

    CONSTRAINT "favorite_folders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_folder_permissions" ADD CONSTRAINT "user_folder_permissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_folder_permissions" ADD CONSTRAINT "user_folder_permissions_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "folders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_folders" ADD CONSTRAINT "favorite_folders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_folders" ADD CONSTRAINT "favorite_folders_folder_id_fkey" FOREIGN KEY ("folder_id") REFERENCES "folders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
