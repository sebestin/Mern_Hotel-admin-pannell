import React, { useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar.js';
import './dashboard.css';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Doughnut, Line } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import { getAdminProduct } from '../../../actions/productAction';
import { getAllOrders } from '../../../actions/orderAction.js';
import { getAllUsers } from '../../../actions/userAction.js';
import MetaData from '../../layout/MetaData';
import { getIndianDish } from '../../../actions/Dish/indianAction';
import { getAllSnacks } from '../../../actions/Dish/SnacksAction';
import { getAllChinese } from '../../../actions/Dish/ChineseAction';
import { getAllPizza } from '../../../actions/Dish/PizzaAction';
import { getAllDrink } from '../../../actions/Dish/DrinkAction';

const Dashboard = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const {
    dish: { data },
  } = useSelector((state) => state.getIndianDish);

  const {
    dish: { data: snack },
  } = useSelector((state) => state.getAllSnack);

  const {
    dish: { data: chinese },
  } = useSelector((state) => state.getAllChinese);
  const {
    drinks: { drinks },
    error,
  } = useSelector((state) => state.getAllDrinks);

  const {
    pizza: { pizza },
  } = useSelector((state) => state.getAllPizza);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllOrders());
    dispatch(getIndianDish());
    dispatch(getAllSnacks());
    dispatch(getAllChinese());
    dispatch(getAllDrink());
    dispatch(getAllPizza());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
      // totalAmount = totalAmount + item.totalPrice;
    });

  const lineState = {
    labels: ['Initial Amount', 'Amount Earned'],
    datasets: [
      {
        label: 'TOTAL AMOUNT',
        backgroundColor: ['tomato'],
        hoverBackgroundColor: ['rgb(197, 72, 49)'],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ['Out of Stock', 'InStock'],
    datasets: [
      {
        backgroundColor: ['#00A6B4', '#6800B4'],
        hoverBackgroundColor: ['#4B5000', '#35014F'],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>Details</p>
          </div>
          <div className="dashboardSummaryBox2">
            {/* <Link to="/admin/products">
              <p>All</p>
              <p>{products && products.length}</p>
            </Link> */}
            <Link to="/admin/indian-dish">
              <p>Indian</p>
              <p>{data && data.length}</p>
            </Link>
            <Link to="/admin/snacks">
              <p>Snacks</p>
              <p>{snack && snack.length}</p>
            </Link>
            <Link to="/admin/chineses">
              <p>Chinese</p>
              <p>{chinese && chinese.length}</p>
            </Link>
            <Link to="/admin/drinks">
              <p>Drinks</p>
              <p>{drinks && drinks.length}</p>
            </Link>
            <Link to="/admin/pizzas">
              <p>Pizza</p>
              <p>{pizza && pizza.length}</p>
            </Link>
            {/* <Link className="order">
              <p>Orders</p>0<p>{orders && orders.length}</p>
            </Link> */}
            {/* <Link>
              <p>Waiters</p>0<p>{users && users.length}</p>
            </Link> */}
          </div>
        </div>
        {/* <div className="charts">
          <div className="lineChart">
            <Line data={lineState} />
          </div>

          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
