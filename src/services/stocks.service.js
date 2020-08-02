import axios from "axios";

export const fetchStock = async (stock) => {
  const key = process.env.REACT_APP_MARKET_STACK_API_KEY;
  let data;

  try {
    data = await axios.get(
      `http://api.marketstack.com/v1/eod?access_key=${key}&symbols=${stock}`
    );
  } catch (e) {
    console.log(e);
  }

  return data;
};
