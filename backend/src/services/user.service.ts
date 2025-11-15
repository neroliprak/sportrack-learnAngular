import { AppDataSource } from "../database/datasource";
import { User } from "../entities/User";

export class UserService {
  private userRepo = AppDataSource.getRepository(User);

  async getAllUsers() {
    return await this.userRepo.find();
  }

  async getUserById(userId: number) {
    return await this.userRepo.findOneBy({ id: userId });
  }

  async getUserByEmail(email: string) {
    return await this.userRepo.find({ where: { email } });
  }

  async createUser(user: User) {
    return await this.userRepo.save(user);
  }

  async updateUser(userId: number, dataUpdateUser: Partial<User>) {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) {
      throw new Error("User not found");
    }
    return await this.userRepo.save({ id: userId, ...dataUpdateUser });
  }
}

// https://typeorm.io/docs/working-with-entity-manager/find-options/
