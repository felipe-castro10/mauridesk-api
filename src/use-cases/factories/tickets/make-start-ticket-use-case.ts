import { PrismaTicketsRepository } from '@/repositories/prisma/prisma-tickets-repository'
import { StartTicketUseCase } from '@/use-cases/tickets/start-ticket-use-case'


export function makeStartTicketUseCase() {
  const ticketsRepository = new PrismaTicketsRepository()
  const startTicketUseCase = new StartTicketUseCase(ticketsRepository)

  return startTicketUseCase
}
