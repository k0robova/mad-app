import { HttpError } from "../helpers/HttpError.js";
import { TherapyModel } from "../models/therapyModel.js";

export const fetchTherapyDB = async () => {
  const therapy = await TherapyModel.find();

  return therapy;
};

export const addTherapyDB = async (data) => {
  const exist = await TherapyModel.findOne({ title: data.title });

  if (exist) {
    throw HttpError(409, "Therapy with such name already exists");
  }

  const newTherapy = await TherapyModel.create({ ...data });

  return newTherapy;
};
