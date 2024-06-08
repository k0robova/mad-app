import Joi from "joi";
import { errorMessageTemplate } from "../helpers/errorMessagesTemplate.js";

export const validateReceiptSchema = Joi.object({
  receiptData: Joi.string().required().messages(errorMessageTemplate("Data")),
  platform: Joi.string()
    .valid("ios", "android")
    .required()
    .messages(errorMessageTemplate("Platform")),
});
