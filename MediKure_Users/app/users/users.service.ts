import { userReponse } from "./users.constants";
import userRepo from "./users.repo";

const createUser = async (user: any) => {
  try {
    const response = await userRepo.createUser(user);
    return userReponse.USER_CREATED;
  } catch (err) {
    throw err;
  }
};

const findUserByEmail = async (email: string) => {
  try {
    const user = await userRepo.getOneByEmail(email);
    return user;
  } catch (err) {
    throw err;
  }
};

const updateUser = async (user: any, id: number) => {
  try {
    const response = await userRepo.update(user, id);
    return response;
  } catch (err) {
    throw err;
  }
};

export default {
  createUser,
  findUserByEmail,
  updateUser,
};
