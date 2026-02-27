import '@fastify/jwt'

declare module '@fastify/jwt' {
  // eslint-disable-next-line
  interface FastifyJWT {
    user: {
      sub: string
      role: string
      branch_id: string
    }
  }
}
