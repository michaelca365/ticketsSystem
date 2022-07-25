import { Model, WhereOptions } from "sequelize";
import { sequelize } from "../database/config";
import boom from "@hapi/boom";
import { userTypes } from "../interface/interface.users";

export class UsersService {

  async findUser(whereOption: WhereOptions, notFoundMessage: string): Promise<Model> {
    try {
      const findUser = await sequelize.models.users.findOne({ where: whereOption });
      if (!findUser) {
        throw boom.badRequest(notFoundMessage);
      }
      return findUser;
    } catch (error) {
      throw error;
    }
  }

  async findAllUsers(whereOption: WhereOptions | undefined): Promise<Model[]> {
    try {
      const findUser = await sequelize.models.users.findAll({attributes: ["id", "email", "user_name"],  where: whereOption });
      return findUser;
    } catch (error) {
      throw error;
    }
  }

  async createUser(userData: userTypes): Promise<Model> {
    try {
      const checkIfUserExist = await sequelize.models.users.findOne({where: {email: userData.email}});
      if(checkIfUserExist){
        throw boom.badRequest("No se puede registrar al usuario con el correo proporcionado")
      }
      const userCreated = await sequelize.models.users.create(userData);
      return userCreated;
    } catch (error) {
      throw error;
    }
  }

  async disableUser(id: string): Promise<Model>{
    try {
      const user = await this.findUser({id}, "No existe el usuario");
      await user.update({estado: false});
      return user;
    } catch (error) {
      throw error;
    }
  }
}
