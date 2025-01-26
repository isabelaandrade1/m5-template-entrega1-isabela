import { Request, Response } from "express";
import { CategoryServices } from "../services/category.services";

export class CategoryControllers {
    public async create(req: Request, res: Response): Promise<Response> {      
        const categoryServices = new CategoryServices();
        
        const userId = Number(res.locals.decode.id);

        const response = await categoryServices.create(req.body, userId);

        return res.status(201).json(response);
    };

    public async delete(req: Request, res: Response): Promise<Response> {
        const categoryServices = new CategoryServices();

        const userId = Number(res.locals.decode.id);

        await categoryServices.delete(res.locals.category.id, userId);

        return res.status(204).json();
    };
}