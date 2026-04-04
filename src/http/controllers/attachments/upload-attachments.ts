import { pipeline } from 'node:stream/promises'
import { createWriteStream } from 'node:fs'
import { randomUUID } from 'node:crypto'
import path from 'node:path'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateAttachmentsUseCase } from '@/use-cases/factories/attachments/make-create-attachments-use-case'
import { uploadConfig } from '@/config/upload'

export async function uploadAttachments(request: FastifyRequest, reply: FastifyReply) {
  const uploadParamsSchema = z.object({
    ticket_id: z.string().uuid(),
  })

  const { ticket_id } = uploadParamsSchema.parse(request.params)
  
  // No @fastify/multipart, pegamos os arquivos assim:
  const parts = request.files()
  const attachmentsData: { path: string; type: "video" | "image" }[] = []

  try {
    // No seu upload-attachments.ts, dentro do loop de parts:
for await (const part of parts) {
  // 1. Limpa o nome: remove espaços e coloca underscores
  const cleanFileName = part.filename.replace(/\s+/g, '_')
  const fileName = `${randomUUID()}-${cleanFileName}`
  
  // 2. Define o caminho exato usando o seu uploadConfig
  const uploadPath = path.resolve(uploadConfig.directory, 'tickets', fileName)

  await pipeline(part.file, createWriteStream(uploadPath))
  
  attachmentsData.push({
    path: fileName, // Salva o nome limpo no banco
    type: (part.mimetype.startsWith('video') ? 'video' : 'image') as "video" | "image",
  })
}

    if (attachmentsData.length === 0) {
      return reply.status(400).send({ message: 'Nenhum arquivo enviado.' })
    }

    const createAttachmentsUseCase = makeCreateAttachmentsUseCase()
    await createAttachmentsUseCase.execute({ ticket_id, files: attachmentsData })

    return reply.status(201).send()
  } catch (err) {
    console.error("Erro no upload:", err)
    return reply.status(500).send({ message: 'Erro interno ao processar arquivos.' })
  }
}