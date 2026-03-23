import type { FastifyInstance } from 'fastify'

import { createUser } from './Create-user'

import { authenticateUser } from './authenticate-user'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { verifyIsAdmin } from '../../middlewares/verify-is-admin'
import { getProfileUser } from './get-profile'
import { updateUser } from './update-user'
import { getAvatarUser } from './getAvatar-user'
import { verifyIsTech } from '@/http/middlewares/verify-is-tech'
import { fetchUsers } from './fetch-users'

export async function usersRoutes(app: FastifyInstance) {
  // http users
  app.post('/users', { onRequest: [verifyJWT, verifyIsAdmin] }, createUser)
  app.post('/sessions', authenticateUser)
  app.get('/users/profile', { onRequest: [verifyJWT] }, getProfileUser)
  app.patch("/users/update", {onRequest:[verifyJWT]}, updateUser)
  app.get('/users/:type_user', {onRequest:[verifyJWT, verifyIsTech]}, fetchUsers)


  // route get photo profile
  app.get('/users/avatar/:userId', getAvatarUser )
}
