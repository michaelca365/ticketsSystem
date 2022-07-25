/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sequelize, ModelAttributes, DataTypes, Model } from "sequelize";

const TICKETS = "tickets";
export const ticketsSchema: ModelAttributes = {
    id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: DataTypes.BIGINT
    },
    ticket_time: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.fn("now")
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
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}

export class Tickets extends Model {
      static associate(models: any): void {
        this.hasOne(models.users, {
          as: "tecnico",
          foreignKey: "id",
          sourceKey: "technician_id",
        });
        this.hasOne(models.users, {
          as: "usuario_creador",
          foreignKey: "id",
          sourceKey: "generated_by",
        });
      }
      static config(sequelize: Sequelize): any {
        return {
          sequelize,
          tableName: TICKETS,
          modelName: "tickets",
          timestamps: false,
        };
      }
    }
    