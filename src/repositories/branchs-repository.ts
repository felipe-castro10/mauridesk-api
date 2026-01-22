import type { Branch, Prisma } from '@prisma/client'

export interface BranchsRepository {
  create(data: Prisma.BranchUncheckedCreateInput): Promise<Branch>
  findByCNPJ(cnpj: string): Promise<Branch | null>
}
