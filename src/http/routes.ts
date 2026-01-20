import type { FastifyInstance } from 'fastify'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', () => {
    console.log('users')
  })

  app.post('/sessions', () => {
    console.log('sessions')
  })
}
