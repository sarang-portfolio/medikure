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
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ["email"],
      },
      {
        fields: ["googleId"],
      },
      {
        fields: ["linkedinId"],
      },
    ],
  }
);

roleModel.hasOne(userModel);
userModel.belongsTo(roleModel);
