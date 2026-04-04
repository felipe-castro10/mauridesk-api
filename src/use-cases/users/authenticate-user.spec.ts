import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUserUseCase } from './authenticate-user'
import { hash } from 'bcryptjs'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUserUseCase

describe('Authenticate User Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUserUseCase(usersRepository)
  })

  it('should be able to authenticate user', async () => {
    await usersRepository.create({
      name: 'User teste',
      email: 'user@example.com',
      password_hash: await hash('123456', 6),
      type_user: 'CLIENT',
      branch_id: 'FILIAL-TESTE',
    })

    const { user } = await sut.execute({
      email: 'user@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
