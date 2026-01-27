import type { FastifyInstance } from 'fastify'
import { createBranch } from './controllers/Create-branch'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', () => {
    console.log('users')
  })

  app.post('/branchs', createBranch)

  app.post('/sessions', () => {
    console.log('sessions')
  })
}
