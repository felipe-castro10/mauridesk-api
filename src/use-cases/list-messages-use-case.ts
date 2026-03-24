import type { TicketMessageRepository } from "@/repositories/ticket-message-repository";
import type { TicketMessage } from "@prisma/client";


interface ListMessagesResponse {
  listMessages: TicketMessage[] | null;
}

export class ListMessageUseCase{
  constructor(private ticketMessageRepository: TicketMessageRepository){}


  async execute(ticket_id: string): Promise<ListMessagesResponse>{

    const listMessages = await this.ticketMessageRepository.listMessages(ticket_id)


    return {listMessages}
  }
}