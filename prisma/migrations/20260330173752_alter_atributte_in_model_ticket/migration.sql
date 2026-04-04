/*
  Warnings:

  - You are about to drop the column `dynamic_reponses` on the `tickets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tickets" DROP COLUMN "dynamic_reponses",
ADD COLUMN     "dynamic_responses" JSONB DEFAULT '{}';
