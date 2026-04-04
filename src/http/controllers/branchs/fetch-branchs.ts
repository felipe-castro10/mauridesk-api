import { BranchNotExistsError } from '@/use-cases/errors/branch-not-exists-error'
import { makeFetchBranchsUseCase } from '@/use-cases/factories/branchs/make-fetch-branchs-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function fetchBranchs(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    // buscando as filiais no banco através do meu use case
    const fetchBranchUseCase = makeFetchBranchsUseCase()

    const branchs = await fetchBranchUseCase.execute()

    // retornando as filiais
    return reply.status(201).send(branchs)
  } catch (err) {
    if (err instanceof BranchNotExistsError) {
      return reply.status(405).send({ message: err.message })
    }

    throw err
  }
}
