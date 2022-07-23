/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Model,
  Sequelize,
  DataTypes,
  UUIDV4,
  ModelAttributes,
} from "sequelize";

const USER_TABLE = "users";

export const usersSchema: ModelAttributes = {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: UUIDV4,
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

export class Users extends Model {
//   static associate(models: any): void {
//     this.hasMany(models.UsuariosToken, {
//       as: "usuarioToken",
//       foreignKey: "uid",
//       sourceKey: "uid",
//     });
//     this.hasOne(models.Clientes, {
//       as: "cliente",
//       foreignKey: "usuarioId",
//       sourceKey: "uid",
//     });
//   }
  static config(sequelize: Sequelize): any {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: "users",
      timestamps: false,
    };
  }
}
