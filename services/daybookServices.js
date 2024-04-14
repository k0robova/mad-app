import { HttpError } from "../helpers/HttpError.js";
import { DaybookModel } from "../models/daybookModel.js";

export const fetchDaybookDB = async (owner) => {
  const daybook = await DaybookModel.find({ owner });

  if (!daybook) {
    throw HttpError(404, "Note for this user not found");
  }

  return daybook;
};

export const addNoteDB = async (owner, body) => {
  const newNote = await DaybookModel.create({ ...body, owner });
  return newNote;
};

export const updateNoteDB = async (id, owner, body) => {
  const updatedNote = await DaybookModel.findOneAndUpdate(
    { _id: id, owner },
    body,
    { new: true }
  );
  if (!updatedNote) {
    throw HttpError(404, "Note for user not found");
  }

  return updatedNote;
};

export const deleteNoteDB = async (id, owner) => {
  const deletedNote = await DaybookModel.findOneAndDelete({ _id: id, owner });

  if (!deletedNote) {
    throw HttpError(404, `Note  with id ${id} not found`);
  }

  return true;
};
