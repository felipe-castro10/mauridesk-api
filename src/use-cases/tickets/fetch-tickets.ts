import type { TicketsRepository } from '@/repositories/tickets-repository'
import type { Ticket } from '@prisma/client'
import { TicketNotExistsError } from '../errors/tickets-not-exists-error'
import type { FetchTicketsFiltersDTO } from '@/repositories/interfaces/fetch-tickets-filters-DTO'

interface FetchTicketsRequest {
  user_id: string
  filters?: FetchTicketsFiltersDTO
  role: string
}

interface FetchTicketsResponse {
  tickets: Ticket[]
}

export class FetchTicketUseCase {
  constructor(private ticketsRepository: TicketsRepository) {}

  async execute({
    user_id,
    filters,
    role,
  }: FetchTicketsRequest): Promise<FetchTicketsResponse> {
    const creator_id = role === 'CLIENT' ? user_id : undefined

    const tickets = await this.ticketsRepository.fetchTickets(
      filters,
      creator_id,
    )

    if (!tickets) {
      throw new TicketNotExistsError()
    }

    return { tickets }
  }
}
