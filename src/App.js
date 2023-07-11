import './App.css';
import { useEffect, useState } from 'react';
import Header from './component/layout/Header/Header.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WebFont from 'webfontloader';
import React from 'react';
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products';
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';
import store from './store';
import { loadUser } from './actions/userAction';
import UserOptions from './component/layout/Header/UserOptions';
import { useSelector } from 'react-redux';
import Profile from './component/User/Profile';
import ProtectedRoute from './component/Route/ProtectedRoute';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import axios from 'axios';
import Payment from './component/Cart/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrders from './component/Order/MyOrders';
import OrderDetails from './component/Order/OrderDetails';
import Dashboard from './component/Admin/Dashboard/Dashboard.js';
import ProductList from './component/Admin/ProductList.js';
import NewProduct from './component/Admin/NewProduct';
import UpdateProduct from './component/Admin/UpdateProduct';
import OrderList from './component/Admin/OrderList';
import ProcessOrder from './component/Admin/ProcessOrder';
import UsersList from './component/Admin/User/UsersList';
import UpdateUser from './component/Admin/User/UpdateUser';
import ProductReviews from './component/Admin/ProductReviews';
import Contact from './component/layout/Contact/Contact';
import About from './component/layout/About/About';
import NotFound from './component/layout/Not Found/NotFound';
import CreateIndianDish from './component/Admin/IndianDish/IndianDish';
import GetIndianDish from './component/Admin/IndianDish/GetIndianDish';
import UpdateIndianDish from './component/Admin/IndianDish/UpdateIndianDish';
import CreateSnacks from './component/Admin/Snacks/CreateSnacks';
import GetAllSnack from './component/Admin/Snacks/GetAllSnack';
import CreateChinese from './component/Admin/Chineese/CreateChinese';
import GetAllChinese from './component/Admin/Chineese/GetAllChinese';
import UpdateChinese from './component/Admin/Chineese/UpdateChinese';
import UpdateSnack from './component/Admin/Snacks/UpdateSnack';
import CreateDrink from './component/Admin/Drink/CreateDrink';
import AllDrinks from './component/Admin/Drink/AllDrinks';
import UpdateDrink from './component/Admin/Drink/UpdateDrink';
import CreatePizza from './component/Admin/Pizza/CreatePizza';
import AllPizza from './component/Admin/Pizza/AllPizza';
import UpdatePizza from './component/Admin/Pizza/UpdatePizza';
import AddTable from './component/Admin/Tables/AddTable';
import { AllTables } from './actions/Dish/TableAction';
import GetAllTables from './component/Admin/Tables/GetAllTables';
import UpdateTable from './component/Admin/Tables/UpdateTable';

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState('');

  async function getStripeApiKey() {
    const { data } = await axios.get('/api/v1/stripeapikey');

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  // window.addEventListener('contextmenu', (e) => e.preventDefault());

  return (
    <Router>
      {/* <Header /> */}

      {isAuthenticated && <UserOptions user={user} />}

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}

      <Switch>
        {/* <Route exact path="/" component={Home} /> */}
        <Route exact path="/" component={LoginSignUp} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route path="/products/:keyword" component={Products} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/about" component={About} />
        <ProtectedRoute exact path="/account" component={Profile} />
        <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
        <ProtectedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />
        <Route exact path="/password/forgot" component={ForgotPassword} />
        <Route exact path="/password/reset/:token" component={ResetPassword} />
        <Route exact path="/login" component={LoginSignUp} />
        <Route exact path="/cart" component={Cart} />
        <ProtectedRoute exact path="/shipping" component={Shipping} />
        <ProtectedRoute exact path="/success" component={OrderSuccess} />
        <ProtectedRoute exact path="/orders" component={MyOrders} />
        <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
        <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
        <ProtectedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashboard}
        />
        <ProtectedRoute
          exact
          path="/admin/products"
          isAdmin={true}
          component={ProductList}
        />
        <ProtectedRoute
          exact
          path="/admin/product"
          isAdmin={true}
          component={NewProduct}
        />
        <ProtectedRoute
          exact
          path="/admin/indian"
          isAdmin={true}
          component={CreateIndianDish}
        />
        <ProtectedRoute
          exact
          path="/admin/indian-dish"
          isAdmin={true}
          component={GetIndianDish}
        />
        <ProtectedRoute
          exact
          path="/admin/indian/:id"
          isAdmin={true}
          component={UpdateIndianDish}
        />
        <ProtectedRoute
          exact
          path="/admin/snack"
          isAdmin={true}
          component={CreateSnacks}
        />
        <ProtectedRoute
          exact
          path="/admin/snacks"
          isAdmin={true}
          component={GetAllSnack}
        />
        <ProtectedRoute
          exact
          path="/admin/snack/:id"
          isAdmin={true}
          component={UpdateSnack}
        />
        <ProtectedRoute
          exact
          path="/admin/chinese"
          isAdmin={true}
          component={CreateChinese}
        />
        <ProtectedRoute
          exact
          path="/admin/chineses"
          isAdmin={true}
          component={GetAllChinese}
        />
        <ProtectedRoute
          exact
          path="/admin/chinese/:id"
          isAdmin={true}
          component={UpdateChinese}
        />
        <ProtectedRoute
          exact
          path="/admin/drink"
          isAdmin={true}
          component={CreateDrink}
        />
        <ProtectedRoute
          exact
          path="/admin/drinks"
          isAdmin={true}
          component={AllDrinks}
        />
        <ProtectedRoute
          exact
          path="/admin/drink/:id"
          isAdmin={true}
          component={UpdateDrink}
        />
        <ProtectedRoute
          exact
          path="/admin/pizza"
          isAdmin={true}
          component={CreatePizza}
        />
        <ProtectedRoute
          exact
          path="/admin/pizzas"
          isAdmin={true}
          component={AllPizza}
        />
        <ProtectedRoute
          exact
          path="/admin/pizza/:id"
          isAdmin={true}
          component={UpdatePizza}
        />
        <ProtectedRoute
          exact
          path="/admin/product/:id"
          isAdmin={true}
          component={UpdateProduct}
        />

        <ProtectedRoute
          exact
          path="/admin/table"
          isAdmin={true}
          component={AddTable}
        />
        <ProtectedRoute
          exact
          path="/admin/tables"
          isAdmin={true}
          component={GetAllTables}
        />
        <ProtectedRoute
          exact
          path="/admin/table/:id"
          isAdmin={true}
          component={UpdateTable}
        />
        <ProtectedRoute
          exact
          path="/admin/orders"
          isAdmin={true}
          component={OrderList}
        />
        <ProtectedRoute
          exact
          path="/admin/order/:id"
          isAdmin={true}
          component={ProcessOrder}
        />
        <ProtectedRoute
          exact
          path="/admin/users"
          isAdmin={true}
          component={UsersList}
        />
        <ProtectedRoute
          exact
          path="/admin/user/:id"
          isAdmin={true}
          component={UpdateUser}
        />
        <ProtectedRoute
          exact
          path="/admin/reviews"
          isAdmin={true}
          component={ProductReviews}
        />
        <Route
          component={
            window.location.pathname === '/process/payment' ? null : NotFound
          }
        />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
