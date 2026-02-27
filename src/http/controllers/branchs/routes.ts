import type { FastifyInstance } from 'fastify'
import { fetchBranchs } from './fetch-branchs'
import { createBranch } from './Create-branch'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { verifyIsAdmin } from '@/http/middlewares/verify-is-admin'

export async function branchsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', async () => {
    await verifyJWT
    await verifyIsAdmin
  })

  app.get('/branchs', fetchBranchs)
  app.post('/branchs', createBranch)
}
