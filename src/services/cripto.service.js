const alpha = require("alphavantage")({
  key: process.env.REACT_APP_ALPHA_AVANTAGE_API_KEY_1,
});

export const fetchCriptocoin = async (stock) => {
  let data;

  try {
    data = await alpha.crypto.daily(stock, "usd");
  } catch (e) {
    console.log(e);
  }

  return data;
};
