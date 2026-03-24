import type { CreateMessageDTO } from "@/repositories/interfaces/create-message-DTO";
import type { TicketMessageRepository } from "@/repositories/ticket-message-repository";
import type { TicketMessage } from "@prisma/client";



interface CreateMessageResponse{
  ticketMessage: TicketMessage
}

export class CreateTicketMessageUseCase {
  constructor(private ticketMessageRepository: TicketMessageRepository){}


  async execute(data:CreateMessageDTO):Promise<CreateMessageResponse>{
    const ticketMessage = await this.ticketMessageRepository.create(data)

    return {ticketMessage}
  }
}