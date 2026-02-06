/*
  Warnings:

  - Added the required column `sla_due_at` to the `tickets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tickets" ADD COLUMN     "closed_at" TIMESTAMP(3),
ADD COLUMN     "first_response_at" TIMESTAMP(3),
ADD COLUMN     "resolved_at" TIMESTAMP(3),
ADD COLUMN     "sla_due_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "sla_violated" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "priority" SET DEFAULT 'LOW';
