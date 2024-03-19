import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { validateBody } from "../middlewares/validateBody.js";
import * as schema from "../schemas/groupSchema.js";
import { isValidId } from "../middlewares/isValidId.js";
import * as groupControllers from "../controllers/groupControllers.js";

const groupRouter = express.Router();

groupRouter.get("/", authenticate, groupControllers.getGroups);

groupRouter.post(
  "/",
  authenticate,
  validateBody(schema.createGroupSchema),
  groupControllers.createGroup
);

groupRouter.put(
  "/:groupId",
  authenticate,
  isValidId,
  validateBody(schema.updateBoardSchema),
  groupControllers.updateGroup
);

groupRouter.delete(
  "/:groupId",
  authenticate,
  isValidId,
  groupControllers.deleteGroup
);

export default groupRouter;
