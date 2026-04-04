import { PrismaBranchsRepository } from '@/repositories/prisma/prisma-branchs-repository'
import { CreateBranchUseCase } from '../../branchs/create-branch'

export function makeCreateBranchUseCase() {
  const prismaBranchsRepository = new PrismaBranchsRepository()
  const createBranchUseCase = new CreateBranchUseCase(prismaBranchsRepository)

  return createBranchUseCase
}
