import { Schema, model } from "mongoose";

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  lessons: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "free",
  },
});

export const CoursModel = model("Courses", courseSchema);
