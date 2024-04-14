import Joi from "joi";
import { errorMessageTemplate } from "../helpers/errorMessagesTemplate.js";

export const createTherapySchema = Joi.object({
  title: Joi.string()
    .required()
    .label("Title")
    .messages(errorMessageTemplate("Title")),
  description: Joi.string()
    .required()
    .label("Description")
    .messages(errorMessageTemplate("Description")),
});
