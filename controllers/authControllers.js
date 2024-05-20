import dotenv from "dotenv";
import { HttpError } from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { sendEmail } from "../helpers/sendEmail.js";
import * as authServices from "../services/authServices.js";

dotenv.config();
const { BASE_URL } = process.env;
export const registerUser = ctrlWrapper(async (req, res) => {
  const { name, email } = req.body;
  const ifUserExists = await authServices.emailUnique(email);
  let avatarURL = "";

  if (ifUserExists) {
    throw HttpError(409, "User with such email already in use");
  }

  if (req.file) {
    const { path: tmpUpload } = req.file;
    avatarURL = await authServices.saveAvatar(tmpUpload);
  }

  const newUser = await authServices.registerUserDB({ ...req.body, avatarURL });

  res.status(201).json({
    token: newUser.token,
    user: {
      name,
      email,
      avatarURL,
    },
  });
});

export const loginUser = ctrlWrapper(async (req, res) => {
  const { email, password } = req.body;

  const user = await authServices.emailUnique(email);

  if (!user) {
    throw HttpError(409, "User with this email not registrated");
  }

  const isValidPassword = await user.comparePassword(password);

  if (!isValidPassword) {
    throw HttpError(400, "Invalid email or password");
  }

  const newUser = await authServices.loginUserDB(user._id);

  res.json({
    token: newUser.token,
    user: {
      name: newUser.name,
      email,
      avatarURL: newUser.avatarURL,
    },
  });
});

export const getCurrentUser = ctrlWrapper(async (req, res) => {
  const { name, email } = req.user;
  res.json({ name, email });
});

export const logoutUser = ctrlWrapper(async (req, res) => {
  await authServices.logoutUserDB(req.user._id);

  res.json({
    message: "Logout was successful",
  });
});

// додати перевірки на дані які оновлюються
export const updateUser = ctrlWrapper(async (req, res) => {
  const { _id } = req.user;

  let avatarURL;

  if (req.file) {
    const { path: tmpUpload } = req.file;
    avatarURL = await authServices.saveAvatar(tmpUpload, _id);
  }
  // Перевірка наявності даних користувача в запиті
  if (req.body) {
    const { name, email } = req.body;
    const updatedUser = await authServices.updateUserDB(_id, {
      name,
      email,
      avatarURL,
    });
    res.status(200).json(updatedUser);
  }
});

export const updateUserTheme = ctrlWrapper(async (req, res) => {
  const { _id: idOwner } = req.user;
  const { theme } = req.body;

  const updatedTheme = await authServices.updateThemeDB(idOwner, theme);

  res.status(200).json({
    email: updatedTheme.email,
    theme: updatedTheme.theme,
  });
});

export const verifyEmail = ctrlWrapper(async (req, res) => {
  const { verificationToken } = req.params;

  await authServices.verifyEmailDB(verificationToken);

  res.status(200).json({ message: "Verification successful" });
});

export const resendVerifyEmail = ctrlWrapper(async (req, res) => {
  const { email } = req.user;

  await authServices.resendVerifyEmailDB(email);

  res.status(200).json({ message: "Verification email sent" });
});

export const resetPassword = ctrlWrapper(async (req, res) => {
  const { email } = req.body;

  await authServices.resetPasswordDB(email);

  res.status(200).json({ message: "Password has been reset " });
});

export const updatePassword = ctrlWrapper(async (req, res) => {
  const { password, newPassword } = req.body;
  const { email, _id } = req.user;

  const user = await authServices.emailUnique(email);

  const isValidPassword = await user.comparePassword(password);

  if (!isValidPassword) {
    throw HttpError(400, "Invalid  password");
  }

  await authServices.updatePasswordDB(_id, newPassword);

  res.status(200).json({ message: "Password has been updated" });
});
// ======
export const forgotPassword = ctrlWrapper(async (req, res) => {
  // const { newPassword } = req.body;
  const { email } = req.body;

  const user = await authServices.emailUnique(email);

  if (!user) return res.status(200).json({ message: "User not exist" });

  const otp = user.createPasswordResetToken();
  await user.save();

  // console.log("===========SEND TO EMAIL=========================");
  // console.log({ otp });
  // console.log("====================================");

  const verifyEmail = {
    to: user,
    subject: "Your one time password",
    html: `<p>${otp}</p>
     <p>Якщо ви не реєструвалися на нашому сайті, проігноруйте це повідомлення.</p>
      <p>Дякуємо за реєстрацію!</p>
       <p>З повагою, команда додатку Опора</p>`,
  };

  await sendEmail(verifyEmail);

  user.passwordResetToken = undefined;
  user.passwordResetTokenExp = undefined;

  res.status(200).json({ message: "Password reset sent by email" });
});

export const restorePassword = ctrlWrapper(async (req, res) => {
  await authServices.restorePasswordDB(
    req.params.otp,
    req.body.password,
    req.body.email
  );

  res.status(200).json({ message: "Password was successfully created" });
});

// ========

export const updateAvatar = ctrlWrapper(async (req, res) => {
  const { _id } = req.user;
  let avatarURL = "";

  if (req.file) {
    const { path: tmpUpload } = req.file;
    avatarURL = await authServices.saveAvatar(tmpUpload);
  }

  await authServices.updateAvatarDB(_id, avatarURL);

  res.status(200).json({ message: "Avatar has been updated" });
});

export const deleteUser = ctrlWrapper(async (req, res) => {
  await authServices.hideUserDB(req.params.id);

  res.status(204);
});
