import { Request, Response, NextFunction } from "express";
import { UsersService } from "../services/service.users";
import bcryptjs from "bcryptjs";

const service = new UsersService();

export const createUserController = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const { email, password, userName, userPermission } = req.body;
        const salt = bcryptjs.genSaltSync();
        const passwordCripted = bcryptjs.hashSync(password, salt);
        const userCreated = await service.createUser({email, password: passwordCripted, user_name: userName, user_permission: userPermission});
        res.status(201).send({msg: "usuario creado exitosamente", userCreated});
    } catch (error) {
        next(error);
    }
}