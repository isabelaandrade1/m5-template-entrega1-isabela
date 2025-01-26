import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";
import { TTask, TTaskCreate, TTaskUpdate } from "../schemas/tasks.schema";

export class TaskServices {
    public async create(body: TTaskCreate, userId?: number): Promise<TTask> {
        if(!userId){
            throw new AppError(403, "This user is not the task owner");
        };
        const data = await prisma.task.create({
            data: {...body, userId: userId}
        });
        return data;
    };

    public async findMany(userId:number, search?: any): Promise<Array<TTask>> {
        if (!search) {
            return await prisma.task.findMany({
                where: {userId: userId},
                include: { category: true }
            });
        };
        const data = await prisma.task.findMany({
            where: {
                category: {
                    name: { contains: search, mode: "insensitive" }
                }
            },
            include: { category: true }
        });
        return data;
    };

    public async findOne(id: number, userId?: number): Promise<TTask | null> {
        if(!userId){
            throw new AppError(403, "This user is not the task owner");
        };
        const data = await prisma.task.findFirst({
            where: { id: id, userId:userId },
            include: { category: true }
        });
        return data;
    };

    public async update(id: number, body: TTaskUpdate, userId?: number): Promise<TTask | null> {
        if(!userId){
            throw new AppError(403, "This user is not the task owner");
        };
        const idTask = await prisma.task.findFirst({where: {id}});
        if(idTask?.userId !== userId){
            throw new AppError(403, "This user is not the task owner");
        };
        const data = await prisma.task.update({ where: { id, userId:userId }, data: {...body, userId} });
        return data;
    };

    public async delete(id: number, userId?: number): Promise<void> {
        if(!userId){
            throw new AppError(403, "This user is not the task owner");
        };
        const idTask = await prisma.task.findFirst({where: {id}});
        if(idTask?.userId !== userId){
            throw new AppError(403, "This user is not the task owner");
        };
        await prisma.task.delete({ where: { id , userId: userId} });
    };
}