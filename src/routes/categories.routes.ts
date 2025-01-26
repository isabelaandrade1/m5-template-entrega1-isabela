import { Router } from "express";
import { CategoryControllers } from "../controllers/category.controllers";
import { IsCategoryIdValid } from "../middlewares/isCategoryIdValid.middleware";
import { categoryCreateSchema } from "../schemas/categories.schema";
import { ValidateBody } from "../middlewares/validateBody.middleware";
import { VerifyToken } from "../middlewares/verifyToken.middleware";

export const categoryRouter = Router();

const categoryControllers = new CategoryControllers();

categoryRouter.use("/", VerifyToken.execute);

categoryRouter.post("/", ValidateBody.execute(categoryCreateSchema), categoryControllers.create);
categoryRouter.delete("/:id", IsCategoryIdValid.execute, categoryControllers.delete);