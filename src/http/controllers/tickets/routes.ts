import type { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { createTicket } from './create'
import { fetchTickets } from './fetch-tickets'
import { getTicket } from './get-ticket'
import { verifyIsTech } from '@/http/middlewares/verify-is-tech'
import { startTicket } from './start-ticket'
import { fetchMetrics } from './fetch-metrics'

export async function ticketsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', async (request, reply) => {
    await verifyJWT(request, reply)
  })

  app.post('/tickets', createTicket)
  app.get('/tickets', fetchTickets)
  app.get('/ticket/:id', getTicket)

  app.patch(
    '/ticket/start/:id',
    { onRequest: [verifyJWT, verifyIsTech] },
    startTicket,
  )

  app.get('/tickets/metrics', fetchMetrics)
}
