import {
  SET_ASSET,
  SET_ASSET_SUCCESS,
  SET_ASSET_ERROR,
  UPDATE_ASSET,
  UPDATE_ASSET_SUCCESS,
  UPDATE_ASSET_ERROR,
} from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  errorMessage: "",
  successMessage: "",
  asset: null,
};

const investReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ASSET:
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
        successMessage: "",
      };

    case SET_ASSET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errorMessage: "",
        successMessage:
          "Investimento realizado com sucesso! Verifique no painel seus ativos.",
        asset: action.asset,
      };

    case SET_ASSET_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: "Ocorreu um erro ao realizar seu investimento.",
        successMessage: "",
      };

    case UPDATE_ASSET:
      return {
        ...state,
        isLoading: true,
        errorMessage: "",
        successMessage: "",
      };

    case UPDATE_ASSET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errorMessage: "",
        successMessage:
          "Investimento realizado com sucesso! Verifique no painel seus ativos.",
        asset: action.asset,
      };

    case UPDATE_ASSET_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: "Ocorreu um erro ao realizar seu investimento.",
        successMessage: "",
      };

    default:
      return state;
  }
};

export default investReducer;
