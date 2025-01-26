import { z } from "zod";

export const taskSchema = z.object({
    id: z.number().positive(),
    title: z.string().min(1),
    content: z.string().min(1),
    finished: z.boolean().default(false),
    categoryId: z.number().optional().nullable()
});

export const taskCreateSchema = taskSchema.omit({ id: true, finished: true });

export const taskUpdateSchema = taskSchema.omit({ id: true, categoryId: true, category: true });

export type TTask = z.infer<typeof taskSchema>;

export type TTaskCreate = z.infer<typeof taskCreateSchema>;

export type TTaskUpdate = z.infer<typeof taskUpdateSchema>;
