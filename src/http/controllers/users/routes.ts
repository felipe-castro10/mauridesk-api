import type { FastifyInstance } from 'fastify'

import { createUser } from './Create-user'

import { authenticateUser } from './authenticate-user'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { verifyIsAdmin } from '../../middlewares/verify-is-admin'
import { getProfileUser } from './get-profile'

export async function usersRoutes(app: FastifyInstance) {
  // http users
  app.post('/users', { onRequest: [verifyJWT, verifyIsAdmin] }, createUser)
  app.post('/sessions', authenticateUser)
  app.get('/users/:id', { onRequest: [verifyJWT] }, getProfileUser)
}
