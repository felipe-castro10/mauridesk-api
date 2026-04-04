import type { Category } from "@prisma/client";
import type { CategoriesRepository } from "../categories-repository";
import type { CreateCategoryDTO } from "../interfaces/create-category-DTO";
import { prisma } from "@/lib/prisma";


export class PrismaCategoriesRepository implements CategoriesRepository{



  async create(data: CreateCategoryDTO): Promise<Category> {
      const category = await prisma.category.create({
        data:{
          name: data.name,
          custom_fields: data.custom_fields 
        }
      });


      return category
  }

   async  getCategories(): Promise<Category[]> {
    const categories = await prisma.category.findMany();

    return categories
  }

}