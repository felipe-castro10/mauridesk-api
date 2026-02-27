import { PrismaTicketsRepository } from '@/repositories/prisma/prisma-tickets-repository'
import { FetchTicketUseCase } from '../fetch-tickets'

export function makeFetchTicketUseCase() {
  const prismaTicketsRepository = new PrismaTicketsRepository()
  const fetchTicketsUseCase = new FetchTicketUseCase(prismaTicketsRepository)

  return fetchTicketsUseCase
}
