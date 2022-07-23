import { Response, Request, NextFunction } from "express";

import jwt from "jsonwebtoken";
const secretKey = process.env.SECRET_KEY as string;
import boom from "@hapi/boom";
import { UsersService } from "../services/service.users";
import { DecodeResult, userTypesDB } from "../interface/interface.users";

const service = new UsersService();

export const generarJWT = (uid: string, usuario: string, email: string, permiso: number): Promise<string | void> => {
  return new Promise((resolve, reject) => {
    const payload = { uid, usuario, email, permiso };
    jwt.sign(
      payload,
      secretKey,
      {
        expiresIn: process.env.TOKEN_EXPIRES_IN || "1d",
      },
      (err, token) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

export const vertificarJWT = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const secretKey = process.env.SECRET_KEY || "";
    const token = req.cookies["jwt_token"];
    if (!token) {
      throw boom.unauthorized("No tiene autorización");
    }
    const { uid } = jwt.verify(token, secretKey) as DecodeResult;
    const usuario = (await service.findUser({id: uid}, "Error al verificar el usuario")).get({plain: true}) as userTypesDB;
    //verificar si usuario está habilitado
    if (!usuario.estado) {
      throw boom.unauthorized("No tiene autorización");
    }
    req.usuario = {
      userName: usuario.user_name,
      email: usuario.email,
      estado: usuario.estado,
      seguridad: usuario.user_permission,
      uid: usuario.id,
    };


    next();
  } catch (error) {
    next(boom.unauthorized("Error en el token"));
  }
}
