import { Sequelize } from "sequelize";
import { Users, usersSchema } from "./model.users";
import { Tickets, ticketsSchema } from "./model.tickets";

export const setupModels = (sequelize: Sequelize): void=>{
    Users.init(usersSchema, Users.config(sequelize));
    Tickets.init(ticketsSchema, Tickets.config(sequelize));

    Tickets.associate(sequelize.models);
}