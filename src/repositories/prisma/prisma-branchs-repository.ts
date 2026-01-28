import type { Prisma, Branch } from '@prisma/client'
import type { BranchsRepository } from '../branchs-repository'
import { prisma } from '@/lib/prisma'

export class PrismaBranchsRepository implements BranchsRepository {
  async create(data: Prisma.BranchUncheckedCreateInput): Promise<Branch> {
    // inserindo novo branch no banco

    const branch = await prisma.branch.create({
      data,
    })

    return branch
  }

  async findByCNPJ(cnpj: string): Promise<Branch | null> {
    // verificando se a filial existe

    const branch = await prisma.branch.findUnique({
      where: {
        cnpj,
      },
    })

    return branch
  }

  async findByID(id: string): Promise<Branch | null> {
    // buscando a filial pelo ID
    const branch = await prisma.branch.findFirst({
      where: {
        id,
      },
    })

    return branch
  }
}
