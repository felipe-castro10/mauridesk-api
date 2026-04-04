import { verifyJWT } from "@/http/middlewares/verify-jwt";
import type { FastifyInstance } from "fastify";
import { uploadAttachments } from "./upload-attachments";
import { fetchAttachments } from "./fetch-attachments";


export async function attachmentsRoutes(app: FastifyInstance){
  app.addHook('onRequest', async(request,reply) => {
    await verifyJWT(request, reply)
  })


  app.post('/attachments/:ticket_id', uploadAttachments)
  app.get('/attachments/:ticket_id', fetchAttachments)

}