import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { CreateUserUseCase } from './create-user'
import { InMemoryBranchsRepository } from '@/repositories/in-memory/in-memory-branchs-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let branchRepository: InMemoryBranchsRepository
// eslint-disable-next-line no-unused-vars
let sut: CreateUserUseCase

describe('Create User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    branchRepository = new InMemoryBranchsRepository()
    sut = new CreateUserUseCase(usersRepository, branchRepository)
  })

  it('should be able to create user', async () => {
    const branch = await branchRepository.create({
      name: 'Filial teste',
      cnpj: '123456',
    })

    const { user } = await sut.execute({
      name: 'User teste',
      email: 'user@example.com',
      password: '123456',
      type_user: 'CLIENT',
      branch_id: branch.id,
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to create with same email twice ', async () => {
    const email = 'user@example.com'

    const branch = await branchRepository.create({
      name: 'Filial teste',
      cnpj: '123456',
    })

    await sut.execute({
      name: 'User teste',
      email,
      password: '123456',
      type_user: 'CLIENT',
      branch_id: branch.id,
    })

    await expect(
      sut.execute({
        name: 'User teste2',
        email,
        password: '123456',
        type_user: 'CLIENT',
        branch_id: branch.id,
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
