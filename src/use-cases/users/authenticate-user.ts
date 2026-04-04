import type { UsersRepository } from '@/repositories/users-repository'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import type { User } from '@prisma/client'

interface AuthUserRequest {
  email: string
  password: string
}

interface AuthUserResponse {
  user: User
}

export class AuthenticateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthUserRequest): Promise<AuthUserResponse> {
    // verificando se o usuário existe pelo e-mail
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new InvalidCredentialsError()
    }

    const passwordMatch = await compare(password, user.password_hash)

    if (!passwordMatch) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
