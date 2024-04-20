import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { nanoid } from "nanoid";
import { UserModel } from "../models/userModel.js";
import { sendEmail } from "../helpers/sendEmail.js";

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

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "12h" });

  const newUser = await UserModel.findByIdAndUpdate(
    user._id,
    { token },
    { new: true }
  );

  const verifyEmail = {
    to: user.email,
    subject: "verify email",
    html: `<a target = "_black" href ='${BASE_URL}/users/verify/${verificationToken}'>Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

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

export const verifyEmailDB = async (token) => {
  const user = await UserModel.findOne({ verificationToken: token });

  if (!user) {
    throw HttpError(401, "User not found");
  }

  await UserModel.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });

  return true;
};

export const resendVerifyEmailDB = async (email) => {
  const user = await emailUnique(email);

  if (!user) {
    throw HttpError(401, "Email not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "verify email",
    html: `<a target = "_black" href ='${BASE_URL}/users/verify/${user.verificationToken}'>Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  return true;
};
