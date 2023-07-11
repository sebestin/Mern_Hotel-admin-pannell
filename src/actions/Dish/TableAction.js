import axios from 'axios';

import {
  CREATE_TABLE_REQUEST,
  CREATE_TABLE_SUCCESS,
  CREATE_TABLE_FAIL,
  CLEAR_ERRORS,
  ALL_TABLE_REQUEST,
  ALL_TABLE_SUCCESS,
  ALL_TABLE_FAIL,
  DELETE_TABLE_REQUEST,
  DELETE_TABLE_SUCCESS,
  DELETE_TABLE_FAIL,
  SINGLE_TABLE_FAIL,
  SINGLE_TABLE_SUCCESS,
  SINGLE_TABLE_REQUEST,
  UPDATE_TABLE_REQUEST,
  UPDATE_TABLE_SUCCESS,
  UPDATE_TABLE_FAIL,
} from '../../constants/Dish/TableConstants';

export const createTable = (tableData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_TABLE_REQUEST });
    const config = { header: { 'Content-Type': 'application/json' } };
    const { data } = await axios.post('/api/v1/table', tableData, config);
    dispatch({ type: CREATE_TABLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_TABLE_FAIL, payload: error.response.data.message });
  }
};

export const getAllTables = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_TABLE_REQUEST });
    const { data } = await axios.get(`/api/v1/table`);
    dispatch({ type: ALL_TABLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_TABLE_FAIL, payload: error.response.data.message });
  }
};

export const deleteTable = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TABLE_REQUEST });
    const { data } = await axios.delete(`/api/v1/table/${id}`);
    dispatch({ type: DELETE_TABLE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_TABLE_FAIL, payload: error.response.data.message });
  }
};

export const getSingleTable = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_TABLE_REQUEST });
    const { data } = await axios.get(`/api/v1/table/${id}`);
    console.log('Single Data-----11111 ', data);
    dispatch({ type: SINGLE_TABLE_SUCCESS, payload: data.table });
  } catch (error) {
    dispatch({
      type: SINGLE_TABLE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateTable = (id, tableDish) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TABLE_REQUEST });
    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await axios.put(`/api/v1/table/${id}`, tableDish, config);
    dispatch({
      type: UPDATE_TABLE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_TABLE_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
