import { makeCloseTicketUseCase } from "@/use-cases/factories/make-closed-ticket-use-case";
import { makeRestartTicketUseCase } from "@/use-cases/factories/make-restart-ticket-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";



export async function restartTicket(request: FastifyRequest, reply: FastifyReply){

  const paramsSchema = z.object({
    id: z.string(),
    
  })

  const {id} = paramsSchema.parse(request.params)

  const restartTicketUseCase = makeRestartTicketUseCase()

  const ticketRestarted = await restartTicketUseCase.execute({id, technician_id:request.user.sub})

  return reply.status(200).send(ticketRestarted)

}