import { HttpError } from "../helpers/HttpError.js";
import { GroupModel } from "../models/groupModel.js";
import { LessonModel } from "../models/lessonModel.js";

export const fetchGroupsDB = () => GroupModel.find();

export const addGroupDB = async (data) => {
  const exist = await GroupModel.findOne({ name: data.name });

  if (exist) {
    throw HttpError(409, "Group with such name already exists");
  }

  const newGroup = await GroupModel.create({ ...data });

  return newGroup;
};

export const updateGroupDB = async (id, data) => {
  const updatedGroup = await GroupModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });

  if (!updatedGroup) {
    throw HttpError(404, `Group with id ${id} not found`);
  }

  return updatedGroup;
};

export const removeGroupDB = async (id) => {
  const deletedGroup = await GroupModel.findOneAndDelete({ _id: id });

  if (!deletedGroup) {
    throw HttpError(404, `Group with id ${id} not found`);
  }

  await LessonModel.deleteMany({ groupId: id });

  return true;
};
