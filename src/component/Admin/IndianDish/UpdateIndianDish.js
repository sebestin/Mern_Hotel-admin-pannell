import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearErrors,
  updateIndianDish,
  getSingleIndianDish,
} from '../../../actions/Dish/indianAction';
import { useAlert } from 'react-alert';
import { Button, CircularProgress } from '@material-ui/core';
import MetaData from '../../layout/MetaData';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import DescriptionIcon from '@material-ui/icons/Description';
import StorageIcon from '@material-ui/icons/Storage';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SideBar from '../Sidebar/Sidebar';

import { UPDATE_INDIAN_RESET } from '../../../constants/Dish/IndianConstants';

const UpdateIndianDish = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { indian, error } = useSelector((state) => state.getSingleIndian);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.updateIndianDish);

  // dispatch(getSingleIndianDish(id));

  const [dish, setDish] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState('');

  const id = match.params.id;

  const updateIndianSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('dish', dish);
    myForm.set('price', price);
    myForm.set('quantity', quantity);
    myForm.set('description', description);

    dispatch(updateIndianDish(id, myForm));
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
    if (indian && indian._id !== id) {
      dispatch(getSingleIndianDish(id));
    } else {
      setDish(indian.dish);
      setPrice(indian.price);
      setQuantity(indian.quantity);
      setDescription(indian.description);
    }
    // if (error) {
    //   alert.error(error);
    //   dispatch(clearErrors());
    // }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success('Indian Dish Successfully');
      history.push('/admin/indian-dish');
      dispatch({ type: UPDATE_INDIAN_RESET });
    }
  }, [dispatch, alert, error, , history, isUpdated, indian]);

  return (
    <Fragment>
      {/* <MetaData title="Create Product" /> */}
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateIndianSubmitHandler}
          >
            <h1>Update Item</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Dish Name"
                required
                value={dish}
                onChange={(e) => setDish(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>

            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
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

            <Button
              id="createProductBtn"
              type="submit"
              // disabled={
              //   loading ? true : false
              // }
            >
              {/* {loading ? (
                <CircularProgress style={{ color: '#fff ' }} size="1.5rem" />
              ) : (
                'Update'
              )} */}
              Update
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateIndianDish;
