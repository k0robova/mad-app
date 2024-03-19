import { HttpError } from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import * as groupServices from "../services/groupServices.js";

export const getGroups = ctrlWrapper(async (req, res) => {
  const groups = await groupServices.fetchGroupsDB();
  res.json(groups);
});

export const createGroup = ctrlWrapper(async (req, res) => {
  const newGroup = await groupServices.addGroupDB(req.body);

  res.status(201).json(newGroup);
});

export const updateGroup = ctrlWrapper(async (req, res) => {
  const id = req.params.groupId;
  const { body } = req;

  if (!body || Object.keys(body).length === 0) {
    throw HttpError(400, "missing field");
  }

  const updatedGroup = await groupServices.updateGroupDB(id, body);

  res.json(updatedGroup);
});

export const deleteGroup = ctrlWrapper(async (req, res) => {
  const id = req.params.groupId;

  await groupServices.removeGroupDB(id);

  res.json({ messages: "Group deleted successfully" });
});
