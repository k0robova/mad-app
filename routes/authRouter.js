import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { validateBody } from "../middlewares/validateBody.js";
import * as authControllers from "../controllers/authControllers.js";
import * as userSchema from "../schemas/userSchema.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userSchema.registerSchema),
  authControllers.registerUser
);
authRouter.post(
  "/login",
  validateBody(userSchema.loginSchema),
  authControllers.loginUser
);
authRouter.post("/logout", authenticate, authControllers.logoutUser);
authRouter.get("/current", authenticate, authControllers.getCurrentUser);
// authRouter.put(
//   "/update",
// );

export default authRouter;
