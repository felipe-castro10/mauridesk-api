import type { FastifyInstance } from 'fastify'
import { createBranch } from './controllers/Create-branch'
import { createUser } from './controllers/Create-user'
import { fetchBranchs } from './controllers/fetch-branchs'

export async function appRoutes(app: FastifyInstance) {
  app.get('/branchs', fetchBranchs)
  app.post('/branchs', createBranch)
  app.post('/users', createUser)

  app.post('/sessions', () => {
    console.log('sessions')
  })
}
