import {
  SEARCH_MARVEL_CHARACTER,
  SEARCH_MARVEL_CHARACTER_SUCCESS,
  SEARCH_MARVEL_CHARACTER_ERROR,
} from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  errorMessage: "",
  marvelCharacters: [],
};

const investReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_MARVEL_CHARACTER:
      return {
        ...state,
        isLoading: true,
      };

    case SEARCH_MARVEL_CHARACTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        errorMessage: "",
        marvelCharacters: action.character,
      };

    case SEARCH_MARVEL_CHARACTER_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.error,
      };

    default:
      return state;
  }
};

export default investReducer;
