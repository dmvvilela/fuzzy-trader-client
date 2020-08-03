import {
  GET_INVESTED_ASSETS,
  GET_INVESTED_ASSETS_SUCCESS,
  GET_INVESTED_ASSETS_ERROR,
  GET_CRIPTOCOIN,
  GET_CRIPTOCOIN_SUCCESS,
  GET_CRIPTOCOIN_ERROR,
  GET_STOCK,
  GET_STOCK_SUCCESS,
  GET_STOCK_ERROR,
} from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  errorMessage: "",
  assets: [],
  criptocoins: {},
  stocks: {},
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INVESTED_ASSETS:
      return {
        ...state,
        isLoading: true,
      };

    case GET_INVESTED_ASSETS_SUCCESS:
      const assets = action.assets;

      return {
        ...state,
        isLoading: false,
        errorMessage: "",
        assets,
      };

    case GET_INVESTED_ASSETS_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.error,
      };

    case GET_CRIPTOCOIN:
      return {
        ...state,
        isLoading: true,
      };

    case GET_CRIPTOCOIN_SUCCESS:
      const { code } = action.object;
      const criptocoins = { ...state.criptocoins, [code]: action.object };

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
        errorMessage:
          "Ocorreu um erro ao carregar as criptomoedas (mostrando resultados em cache).",
      };

    case GET_STOCK:
      return {
        ...state,
        isLoading: true,
      };

    case GET_STOCK_SUCCESS:
      const { symbol } = action.object;
      const stocks = { ...state.stocks, [symbol]: action.object };

      return {
        ...state,
        isLoading: false,
        errorMessage: "",
        stocks,
      };

    case GET_STOCK_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage:
          "Ocorreu um erro ao carregar as ações (mostrando resultados em cache).",
      };

    default:
      return state;
  }
};

export default dashboardReducer;
