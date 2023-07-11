import axios from 'axios';

import {
  NEW_INDIAN_DISH_REQUEST,
  NEW_INDIAN_DISH_SUCCESS,
  NEW_INDIAN_DISH_FAIL,
  CLEAR_ERRORS,
  // NEW_INDIAN_DISH_RESET,
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

// Create Product
export const createIndianDish = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_INDIAN_DISH_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    // http://localhost:4000/api/v1/indian-dish

    const { data } = await axios.post(
      `/api/v1/indian-dish`,
      productData,
      config
    );

    dispatch({
      type: NEW_INDIAN_DISH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_INDIAN_DISH_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getIndianDish = () => async (dispatch) => {
  try {
    dispatch({ type: INDIAN_DISH_REQUEST });

    // http://localhost:4000/api/v1/indian-dish

    const { data } = await axios.get('/api/v1/indian-dish');

    dispatch({
      type: INDIAN_DISH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INDIAN_DISH_FAIL,
      payload: error,
    });
  }
};

// Update Product
export const updateIndianDish = (id, indianDish) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_INDIAN_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    // http://localhost:4000/api/v1/indian-dish

    const { data } = await axios.put(
      `/api/v1/indian-dish/${id}`,
      indianDish,
      config
    );

    dispatch({
      type: UPDATE_INDIAN_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_INDIAN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Item Details
export const getSingleIndianDish = (id) => async (dispatch) => {
  try {
    dispatch({ type: INDIAN_SINGLE_REQUEST });
    const { data } = await axios.get(`/api/v1/indian-dish/${id}`);
    dispatch({ type: INDIAN_SINGLE_SUCCESS, payload: data.indian });
  } catch (error) {
    dispatch({
      type: INDIAN_SINGLE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Product
export const deleteIndianDish = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_INDIAN_REQUEST });
    // http://localhost:4000/api/v1/indian-dish
    const { data } = await axios.delete(`/api/v1/indian-dish/${id}`);
    dispatch({
      type: DELETE_INDIAN_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_INDIAN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

// Get All Products
// export const getProduct =
//   (keyword = '', currentPage = 1, price = [0, 25000], category, ratings = 0) =>
//   async (dispatch) => {
//     try {
//       dispatch({ type: ALL_PRODUCT_REQUEST });

//       let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

//       if (category) {
//         link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
//       }

//       const { data } = await axios.get(link);

//       dispatch({
//         type: ALL_PRODUCT_SUCCESS,
//         payload: data,
//       });
//     } catch (error) {
//       dispatch({
//         type: ALL_PRODUCT_FAIL,
//         payload: error.response.data.message,
//       });
//     }
//   };

// // Get All Products For Admin
// export const getAdminProduct = () => async (dispatch) => {
//   try {
//     dispatch({ type: ADMIN_PRODUCT_REQUEST });

//     const { data } = await axios.get('/api/v1/admin/products');

//     dispatch({
//       type: ADMIN_PRODUCT_SUCCESS,
//       payload: data.products,
//     });
//   } catch (error) {
//     dispatch({
//       type: ADMIN_PRODUCT_FAIL,
//       payload: error.response?.data?.message,
//     });
//   }
// };

// Update Product
// export const updateProduct = (id, productData) => async (dispatch) => {
//   try {
//     dispatch({ type: UPDATE_PRODUCT_REQUEST });

//     const config = {
//       headers: { 'Content-Type': 'application/json' },
//     };

//     const { data } = await axios.put(
//       `/api/v1/admin/product/${id}`,
//       productData,
//       config
//     );

//     dispatch({
//       type: UPDATE_PRODUCT_SUCCESS,
//       payload: data.success,
//     });
//   } catch (error) {
//     dispatch({
//       type: UPDATE_PRODUCT_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// Delete Product
// export const deleteProduct = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: DELETE_PRODUCT_REQUEST });

//     const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

//     dispatch({
//       type: DELETE_PRODUCT_SUCCESS,
//       payload: data.success,
//     });
//   } catch (error) {
//     dispatch({
//       type: DELETE_PRODUCT_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// Get Products Details
// export const getProductDetails = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: PRODUCT_DETAILS_REQUEST });

//     const { data } = await axios.get(`/api/v1/product/${id}`);

//     dispatch({
//       type: PRODUCT_DETAILS_SUCCESS,
//       payload: data.product,
//     });
//   } catch (error) {
//     dispatch({
//       type: PRODUCT_DETAILS_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// NEW REVIEW
// export const newReview = (reviewData) => async (dispatch) => {
//   try {
//     dispatch({ type: NEW_REVIEW_REQUEST });

//     const config = {
//       headers: { 'Content-Type': 'application/json' },
//     };

//     const { data } = await axios.put(`/api/v1/review`, reviewData, config);

//     dispatch({
//       type: NEW_REVIEW_SUCCESS,
//       payload: data.success,
//     });
//   } catch (error) {
//     dispatch({
//       type: NEW_REVIEW_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// Get All Reviews of a Product
// export const getAllReviews = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: ALL_REVIEW_REQUEST });

//     const { data } = await axios.get(`/api/v1/reviews?id=${id}`);

//     dispatch({
//       type: ALL_REVIEW_SUCCESS,
//       payload: data.reviews,
//     });
//   } catch (error) {
//     dispatch({
//       type: ALL_REVIEW_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };

// Delete Review of a Product
// export const deleteReviews = (reviewId, productId) => async (dispatch) => {
//   try {
//     dispatch({ type: DELETE_REVIEW_REQUEST });

//     const { data } = await axios.delete(
//       `/api/v1/reviews?id=${reviewId}&productId=${productId}`
//     );

//     dispatch({
//       type: DELETE_REVIEW_SUCCESS,
//       payload: data.success,
//     });
//   } catch (error) {
//     dispatch({
//       type: DELETE_REVIEW_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };
