import type { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { createTicket } from './create'
import { fetchTickets } from './fetch-tickets'
import { getTicket } from './get-ticket'

export async function ticketsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', async (request, reply) => {
    await verifyJWT(request, reply)
  })

  app.post('/tickets', createTicket)
  app.get('/tickets', fetchTickets)
  app.get('/ticket/:id', getTicket)
}
