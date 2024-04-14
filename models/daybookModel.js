import { Schema, model } from "mongoose";

const daybookSchema = new Schema(
  {
    text: {
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

export const DaybookModel = model("Daybook", daybookSchema);
