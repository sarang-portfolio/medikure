import { DataTypes } from "sequelize";
import { sequelize } from "../utility/sequelize";
import { roleModel } from "./roles.schema";

export const userModel = sequelize.define(
  "users",
  {
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    googleId: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    linkedinId: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  { timestamps: true, paranoid: true, freezeTableName: true }
);

roleModel.hasOne(userModel);
userModel.belongsTo(roleModel);
