import type { User } from '@prisma/client'
import type { UsersRepository } from '../users-repository'
import { randomUUID } from 'node:crypto'
import type { CreateUserDTO } from '../interfaces/create-user-DTO'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(data: CreateUserDTO): Promise<User> {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      type_user: data.type_user ?? 'CLIENT',
      branch_id: data.branch_id ?? null,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(user)

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((items) => items.email === email)

    if (!user) {
      return null
    }

    return user
  }
}
