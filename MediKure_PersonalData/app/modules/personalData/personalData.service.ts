import personalDataRepo from "./personalData.repo";
import { IPersonalData } from "./personalData.types";

const createPersonalData = async (
  personalData: IPersonalData,
  userId: number
) => {
  try {
    const age = calculateAge(personalData.dateOfBirth as string);
    const BMI = Number(
      calculateBMI(personalData.weight as number, personalData.height as number)
    );
    const response = await personalDataRepo.create({
      ...personalData,
      userId: userId,
      age,
      BMI,
    });
    return response;
  } catch (err) {
    throw err;
  }
};

const getOnePersonalData = async (personalData: any) => {
  try {
    const response = await personalDataRepo.getOne(personalData);
    return response;
  } catch (err) {
    throw err;
  }
};

const updatePersonalData = async (personalData: any, id: string) => {
  try {
    const response = await personalDataRepo.update(personalData, id);
    return response;
  } catch (err) {
    throw err;
  }
};

const calculateAge = (dateOfBirth: string) => {
  const date = dateOfBirth.split("-").join(", ");
  const birthDate = new Date(date);
  const differenceInMs = Date.now() - birthDate.getTime();
  const age = new Date(differenceInMs);
  return Math.abs(age.getUTCFullYear() - 1970);
};

const calculateBMI = (weight: number, height: number) => {
  return (weight / (height * 0.304) ** 2).toFixed(2);
};

export default {
  createPersonalData,
  getOnePersonalData,
  updatePersonalData,
};
