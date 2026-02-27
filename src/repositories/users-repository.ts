import type { User } from '@prisma/client'
import type { CreateUserDTO } from './interfaces/create-user-DTO'

export interface UsersRepository {
  create(data: CreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findUser(id: string): Promise<User | null>
}
