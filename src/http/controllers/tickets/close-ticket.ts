import { makeCloseTicketUseCase } from "@/use-cases/factories/make-closed-ticket-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";



export async function closeTicket(request: FastifyRequest, reply: FastifyReply){


  const paramsSchema = z.object({
    id: z.string(),
    resolved: z.coerce.boolean().optional().default(false)
    
  })

 


  const {id,resolved} = paramsSchema.parse(request.params)


  const closeTicketUseCase = makeCloseTicketUseCase()

  const ticketClosed = await closeTicketUseCase.execute({id, technician_id:request.user.sub, resolved})


  return reply.status(200).send(ticketClosed)

}