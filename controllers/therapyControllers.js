import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import * as therapyServices from "../services/therapyServices.js";

export const getTherapy = ctrlWrapper(async (req, res) => {
  const therapy = await therapyServices.fetchTherapyDB();

  res.json(therapy);
});

export const createTherapy = ctrlWrapper(async (req, res) => {
  const { body } = req;

  const newTherapy = await therapyServices.addTherapyDB(body);

  res.status(201).json(newTherapy);
});
