import { Sequelize } from "sequelize";
import { Users, usersSchema } from "./model.users";

export const setupModels = (sequelize: Sequelize): void=>{
    Users.init(usersSchema, Users.config(sequelize));
}