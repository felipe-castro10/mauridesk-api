import { PrismaAttachmentsRepository } from "@/repositories/prisma/prisma-attachments-repository";
import { FetchAttachmentsUseCase } from "@/use-cases/attachments/fetch-attachments-use-case";


export function makeFetchAttachmentsUseCase(){
  const attachmentsRepository = new PrismaAttachmentsRepository()
  const fetchAttachmentsUseCase = new FetchAttachmentsUseCase(attachmentsRepository)

  return fetchAttachmentsUseCase
}