import type { BranchsRepository } from '@/repositories/branchs-repository'
import type { UsersRepository } from '@/repositories/users-repository'
import type { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { BranchNotExistsError } from '../errors/branch-not-exists-error'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'

interface CreateUserRequest {
  name: string
  email: string
  password: string
  type_user: string
  branch_id: string
}

interface CreateUserResponse {
  user: User
}

export class CreateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private branchsRepository: BranchsRepository,
  ) {}

  async execute({
    name,
    email,
    password,
    type_user,
    branch_id,
  }: CreateUserRequest): Promise<CreateUserResponse> {
    // criando hash da senha

    const password_hash = await hash(password, 6)

    // verificando se a filial existe

    const branch = await this.branchsRepository.findByID(branch_id)

    if (!branch) {
      throw new BranchNotExistsError()
    }

    // verificando se já existe um usuário cadastrado com o mesmo e-mail
    const userExists = await this.usersRepository.findByEmail(email)

    if (userExists) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      type_user,
      branch_id,
    })

    return { user }
  }
}
