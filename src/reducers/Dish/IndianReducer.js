import {
  NEW_INDIAN_DISH_REQUEST,
  NEW_INDIAN_DISH_SUCCESS,
  NEW_INDIAN_DISH_FAIL,
  CLEAR_ERRORS,
  NEW_INDIAN_DISH_RESET,
  INDIAN_DISH_REQUEST,
  INDIAN_DISH_SUCCESS,
  INDIAN_DISH_FAIL,
  DELETE_INDIAN_REQUEST,
  DELETE_INDIAN_SUCCESS,
  DELETE_INDIAN_FAIL,
  DELETE_INDIAN_RESET,
  UPDATE_INDIAN_REQUEST,
  UPDATE_INDIAN_SUCCESS,
  UPDATE_INDIAN_FAIL,
  UPDATE_INDIAN_RESET,
  INDIAN_SINGLE_REQUEST,
  INDIAN_SINGLE_SUCCESS,
  INDIAN_SINGLE_FAIL,
} from '../../constants/Dish/IndianConstants';

import {
  UPDATE_DRINK_REQUEST,
  UPDATE_DRINK_SUCCESS,
  UPDATE_DRINK_FAIL,
  UPDATE_DRINK_RESET,
} from '../../constants/Dish/DrinkConstants';
import {
  UPDATE_PIZZA_FAIL,
  UPDATE_PIZZA_REQUEST,
  UPDATE_PIZZA_RESET,
  UPDATE_PIZZA_SUCCESS,
} from '../../constants/Dish/PizzaConstants';
import {
  UPDATE_SNACK_FAIL,
  UPDATE_SNACK_REQUEST,
  UPDATE_SNACK_RESET,
  UPDATE_SNACK_SUCCESS,
} from '../../constants/Dish/SnackConstants';
import {
  UPDATE_CHINESE_FAIL,
  UPDATE_CHINESE_REQUEST,
  UPDATE_CHINESE_RESET,
  UPDATE_CHINESE_SUCCESS,
} from '../../constants/Dish/ChineseConstants';
export const createIndianDishReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_INDIAN_DISH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_INDIAN_DISH_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        // product: action.payload.product,
      };
    case NEW_INDIAN_DISH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_INDIAN_DISH_RESET:
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

export const getIndianReducer = (state = { dish: [] }, action) => {
  switch (action.type) {
    case INDIAN_DISH_REQUEST:
      return {
        loading: true,
        dish: [],
      };

    case INDIAN_DISH_SUCCESS:
      return {
        loading: false,
        dish: action.payload,
      };

    case INDIAN_DISH_FAIL:
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

export const updateIndianDishReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_INDIAN_REQUEST:
    case UPDATE_DRINK_REQUEST:
    case UPDATE_PIZZA_REQUEST:
    case UPDATE_SNACK_REQUEST:
    case UPDATE_CHINESE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_INDIAN_SUCCESS:
    case UPDATE_DRINK_SUCCESS:
    case UPDATE_PIZZA_SUCCESS:
    case UPDATE_SNACK_SUCCESS:
    case UPDATE_CHINESE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_INDIAN_FAIL:
    case UPDATE_DRINK_FAIL:
    case UPDATE_PIZZA_FAIL:
    case UPDATE_SNACK_FAIL:
    case UPDATE_CHINESE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_INDIAN_RESET:
    case UPDATE_DRINK_RESET:
    case UPDATE_PIZZA_RESET:
    case UPDATE_SNACK_RESET:
    case UPDATE_CHINESE_RESET:
      return {
        ...state,
        isUpdated: false,
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

export const getSingleIndianDishReducer = (state = { indian: {} }, action) => {
  switch (action.type) {
    case INDIAN_SINGLE_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case INDIAN_SINGLE_SUCCESS:
      return {
        loading: false,
        indian: action.payload,
      };
    case INDIAN_SINGLE_FAIL:
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

export const deleteIndianReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_INDIAN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_INDIAN_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_INDIAN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_INDIAN_RESET:
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
