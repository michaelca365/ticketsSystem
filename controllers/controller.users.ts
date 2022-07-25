import { Request, Response, NextFunction } from "express";
import { UsersService } from "../services/service.users";
import bcryptjs from "bcryptjs";

const service = new UsersService();

export const createUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, userName, userPermission } = req.body;
    const salt = bcryptjs.genSaltSync();
    const passwordCripted = bcryptjs.hashSync(password, salt);
    const userCreated = await service.createUser({
      email,
      password: passwordCripted,
      user_name: userName,
      user_permission: userPermission,
    });
    res.status(201).send({ msg: "usuario creado exitosamente", userCreated });
  } catch (error) {
    next(error);
  }
};

export const getUsersController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await service.findAllUsers({ estado: true });
    res.status(201).send({ users });
  } catch (error) {
    next(error);
  }
};

export const disableUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    await service.disableUser(userId);
    res.status(200).send({msg: "usuario desabilitado exitosamente"})
  } catch (error) {
    next(error);
  }
};
