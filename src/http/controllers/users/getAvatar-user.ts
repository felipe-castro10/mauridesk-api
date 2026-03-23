import { uploadConfig } from "@/config/upload";
import type { FastifyReply, FastifyRequest } from "fastify";
import fs from "node:fs"
import { z } from "zod";



export async function getAvatarUser(request: FastifyRequest, reply: FastifyReply){

  const createParamsSchema = z.object({
    userId: z.string()
  })

  const {userId} = createParamsSchema.parse(request.params)

  const files = await fs.promises.readdir(uploadConfig.directory)
  const userFile = files.find(file => file.startsWith(userId))

  if(!userFile){
    return reply.status(404).send({message: 'Avatar não encontrado'})
  }

 return reply.sendFile(userFile)

}