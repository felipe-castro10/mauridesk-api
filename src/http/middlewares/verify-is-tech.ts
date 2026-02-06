import { FastifyRequest, FastifyReply } from 'fastify'

export async function verifyIsTech(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  // verificando se existe uma sessão criada no request
  if (request.user.role !== 'ADMIN' && request.user.role !== 'TECH') {
    return reply.status(401).send({ message: 'Unauthorized' })
  }
}
