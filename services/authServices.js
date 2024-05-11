import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import * as fs from "fs/promises";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { nanoid } from "nanoid";
import { UserModel } from "../models/userModel.js";
import { sendEmail } from "../helpers/sendEmail.js";
import { HttpError } from "../helpers/HttpError.js";

dotenv.config();
const {
  BASE_URL,
  SECRET_KEY,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} = process.env;
export const emailUnique = async (email) => await UserModel.findOne({ email });

export const registerUserDB = async (userData) => {
  const verificationToken = nanoid();

  const user = new UserModel({ ...userData, verificationToken });
  await user.hashPassword();
  await user.save();

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "7d" });

  const newUser = await UserModel.findByIdAndUpdate(
    user._id,
    { token },
    { new: true }
  );

  const verifyEmail = {
    to: user.email,
    subject: "Verify your email",
    html: `<a target = "_black" href ='${BASE_URL}/users/verify/${verificationToken}'>Click here to verify email</a>`,
  };

  await sendEmail(verifyEmail);

  return newUser;
};

export const loginUserDB = async (userId) => {
  const payload = {
    id: userId,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "7d" });

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

export const saveAvatar = async (tmpUpload) => {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });
  const result = await cloudinary.uploader.upload(tmpUpload);
  await fs.unlink(tmpUpload);
  return result.url;
};

export const verifyEmailDB = async (token) => {
  const user = await UserModel.findOne({ verificationToken: token });

  if (!user) {
    throw HttpError(401, "User not found");
  }

  await UserModel.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  return;
};

export const resendVerifyEmailDB = async (email) => {
  const user = await emailUnique(email);

  if (!user) {
    throw HttpError(401, "Email not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  // const verifyEmail = {
  //   to: email,
  //   subject: "Підтвердження електронної пошти",
  //   html: `
  //   <p>Ласкаво просимо до нашої спільноти!</p>
  //   <a target = "_black" href ='${BASE_URL}/users/verify/${user.verificationToken}'>Підтвердити зараз</a>
  //    <p>Якщо ви не реєструвалися на нашому сайті, проігноруйте це повідомлення.</p>
  //     <p>Дякуємо за реєстрацію!</p>
  //      <p>З повагою, команда додатку Опора</p>

  //   `,
  // };

  const verifyEmail = {
    to: email,
    subject: "Підтвердження електронної пошти",
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <p style="font-size: 18px; color: #333;">Ласкаво просимо до нашої спільноти!</p>
      <a style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px; margin-bottom: 20px;" href="${BASE_URL}/users/verify/${user.verificationToken}">Підтвердити зараз</a>
      <p style="font-size: 14px; color: #666;">Якщо ви не реєструвалися на нашому сайті, проігноруйте це повідомлення.</p>
      <p style="font-size: 14px; color: #666;">Дякуємо за реєстрацію!</p>
      <p style="font-size: 14px; color: #666;">З повагою, команда додатку Опора</p>
    </div>
  `,
  };

  await sendEmail(verifyEmail);

  return;
};

export const resetPasswordDB = async (email) => {};

export const updatePasswordDB = async (_id, password) => {
  const newPassword = await bcryptjs.hash(password, 10);

  await UserModel.findByIdAndUpdate(
    _id,
    { password: newPassword },
    { new: true }
  );

  return;
};
export const updateAvatarDB = async (_id, avatarURL) => {
  await UserModel.findByIdAndUpdate(_id, { avatarURL }, { new: true });

  return;
};
