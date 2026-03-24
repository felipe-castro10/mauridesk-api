import { verifyJWT } from "@/http/middlewares/verify-jwt";
import type { FastifyInstance } from "fastify";
import { createMessage } from "./create-message";
import { listMessage } from "./list-message";



export async function messagesRoutes(app: FastifyInstance){
  app.addHook('onRequest', async(request, reply) => {
    await verifyJWT(request, reply)
  })


  app.post('/tickets/:ticket_id/messages', createMessage)
  app.get('/tickets/:ticket_id/messages',listMessage)
}