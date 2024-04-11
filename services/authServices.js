import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

const { SECRET_KEY } = process.env;
export const emailUnique = async (email) => await UserModel.findOne({ email });

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
