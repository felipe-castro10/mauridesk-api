import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { FetchUsersUseCase } from "../../users/fetch-users";



export function MakeFetchUsersUseCase() {

  const usersRepository = new PrismaUsersRepository()
  const fetchUsersUseCase = new FetchUsersUseCase(usersRepository)


  return fetchUsersUseCase
}