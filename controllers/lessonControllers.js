import { HttpError } from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import * as lessonServices from "../services/lessonServices.js";

export const getLessons = ctrlWrapper(async (req, res) => {
  const id = req.params.groupId;

  const lessons = await lessonServices.fetchLessonsDB(id);

  res.json(lessons);
});

export const createLesson = ctrlWrapper(async (req, res) => {
  const { body } = req;

  const newLesson = await lessonServices.addLessonDB(body);

  res.status(201).json(newLesson);
});

export const updateLesson = ctrlWrapper(async (req, res) => {
  const id = req.params.lessonId;
  const { body } = req;

  if (!body || Object.keys(body).length === 0) {
    throw HttpError(400, "missing field");
  }

  const updatedLesson = await lessonServices.updateLessonDB(id, body);

  res.json(updatedLesson);
});

export const deletedLesson = ctrlWrapper(async (req, res) => {
  const id = req.params.lessonId;

  await lessonServices.removeLessonDB(id);

  res.json({ message: "Lesson deleted successfully" });
});
