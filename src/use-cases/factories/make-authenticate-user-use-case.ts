import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUserUseCase } from '../authenticate-user'

export function makeAuhthenticateUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const authenticateUserUseCase = new AuthenticateUserUseCase(
    prismaUsersRepository,
  )

  return authenticateUserUseCase
}
