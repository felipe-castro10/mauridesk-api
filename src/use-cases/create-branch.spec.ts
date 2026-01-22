import { InMemoryBranchsRepository } from '@/repositories/in-memory/in-memory-branchs-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateBranchUseCase } from './create-branch'
import { BranchAlreadyExistsError } from './errors/branch-already-exists-error'

let branchRepository: InMemoryBranchsRepository
let sut: CreateBranchUseCase

describe('Create Branch Use Case', () => {
  describe('should be able to create branch', async () => {
    beforeEach(() => {
      branchRepository = new InMemoryBranchsRepository()
      sut = new CreateBranchUseCase(branchRepository)
    })

    it('should be able to register', async () => {
      const { branch } = await sut.execute({
        name: 'Filial teste',
        cnpj: '123456',
      })

      expect(branch.id).toEqual(expect.any(String))
    })

    it('should not be able to create with same CNPJ twice', async () => {
      const CNPJ = '123456'

      await sut.execute({
        name: 'filial01',
        cnpj: CNPJ,
      })

      await expect(() =>
        sut.execute({
          name: 'filial02',
          cnpj: CNPJ,
        }),
      ).rejects.toBeInstanceOf(BranchAlreadyExistsError)
    })
  })
})
