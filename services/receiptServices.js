export const validateAppleReceipt = async (receiptData) => {
  const endpoint = "https://buy.itunes.apple.com/verifyReceipt";
  const response = await axios.post(endpoint, {
    "receipt-data": receiptData,
    password: "мій-спільний-секрет-зios",
  });

  if (response.data.status === 0) {
    return { isValid: true, data: response.data };
  } else {
    return { isValid: false, data: response.data };
  }
};
