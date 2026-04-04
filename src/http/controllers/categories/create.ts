import { makeCreateCategoriesUseCase } from "@/use-cases/factories/categories/make-create-categories-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";


export async function createCategory(request: FastifyRequest, reply: FastifyReply){

  const bodySchema = z.object({
    name: z.string(),
    custom_fields: z.array(z.object({
      label: z.string(),
      type: z.enum(['text', 'number', 'date'])
    }))
  });


  const data = bodySchema.parse(request.body)


  try {
    const createCategoryUseCase = makeCreateCategoriesUseCase()

    const category = await createCategoryUseCase.execute({data})


    return reply.status(201).send(category)
  }catch(error){
   return reply.status(400).send({ 
      message: error instanceof Error ? error.message : 'Erro ao criar categoria' 
    });
  }
}