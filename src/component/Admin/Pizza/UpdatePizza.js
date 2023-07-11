import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { Button, CircularProgress } from '@material-ui/core';
import MetaData from '../../layout/MetaData';
import DescriptionIcon from '@material-ui/icons/Description';
import SideBar from '../Sidebar/Sidebar';
import {
  getSinglePizza,
  clearErrors,
  updateDrink,
} from '../../../actions/Dish/PizzaAction';
import { UPDATE_PIZZA_RESET } from '../../../constants/Dish/PizzaConstants';
import { BiDish } from 'react-icons/bi';
import CurrencyRupee from '@mui/icons-material/CurrencyRupee';
import { MdOutlineFormatListNumbered } from 'react-icons/md';

const UpdatePizza = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const id = match.params.id;
  const { pizza, error } = useSelector((state) => state.singlePizza);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.updateIndianDish);

  const [dish, setDish] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState('');

  const updateDrinkHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set('dish', dish);
    myForm.set('price', price);
    myForm.set('quantity', quantity);
    myForm.set('description', description);

    dispatch(updateDrink(id, myForm));
  };

  useEffect(() => {
    if (pizza && pizza._id !== id) {
      dispatch(getSinglePizza(id));
    } else {
      setDish(pizza.dish);
      setPrice(pizza.price);
      setQuantity(pizza.quantity);
      setDescription(pizza.description);
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
      alert.success('Pizza updated Successfully');
      history.push('/admin/pizzas');
      dispatch({ type: UPDATE_PIZZA_RESET });
    }
  }, [dispatch, alert, error, , history, isUpdated, pizza]);

  return (
    <Fragment>
      <MetaData title="Create Drink" />
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
                value={dish}
                onChange={(e) => setDish(e.target.value)}
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
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            {/* <div>
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div> */}

            {/* <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={Stock}
              />
            </div> */}

            {/* <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div> */}

            {/* <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div> */}

            {/* <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div> */}

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

export default UpdatePizza;
