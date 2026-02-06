import type { Ticket } from '@prisma/client'
import type { CreateTicketDTO } from './interfaces/create-ticket-DTO'

export interface TicketsRepository {
  create(data: CreateTicketDTO): Promise<Ticket>
}
