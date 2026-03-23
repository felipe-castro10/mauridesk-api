import { PrismaTicketsRepository } from "@/repositories/prisma/prisma-tickets-repository";
import { ClosedTicketUseCase } from "../closed-ticket-use-case";



export function makeCloseTicketUseCase() {
  const ticketRepository = new PrismaTicketsRepository()
  const closeTicketUseCase = new ClosedTicketUseCase(ticketRepository)


  return closeTicketUseCase
}