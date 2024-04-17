import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { UserModel } from "../models/userModel.js";

dotenv.config();
const {
  SECRET_KEY,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;
export const emailUnique = async (email) => {
  await UserModel.findOne({ email });
};

export const registerUserDB = async (userData) => {
  const user = new UserModel(userData);
  await user.hashPassword();
  await user.save();

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });

  const newUser = await UserModel.findByIdAndUpdate(
    user._id,
    { token },
    { new: true }
  );

  return newUser;
};

export const loginUserDB = async (userId) => {
  const payload = {
    id: userId,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });

  const newUser = await UserModel.findByIdAndUpdate(
    userId,
    { token },
    { new: true }
  );

  return newUser;
};

export const logoutUserDB = async (userId, token) => {
  const user = await UserModel.findByIdAndUpdate(userId, token);
  return user;
};

export const updateUserDB = async (userId, userData) => {
  if (userData.password) {
    userData.password = await bcryptjs.hash(userData.password, 10);
  }

  const updateUser = await UserModel.findByIdAndUpdate(userId, userData, {
    new: true,
  });

  updateUser.password = undefined;
  return updateUser;
};

export const updateThemeDB = async (idOwner, theme) => {
  const updateTheme = await UserModel.findOneAndUpdate(
    idOwner,
    { theme },
    { new: true }
  );
  return updateTheme;
};

export const saveAvatar = async (tmpUpload, _id) => {
  //   cloud_name: "dna5uh3r0",
  //     api_key: "116844259184423",
  //       api_secret: "aZa8sdqU44SyirU3ogCS0VKQLSY",

  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });
  const result = await cloudinary.uploader.upload(tmpUpload);
  return result.url;
};
