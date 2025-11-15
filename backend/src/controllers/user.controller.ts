import { Request, Response } from "express";

export const getUsers = (req: Request, res: Response) => {
  res.send("Ça sera la liste des utilisateurs");
};
