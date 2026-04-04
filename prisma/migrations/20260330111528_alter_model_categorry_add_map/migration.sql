/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "tickets" DROP CONSTRAINT "tickets_category_id_fkey";

-- DropTable
DROP TABLE "Category";

-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "custom_fields" JSONB NOT NULL DEFAULT '[]',

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
