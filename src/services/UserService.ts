import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UserService {
  public async getUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      return user;
    } catch (error) {
      console.error('Error fetching user by email:', error);
      throw new Error('Error fetching user by email');
    }
  }

  public async updateUser(id: number, userData: Partial<User>): Promise<User> {
    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: userData,
      });
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Error updating user');
    }
  }

  // Outros métodos relacionados aos usuários podem ser adicionados aqui
}

export default new UserService();
