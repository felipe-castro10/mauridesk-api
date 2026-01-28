import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeCreateUserUseCase } from '@/use-cases/factories/make-create-user-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password_hash: z.string(),
    type_user: z.string(),
  })

  const { name, email, password_hash, type_user } = createBodySchema.parse(
    request.body,
  )

  const createParamsSchema = z.object({
    branch_id: z.string(),
  })

  const { branch_id } = createParamsSchema.parse(request.params)

  try {
    const createUserUseCase = makeCreateUserUseCase()
    await createUserUseCase.execute({
      name,
      email,
      password_hash,
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
