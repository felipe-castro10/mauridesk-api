import { PrismaTicketMessageRepository } from "@/repositories/prisma/prisma-ticket-message-repository";
import { ListMessageUseCase } from "../list-messages-use-case";


export function makeListMessagesUseCase(){
  const ticketMessageRepository = new PrismaTicketMessageRepository()
  const listMessageUseCase = new ListMessageUseCase(ticketMessageRepository)

  return listMessageUseCase
}