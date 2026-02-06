import type { TicketsRepository } from '@/repositories/tickets-repository'
import type { Ticket } from '@prisma/client'

interface CreateTicketRequest {
  title: string
  description: string
  category: string
  department: string
  status: string
  priority: string
  creator_id: string
  branch_id: string
}

interface CreateTicketResponse {
  ticket: Ticket
}

export class CreateTicketUseCase {
  constructor(private ticketsRepository: TicketsRepository) {}

  async execute({
    title,
    description,
    category,
    department,
    status,
    priority,
    creator_id,
    branch_id,
  }: CreateTicketRequest): Promise<CreateTicketResponse> {
    const ticket = await this.ticketsRepository.create({
      title,
      description,
      category,
      department,
      status,
      priority,
      creator_id,
      branch_id,
    })

    return { ticket }
  }
}
