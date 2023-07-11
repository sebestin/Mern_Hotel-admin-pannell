import {
  CREATE_SNACKS_REQUEST,
  CREATE_SNACKS_SUCCESS,
  CREATE_SNACKS_FAIL,
  CREATE_SNACKS_RESET,
  GET_ALL_SNACKS_REQUEST,
  GET_ALL_SNACKS_SUCCESS,
  GET_ALL_SNACKS_FAIL,
  CLEAR_ERRORS,
  DELETE_SNACK_REQUEST,
  DELETE_SNACK_SUCCESS,
  DELETE_SNACK_FAIL,
  DELETE_SNACK_RESET,
  SINGLE_SNACK_REQUEST,
  SINGLE_SNACK_SUCCESS,
  SINGLE_SNACK_FAIL,
  // UPDATE_SNACK_REQUEST,
  // UPDATE_SNACK_SUCCESS,
  // UPDATE_SNACK_FAIL,
  // UPDATE_SNACK_RESET,
} from '../../constants/Dish/SnackConstants';

export const createSnacksReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case CREATE_SNACKS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_SNACKS_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product,
      };
    case CREATE_SNACKS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_SNACKS_RESET:
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

export const getAllSnackReducer = (state = { dish: [] }, action) => {
  switch (action.type) {
    case GET_ALL_SNACKS_REQUEST:
      return {
        loading: true,
        dish: [],
      };

    case GET_ALL_SNACKS_SUCCESS:
      return {
        loading: false,
        dish: action.payload,
      };

    case GET_ALL_SNACKS_FAIL:
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
export const getSingleSnackReducer = (state = { snack: {} }, action) => {
  switch (action.type) {
    case SINGLE_SNACK_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case SINGLE_SNACK_SUCCESS:
      return {
        loading: false,
        snack: action.payload,
      };
    case SINGLE_SNACK_FAIL:
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
// export const updateSnackReducer = (state = {}, action) => {
//   switch (action.type) {
//     case UPDATE_SNACK_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };

//     case UPDATE_SNACK_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         isUpdated: action.payload,
//       };

//     case UPDATE_SNACK_FAIL:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };

//     case UPDATE_SNACK_RESET:
//       return {
//         ...state,
//         isUpdated: false,
//       };
//     case CLEAR_ERRORS:
//       return {
//         ...state,
//         error: null,
//       };
//     default:
//       return state;
//   }
// };
export const deleteSnackReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_SNACK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_SNACK_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_SNACK_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_SNACK_RESET:
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
