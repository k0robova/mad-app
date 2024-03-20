import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

const emailRegex = new RegExp("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegex,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    avatarURL: { type: String, default: "" },
    token: { type: String, default: "" },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.hashPassword = async function () {
  this.password = await bcryptjs.hash(this.password, 10);
};

userSchema.methods.comparePassword = async function (userPassword) {
  return await bcryptjs.compare(userPassword, this.password);
};

export const UserModel = model("Users", userSchema);
