import { makeStartTicketUseCase } from '@/use-cases/factories/make-start-ticket-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function startTicket(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const paramsSchema = z.object({
    id: z.string(),
  })

  const { id } = paramsSchema.parse(request.params)
  console.log(id)

  const startTicketUseCase = await makeStartTicketUseCase()

  const ticket = await startTicketUseCase.execute({
    id,
    technician_id: request.user.sub,
  })

  return reply.status(200).send({ ticket })
}
