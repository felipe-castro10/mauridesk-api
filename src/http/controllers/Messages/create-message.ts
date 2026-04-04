
import { makeCreateTicketMessageUseCase } from "@/use-cases/factories/tickets/make-create-ticket-message-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function createMessage(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    ticket_id: z.string().uuid()
  })

  const bodySchema = z.object({
    text: z.string().min(1)
  })

  const {ticket_id} = paramsSchema.parse(request.params)
  const {text} = bodySchema.parse(request.body)

  const user_id = request.user.sub;

  const createTicketMessageUseCase = makeCreateTicketMessageUseCase()

  const ticketMessage = await createTicketMessageUseCase.execute({
    ticket_id,
    user_id,
    text
  })


  return reply.status(201).send({ticketMessage})

}