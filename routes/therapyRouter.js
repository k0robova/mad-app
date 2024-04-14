import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { validateBody } from "../middlewares/validateBody.js";
import * as therapyControllers from "../controllers/therapyControllers.js";
import * as therapySchema from "../schemas/therapySchema.js";

const therapyRouter = express.Router();

therapyRouter.get("/", therapyControllers.getTherapy);

therapyRouter.post(
  "/",

  validateBody(therapySchema.createTherapySchema),
  therapyControllers.createTherapy
);

export default therapyRouter;
