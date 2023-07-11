import axios from 'axios';
import {
  CREATE_PIZZA_REQUEST,
  CREATE_PIZZA_SUCCESS,
  CREATE_PIZZA_FAIL,
  CLEAR_ERRORS,
  ALL_PIZZA_REQUEST,
  ALL_PIZZA_SUCCESS,
  ALL_PIZZA_FAIL,
  DELETE_PIZZA_REQUEST,
  DELETE_PIZZA_SUCCESS,
  DELETE_PIZZA_FAIL,
  SINGLE_PIZZA_FAIL,
  SINGLE_PIZZA_SUCCESS,
  SINGLE_PIZZA_REQUEST,
  UPDATE_PIZZA_REQUEST,
  UPDATE_PIZZA_SUCCESS,
  UPDATE_PIZZA_FAIL,
} from '../../constants/Dish/PizzaConstants';
export const createPizza = (pizzaData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PIZZA_REQUEST });
    const config = { header: { 'Content-Type': 'application/json' } };
    const { data } = await axios.post('/api/v1/pizza', pizzaData, config);
    dispatch({ type: CREATE_PIZZA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_PIZZA_FAIL, payload: error.response.data.message });
  }
};

export const getAllPizza = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PIZZA_REQUEST });
    const { data } = await axios.get(`/api/v1/pizza`);
    dispatch({ type: ALL_PIZZA_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ALL_PIZZA_FAIL });
  }
};
export const getSinglePizza = (id) => async (dispatch) => {
  try {
    dispatch({ type: SINGLE_PIZZA_REQUEST });
    const { data } = await axios.get(`/api/v1/pizza/${id}`);
    dispatch({ type: SINGLE_PIZZA_SUCCESS, payload: data.pizza });
  } catch (error) {
    dispatch({
      type: SINGLE_PIZZA_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const updateDrink = (id, pizzaDish) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PIZZA_REQUEST });
    const config = { headers: { 'Content-Type': 'application/json' } };
    const { data } = await axios.put(`/api/v1/pizza/${id}`, pizzaDish, config);
    dispatch({
      type: UPDATE_PIZZA_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PIZZA_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const deletePizza = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PIZZA_REQUEST });
    const { data } = await axios.delete(`/api/v1/pizza/${id}`);
    dispatch({ type: DELETE_PIZZA_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_PIZZA_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
