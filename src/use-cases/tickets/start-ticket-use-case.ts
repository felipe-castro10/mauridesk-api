import type { TicketsRepository } from '@/repositories/tickets-repository'
import type { Ticket } from '@prisma/client'
import { TicketNotExistsError } from '../errors/tickets-not-exists-error'

interface StartTicketUseCaseRequest {
  id: string
  technician_id: string
}

interface StartTicketUseCaseResponse {
  ticket: Ticket
}

export class StartTicketUseCase {
  constructor(private ticketsRepository: TicketsRepository) {}

  async execute({
    id,
    technician_id,
  }: StartTicketUseCaseRequest): Promise<StartTicketUseCaseResponse> {
    const findTicket = await this.ticketsRepository.getTicket(id)

    if (!findTicket) {
      throw new TicketNotExistsError()
    }

    const ticket = await this.ticketsRepository.startTicket(id, technician_id)

    return { ticket }
  }
}
