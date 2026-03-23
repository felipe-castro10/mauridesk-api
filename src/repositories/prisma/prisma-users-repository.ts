import type { User } from '@prisma/client'
import type { CreateUserDTO } from '../interfaces/create-user-DTO'
import type { UsersRepository } from '../users-repository'
import { prisma } from '@/lib/prisma'
import type { UpdateUserDTO } from '../interfaces/update-user-DTO'

export class PrismaUsersRepository implements UsersRepository {


  async create(data: CreateUserDTO): Promise<User> {
    // criando o usuário no banco
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password_hash: data.password_hash,
        type_user: data.type_user,
        branch: data.branch_id
          ? {
              connect: {
                id: data.branch_id,
              },
            }
          : undefined,
      },
    })

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    // verificando se já existe o usuário com o e-mail declarado criado

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findUser(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include:{
        branch: true,
      }
    })

    return user
  }


   async  update(id: string, data: UpdateUserDTO): Promise<User> {
      const user = await prisma.user.update({
        where:{
          id
        },
        data
      })


      return user;
  }


    async fetchUsers(isTech?: string): Promise<User[] | null>{
    const users = await prisma.user.findMany({
      where:{
        ...(isTech &&{
          type_user: isTech
        })
      }, orderBy:{
        updated_at: 'desc'
      },
      include:{
        branch:{
          select:{
            id:true,
            name: true,
          }
        }
      }
    })


    return users
  }



 
}
