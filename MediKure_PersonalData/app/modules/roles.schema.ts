import { DataTypes } from "sequelize";
import { sequelize } from "../utility/sequelize";

export const roleModel = sequelize.define(
  "roles",
  {
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, paranoid: true, freezeTableName: true }
);
