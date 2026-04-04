import { makeFetchCategoriesUseCase } from "@/use-cases/factories/categories/make-fetch-categories-use-case";
import type { FastifyReply, FastifyRequest } from "fastify";


export async function fetchCategories(request: FastifyRequest, reply: FastifyReply){


  try{
    const fetchCategoiresUseCase = makeFetchCategoriesUseCase()

    const categories = await fetchCategoiresUseCase.execute()

    return reply.status(200).send(categories)
  }catch(error){
    return reply.status(400).send({
      message: error instanceof Error ?  error.message: 'Erro ao buscar as categorias'
    });
  }
}