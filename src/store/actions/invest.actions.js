import { SET_ASSET, SET_ASSET_SUCCESS, SET_ASSET_ERROR } from "./actionTypes";

import axios from "axios";

export const setAssetSuccess = (asset) => ({
  type: SET_ASSET_SUCCESS,
  asset,
});

export const setAssetError = (status, error) => ({
  type: SET_ASSET_ERROR,
  status,
  error,
});

export const setAsset = (asset) => async (dispatch) => {
  dispatch({
    type: SET_ASSET,
    asset,
  });

  try {
    const resp = await axios.post(
      process.env.REACT_APP_API_URL + "/assets/add"
    );

    dispatch(setAssetSuccess(resp));
  } catch (err) {
    console.log(err);
    dispatch(setAssetError(err));
  }
};
