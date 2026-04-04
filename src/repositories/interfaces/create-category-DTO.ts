import type { Prisma } from "@prisma/client"



export interface CreateCategoryDTO {
  name: string
  custom_fields: Prisma.InputJsonValue
}