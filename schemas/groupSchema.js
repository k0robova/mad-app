import Joi from "joi";
import { errorMessageTemplate } from "../helpers/errorMessagesTemplate.js";

export const createGroupSchema = Joi.object({
  name: Joi.string()
    .required()
    .label("Name")
    .messages(errorMessageTemplate("Name")),
});

export const updateBoardSchema = Joi.object({
  name: Joi.string().required().label("Name").messages({
    "string.empty": '"Name" cannot be an empty field',
  }),
});
