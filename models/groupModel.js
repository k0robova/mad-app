import { Schema, model } from "mongoose";

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: "1",
  },
});

export const GroupModel = model("Groups", groupSchema);
