/*
  Warnings:

  - You are about to drop the column `category` on the `tickets` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "category",
ADD COLUMN     "category_id" TEXT NOT NULL,
ADD COLUMN     "dynamic_reponses" JSONB DEFAULT '{}';

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "custom_fields" JSONB NOT NULL DEFAULT '[]',

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
