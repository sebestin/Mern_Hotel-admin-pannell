import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearErrors,
  updateChinese,
  getChineseDetails,
} from '../../../actions/Dish/ChineseAction';
import { useAlert } from 'react-alert';
import { Button, CircularProgress } from '@material-ui/core';
import MetaData from '../../layout/MetaData';
import SideBar from '../Sidebar/Sidebar';
import { UPDATE_CHINESE_RESET } from '../../../constants/Dish/ChineseConstants';
import { BiDish } from 'react-icons/bi';
import { MdOutlineFormatListNumbered } from 'react-icons/md';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Description from '@material-ui/icons/Description';

const UpdateChinese = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const id = match.params.id;

  const { error, chinese } = useSelector((state) => state.getChineseDetail);
  // const {
  //   loading,
  //   error: updateError,
  //   isUpdated,
  // } = useSelector((state) => state.updateChinese);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.updateIndianDish);

  const [dish, setDish] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState('');

  const updateChineseHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set('dish', dish);
    myForm.set('price', price);
    myForm.set('quantity', quantity);
    myForm.set('description', description);

    dispatch(updateChinese(id, myForm));
  };

  useEffect(() => {
    if (chinese && chinese._id !== id) {
      dispatch(getChineseDetails(id));
    } else {
      setDish(chinese.dish);
      setPrice(chinese.price);
      setQuantity(chinese.quantity);
      setDescription(chinese.description);
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
      alert.success('Item updated Successfully');
      history.push('/admin/chineses');
      dispatch({ type: UPDATE_CHINESE_RESET });
    }
  }, [dispatch, alert, error, , history, isUpdated, chinese]);

  return (
    <Fragment>
      <MetaData title="Update Chinese" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateChineseHandler}
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
              <CurrencyRupeeIcon />
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
              <Description />
              <textarea
                placeholder="Chinese Description"
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

export default UpdateChinese;
