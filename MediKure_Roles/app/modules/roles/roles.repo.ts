import { roleModel } from "./models/roles.schema";
import { IRole } from "./roles.types";

const create = (role: IRole) => roleModel.create({ ...role });

const getOne = (role: string) => roleModel.findOne({ where: { role: role } });

const getOneById = (id: number) => roleModel.findOne({ where: { id } });

export default {
  create,
  getOne,
  getOneById,
};
