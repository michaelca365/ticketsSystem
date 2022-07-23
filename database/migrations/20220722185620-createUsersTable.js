/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
const { DataTypes } = require("sequelize");

const USER_TABLE = "users";

const usersSchema = {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  estado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
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
