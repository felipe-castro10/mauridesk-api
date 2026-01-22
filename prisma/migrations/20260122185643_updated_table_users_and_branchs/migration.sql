/*
  Warnings:

  - You are about to drop the column `code` on the `branchs` table. All the data in the column will be lost.
  - You are about to drop the column `typeUser` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cnpj]` on the table `branchs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cnpj` to the `branchs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_user` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "branchs_code_key";

-- AlterTable
ALTER TABLE "branchs" DROP COLUMN "code",
ADD COLUMN     "cnpj" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "typeUser",
ADD COLUMN     "type_user" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "branchs_cnpj_key" ON "branchs"("cnpj");
