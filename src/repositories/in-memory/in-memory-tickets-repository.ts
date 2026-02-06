import type { Ticket } from '@prisma/client'
import type { TicketsRepository } from '../tickets-repository'
import type { CreateTicketDTO } from '../interfaces/create-ticket-DTO'
import { randomUUID } from 'crypto'

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
}
