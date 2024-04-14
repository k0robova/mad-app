import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import * as diaryControllers from "../controllers/diaryConrollers.js";
import { validateBody } from "../middlewares/validateBody.js";
import * as schemas from "../schemas/diarySchema.js";
import { isValidId } from "../middlewares/isValidId.js";

const diaryRouter = express.Router();

diaryRouter.get("/", authenticate, diaryControllers.getDiary);

diaryRouter.post(
  "/",
  authenticate,
  validateBody(schemas.createDiarySchema),
  diaryControllers.createNote
);

diaryRouter.put(
  "/:noteId",
  authenticate,
  isValidId,
  validateBody(schemas.updateDiarySchema),
  diaryControllers.updateNote
);

diaryRouter.delete(
  "/:noteId",
  authenticate,
  isValidId,
  diaryControllers.deleteNote
);

export default diaryRouter;
