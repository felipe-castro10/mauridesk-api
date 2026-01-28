import type { FastifyInstance } from 'fastify'
import { createBranch } from './controllers/Create-branch'
import { createUser } from './controllers/Create-user'

export async function appRoutes(app: FastifyInstance) {
  app.post('/branchs', createBranch)
  app.post('/users', createUser)

  app.post('/sessions', () => {
    console.log('sessions')
  })
}
