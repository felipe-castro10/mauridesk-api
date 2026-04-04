import { BranchAlreadyExistsError } from '@/use-cases/errors/branch-already-exists-error'
import { makeCreateBranchUseCase } from '@/use-cases/factories/branchs/make-create-branch-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createBranch(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createBodySchema = z.object({
    name: z.string(),
    cnpj: z.string(),
  })

  const { name, cnpj } = createBodySchema.parse(request.body)

  try {
    const createBranchUseCase = makeCreateBranchUseCase()

    await createBranchUseCase.execute({ name, cnpj })
  } catch (err) {
    if (err instanceof BranchAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }

  return reply.status(201).send
}
