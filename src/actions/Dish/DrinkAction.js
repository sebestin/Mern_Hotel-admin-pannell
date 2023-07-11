import axios from 'axios';

import {
  CREATE_DRINK_REQUEST,
  CREATE_DRINK_SUCCESS,
  CREATE_DRINK_FAIL,
  CLEAR_ERRORS,
  ALL_DRINK_REQUEST,
  ALL_DRINK_SUCCESS,
  ALL_DRINK_FAIL,
  DELETE_DRINK_REQUEST,
  DELETE_DRINK_SUCCESS,
  DELETE_DRINK_FAIL,
  UPDATE_DRINK_REQUEST,
  UPDATE_DRINK_SUCCESS,
  UPDATE_DRINK_RESET,
  UPDATE_DRINK_FAIL,
  SINGLE_DRINK_REQUEST,
  SINGLE_DRINK_SUCCESS,
  SINGLE_DRINK_RESET,
  SINGLE_DRINK_FAIL,
} from '../../constants/Dish/DrinkConstants';

export const createDrink = (drinkData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_DRINK_REQUEST });
    const config = { header: { 'Content-Type': 'application/json' } };
    const { data } = await axios.post('/api/v1/drink', drinkData, config);
    dispatch({ type: CREATE_DRINK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_DRINK_FAIL, payload: error.response.data.message });
  }
};

export const getAllDrink = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_DRINK_REQUEST });
    const { data } = await axios.get(`/api/v1/drink`);
    dispatch({ type: ALL_DRINK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_DRINK_FAIL });
  }
};

export const getSingleDrink = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_DRINK_REQUEST });
    const { data } = await axios.get(`/api/v1/drink/${id}`);
    dispatch({ type: SINGLE_DRINK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SINGLE_DRINK_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Product
export const updateDrink = (id, drinkDish) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_DRINK_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    // http://localhost:4000/api/v1/indian-dish

    const { data } = await axios.put(`/api/v1/drink/${id}`, drinkDish, config);

    dispatch({
      type: UPDATE_DRINK_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_DRINK_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteDrink = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_DRINK_REQUEST });
    const { data } = await axios.delete(`/api/v1/drink/${id}`);
    dispatch({ type: DELETE_DRINK_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_DRINK_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
