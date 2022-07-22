/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
const { DataTypes } = require("sequelize");

const USER_TABLE = "users";

const usersSchema = {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  user_name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  user_permission: {
    allowNull: false,
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
};
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(USER_TABLE, usersSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(USER_TABLE);
  },
};
