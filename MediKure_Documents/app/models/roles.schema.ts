import { sequelize } from "../utility/sequelize";
import { DataTypes } from "sequelize";

export const roleModel = sequelize.define(
  "roles",
  {
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ["role"],
      },
    ],
  }
);
