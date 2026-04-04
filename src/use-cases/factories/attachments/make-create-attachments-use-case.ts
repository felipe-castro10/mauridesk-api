import { PrismaAttachmentsRepository } from "@/repositories/prisma/prisma-attachments-repository";
import { CreateAttachmentsUseCase } from "../../attachments/create-attachments-use-case";


export function makeCreateAttachmentsUseCase(){
  const attachmentsRepository = new PrismaAttachmentsRepository()
  const createAttachmentsUseCase = new CreateAttachmentsUseCase(attachmentsRepository)

  return createAttachmentsUseCase
}