/*
  Warnings:

  - You are about to drop the column `contact` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `cpf` on the `users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- DropIndex
DROP INDEX "users_cpf_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "contact",
DROP COLUMN "cpf",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'USER';
