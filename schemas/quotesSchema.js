import Joi from "joi";
import { errorMessageTemplate } from "../helpers/errorMessagesTemplate.js";

export const quotesSchema = Joi.object({
  img: Joi.string().required().messages(errorMessageTemplate("Img")),
});
