import { PrismaTicketsRepository } from '@/repositories/prisma/prisma-tickets-repository'
import { GetTicketUseCase } from '../get-ticket'

export function makeGetTicketUseCase() {
  const ticketRepository = new PrismaTicketsRepository()
  const getTicketUseCase = new GetTicketUseCase(ticketRepository)

  return getTicketUseCase
}
