import {
  CREATE_CHINESES_REQUEST,
  CREATE_CHINESES_SUCCESS,
  CREATE_CHINESES_FAIL,
  CREATE_CHINESES_RESET,
  CLEAR_ERRORS,
  GET_ALL_CHINESE_REQUEST,
  GET_ALL_CHINESE_SUCCESS,
  GET_ALL_CHINESE_FAIL,
  DELETE_CHINESE_REQUEST,
  DELETE_CHINESE_SUCCESS,
  DELETE_CHINESE_RESET,
  DELETE_CHINESE_FAIL,
  GET_CHINESE_DETAIL_REQUEST,
  GET_CHINESE_DETAIL_SUCCESS,
  GET_CHINESE_DETAIL_FAIL,
} from '../../constants/Dish/ChineseConstants';
export const createChinesehReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CHINESES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_CHINESES_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
      };
    case CREATE_CHINESES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_CHINESES_RESET:
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

export const getAllChineseReducer = (state = { dish: [] }, action) => {
  switch (action.type) {
    case GET_ALL_CHINESE_REQUEST:
      return {
        loading: true,
        dish: [],
      };

    case GET_ALL_CHINESE_SUCCESS:
      return {
        loading: false,
        dish: action.payload,
      };

    case GET_ALL_CHINESE_FAIL:
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

export const getChineseDetailReducer = (state = { chinese: {} }, action) => {
  switch (action.type) {
    case GET_CHINESE_DETAIL_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case GET_CHINESE_DETAIL_SUCCESS:
      return {
        loading: false,
        chinese: action.payload,
      };
    case GET_CHINESE_DETAIL_FAIL:
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

export const deleteChineseReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CHINESE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_CHINESE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_CHINESE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_CHINESE_RESET:
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

// export const updateChineseReducer = (state = {}, action) => {
//   switch (action.type) {
//     case UPDATE_CHINESE_REQUEST:
//       return {
//         ...state,
//         loading: true,
//       };

//     case UPDATE_CHINESE_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         isUpdated: action.payload,
//       };

//     case UPDATE_CHINESE_FAIL:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };

//     case UPDATE_CHINESE_RESET:
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
