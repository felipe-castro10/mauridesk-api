import { PrismaCategoriesRepository } from "@/repositories/prisma/prisma-categories-repository";
import { CreateCategoryUseCase } from "@/use-cases/categories/create-use-case";

export function makeCreateCategoriesUseCase(){
  const categoriesRepository = new PrismaCategoriesRepository()
  const createCategoriesUseCase = new CreateCategoryUseCase(categoriesRepository)


  return createCategoriesUseCase
}