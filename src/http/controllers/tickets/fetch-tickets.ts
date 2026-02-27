import { makeFetchTicketUseCase } from '@/use-cases/factories/make-fetch-tickets-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchTickets(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const querySchema = z.object({
    status: z.enum(['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED']).optional(),
    technician_id: z.string().optional(),
  })

  const { status, technician_id } = querySchema.parse(request.query)

  const fetchTicketsUseCase = await makeFetchTicketUseCase()

  const { tickets } = await fetchTicketsUseCase.execute({
    user_id: request.user.sub,
    role: request.user.role,
    filters: { status, technician_id },
  })

  return reply.status(200).send({ tickets })
}
