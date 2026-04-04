import { PrismaCategoriesRepository } from "@/repositories/prisma/prisma-categories-repository";
import { FetchCategoriesUseCase } from "@/use-cases/categories/fetch-categories";



export function makeFetchCategoriesUseCase(){
  const categoriesRepository = new PrismaCategoriesRepository() 
  const fetchCategoriesUseCase = new FetchCategoriesUseCase(categoriesRepository)

  return fetchCategoriesUseCase
}