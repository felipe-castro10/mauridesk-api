import { PrismaTicketsRepository } from '@/repositories/prisma/prisma-tickets-repository'
import { CreateTicketUseCase } from '../create-ticket'

export function makeCreateTicketUseCase() {
  const prismaTicketsRepository = new PrismaTicketsRepository()
  const createTicketUsecase = new CreateTicketUseCase(prismaTicketsRepository)

  return createTicketUsecase
}
