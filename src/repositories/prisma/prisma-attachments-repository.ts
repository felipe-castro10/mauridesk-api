import type { Prisma, Attachment } from "@prisma/client";
import type { AttachmentsRepository } from "../attachments-repository";
import { prisma } from "@/lib/prisma";


export class PrismaAttachmentsRepository implements AttachmentsRepository{
 
 
  async createMany(data: Prisma.AttachmentUncheckedCreateInput[]): Promise<void> {
      await prisma.attachment.createMany({
        data,
      })
  }


  async findByTicketId(ticket_id: string): Promise<Attachment[]> {
    const attachments = await prisma.attachment.findMany({
      where: {
        ticket_id
      }
    })

    return attachments
  }

}