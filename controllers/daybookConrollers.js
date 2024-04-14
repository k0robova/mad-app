import { HttpError } from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import * as notesServices from "../services/daybookServices.js";

export const getDaybook = ctrlWrapper(async (req, res) => {
  const { _id: owner } = req.user;

  const daybook = await notesServices.fetchDaybookDB(owner);

  res.json(daybook);
});

export const createNote = ctrlWrapper(async (req, res) => {
  const { body } = req;
  const { _id: owner } = req.user;

  const newNote = await notesServices.addNoteDB(owner, body);

  res.status(201).json(newNote);
});

export const updateNote = ctrlWrapper(async (req, res) => {
  const id = req.params.noteId;
  const { body } = req;
  const { _id: owner } = req.user;
  if (!body || Object.keys(body).length === 0) {
    throw HttpError(400, "missing field");
  }
  const updatedNote = await notesServices.updateNoteDB(id, owner, body);

  res.json(updatedNote);
});

export const deleteNote = ctrlWrapper(async (req, res) => {
  const id = req.params.noteId;
  const { _id: owner } = req.user;

  await notesServices.deleteNoteDB(id, owner);

  res.json({ message: "Note deleted successfully" });
});
