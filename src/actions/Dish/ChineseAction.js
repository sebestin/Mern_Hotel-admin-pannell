import axios from 'axios';
import {
  CREATE_CHINESES_REQUEST,
  CREATE_CHINESES_SUCCESS,
  CREATE_CHINESES_FAIL,
  CLEAR_ERRORS,
  GET_ALL_CHINESE_REQUEST,
  GET_ALL_CHINESE_SUCCESS,
  GET_ALL_CHINESE_FAIL,
  DELETE_CHINESE_SUCCESS,
  DELETE_CHINESE_REQUEST,
  DELETE_CHINESE_FAIL,
  GET_CHINESE_DETAIL_REQUEST,
  GET_CHINESE_DETAIL_SUCCESS,
  GET_CHINESE_DETAIL_FAIL,
  UPDATE_CHINESE_REQUEST,
  UPDATE_CHINESE_SUCCESS,
  UPDATE_CHINESE_FAIL,
  UPDATE_CHINESE_RESET,
} from '../../constants/Dish/ChineseConstants';

// Create Chinese
export const createChinese = (chineseData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CHINESES_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    // http://localhost:4000/api/v1/indian-dish

    const { data } = await axios.post(`/api/v1/chinese`, chineseData, config);

    dispatch({
      type: CREATE_CHINESES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_CHINESES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAllChinese = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ALL_CHINESE_REQUEST });
    const { data } = await axios.get('/api/v1/chinese');

    dispatch({
      type: GET_ALL_CHINESE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_CHINESE_FAIL,
      payload: error,
    });
  }
};
// Delete Chinese
export const deleteChinese = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CHINESE_REQUEST });
    const { data } = await axios.delete(`/api/v1/chinese/${id}`);
    dispatch({
      type: DELETE_CHINESE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CHINESE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Chinese Details
export const getChineseDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_CHINESE_DETAIL_REQUEST });
    const { data } = await axios.get(`/api/v1/chinese/${id}`);
    console.log('Chinese---', data);
    dispatch({
      type: GET_CHINESE_DETAIL_SUCCESS,
      payload: data.chinese,
    });
  } catch (error) {
    dispatch({
      type: GET_CHINESE_DETAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Update Chinese
export const updateChinese = (id, chineseData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CHINESE_REQUEST });
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const { data } = await axios.put(
      `/api/v1/chinese/${id}`,
      chineseData,
      config
    );

    dispatch({
      type: UPDATE_CHINESE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CHINESE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
