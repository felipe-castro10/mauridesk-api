import { FastifyRequest, FastifyReply } from 'fastify'

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  // verificando se existe uma sessão criada no request
  try {
    await request.jwtVerify()
  } catch {
    return reply.status(401).send({ message: 'Unauthorized' })
  }
}
