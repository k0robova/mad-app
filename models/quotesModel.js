import { Schema, model } from "mongoose";

const quotesSchema = new Schema(
  {
    img: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export const QuotesModel = model("Quotes", quotesSchema);
