import { PrismaTicketsRepository } from '@/repositories/prisma/prisma-tickets-repository'
import { GetTicketUseCase } from '@/use-cases/tickets/get-ticket'


export function makeGetTicketUseCase() {
  const ticketRepository = new PrismaTicketsRepository()
  const getTicketUseCase = new GetTicketUseCase(ticketRepository)

  return getTicketUseCase
}
