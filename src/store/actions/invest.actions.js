import {
  SET_ASSET,
  SET_ASSET_SUCCESS,
  SET_ASSET_ERROR,
  UPDATE_ASSET,
  UPDATE_ASSET_SUCCESS,
  UPDATE_ASSET_ERROR,
} from "./actionTypes";

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
      process.env.REACT_APP_API_URL + "/assets/add",
      asset
    );

    dispatch(setAssetSuccess(resp.data));
  } catch (err) {
    console.log(err);
    dispatch(setAssetError(err));
  }
};

export const updateAssetSuccess = (asset) => ({
  type: UPDATE_ASSET_SUCCESS,
  asset,
});

export const updateAssetError = (status, error) => ({
  type: UPDATE_ASSET_ERROR,
  status,
  error,
});

export const updateAsset = (asset, id) => async (dispatch) => {
  dispatch({
    type: UPDATE_ASSET,
    asset,
    id,
  });

  try {
    const resp = await axios.post(
      process.env.REACT_APP_API_URL + "/assets/update/" + id,
      asset
    );

    dispatch(updateAssetSuccess(resp.data));
  } catch (err) {
    console.log(err);
    dispatch(updateAssetError(err));
  }
};
