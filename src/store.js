import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  productReviewsReducer,
  productsReducer,
  reviewReducer,
} from './reducers/productReducer';

import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from './reducers/userReducer';

import { cartReducer } from './reducers/cartReducer';
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from './reducers/orderReducer';

import {
  createIndianDishReducer,
  getIndianReducer,
  deleteIndianReducer,
  updateIndianDishReducer,
  getSingleIndianDishReducer,
} from './reducers/Dish/IndianReducer';
import {
  createSnacksReducer,
  getAllSnackReducer,
  deleteSnackReducer,
  getSingleSnackReducer,
  // updateSnackReducer,
} from './reducers/Dish/SancksReducer';
import {
  createChinesehReducer,
  getAllChineseReducer,
  deleteChineseReducer,
  getChineseDetailReducer,
  // updateChineseReducer,
} from './reducers/Dish/ChineseReducer';
import {
  createDrinkReducer,
  getAllDrinksReducer,
  deleteDrinkReducer,
  getSingleDrinkReducer,
} from './reducers/Dish/DrinkReducer';
import {
  createPizzaReducer,
  getAllPizzaReducer,
  deletePizzaReducer,
  singlePizzaReducer,
} from './reducers/Dish/PizzaReducer';
import {
  createTableReducer,
  deleteTableReducer,
  getAllTableReducer,
  singleTableReducer,
  updateTableReducer,
} from './reducers/Dish/TableReducer';
const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
  createIndianDish: createIndianDishReducer,
  getIndianDish: getIndianReducer,
  deleteIndianDish: deleteIndianReducer,
  updateIndianDish: updateIndianDishReducer,
  getSingleIndian: getSingleIndianDishReducer,
  createSnack: createSnacksReducer,
  getAllSnack: getAllSnackReducer,
  getSingleSnack: getSingleSnackReducer,
  // updateSnack: updateSnackReducer,
  deleteSnack: deleteSnackReducer,
  createChinese: createChinesehReducer,
  getAllChinese: getAllChineseReducer,
  deleteChinese: deleteChineseReducer,
  getChineseDetail: getChineseDetailReducer,
  // updateChinese: updateChineseReducer,
  createDrink: createDrinkReducer,
  getAllDrinks: getAllDrinksReducer,
  deleteDrink: deleteDrinkReducer,
  getSingleDrink: getSingleDrinkReducer,
  createPizza: createPizzaReducer,
  getAllPizza: getAllPizzaReducer,
  singlePizza: singlePizzaReducer,
  deletePizza: deletePizzaReducer,
  createTable: createTableReducer,
  getAllTable: getAllTableReducer,
  deleteTable: deleteTableReducer,
  singleTable: singleTableReducer,
  updateTable: updateTableReducer,
});

let initialState = {
  // cart: {
  //   cartItems: localStorage.getItem("cartItems")
  //     ? JSON.parse(localStorage.getItem("cartItems"))
  //     : [],
  //   shippingInfo: localStorage.getItem("shippingInfo")
  //     ? JSON.parse(localStorage.getItem("shippingInfo"))
  //     : {},
  // },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
