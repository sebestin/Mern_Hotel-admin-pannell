import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { Button, CircularProgress } from '@material-ui/core';
import MetaData from '../../layout/MetaData';
import DescriptionIcon from '@material-ui/icons/Description';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SideBar from '../Sidebar/Sidebar';
import {
  getSingleDrink,
  updateDrink,
  clearErrors,
} from '../../../actions/Dish/DrinkAction';
import { UPDATE_DRINK_RESET } from '../../../constants/Dish/DrinkConstants';
import { BiDish } from 'react-icons/bi';
import CurrencyRupee from '@mui/icons-material/CurrencyRupee';
import { MdOutlineFormatListNumbered } from 'react-icons/md';
const UpdateDrink = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const id = match.params.id;

  const { drink: drinks, error } = useSelector((state) => state.getSingleDrink);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.updateIndianDish);

  const [drink, setDrink] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState('');

  const updateDrinkHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('drink', drink);
    myForm.set('price', price);
    myForm.set('quantity', quantity);
    myForm.set('description', description);

    dispatch(updateDrink(id, myForm));
  };

  useEffect(() => {
    if (drinks && drinks._id !== id) {
      dispatch(getSingleDrink(id));
    } else {
      setDrink(drinks.drink);
      setPrice(drinks.price);
      setQuantity(drinks.quantity);
      setDescription(drinks.description);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success('Drinks Dish Successfully');
      history.push('/admin/drinks');
      dispatch({ type: UPDATE_DRINK_RESET });
    }
  }, [dispatch, alert, error, , history, isUpdated, drinks]);
  return (
    <Fragment>
      <MetaData title="Update Drink" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateDrinkHandler}
          >
            <h1>Update Item</h1>

            <div>
              <BiDish />
              <input
                type="text"
                placeholder="Dish Name"
                required
                value={drink}
                onChange={(e) => setDrink(e.target.value)}
              />
            </div>
            <div>
              <CurrencyRupee />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>

            <div>
              <MdOutlineFormatListNumbered />
              <input
                type="number"
                placeholder="Quantity"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Drink Description"
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
                'Update'
              )}
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateDrink;
