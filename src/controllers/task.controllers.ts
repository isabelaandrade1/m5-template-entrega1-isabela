import { Request, Response } from "express";
import { TaskServices } from "../services/task.services";


export class TaskControllers {
    public async create(req: Request, res: Response): Promise<Response> {
        const taskServices = new TaskServices();

        const userId = Number(res.locals.decode.id);
        
        const response = await taskServices.create(req.body, userId);

        return res.status(201).json(response);
    };

    public async findMany(req: Request, res: Response): Promise<Response> {
        const taskServices = new TaskServices();

        const { category } = req.query;

        const userId = Number(res.locals.decode.id);

        const response = await taskServices.findMany(userId, category);

        return res.status(200).json(response);
    };

    public async findOne(req: Request, res: Response): Promise<Response> {
        const taskServices = new TaskServices();

        const task = res.locals.task.id;
       
        const userId = Number(res.locals.decode.id);

        const response = await taskServices.findOne(task, userId);

        return res.status(200).json(response);
    };

    public async update(req: Request, res: Response): Promise<Response> {
        const taskServices = new TaskServices();

        const userId = Number(res.locals.decode.id);

        const response = await taskServices.update(res.locals.task.id, req.body, userId);

        return res.status(200).json(response);
    };

    public async delete(req: Request, res: Response): Promise<Response> {
        const taskServices = new TaskServices();

        await taskServices.delete(res.locals.task.id, Number(res.locals.decode.id));

        return res.status(204).json();
    };
}