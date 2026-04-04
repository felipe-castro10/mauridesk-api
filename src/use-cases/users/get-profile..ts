import type { UsersRepository } from '@/repositories/users-repository'
import type { User } from '@prisma/client'
import { UserNotExistsError } from '../errors/user-not-exists-error'

interface GetProfileRequest {
  id: string
}

interface GetProfileResponse {
  user: User
}

export class GetProfileUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: GetProfileRequest): Promise<GetProfileResponse> {
    const user = await this.usersRepository.findUser(id)

    if (!user) {
      throw new UserNotExistsError()
    }

    return { user }
  }
}
