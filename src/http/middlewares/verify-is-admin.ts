import { FastifyRequest, FastifyReply } from 'fastify'

export async function verifyIsAdmin(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  // verificando se existe uma sessão criada no request
  if (request.user.role !== 'ADMIN') {
    return reply.status(401).send({ message: 'Unauthorized' })
  }
}
