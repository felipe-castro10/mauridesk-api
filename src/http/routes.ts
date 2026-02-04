import type { FastifyInstance } from 'fastify'
import { createBranch } from './controllers/Create-branch'
import { createUser } from './controllers/Create-user'
import { fetchBranchs } from './controllers/fetch-branchs'
import { authenticateUser } from './controllers/authenticate-user'

export async function appRoutes(app: FastifyInstance) {
  // http branchs
  app.get('/branchs', fetchBranchs)
  app.post('/branchs', createBranch)

  // http users
  app.post('/users', createUser)
  app.post('/sessions', authenticateUser)
}
