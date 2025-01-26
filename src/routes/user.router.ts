const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');

const app = express();
const prisma = new PrismaClient();

const validateBody = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      res.status(400).json({ message: error.errors[0] });
    }
  };
};

const taskSchema = z.object({
  title: z.string(),
  content: z.string(),
  categoryId: z.number().optional(),
});

app.post('/tasks', validateBody(taskSchema), async (req, res) => {
  const { title, content, categoryId } = req.body;
  try {
    const task = await prisma.task.create({
      data: {
        title,
        content,
        categoryId,
      },
    });
    res.status(201).json(task);
  } catch (error) {
    if (error.code === 'P2002') {
      res.status(404).json({ message: 'Category not found' });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const task = await prisma.task.findUnique({
      where: { id: parseInt(id) },
    });
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
    } else {
      res.status(200).json(task);
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
