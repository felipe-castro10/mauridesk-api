import { InMemoryBranchsRepository } from '@/repositories/in-memory/in-memory-branchs-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { FetchBranchUseCase } from './fetch-branchs'
import { randomUUID } from 'crypto'
import { BranchNotExistsError } from '../errors/branch-not-exists-error'

let branchRepository: InMemoryBranchsRepository
let sut: FetchBranchUseCase

describe('Fetch Branchs Use Case', () => {
  describe('should be able to fetch branchs', async () => {
    beforeEach(() => {
      branchRepository = new InMemoryBranchsRepository()
      sut = new FetchBranchUseCase(branchRepository)
    })

    it('should be able to fetch branchs', async () => {
      branchRepository.items.push(
        {
          id: randomUUID(),
          name: 'Filial teste',
          cnpj: '123456',
          created_at: new Date(),
        },
        {
          id: randomUUID(),
          name: 'Filial teste2',
          cnpj: '1234567',
          created_at: new Date(),
        },
      )

      const { branchs } = await sut.execute()

      expect(branchs).toHaveLength(2)
      expect(branchs).toEqual([
        expect.objectContaining({ cnpj: '123456' }),
        expect.objectContaining({ cnpj: '1234567' }),
      ])
    })

    it('should be not able to fetch branches of not have branch registered', async () => {
      await expect(sut.execute()).rejects.toBeInstanceOf(BranchNotExistsError)
    })
  })
})
