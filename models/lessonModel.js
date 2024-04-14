import { Schema, model } from "mongoose";

const lessonSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    titleImage: {
      type: String,
      required: true,
    },
    videoLesson: {
      type: String,
      required: true,
    },
    continuance: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "free",
    },
    groupId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Groups",
    },
  },
  { versionKey: false, timestamps: true }
);

export const LessonModel = model("Lessons", lessonSchema);
