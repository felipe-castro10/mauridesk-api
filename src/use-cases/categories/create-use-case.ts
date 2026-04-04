import type { CategoriesRepository } from "@/repositories/categories-repository";
import type { CreateCategoryDTO } from "@/repositories/interfaces/create-category-DTO";

import type { Category } from "@prisma/client";



interface CreateCategoryRequest{
  data: CreateCategoryDTO
}

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: CategoriesRepository){}


  async execute({data}: CreateCategoryRequest): Promise<Category>{
    const category = await this.categoriesRepository.create(data)


    return category
  } 
}