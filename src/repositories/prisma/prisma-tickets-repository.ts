import type { Ticket } from '@prisma/client'
import type { CreateTicketDTO } from '../interfaces/create-ticket-DTO'
import type { FetchTicketsFiltersDTO } from '../interfaces/fetch-tickets-filters-DTO'
import type { TicketsRepository } from '../tickets-repository'
import { prisma } from '@/lib/prisma'
import { calculateSla } from '@/utils/calculate-SLA'

export class PrismaTicketsRepository implements TicketsRepository {
  async create(data: CreateTicketDTO): Promise<Ticket> {
    const sla_due_at = calculateSla(data.priority)
    // inserindo novo ticket no banco

    const ticket = await prisma.ticket.create({
      data: {
        title: data.title,
        description: data.description,
        category: data.category,
        department: data.department,
        priority: data.priority,

        creator_id: data.creator_id,
        branch_id: data.branch_id,

        technician_id: null,
        sla_due_at,
      },
    })

    return ticket
  }

  async fetchTickets(
    filters?: FetchTicketsFiltersDTO,
    creator_id?: string,
  ): Promise<Ticket[] | null> {
    const fetch = await prisma.ticket.findMany({
      where: {
        branch_id: filters?.branch_id,
        ...(creator_id && {
          creator_id,
        }),
        ...(filters?.status && {
          status: filters?.status,
        }),
        ...(filters?.technician_id && {
          technician_id: { not: null },
        }),
      },
    })

    return fetch
  }

  async getTicket(id: string): Promise<Ticket | null> {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id,
      },
    })

    return ticket
  }

  async startTicket(id: string, technician_id: string): Promise<Ticket> {
    const ticket = await prisma.ticket.update({
      where: {
        id,
      },
      data: {
        status: 'IN PROGRESS',
        first_response_at: new Date(),
        technician_id,
      },
    })

    return ticket
  }
}
