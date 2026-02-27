import type { TicketsRepository } from '@/repositories/tickets-repository'
import type { Ticket } from '@prisma/client'
import { TicketNotExistsError } from './errors/tickets-not-exists-error'

interface GetTicketRequest {
  id: string
}

interface GetTicketResponse {
  ticket: Ticket
}

export class GetTicketUseCase {
  constructor(private ticketsRepository: TicketsRepository) {}

  async execute({ id }: GetTicketRequest): Promise<GetTicketResponse> {
    const ticket = await this.ticketsRepository.getTicket(id)

    if (!ticket) {
      throw new TicketNotExistsError()
    }

    return { ticket }
  }
}
