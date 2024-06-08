import { Schema, model } from "mongoose";

const receiptSchema = new Schema(
  {
    receiptData: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      required: true,
      emum: ["ios", "android"],
    },
    isValid: {
      type: Boolean,
      required: true,
      default: false,
    },
    createdAt: {
      type: Data,
      default: Date.now,
    },
  },
  { versionKey: false, timestamps: true }
);

export const ReceiptModel = model("Receipt", receiptSchema);
