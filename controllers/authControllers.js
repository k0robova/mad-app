import { HttpError } from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import * as authServices from "../services/authServices.js";

export const registerUser = ctrlWrapper(async (req, res) => {
  const { name, email } = req.body;
  const ifUserExists = await authServices.emailUnique(email);
  let avatarURL = "";

  if (ifUserExists) {
    throw HttpError(409, "User with such email already in use");
  }

  const newUser = await authServices.registerUserDB(req.body);
  if (req.file) {
    const { path: tmpUpload } = req.file;
    avatarURL = await authServices.saveAvatar(tmpUpload, newUser._id);
  }

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
    const { name, email, password } = req.body;
    const updatedUser = await authServices.updateUserDB(_id, {
      name,
      email,
      password,
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

export const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  await authServices.verifyEmailDB(verificationToken);

  res.status(200).json({ message: "Verification successful" });
};

export const resendVerifyEmail = async (req, res) => {
  const { email } = req.user;

  await authServices.resendVerifyEmailDB(email);

  res.status(200).json({ message: "Verification email sent" });
};
