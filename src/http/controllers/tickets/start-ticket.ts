import { makeStartTicketUseCase } from '@/use-cases/factories/make-start-ticket-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function startTicket(
  request: FastifyRequest,
  reply: FastifyReply,
) {

  const bodySchema = z.object({
    idTech: z.string().optional()
  })

  const paramsSchema = z.object({
    id: z.string(),
  })



  const { id } = paramsSchema.parse(request.params)
  const {idTech} = bodySchema.parse(request.body)
  let technician_id

  if(!idTech){
    technician_id = request.user.sub
  }
  else{
    technician_id = idTech
  }
  

  const startTicketUseCase = await makeStartTicketUseCase()

  const ticket = await startTicketUseCase.execute({
    id,
    technician_id
  })

  return reply.status(200).send({ ticket })
}
