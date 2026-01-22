import { PrismaBranchsRepository } from '@/repositories/prisma/prisma-branchs-repository'
import { CreateBranchUseCase } from '../create-branch'

export function makeCreateBranchUseCase() {
  const prismaBranchsRepository = new PrismaBranchsRepository()
  const createBranchUseCase = new CreateBranchUseCase(prismaBranchsRepository)

  return createBranchUseCase
}
