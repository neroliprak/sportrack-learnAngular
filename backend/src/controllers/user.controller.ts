import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { User } from "../entities/User";

export class UserController {
  constructor(private userService: UserService) {}

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      return res.status(200).json(users);
    } catch (error: any) {
      if (error.message === "No users found") {
        res.status(404).json({ message: "No users found" });
      }
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getUserById(req: Request, res: Response) {
    const userId = parseInt(req.params.id, 10);
    try {
      const user = await this.userService.getUserById(userId);
      return res.status(200).json(user);
    } catch (error: any) {
      if (error.message === "User not found") {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      // https://typeorm.io/docs/getting-started/#save-a-one-to-one-relation
      const { firstname, lastname, email, password } = req.body;
      if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      // create a new user instance
      const newUser = new User();
      newUser.firstname = firstname;
      newUser.lastname = lastname;
      newUser.email = email;
      newUser.password = password;

      const savedUser = await this.userService.createUser(newUser);
      return res.status(201).json(savedUser);
    } catch (error: any) {
      if (error.message === "Email already exists") {
        return res.status(409).json({ message: "Email already exists" });
      }
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id, 10);
      const dataUpdateUser = req.body;

      const updateUser = await this.userService.updateUser(
        userId,
        dataUpdateUser
      );
      return res.status(200).json(updateUser);
    } catch (error: any) {
      if (error.message === "User not found") {
        res.status(404).json({ message: "User not found" });
      }
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id, 10);
      const deleteUser = await this.userService.getUserById(userId);
      await this.userService.deleteUser(userId);
      return res
        .status(200)
        .json({ message: "User deleted successfully", deleteUser });
    } catch (error: any) {
      if (error.message === "User not found") {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
