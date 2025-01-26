import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";
import { TCategory, TCategoryCreate } from "../schemas/categories.schema";

export class CategoryServices {
    public async create(body: TCategoryCreate, userId?: number): Promise<TCategory> {
        if(!userId){
            throw new AppError(403, "This user is not the category owner");
        }
        return await prisma.category.create({ data: {...body, userId: userId} });
    };

    public async delete(categoryId: number, userId?: number): Promise<void> { 
        if(!userId){
            throw new AppError(403, "This user is not the category owner");
        }     
        const idCategory = await prisma.category.findFirst({where: {id:categoryId}}) ;
        if(idCategory?.userId!== userId){
            throw new AppError(403, "This user is not the category owner");
        }     

        await prisma.category.delete({ where: { id: categoryId , userId:userId}});
    };
}