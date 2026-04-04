import { PrismaTicketMessageRepository } from "@/repositories/prisma/prisma-ticket-message-repository";
import { CreateTicketMessageUseCase } from "@/use-cases/messages/create-ticket-message-use-case";



export function makeCreateTicketMessageUseCase(){
  const ticketMessageRepository = new PrismaTicketMessageRepository()
  const createTicketMessageUseCase = new CreateTicketMessageUseCase(ticketMessageRepository)


  return createTicketMessageUseCase
}