import {
  CREATE_PIZZA_REQUEST,
  CREATE_PIZZA_SUCCESS,
  CREATE_PIZZA_FAIL,
  CREATE_PIZZA_RESET,
  CLEAR_ERRORS,
  ALL_PIZZA_REQUEST,
  ALL_PIZZA_SUCCESS,
  ALL_PIZZA_FAIL,
  DELETE_PIZZA_REQUEST,
  DELETE_PIZZA_SUCCESS,
  DELETE_PIZZA_FAIL,
  DELETE_PIZZA_RESET,
  SINGLE_PIZZA_REQUEST,
  SINGLE_PIZZA_SUCCESS,
  SINGLE_PIZZA_FAIL,
} from '../../constants/Dish/PizzaConstants';
export const createPizzaReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PIZZA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_PIZZA_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
      };
    case CREATE_PIZZA_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_PIZZA_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const getAllPizzaReducer = (state = { pizza: [] }, action) => {
  switch (action.type) {
    case ALL_PIZZA_REQUEST:
      return {
        loading: true,
        pizza: [],
      };
    case ALL_PIZZA_SUCCESS:
      return {
        loading: false,
        pizza: action.payload,
      };
    case ALL_PIZZA_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
export const singlePizzaReducer = (state = { pizza: {} }, action) => {
  switch (action.type) {
    case SINGLE_PIZZA_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case SINGLE_PIZZA_SUCCESS:
      return {
        loading: false,
        pizza: action.payload,
      };
    case SINGLE_PIZZA_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
export const deletePizzaReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PIZZA_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_PIZZA_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_PIZZA_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_PIZZA_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
