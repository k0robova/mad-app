import { Schema, model } from "mongoose";

const diarySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
  },
  { versionKey: false, timestamps: true }
);

export const diaryModel = model("Diary", diarySchema);
