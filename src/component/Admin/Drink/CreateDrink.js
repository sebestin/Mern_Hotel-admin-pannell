import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, createDrink } from '../../../actions/Dish/DrinkAction';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import MetaData from '../../layout/MetaData';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import DescriptionIcon from '@material-ui/icons/Description';
import StorageIcon from '@material-ui/icons/Storage';
import SideBar from '../Sidebar/Sidebar';

import { BiDish } from 'react-icons/bi';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CircularProgress from '@mui/material/CircularProgress';
// import Loader from '../layout/Loader/Loader';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import UploadIcon from '@mui/icons-material/Upload';
import { CREATE_DRINK_RESET } from '../../../constants/Dish/DrinkConstants';
import { MdOutlineFormatListNumbered } from 'react-icons/md';

const CreateDrink = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.createDrink);

  const [drink, setDrink] = useState('');
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success('Item Created Successfully');
      history.push('/admin/drinks');
      dispatch({ type: CREATE_DRINK_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createDrinkHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('drink', drink);
    myForm.set('price', price);
    myForm.set('quantity', quantity);
    myForm.set('description', description);

    dispatch(createDrink(myForm));
  };

  return (
    <Fragment>
      <MetaData title="Add Drink" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createDrinkHandler}
          >
            <h1>Create Drink</h1>

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
                <CircularProgress style={{ color: '#fff ' }} size="1.5rem" />
              ) : (
                'Create Dish'
              )}
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default CreateDrink;
