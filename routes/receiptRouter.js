import express from "express";
import { validateReceipt } from "../controllers/receiptController.js";
import { validateBody } from "../middlewares/validateBody.js";
import * as schema from "../schemas/receiptSchema.js";
import { authenticate } from "../middlewares/authenticate.js";

const receiptRouter = express.Router();

receiptRouter.post(
  "/",
  authenticate,
  validateBody(schema.validateReceiptSchema),
  validateReceipt
);

export default receiptRouter;
