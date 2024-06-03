import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import * as quoteControllers from "../controllers/quoteControllers.js";
import { validateBody } from "../middlewares/validateBody.js";
import * as schema from "../schemas/quotesSchema.js";

const quoteRouter = express.Router();

quoteRouter.get("/", authenticate, quoteControllers.getQuotes);

quoteRouter.post(
  "/",
  authenticate,
  validateBody(schema.quotesSchema),
  quoteControllers.createQuotes
);

export default quoteRouter;
