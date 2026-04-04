import type { Category } from "@prisma/client";
import type { CreateCategoryDTO } from "./interfaces/create-category-DTO";



export interface CategoriesRepository {
  create(data: CreateCategoryDTO): Promise<Category>
  getCategories(): Promise<Category[]>
}