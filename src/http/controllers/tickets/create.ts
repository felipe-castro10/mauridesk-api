import { makeCreateTicketUseCase } from '@/use-cases/factories/tickets/make-create-ticket-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createTicket(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createTicketBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    category_id: z.string(),
    department: z.string(),
    priority: z.string(),
    branch_id: z.string(),
    dynamic_responses: z.array(z.record(z.string(), z.any())).optional(),
  })

  const { title, description, category_id, department, priority, branch_id, dynamic_responses } =
    createTicketBodySchema.parse(request.body)

    console.log(title)
  const createTicketUseCase = makeCreateTicketUseCase()

 const ticket =  await createTicketUseCase.execute({
    title,
    description,
    category_id,
    department,
    priority,
    creator_id: request.user.sub,
    branch_id,
    dynamic_responses
  })

  return ticket
}
