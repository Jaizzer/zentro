-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "local_accounts" (
    "id" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "email_verification_string" TEXT NOT NULL,
    "email_verification_string_expiration_date" TIMESTAMP(3),
    "is_verified" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "local_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "linked_accounts" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_user_id" TEXT NOT NULL,
    "email" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "linked_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "local_accounts_password_hash_key" ON "local_accounts"("password_hash");

-- CreateIndex
CREATE UNIQUE INDEX "local_accounts_email_key" ON "local_accounts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "local_accounts_email_verification_string_key" ON "local_accounts"("email_verification_string");

-- CreateIndex
CREATE UNIQUE INDEX "local_accounts_userId_key" ON "local_accounts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "linked_accounts_userId_key" ON "linked_accounts"("userId");

-- AddForeignKey
ALTER TABLE "local_accounts" ADD CONSTRAINT "local_accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "linked_accounts" ADD CONSTRAINT "linked_accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
