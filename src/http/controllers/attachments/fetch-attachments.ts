import { makeFetchAttachmentsUseCase } from "@/use-cases/factories/attachments/make-fetch-attachments-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function fetchAttachments(request: FastifyRequest, reply: FastifyReply){
  const paramsSchema = z.object({
    ticket_id: z.string().uuid()
  })


  const {ticket_id} = paramsSchema.parse(request.params)


  const fetchAttachmentsUseCase = makeFetchAttachmentsUseCase()

  const {attachments} = await fetchAttachmentsUseCase.execute(ticket_id)


  return reply.status(200).send({attachments})

}