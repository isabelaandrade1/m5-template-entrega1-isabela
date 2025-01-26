import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

export class IsCategoryIdValid {
   static async execute(req: Request, res: Response, next: NextFunction) {
      const id = req.params.id;

      const category = await prisma.category.findFirst({
         where: { id: Number(id) },
      });

      if (!category) {
         throw new AppError(404, "Category not found");
      };

      res.locals.category = category;

      next();
   }

   static async executePost(req: Request, res: Response, next: NextFunction) {
      const categoryId = Number(req.body.categoryId);
      if (categoryId) {
         const category = await prisma.category.findFirst({
            where: { id: categoryId },
         });

         if (!category) {
            throw new AppError(404, "Category not found");
         };
      };

      next();
   }
}