import { UserNotExistsError } from "@/use-cases/errors/user-not-exists-error";
import { MakeFetchUsersUseCase } from "@/use-cases/factories/make-fetch-users-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";



export async function fetchUsers(request: FastifyRequest, reply: FastifyReply){

  const createParamsSchema = z.object({
    type_user: z.string(),
  })

  const {type_user} = createParamsSchema.parse(request.params)

  try{
    const fetchUsersUseCase = MakeFetchUsersUseCase()

    const users = await fetchUsersUseCase.execute({type_user})


     return reply.status(200).send({users})
   
  }catch(err){
    if(err instanceof UserNotExistsError){
      return reply.status(409).send({message: err.message})
    }

    throw err
  }


}