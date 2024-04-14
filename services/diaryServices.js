import { HttpError } from "../helpers/HttpError.js";
import { diaryModel } from "../models/diaryModel.js";

export const fetchDiaryDB = async (owner) => {
  const diary = await diaryModel.find({ owner });

  if (!diary) {
    throw HttpError(404, "Note for this user not found");
  }

  return diary;
};

export const addNoteDB = async (owner, body) => {
  const newNote = await diaryModel.create({ ...body, owner });
  return newNote;
};

export const updateNoteDB = async (id, owner, body) => {
  const updatedNote = await diaryModel.findOneAndUpdate(
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
  const deletedNote = await diaryModel.findOneAndDelete({ _id: id, owner });

  if (!deletedNote) {
    throw HttpError(404, `Note  with id ${id} not found`);
  }

  return true;
};
