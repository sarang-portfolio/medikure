import { documentModel } from "../../models/familyData.schema";

const create = (document: any) => documentModel.create({ ...document });

const getOne = (document: any) =>
  documentModel.findOne({ where: { ...document } });

export default {
  create,
  getOne,
};
