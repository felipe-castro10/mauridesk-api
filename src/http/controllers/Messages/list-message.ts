import { makeListMessagesUseCase } from "@/use-cases/factories/messages/make-list-messages-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";



export async function listMessage(request: FastifyRequest, reply: FastifyReply){

  const paramsSchema = z.object({
    ticket_id: z.string().uuid()
  })


  const {ticket_id} = paramsSchema.parse(request.params)

  const listMessageUseCase = makeListMessagesUseCase()

  const listMessage = await listMessageUseCase.execute(ticket_id)


  return reply.status(201).send({listMessage})


}