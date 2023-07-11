import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearErrors,
  updateSnack,
  getSingleSnack,
} from '../../../actions/Dish/SnacksAction';
import { useAlert } from 'react-alert';
import { Button, CircularProgress } from '@material-ui/core';
import MetaData from '../../layout/MetaData';
import DescriptionIcon from '@material-ui/icons/Description';
import SideBar from '../Sidebar/Sidebar';
import { UPDATE_SNACK_RESET } from '../../../constants/Dish/SnackConstants';
import { BiDish } from 'react-icons/bi';
import CurrencyRupee from '@mui/icons-material/CurrencyRupee';
import { MdOutlineFormatListNumbered } from 'react-icons/md';

const UpdateSnack = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const id = match.params.id;

  const { snack, error } = useSelector((state) => state.getSingleSnack);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.updateIndianDish);

  const [dish, setDish] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState('');

  const updateSnackHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set('dish', dish);
    myForm.set('price', price);
    myForm.set('quantity', quantity);
    myForm.set('description', description);

    dispatch(updateSnack(match.params.id, myForm));
  };
  // console.log('indian++++++++++&&&&****', snack);
  // const updateProductImagesChange = (e) => {
  //   const files = Array.from(e.target.files);

  //   setImages([]);
  //   setImagesPreview([]);
  //   setOldImages([]);

  //   files.forEach((file) => {
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setImagesPreview((old) => [...old, reader.result]);
  //         setImages((old) => [...old, reader.result]);
  //       }
  //     };

  //     reader.readAsDataURL(file);
  //   });
  // };
  useEffect(() => {
    if (snack && snack._id !== id) {
      dispatch(getSingleSnack(id));
    } else {
      setDish(snack.dish);
      setPrice(snack.price);
      setQuantity(snack.quantity);
      setDescription(snack.description);
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
      alert.success('Snack updated Successfully');
      history.push('/admin/snacks');
      dispatch({ type: UPDATE_SNACK_RESET });
    }
  }, [snack, id, dispatch, alert, error, , history, isUpdated]);

  return (
    <Fragment>
      <MetaData title="Update Snack" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateSnackHandler}
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

export default UpdateSnack;
