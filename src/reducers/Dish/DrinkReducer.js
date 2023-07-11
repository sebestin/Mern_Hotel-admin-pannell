import {
  CREATE_DRINK_REQUEST,
  CREATE_DRINK_SUCCESS,
  CREATE_DRINK_FAIL,
  CREATE_DRINK_RESET,
  ALL_DRINK_REQUEST,
  ALL_DRINK_SUCCESS,
  ALL_DRINK_FAIL,
  CLEAR_ERRORS,
  DELETE_DRINK_REQUEST,
  DELETE_DRINK_SUCCESS,
  DELETE_DRINK_RESET,
  DELETE_DRINK_FAIL,
  SINGLE_DRINK_REQUEST,
  SINGLE_DRINK_SUCCESS,
  SINGLE_DRINK_FAIL,
} from '../../constants/Dish/DrinkConstants';

export const createDrinkReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_DRINK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_DRINK_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
      };
    case CREATE_DRINK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_DRINK_RESET:
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

export const getAllDrinksReducer = (state = { drinks: [] }, action) => {
  switch (action.type) {
    case ALL_DRINK_REQUEST:
      return {
        loading: true,
        drinks: [],
      };
    case ALL_DRINK_SUCCESS:
      return {
        loading: false,
        drinks: action.payload,
      };
    case ALL_DRINK_FAIL:
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

export const getSingleDrinkReducer = (state = { drink: {} }, action) => {
  switch (action.type) {
    case SINGLE_DRINK_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case SINGLE_DRINK_SUCCESS:
      return {
        loading: false,
        drink: action.payload.drink,
      };
    case SINGLE_DRINK_FAIL:
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

export const deleteDrinkReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_DRINK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_DRINK_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_DRINK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_DRINK_RESET:
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
