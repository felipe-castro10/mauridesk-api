import type { User } from '@prisma/client'
import type { CreateUserDTO } from './interfaces/create-user-DTO'
import type { UpdateUserDTO } from './interfaces/update-user-DTO'

export interface UsersRepository {
  create(data: CreateUserDTO): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findUser(id: string): Promise<User | null>
  update(id: string,data: UpdateUserDTO): Promise<User>
  fetchUsers(isTech?: string): Promise<User[] | null>
  
}
