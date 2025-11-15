import { AppDataSource } from "../database/datasource";
import { User } from "../entities/User";

export class UserService {
  private userRepo = AppDataSource.getRepository(User);

  async getAllUsers() {
    const users = await this.userRepo.find();
    if (users.length === 0) {
      throw new Error("No users found");
    }
    return users;
  }

  async getUserById(userId: number) {
    const existingUser = await this.userRepo.findOneBy({ id: userId });
    if (!existingUser) {
      throw new Error("User not found");
    }
    return existingUser;
  }

  async createUser(user: User) {
    const existingEmail = await this.userRepo.findOneBy({ email: user.email });
    if (existingEmail) {
      throw new Error("Email already exists");
    }
    return this.userRepo.save(user);
  }

  async updateUser(userId: number, dataUpdateUser: Partial<User>) {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) {
      throw new Error("User not found");
    }
    return this.userRepo.save({ id: userId, ...dataUpdateUser });
  }

  async deleteUser(userId: number) {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) {
      throw new Error("User not found");
    }
    return this.userRepo.remove(user);
  }
}

// https://typeorm.io/docs/working-with-entity-manager/find-options/
