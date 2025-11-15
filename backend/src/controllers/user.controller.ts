import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { User } from "../entities/User";

export class UserController {
  constructor(private userService: UserService) {}

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getUserById(req: Request, res: Response) {
    const userId = parseInt(req.params.id, 10);
    try {
      const user = await this.userService.getUserById(userId);
      return res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getUserByEmail(req: Request, res: Response) {
    const email = req.params.email;
    try {
      const user = await this.userService.getUserByEmail(email);
      return res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async createUser(req: Request, res: Response) {
    try {
      // https://typeorm.io/docs/getting-started/#save-a-one-to-one-relation
      const { firstname, lastname, email, password } = req.body;

      // create a new user instance
      const newUser = new User();
      newUser.firstname = firstname;
      newUser.lastname = lastname;
      newUser.email = email;
      newUser.password = password;

      if (!firstname || !lastname || !email || !password) {
        res.status(400).json({ message: "All fields are required" });
      }

      const savedUser = await this.userService.createUser(newUser);
      res.status(201).json(savedUser);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
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
      res.status(200).json(updateUser);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
