import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetProfileUserUseCase } from '../../users/get-profile.'

export function makeProfileUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const getProfileUserUseCase = new GetProfileUserUseCase(usersRepository)

  return getProfileUserUseCase
}
