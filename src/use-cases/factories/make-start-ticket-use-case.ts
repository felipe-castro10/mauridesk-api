import { PrismaTicketsRepository } from '@/repositories/prisma/prisma-tickets-repository'
import { StartTicketUseCase } from '../start-ticket-use-case'

export function makeStartTicketUseCase() {
  const ticketsRepository = new PrismaTicketsRepository()
  const startTicketUseCase = new StartTicketUseCase(ticketsRepository)

  return startTicketUseCase
}
