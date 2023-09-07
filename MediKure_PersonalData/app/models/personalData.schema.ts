import { DataTypes, FLOAT } from "sequelize";
import { sequelize } from "../utility/sequelize";
import { userModel } from "./users.schema";

export const personalDataModel = sequelize.define(
  "personalData",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    BMI: {
      type: FLOAT,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    diabetic: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    cardiacIssues: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    bloodPressure: {
      type: DataTypes.BOOLEAN,
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
        fields: ["mobileNumber"],
      },
      {
        fields: ["firstName"],
      },
      {
        fields: ["lastName"],
      },
    ],
  }
);

userModel.hasOne(personalDataModel);
personalDataModel.belongsTo(userModel);
