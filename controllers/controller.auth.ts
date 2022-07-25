import { NextFunction, Request, Response } from "express";
import { UsersService } from "../services/service.users";
import bcrypt from "bcryptjs";
import boom from "@hapi/boom";
import { generarJWT } from "../middlewares/generarJWT";
import { userTypesDB } from "../interface/interface.users";

const service = new UsersService();


export const userLogin = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = (await service.findUser({email, estado: true}, "Usuario / Password no son correctos ERROR 1")).get({plain: true}) as userTypesDB;
    const validarPassword = bcrypt.compareSync(password, user.password);
    if (!validarPassword) {
      throw boom.badRequest("Usuario / Password no son correctos");
    }

    const token = await generarJWT(user.id, user.user_name, user.email, user.user_permission );
    res.status(200).cookie("jwt_token", `${token}`, {
      sameSite: "strict",
      httpOnly: false,
      secure: false,
    });
    return res.status(200).send({ auth: true });
  } catch (error) {
    next(error);
  }
};
