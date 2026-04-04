import type { TicketsRepository } from '@/repositories/tickets-repository'
import type { Ticket } from '@prisma/client'

interface CreateTicketRequest {
  title: string
  description: string
  category_id: string
  department: string
  priority: string
  creator_id: string
  branch_id: string
  dynamic_responses?: Record<string,any>
}

interface CreateTicketResponse {
  ticket: Ticket
}

export class CreateTicketUseCase {
  constructor(private ticketsRepository: TicketsRepository) {}

  async execute({
    title,
    description,
    category_id,
    department,
    priority,
    creator_id,
    branch_id,
    dynamic_responses,
  }: CreateTicketRequest): Promise<CreateTicketResponse> {
    
    const ticket = await this.ticketsRepository.create({
      title,
      description,
      category_id,
      department,
      priority,
      creator_id,
      branch_id,
      dynamic_responses
    })

    return { ticket }
  }
}
