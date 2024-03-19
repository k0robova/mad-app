import { HttpError } from "../helpers/HttpError.js";
import { LessonModel } from "../models/lessonModel.js";

export const fetchLessonsDB = async (id) => {
  const lessons = await LessonModel.find({ groupId: id });

  if (!lessons) {
    throw HttpError(404, "lessons for this group not found");
  }

  return lessons;
};

export const addLessonDB = async (data) => {
  const exist = await LessonModel.findOne({ name: data.name });

  if (exist) {
    throw HttpError(409, "Lesson with such name already exists");
  }

  const newLesson = await LessonModel.create({ ...data });

  return newLesson;
};

export const updateLessonDB = async (id, data) => {
  const updatedLesson = await LessonModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });

  if (!updatedLesson) {
    throw HttpError(404, `Lesson with id ${id} not found`);
  }

  return updatedLesson;
};

export const removeLessonDB = async (id) => {
  const deletedLesson = await LessonModel.findOneAndDelete({ _id: id });

  if (!deletedLesson) {
    throw HttpError(404, `Lesson with id ${id} not found`);
  }

  return true;
};
