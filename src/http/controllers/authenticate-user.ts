import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuhthenticateUserUseCase } from '@/use-cases/factories/make-authenticate-user-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticateUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createBodtSchema = z.object({
    email: z.string(),
    password: z.string(),
  })

  const { email, password } = createBodtSchema.parse(request.body)

  try {
    const authenticateUserUseCase = makeAuhthenticateUserUseCase()
    // verificando se o usuário existe no meu use case
    const { user } = await authenticateUserUseCase.execute({
      email,
      password,
    })

    // criando o token para o usuário
    const token = await reply.jwtSign(
      {
        role: user.type_user,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: '3d',
        },
      },
    )

    return reply.status(200).send({ token })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(409).send({ message: err.message })
    }
  }
}
