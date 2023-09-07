import { sequelize } from "../utility/sequelize";

export const connectToPostgres = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("CONNECTED TO POSTGRES");
    return true;
  } catch (e) {
    throw e;
  }
};
