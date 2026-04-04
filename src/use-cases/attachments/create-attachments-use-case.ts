import type { AttachmentsRepository } from "@/repositories/attachments-repository";


interface CreateAttachmentsRequest {
  ticket_id: string,
  files: {
    path: string
    type: 'image' | 'video'
  }[]
}


export class CreateAttachmentsUseCase {
 constructor(private attachmentsRepository: AttachmentsRepository){}


 async execute({ticket_id,files }: CreateAttachmentsRequest){
    await this.attachmentsRepository.createMany(
      files.map((file) => ({
        path: file.path,
        type: file.type,
        ticket_id
      }))
    )
 }
}