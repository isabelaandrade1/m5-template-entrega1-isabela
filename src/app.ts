import "express-async-errors";
import "dotenv/config";
import express, { json } from "express";
import helmet from "helmet";
import cors from "cors";
import { HandleErrors } from "./middlewares/handleErrors.middleware";
import { categoryRouter } from "./routes/categories.routes";
import { taskRouter } from "./routes/tasks.routes";
import { userRouter } from "./routes/user.routes";

export const app = express();

app.use(cors());

app.use(helmet());

app.use(json());

app.use("/users", userRouter);

app.use("/categories", categoryRouter);

app.use("/tasks", taskRouter);

app.use(HandleErrors.execute);