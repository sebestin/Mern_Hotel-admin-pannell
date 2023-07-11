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
  DELETE_TABLE_RESET,
  SINGLE_TABLE_FAIL,
  SINGLE_TABLE_SUCCESS,
  SINGLE_TABLE_REQUEST,
  UPDATE_TABLE_REQUEST,
  UPDATE_TABLE_SUCCESS,
  UPDATE_TABLE_FAIL,
  CREATE_TABLE_RESET,
  UPDATE_TABLE_RESET,
} from '../../constants/Dish/TableConstants';
export const createTableReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_TABLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_TABLE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
      };
    case CREATE_TABLE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CREATE_TABLE_RESET:
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

export const getAllTableReducer = (state = { table: [] }, action) => {
  switch (action.type) {
    case ALL_TABLE_REQUEST:
      return {
        loading: true,
        table: [],
      };
    case ALL_TABLE_SUCCESS:
      return {
        loading: false,
        table: action.payload,
      };
    case ALL_TABLE_FAIL:
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

export const deleteTableReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TABLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_TABLE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_TABLE_RESET:
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
export const singleTableReducer = (state = { table: {} }, action) => {
  switch (action.type) {
    case SINGLE_TABLE_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case SINGLE_TABLE_SUCCESS:
      return {
        loading: false,
        table: action.payload,
      };
    case SINGLE_TABLE_FAIL:
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

export const updateTableReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TABLE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_TABLE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_TABLE_RESET:
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
