import { makeProfileUserUseCase } from '@/use-cases/factories/make-get-profile-user-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getProfileUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const idParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = idParamsSchema.parse(request.params)

  const makeUserProfileUseCase = await makeProfileUserUseCase()

  const { user } = await makeUserProfileUseCase.execute({ id })

  return reply.status(200).send({ user })
}
