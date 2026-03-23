import type { Ticket } from '@prisma/client'
import type { CreateTicketDTO } from './interfaces/create-ticket-DTO'
import type { FetchTicketsFiltersDTO } from './interfaces/fetch-tickets-filters-DTO'
import type { MetricsDTO } from './interfaces/get-metrics-DTO'

export interface TicketsRepository {
  create(data: CreateTicketDTO): Promise<Ticket>
  fetchTickets(
    filters?: FetchTicketsFiltersDTO,
    creator_id?: string,
  ): Promise<Ticket[] | null>
  getTicket(id: string): Promise<Ticket | null>
  startTicket(id: string, technician_id: string): Promise<Ticket>
  fetchMetrics(creator_id?: string): Promise<MetricsDTO | null>
  closeTicket(id:string, technician_id: string, resolved?: boolean):Promise<Ticket>
  restartTicket(id: string, technician_id: string): Promise<Ticket>
}
