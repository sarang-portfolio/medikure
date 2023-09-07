import { sequelize } from "../utility/sequelize";
import { DataTypes, FLOAT } from "sequelize";
import { userModel } from "./users.schema";

export const documentModel = sequelize.define(
  "documents",
  {
    aadharFront: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aadharBack: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    insuranceFront: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    insuranceBack: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
  }
);

userModel.hasOne(documentModel);
documentModel.belongsTo(userModel);
