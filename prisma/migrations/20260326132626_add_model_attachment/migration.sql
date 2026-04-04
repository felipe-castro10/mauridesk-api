-- CreateTable
CREATE TABLE "Attachment" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "ticket_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_ticket_id_fkey" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
