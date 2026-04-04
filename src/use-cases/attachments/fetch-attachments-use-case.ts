import type { AttachmentsRepository } from "@/repositories/attachments-repository";
import type { Attachment } from "@prisma/client";

export class FetchAttachmentsUseCase {
  constructor(private attachmentsRepository: AttachmentsRepository){}

  async execute(ticket_id: string){
    const attachments = await this.attachmentsRepository.findByTicketId(ticket_id)

    //Adicionamos a URL completa para facilitar a vida do Front-end

    return {
      attachments: attachments.map(attachment => ({
        ...attachment,
        url: `http://localhost:8000/files/tickets/${attachment.path}`
      }))
    }
  }
}