import { userModel } from "../modules/users.schema";

const createUser = (user: any) => userModel.create(user);

const getOneByEmail = (email: string) =>
  userModel.findOne({ where: { email } });

const update = (user: any, id: number) =>
  userModel.update(user, { where: { id: id } });

export default {
  createUser,
  getOneByEmail,
  update,
};
