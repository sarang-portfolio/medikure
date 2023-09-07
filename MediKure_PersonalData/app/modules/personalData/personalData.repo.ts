import { personalDataModel } from "../../models/personalData.schema";
import { IPersonalData } from "./personalData.types";

const create = (personalData: IPersonalData) =>
  personalDataModel.create({ ...personalData });

const getOne = (personalData: IPersonalData) =>
  personalDataModel.findOne({ where: { ...personalData } });

const update = (personalData: IPersonalData, id: string) =>
  personalDataModel.update(personalData, { where: { id: id } });

export default {
  create,
  getOne,
  update,
};
