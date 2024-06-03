import { ctrlWrapper } from "../helpers/ctrlWrapper.js";
import * as quoteSetvices from "../services/quoteServices.js";

export const getQuotes = ctrlWrapper(async (req, res) => {
  const quotes = await quoteSetvices.fetchQuotesDB();
  res.json(quotes);
});

export const createQuotes = ctrlWrapper(async (req, res) => {
  const newQuote = await quoteSetvices.addQuotesBD(req.body);

  res.status(200).json(newQuote);
});
