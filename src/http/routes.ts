import type { FastifyInstance } from 'fastify'
import { createBranch } from './controllers/Create-branch'
import { createUser } from './controllers/Create-user'
import { fetchBranchs } from './controllers/fetch-branchs'
import { authenticateUser } from './controllers/authenticate-user'
import { verifyJWT } from './middlewares/verify-jwt'
import { verifyIsAdmin } from './middlewares/verify-is-admin'

export async function appRoutes(app: FastifyInstance) {
  // http branchs
  app.get(
    '/branchs',
    {
      onRequest: [verifyJWT, verifyIsAdmin],
    },
    fetchBranchs,
  )
  app.post('/branchs', { onRequest: [verifyJWT, verifyIsAdmin] }, createBranch)

  // http users
  app.post('/users', { onRequest: [verifyJWT, verifyIsAdmin] }, createUser)
  app.post('/sessions', authenticateUser)

  // http tickets
}
