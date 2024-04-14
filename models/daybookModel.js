import { Schema, model } from "mongoose";

const daybookSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
});

export const DaybookModel = model("Daybook", daybookSchema);
