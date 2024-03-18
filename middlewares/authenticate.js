import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { HttpError } from "../helpers/HttpError.js";
import { UserModel } from "../models/userModel.js";

const { SECRET_KEY } = process.env;

export const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await UserModel.findById(id);

    if (!user || !user.token || user.token !== token) {
      // next(HttpError(401, "User not exist in DB"));
      next(HttpError(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch (error) {
    // next(HttpError(401, "Your token is not valid!!!"));
    next(HttpError(401, "Not authorized"));
  }
};
