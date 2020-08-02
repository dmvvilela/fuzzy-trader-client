import {
  GET_CRIPTOCOIN,
  GET_CRIPTOCOIN_SUCCESS,
  GET_CRIPTOCOIN_ERROR,
  GET_STOCK,
  GET_STOCK_SUCCESS,
  GET_STOCK_ERROR,
} from "../actions/actionTypes";

const criptocoins = [];
const stocks = [];

const initialState = {
  isLoading: false,
  errorMessage: "",
  criptocoins,
  stocks,
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CRIPTOCOIN:
      return {
        ...state,
        isLoading: true,
      };

    case GET_CRIPTOCOIN_SUCCESS:
      const { code, value } = action;
      criptocoins[code] = value;

      return {
        ...state,
        isLoading: false,
        errorMessage: "",
        criptocoins,
      };

    case GET_CRIPTOCOIN_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.error,
      };

    case GET_STOCK:
      return {
        ...state,
        isLoading: true,
      };

    case GET_STOCK_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errorMessage: "",
        stocks: stocks.push(action.stock),
      };

    case GET_STOCK_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.error,
      };
    default:
      return state;
  }
};

export default dashboardReducer;
