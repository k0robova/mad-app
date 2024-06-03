import { QuotesModel } from "../models/quotesModel.js";

export const fetchQuotesDB = () => QuotesModel.find();

export const addQuotesBD = async (data) => {
  const newQuote = await QuotesModel.create({ ...data });

  return newQuote;
};
