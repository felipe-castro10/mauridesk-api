import type { Prisma, Branch } from '@prisma/client'
import type { BranchsRepository } from '../branchs-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryBranchsRepository implements BranchsRepository {
  public items: Branch[] = []

  async create(data: Prisma.BranchUncheckedCreateInput): Promise<Branch> {
    const branch = {
      id: randomUUID(),
      name: data.name,
      cnpj: data.cnpj,
      created_at: new Date(),
    }

    this.items.push(branch)

    return branch
  }

  async findByCNPJ(cnpj: string) {
    const branch = this.items.find((item) => item.cnpj === cnpj)

    if (!branch) {
      return null
    }

    return branch
  }

  async findByID(id: string) {
    const branch = this.items.find((item) => item.id === id)

    if (!branch) {
      return null
    }

    return branch
  }

  async fetchBranchs(): Promise<Branch[] | null> {
    if (this.items.length === 0) {
      return null
    }

    return this.items
  }
}
