import fastify from 'fastify'
import { usersRoutes } from './http/controllers/users/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import { ticketsRoutes } from './http/controllers/tickets/routes'
import { branchsRoutes } from './http/controllers/branchs/routes'

export const app = fastify()

// Registrando o jwt no fastify
app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET!,
})

app.register(usersRoutes)
app.register(ticketsRoutes)
app.register(branchsRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
