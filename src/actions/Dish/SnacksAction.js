import axios from 'axios';
import {
  CREATE_SNACKS_REQUEST,
  CREATE_SNACKS_SUCCESS,
  CREATE_SNACKS_FAIL,
  GET_ALL_SNACKS_REQUEST,
  GET_ALL_SNACKS_SUCCESS,
  GET_ALL_SNACKS_FAIL,
  DELETE_SNACK_REQUEST,
  DELETE_SNACK_SUCCESS,
  SINGLE_SNACK_REQUEST,
  SINGLE_SNACK_SUCCESS,
  SINGLE_SNACK_FAIL,
  UPDATE_SNACK_REQUEST,
  UPDATE_SNACK_SUCCESS,
  UPDATE_SNACK_FAIL,
  CLEAR_ERRORS,
  DELETE_SNACK_FAIL,
} from '../../constants/Dish/SnackConstants';

// Create Snacks
export const createSnacksAction = (snackData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SNACKS_REQUEST });

    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await axios.post(`/api/v1/snacks`, snackData, config);

    dispatch({
      type: CREATE_SNACKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_SNACKS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Get all snacks
export const getAllSnacks = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_SNACKS_REQUEST });
    // http://localhost:4000/api/v1/snacks
    const { data } = await axios.get('/api/v1/snacks');

    dispatch({
      type: GET_ALL_SNACKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_SNACKS_FAIL,
      payload: error,
    });
  }
};

// Delete Snack
export const deleteSnack = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SNACK_REQUEST });
    // http://localhost:4000/api/v1/snack
    const { data } = await axios.delete(`/api/v1/snack/${id}`);

    dispatch({
      type: DELETE_SNACK_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_SNACK_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get single snack details
export const getSingleSnack = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_SNACK_REQUEST });
    const { data } = await axios.get(`/api/v1/snack/${id}`);

    dispatch({ type: SINGLE_SNACK_SUCCESS, payload: data.snack });
  } catch (error) {
    dispatch({
      type: SINGLE_SNACK_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Snack
export const updateSnack = (id, snackData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SNACK_REQUEST });
    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await axios.put(`/api/v1/snack/${id}`, snackData, config);

    dispatch({
      type: UPDATE_SNACK_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_SNACK_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
