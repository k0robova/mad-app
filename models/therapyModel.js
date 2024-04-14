import { Schema, model } from "mongoose";

const therapySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

export const TherapyModel = model("Therapy", therapySchema);
