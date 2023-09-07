import rolesRepo from "./roles.repo";
import { IRole } from "./roles.types";

const addRole = async (role: IRole) => {
  try {
    const response = await rolesRepo.create(role);
    return response;
  } catch (err) {
    throw err;
  }
};

const getOneRole = async (role: string) => {
  try {
    const response = await rolesRepo.getOne(role);
    return response;
  } catch (err) {
    throw err;
  }
};

const getOneById = async (id: number) => {
  try {
    const response = await rolesRepo.getOneById(id);
    return response;
  } catch (err) {
    throw err;
  }
};

export default {
  addRole,
  getOneRole,
  getOneById,
};
