import { Sequelize, Options } from "sequelize";

const options: Options = {
  dialect: "postgres",
  logging: process.env.NODE_ENV === "development" ? (str) => console.log(str) : false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

export const sequelize = new Sequelize(process.env.DATABASE_URL || "", options);
