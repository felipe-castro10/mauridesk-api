import type { BranchsRepository } from '@/repositories/branchs-repository'
import type { Branch } from '@prisma/client'
import { BranchNotExistsError } from '../errors/branch-not-exists-error'

interface FetchBranchsResponse {
  branchs: Branch[]
}

export class FetchBranchUseCase {
  constructor(private branchsRepository: BranchsRepository) {}

  async execute(): Promise<FetchBranchsResponse> {
    const branchs = await this.branchsRepository.fetchBranchs()

    if (!branchs) {
      throw new BranchNotExistsError()
    }

    return { branchs }
  }
}
