import { Router, Request, Response } from "express";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";

const userService = new UserService();
const userController = new UserController(userService);

const router = Router();
router.get("/", (req: Request, res: Response) =>
  userController.getAllUsers(req, res)
);

router.get("/:id", (req: Request, res: Response) => {
  userController.getUserById(req, res);
});

router.get("/email/:email", (req: Request, res: Response) => {
  userController.getUserByEmail(req, res);
});

router.post("/", (req: Request, res: Response) => {
  userController.createUser(req, res);
});

router.put("/:id", (req: Request, res: Response) => {
  userController.updateUser(req, res);
});

export default router;
