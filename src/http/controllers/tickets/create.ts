import { makeCreateTicketUseCase } from '@/use-cases/factories/make-create-ticket-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createTicket(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createTicketBodySchema = z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    department: z.string(),
    priority: z.string(),
    branch_id: z.string(),
  })

  const { title, description, category, department, priority, branch_id } =
    createTicketBodySchema.parse(request.body)

  const createTicketUseCase = makeCreateTicketUseCase()

  await createTicketUseCase.execute({
    title,
    description,
    category,
    department,
    priority,
    creator_id: request.user.sub,
    branch_id
  })

  return reply.status(201).send({})
}
