import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, createPizza } from '../../../actions/Dish/PizzaAction';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import MetaData from '../../layout/MetaData';
import DescriptionIcon from '@material-ui/icons/Description';
import SideBar from '../Sidebar/Sidebar';
import { BiDish } from 'react-icons/bi';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CircularProgress from '@mui/material/CircularProgress';
import { CREATE_PIZZA_RESET } from '../../../constants/Dish/PizzaConstants';
import { MdOutlineFormatListNumbered } from 'react-icons/md';

const CreatePizza = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.createPizza);

  const [dish, setDish] = useState('');
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success('Pizza Created Successfully');
      history.push('/admin/pizzas');
      dispatch({ type: CREATE_PIZZA_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createDrinkHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('dish', dish);
    myForm.set('price', price);
    myForm.set('quantity', quantity);
    myForm.set('description', description);

    dispatch(createPizza(myForm));
  };

  return (
    <Fragment>
      <MetaData title="Add Piza" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createDrinkHandler}
          >
            <h1>Create Pizza</h1>

            <div>
              <BiDish />
              <input
                type="text"
                placeholder="Pizza Name"
                required
                value={dish}
                onChange={(e) => setDish(e.target.value)}
              />
            </div>
            <div>
              <CurrencyRupeeIcon />
              <input
                type="number"
                placeholder="Price"
                required
                // value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <MdOutlineFormatListNumbered />
              <input
                type="number"
                placeholder="Quantity"
                required
                // value={price}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <Button id="createProductBtn" type="submit">
              {loading ? (
                <CircularProgress color="inherit" size="1.5rem" />
              ) : (
                'Create Pizza'
              )}
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default CreatePizza;
