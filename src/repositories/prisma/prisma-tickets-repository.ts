import type { Ticket } from '@prisma/client'
import type { CreateTicketDTO } from '../interfaces/create-ticket-DTO'
import type { FetchTicketsFiltersDTO } from '../interfaces/fetch-tickets-filters-DTO'
import type { TicketsRepository } from '../tickets-repository'
import { prisma } from '@/lib/prisma'
import { calculateSla } from '@/utils/calculate-SLA'
import type { Metric } from '@prisma/client/runtime'
import type { MetricsDTO } from '../interfaces/get-metrics-DTO'

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
        // Filtro de busca parcial por título
        ...(filters?.title && {
          title: {
            contains: filters.title, // Busca "dentro" da string
            mode: 'insensitive',    // Ignora maiúsculas/minúsculas
          },
        }),
        ...(creator_id && {
          creator_id,
        }),
        ...(filters?.status && {
          status: filters?.status,
        }),
        ...(filters?.technician_id && {
          // Aqui uma correção: se você quer filtrar por um técnico específico,
          // deve passar o ID dele, e não apenas verificar se não é nulo.
          technician_id: filters.technician_id,
        }),
        ...(filters?.branch_id && {
          branch_id: filters.branch_id
        })
      },
      include: {
        branch: {
          select: {
            id: true,
            name: true,
          }
        },
        technician: {
          select: {
            id: true,
            name: true,
            email: true,
          }
        },
        creator:{
          select:{
            id: true,
            name: true,
            email: true,
          }
        }
      },
      // Dica extra: Ordenar pelos mais recentes por padrão
      orderBy: {
        updated_at: 'desc'
      }
    })

    return fetch
  }

  async getTicket(id: string): Promise<Ticket | null> {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id,
      },
       include:{
        branch: true,
        technician: true,
      }
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
     include: {
        branch: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    })

    return ticket
  }

async fetchMetrics(creator_id?: string): Promise<MetricsDTO | null> {
      
    // Executa todas as contagens em paralelo para ser ultra rápido
  const [open, inProgress, resolved, closed] = await Promise.all([
    this.countByStatus('OPEN', creator_id),
    this.countByStatus('IN PROGRESS', creator_id),
    this.countByStatus('RESOLVED', creator_id),
    this.countByStatus('CLOSED', creator_id),
  ])

  return {
    open,
    inProgress,
    resolved,
    closed,
    total: open + inProgress + resolved + closed
  }
}

private async countByStatus(status: 'OPEN' | 'IN PROGRESS' | 'RESOLVED' | 'CLOSED', creator_id?: string) {
 
  const where: any = { status };


  if (creator_id && creator_id.trim() !== undefined) {
    where.creator_id = creator_id;
  }

  return await prisma.ticket.count({ where });
}
}
