import { uploadConfig } from "@/config/upload";
import type { FastifyReply, FastifyRequest } from "fastify";
import path from "node:path";

import fs from "node:fs"
import { pipeline } from "node:stream";
import { promisify } from "node:util";
import { z } from "zod";
import { makeUpdateUserUseCase } from "@/use-cases/factories/users/make-update-user-use-case";


const pump = promisify(pipeline);

export async function updateUser(
  request: FastifyRequest,
  reply: FastifyReply
){

  const updateBodySchema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    type_user: z.string().optional(),
    branch_id: z.string().optional()
  })

  const data = await request.file()

  let avatarFileName: string | undefined
  const fields: any = {}

  if(data){
    // Processar campos de texto que vêm junto com o arquivo (Multipart Form Data)
    // O Fastify coloca os campos em data.fields
    Object.keys(data.fields).forEach((key) => {
      const field = data.fields[key] as any
      fields[key] = field.value
    })

    
  const userId = request.user.sub
  const extension = path.extname(data.filename)
  avatarFileName = `${userId}${extension}`

  const uploadPath =  path.resolve(uploadConfig.directory, avatarFileName)
  
  //Salvando o arquivo no disco
  await pump(data.file, fs.createWriteStream(uploadPath))

  }else {
    // Se não houver arquivo, os dados podem vir no body normal (JSON)
    Object.assign(fields,request.body)
  }

  const validatedData = updateBodySchema.parse(fields)

  const updateUserUseCase = makeUpdateUserUseCase()

  const {userUpdated} = await updateUserUseCase.execute({
    userId: request.user.sub,
    avatarFileName,
    data:validatedData
  })


  return reply.status(200).send({
    userUpdated
  })

}