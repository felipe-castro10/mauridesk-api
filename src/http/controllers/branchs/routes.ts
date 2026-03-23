import type { FastifyInstance } from 'fastify'
import { fetchBranchs } from './fetch-branchs'
import { createBranch } from './Create-branch'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { verifyIsAdmin } from '@/http/middlewares/verify-is-admin'

export async function branchsRoutes(app: FastifyInstance) {

  app.get('/branches', fetchBranchs)
  app.post('/branches', { onRequest: [verifyJWT,verifyIsAdmin] }, createBranch)
}
