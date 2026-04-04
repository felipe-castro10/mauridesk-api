import { verifyJWT } from "@/http/middlewares/verify-jwt"
import type { FastifyInstance } from "fastify"
import { createCategory } from "./create"
import { fetchCategories } from "./fetchCategories"
import { verifyIsAdmin } from "@/http/middlewares/verify-is-admin"

export async function categoriesRoutes(app: FastifyInstance){
  app.addHook('onRequest', async(request, reply) => {
    await verifyJWT(request, reply)
  })


  app.post('/categories',{onRequest: verifyIsAdmin}, createCategory)
  app.get('/categories', fetchCategories)
 
}