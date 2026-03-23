/*
  Warnings:

  - You are about to drop the column `resolved_at` on the `tickets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "resolved_at",
ADD COLUMN     "resolved" BOOLEAN NOT NULL DEFAULT false;
