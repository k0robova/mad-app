import Joi from "joi";
import { errorMessageTemplate } from "../helpers/errorMessagesTemplate.js";

export const createDaybookSchema = Joi.object({
  text: Joi.string()
    .required()
    .label("Text")
    .messages(errorMessageTemplate("Text")),
  owner: Joi.string()
    .required()
    .label("Id")
    .messages(errorMessageTemplate("Id")),
});

export const updateDaybookSchema = Joi.object({
  text: Joi.string()
    .required()
    .label("Text")
    .messages(errorMessageTemplate("Text")),
});
