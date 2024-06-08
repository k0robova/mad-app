import { HttpError } from "../helpers/HttpError.js";
import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import { ReceiptModel } from "../models/receiptModel.js";
import * as receiptServices from "../services/receiptServices.js";

export const validateReceipt = ctrlWrapper(async (req, res) => {
  const { receiptData, platform } = req.body;
  let validationResponse;
  if (!receiptData || !platform) {
    throw HttpError(400, "Receipt data and platform are required");
  }

  if (platform === "ios") {
    validationResponse = receiptServices.validateAppleReceipt(receiptData);
  } else if (platform === "android") {
    // validateReceipt;
    // потрібна валідація для android
  } else {
    throw HttpError(400, "Invalid platform");
  }

  const receipt = new ReceiptModel({
    receiptData,
    platform,
    isValid: validateReceipt.isValid,
  });

  await receipt.save();

  return res.status(200).json(validateReceipt);
});
