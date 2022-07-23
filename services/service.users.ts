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

  async createUser(userData: userTypes): Promise<Model> {
    try {
      const userCreated = await sequelize.models.users.create(userData);
      return userCreated;
    } catch (error) {
      throw error;
    }
  }
}
