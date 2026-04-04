import { PrismaBranchsRepository } from '@/repositories/prisma/prisma-branchs-repository'
import { FetchBranchUseCase } from '../../branchs/fetch-branchs'

export function makeFetchBranchsUseCase() {
  const branchsRepository = new PrismaBranchsRepository()
  const fetchBranchUseCase = new FetchBranchUseCase(branchsRepository)

  return fetchBranchUseCase
}
