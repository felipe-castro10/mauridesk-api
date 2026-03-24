import type { TicketMessage } from "@prisma/client";
import type { CreateMessageDTO } from "./interfaces/create-message-DTO";


export interface TicketMessageRepository{
  create(data: CreateMessageDTO): Promise<TicketMessage>
  listMessages(ticket_id: string): Promise<TicketMessage[] | null>
}