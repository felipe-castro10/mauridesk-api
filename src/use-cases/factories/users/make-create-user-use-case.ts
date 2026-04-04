import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateUserUseCase } from '../../users/create-user'
import { PrismaBranchsRepository } from '@/repositories/prisma/prisma-branchs-repository'

export function makeCreateUserUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const prismaBranchsRepository = new PrismaBranchsRepository()
  const createUserUseCase = new CreateUserUseCase(
    prismaUsersRepository,
    prismaBranchsRepository,
  )

  return createUserUseCase
}
