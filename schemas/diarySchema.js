import Joi from "joi";
import { errorMessageTemplate } from "../helpers/errorMessagesTemplate.js";

export const createDiarySchema = Joi.object({
  title: Joi.string()
    .required()
    .label("Title")
    .messages(errorMessageTemplate("Title")),
  description: Joi.string()
    .required()
    .label("Description")
    .messages(errorMessageTemplate("Description")),
  owner: Joi.string()
    .required()
    .label("Id")
    .messages(errorMessageTemplate("Id")),
});

export const updateDiarySchema = Joi.object({
  title: Joi.string().label("Title").messages(errorMessageTemplate("Title")),
  description: Joi.string()
    .label("Description")
    .messages(errorMessageTemplate("Description")),
});
