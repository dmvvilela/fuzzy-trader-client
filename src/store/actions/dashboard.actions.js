import {
  GET_CRIPTOCOIN,
  GET_CRIPTOCOIN_SUCCESS,
  GET_CRIPTOCOIN_ERROR,
  GET_STOCK,
  GET_STOCK_SUCCESS,
  GET_STOCK_ERROR,
} from "./actionTypes";
import { fetchCriptocoin } from "../../services/cripto.service";
import { fetchStock } from "../../services/stocks.service";

export const getCriptocoinSuccess = (object) => ({
  type: GET_CRIPTOCOIN_SUCCESS,
  object,
});

export const getCriptocoinError = (status, error) => ({
  type: GET_CRIPTOCOIN_ERROR,
  status,
  error,
});

export const getCriptocoin = (coin) => async (dispatch) => {
  dispatch({
    type: GET_CRIPTOCOIN,
    coin,
  });

  try {
    const resp = await fetchCriptocoin(coin);

    const code = resp["Meta Data"]["2. Digital Currency Code"];
    // console.log(code);

    const name = resp["Meta Data"]["3. Digital Currency Name"];
    // console.log(name);

    const value = Object.values(
      Object.values(resp["Time Series (Digital Currency Daily)"])[0]
    )[0];
    // console.log(value);

    dispatch(getCriptocoinSuccess({ code, name, value }));
  } catch (err) {
    dispatch(getCriptocoinError(err));
  }
};

export const getStockSuccess = (object) => ({
  type: GET_STOCK_SUCCESS,
  object,
});

export const getStockError = (status, error) => ({
  type: GET_STOCK_ERROR,
  status,
  error,
});

export const getStock = (stock) => async (dispatch) => {
  dispatch({
    type: GET_STOCK,
    stock,
  });

  try {
    const resp = await fetchStock(stock);

    const symbol = resp.data.data[0]["symbol"];
    // console.log(symbol);

    const value = resp.data.data[0]["open"];
    // console.log(value);

    dispatch(getStockSuccess({ symbol, value }));
  } catch (err) {
    dispatch(getStockError(err));
  }
};
