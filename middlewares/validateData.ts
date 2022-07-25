import { Request, Response, NextFunction } from "express";
import boom from "@hapi/boom";
export const permissionValidation = (permission: number[]) => {
  return async (req: Request,Response: Response,next: NextFunction): Promise<Response | void> => {
    try {
      const { seguridad } = req.usuario;
      if(permission.includes(seguridad)){
        next();
      }else{
        next(boom.unauthorized("No tiene permisos para realizar esta acción"));
      }
    } catch (error) {
      next(error);
    }
  };
};
