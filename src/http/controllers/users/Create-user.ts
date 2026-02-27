import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeCreateUserUseCase } from '@/use-cases/factories/make-create-user-use-case'

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    type_user: z.string(),
    branch_id: z.string(),
  })

  const { name, email, password, type_user, branch_id } =
    createBodySchema.parse(request.body)

  try {
    const createUserUseCase = makeCreateUserUseCase()
    await createUserUseCase.execute({
      name,
      email,
      password,
      type_user,
      branch_id,
    })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send
}
