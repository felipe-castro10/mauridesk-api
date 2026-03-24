import fastify from 'fastify'
import { usersRoutes } from './http/controllers/users/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import { ticketsRoutes } from './http/controllers/tickets/routes'
import { branchsRoutes } from './http/controllers/branchs/routes'
import fastifyMultipart from '@fastify/multipart'
import fastifyStatic from '@fastify/static'
import { uploadConfig } from './config/upload'
import { messagesRoutes } from './http/controllers/Messages/routes'

export const app =  fastify()

 app.register(fastifyCors, {
  origin: ["http://localhost:5173"]
})

app.register(fastifyMultipart, {
  limits: {
    fileSize: 5 * 1024 * 1024, // Limite de 5MB por exemplo
  },
})

app.register(fastifyStatic, {
  root: uploadConfig.directory,
  prefix: '/files/',
})

// Registrando o jwt no fastify
app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET!,
})

app.register(usersRoutes)
app.register(ticketsRoutes)
app.register(branchsRoutes)
app.register(messagesRoutes)

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
