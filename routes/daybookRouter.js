import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import * as daybookControllers from "../controllers/daybookConrollers.js";
import { validateBody } from "../middlewares/validateBody.js";
import * as schemas from "../schemas/daybookSchema.js";
import { isValidId } from "../middlewares/isValidId.js";

const daybookRouter = express.Router();

daybookRouter.get("/", authenticate, daybookControllers.getDaybook);

daybookRouter.post(
  "/",
  authenticate,
  validateBody(schemas.updateDaybookSchema),
  daybookControllers.createNote
);

daybookRouter.put(
  "/:noteId",
  authenticate,
  isValidId,
  validateBody(schemas.updateDaybookSchema),
  daybookControllers.updateNote
);

daybookRouter.delete(
  "/:noteId",
  authenticate,
  isValidId,
  daybookControllers.deleteNote
);

export default daybookRouter;
