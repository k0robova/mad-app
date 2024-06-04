import Joi from "joi";
import { errorMessageTemplate } from "../helpers/errorMessagesTemplate.js";

export const createLessonSchema = Joi.object({
  name: Joi.string()
    .required()
    .label("Name")
    .messages(errorMessageTemplate("Name")),
  description: Joi.string()
    .required()
    .label("Descpription")
    .messages(errorMessageTemplate("Description")),
  titleImage: Joi.string()
    .label("Image")
    .messages(errorMessageTemplate("Image")),
  audio: Joi.string()
    .required()
    .label("Audio")
    .messages(errorMessageTemplate("Audio")),
  status: Joi.string()
    .valid("free", "premium")
    .default("free")
    .label("Status")
    .messages({
      "string.empty": '"Status" field cannot be empty',
    }),
  groupId: Joi.string()
    .required()
    .label("Id")
    .messages(errorMessageTemplate("Id")),
});

export const updateLessonSchema = Joi.object({
  name: Joi.string().label("Name"),
  description: Joi.string().label("Descpription"),
  type: Joi.string().label("Type"),
  titleImage: Joi.string().label("Image"),
  audio: Joi.string().label("Video"),
  status: Joi.string().default("free").label("Status").messages({
    "string.empty": '"Status" field cannot be empty',
  }),
  groupId: Joi.string().label("Id"),
});
