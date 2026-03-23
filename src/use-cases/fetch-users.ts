import type { UsersRepository } from "@/repositories/users-repository";
import type { User } from "@prisma/client";


interface FetchUsersRequest {
  type_user: string;
}

interface FetchUsersResponse{
  users: User[] | null;
}

export class FetchUsersUseCase {
  constructor(private usersRepository: UsersRepository){}

  async execute({type_user}:FetchUsersRequest):Promise<FetchUsersResponse>{

    const users = await this.usersRepository.fetchUsers(type_user)

    return {users}
  }
}