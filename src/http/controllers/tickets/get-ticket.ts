import { makeGetTicketUseCase } from '@/use-cases/factories/make-get-ticket-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getTicket(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    id: z.string(),
  })

  const { id } = paramsSchema.parse(request.params)

  const getTicketUseCase = await makeGetTicketUseCase()

  const ticket = await getTicketUseCase.execute({
    id,
  })

  return reply.status(200).send({ ticket })
}
