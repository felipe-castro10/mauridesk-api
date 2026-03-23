import type { UpdateUserDTO } from "@/repositories/interfaces/update-user-DTO";
import type { UsersRepository } from "@/repositories/users-repository";
import { UserNotExistsError } from "./errors/user-not-exists-error";
import fs from 'node:fs/promises'; 
import { uploadConfig } from "@/config/upload";
import path from "node:path";
import type { User } from "@prisma/client";

interface iRequestUpdate {
  userId: string;
  avatarFileName?: string;
  data:UpdateUserDTO;
}


interface GetUpdated {
  userUpdated: User
}




export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId, avatarFileName, data }: iRequestUpdate): Promise<GetUpdated> {
    const user = await this.usersRepository.findUser(userId);

    if (!user) {
      throw new UserNotExistsError();
    }

   
    if (avatarFileName) {
      try {
        const files = await fs.readdir(uploadConfig.directory);
        
      
        const oldFiles = files.filter(
          file => file.startsWith(userId) && file !== avatarFileName
        );

        for (const file of oldFiles) {
          await fs.unlink(path.resolve(uploadConfig.directory, file));
        }
      } catch (err) {
      
        console.error("Erro ao limpar avatar antigo:", err);
      }
    }


    const updatePayload = {
      ...data,
     
      ...(avatarFileName && { avatar: avatarFileName })
    };

    const userUpdated = await this.usersRepository.update(userId, updatePayload);

    return { userUpdated };
  }
}