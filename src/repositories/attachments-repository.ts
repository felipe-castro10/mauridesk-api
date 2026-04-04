import type { Attachment, Prisma } from "@prisma/client";

export interface AttachmentsRepository{
  createMany(data: Prisma.AttachmentUncheckedCreateInput[]):Promise<void>
  findByTicketId(ticket_id: string): Promise<Attachment[]>
}