/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';
const { DataTypes } = require("sequelize");
const TICKETS = "tickets";
const ticketsSchema = {
    id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: DataTypes.BIGINT
    },
    ticket_time: {
        allowNull: false,
        type: DataTypes.DATE,
    },
    issue_description: {
        allowNull: false,
        type: DataTypes.STRING
    },
    technician_id: {
        allowNull: false,
        type: DataTypes.UUID
    },
    technician_notes: {
        allowNull: true,
        type: DataTypes.STRING
    },
    fixed: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: "El producto fue arreglado"
    },
    date_fixed:{
        allowNull: true,
        type: DataTypes.DATE,
        comment: "Fecha de entregado"
    },
    estimated_days:{
        allowNull: true,
        type: DataTypes.INTEGER,
        comment: "Dias estimados para la entrega"
    },
    generated_by: {
        allowNull: false,
        type: DataTypes.UUID,
        comment: "Usuario que genera el tiquete"
    },
    owner_name:{
        allowNull: true,
        type: DataTypes.STRING,
        comment: "Nombre de la persona que entrega el electrodomestico"
    },
    state: {
        allowNull: false,
        type: DataTypes.BOOLEAN
    }
 }

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(TICKETS, ticketsSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(TICKETS);
  }
};
