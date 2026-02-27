import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetProfileUserUseCase } from '../get-profile.'

export function makeProfileUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const getProfileUserUseCase = new GetProfileUserUseCase(usersRepository)

  return getProfileUserUseCase
}
