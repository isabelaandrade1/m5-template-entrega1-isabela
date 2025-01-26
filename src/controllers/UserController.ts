import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const createUserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

class UserController {
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { username, email, password } = createUserSchema.parse(req.body);

      const existingUser = await prisma.user.findUnique({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }

      const user = await prisma.user.create({
        data: {
          username,
          email,
          password,
        },
      });

      res.status(201).json(user);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

}

export default new UserController();
