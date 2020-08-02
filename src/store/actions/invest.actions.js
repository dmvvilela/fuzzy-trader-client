import {
  SEARCH_MARVEL_CHARACTER,
  SEARCH_MARVEL_CHARACTER_SUCCESS,
  SEARCH_MARVEL_CHARACTER_ERROR,
} from './actionTypes';
import { searchCharacter } from '../../services/marvel.service';

export const searchMarvelCharacterSuccess = (character) => ({
  type: SEARCH_MARVEL_CHARACTER_SUCCESS,
  character,
});

export const searchMarvelCharacterError = (status, error) => ({
  type: SEARCH_MARVEL_CHARACTER_ERROR,
  status,
  error,
});

export const searchMarvelCharacter = (query) => async (dispatch) => {
  dispatch({
    type: SEARCH_MARVEL_CHARACTER,
    query,
  });

  try {
    const resp = await searchCharacter(query);

    dispatch(searchMarvelCharacterSuccess(resp));
  } catch (err) {
    console.log(err);
    dispatch(searchMarvelCharacterError(err));
  }
};
