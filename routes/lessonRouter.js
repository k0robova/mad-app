import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { isValidId } from "../middlewares/isValidId.js";
import * as lessonControllers from "../controllers/lessonControllers.js";
import { validateBody } from "../middlewares/validateBody.js";
import * as schemas from "../schemas/lessonSchema.js";

const lessonRouter = express.Router();

lessonRouter.get(
  "/:groupId",
  authenticate,
  isValidId,
  lessonControllers.getLessons
);

lessonRouter.post(
  "/",
  authenticate,
  validateBody(schemas.createLessonSchema),
  lessonControllers.createLesson
);

lessonRouter.put(
  "/:lessonId",
  authenticate,
  isValidId,
  validateBody(schemas.updateLessonSchema),
  lessonControllers.updateLesson
);

lessonRouter.delete(
  "/:lessonId",
  authenticate,
  isValidId,
  lessonControllers.deletedLesson
);

export default lessonRouter;
