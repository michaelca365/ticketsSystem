import { NextFunction, Request, Response } from "express";

export const userLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send({ msg: "auth" });
  } catch (error) {
    next(error);
  }
};
