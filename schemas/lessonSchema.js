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
  type: Joi.string()
    .required()
    .label("Type")
    .messages(errorMessageTemplate("Type")),
  titleImage: Joi.string()
    .required()
    .label("Image")
    .messages(errorMessageTemplate("image")),
  videoLesson: Joi.string()
    .required()
    .label("Video")
    .messages(errorMessageTemplate("Video")),
  continuance: Joi.string()
    .required()
    .label("Continuance")
    .messages(errorMessageTemplate("Continuance")),
  status: Joi.string().default("free").label("Status").messages({
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
  videoLesson: Joi.string().label("Video"),
  continuance: Joi.string().label("Continuance"),
  status: Joi.string().default("free").label("Status").messages({
    "string.empty": '"Status" field cannot be empty',
  }),
  groupId: Joi.string().label("Id"),
});
