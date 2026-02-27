import type { Ticket } from '@prisma/client'
import type { TicketsRepository } from '../tickets-repository'
import type { CreateTicketDTO } from '../interfaces/create-ticket-DTO'
import { randomUUID } from 'crypto'
import type { FetchTicketsFiltersDTO } from '../interfaces/fetch-tickets-filters-DTO'

export class InMemoryTicketsRepository implements TicketsRepository {
  public items: Ticket[] = []

  async create(data: CreateTicketDTO): Promise<Ticket> {
    const ticket = {
      id: randomUUID(),
      title: data.title,
      description: data.description,
      category: data.category,
      department: data.department,
      status: data.status,
      priority: data.priority,
      creator_id: data.creator_id,
      branch_id: data.branch_id,
      technician_id: null,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(ticket)

    return ticket
  }

  async fetchTickets(
    filters?: FetchTicketsFiltersDTO,
    creator_id?: string,
  ): Promise<Ticket[] | null> {
    console.log(creator_id)
    let tickets = this.items

    if (filters?.status) {
      tickets = tickets.filter((ticket) => ticket.status === filters.status)
    }

    if (creator_id !== undefined) {
      tickets = tickets.filter(
        // eslint-disable-next-line no-self-compare
        (ticket) => ticket.creator_id === creator_id,
      )
    }

    if (filters?.technician_id) {
      tickets = tickets.filter(
        (ticket) =>
          ticket.technician_id !== null && ticket.technician_id.trim() !== '',
      )
    }

    if (filters?.branch_id) {
      tickets = tickets.filter(
        (ticket) => ticket.branch_id === filters.branch_id,
      )
    }

    return tickets
  }
}
