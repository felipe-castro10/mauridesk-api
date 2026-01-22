import type { BranchsRepository } from '@/repositories/branchs-repository'
import type { Branch } from '@prisma/client'
import { BranchAlreadyExistsError } from './errors/branch-already-exists-error'

interface CreateBranchUseCaseRequest {
  name: string
  cnpj: string
}

interface CreateBranchUseCaseResponse {
  branch: Branch
}

export class CreateBranchUseCase {
  constructor(private branchsRepository: BranchsRepository) {}

  async execute({
    name,
    cnpj,
  }: CreateBranchUseCaseRequest): Promise<CreateBranchUseCaseResponse> {
    // verify if cnpj exists
    const branchWithSameCNPJ = await this.branchsRepository.findByCNPJ(cnpj)

    if (branchWithSameCNPJ) {
      throw new BranchAlreadyExistsError()
    }
    // criando branch
    const branch = await this.branchsRepository.create({
      name,
      cnpj,
    })

    return { branch }
  }
}
