import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const { MAILTRAP_USER, MAILTRAP_PASS } = process.env;

const nodemailerConfig = {
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: MAILTRAP_USER,
    pass: MAILTRAP_PASS,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

export const sendEmail = async (data) => {
  const email = { ...data, from: MAILTRAP_USER };
  await transport.sendMail(email);
  return true;
};
