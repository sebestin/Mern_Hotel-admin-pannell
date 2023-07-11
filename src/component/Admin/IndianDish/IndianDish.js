import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearErrors,
  createIndianDish,
} from '../../../actions/Dish/indianAction';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import MetaData from '../../layout/MetaData';
import DescriptionIcon from '@material-ui/icons/Description';
import SideBar from '../Sidebar/Sidebar';
import { NEW_INDIAN_DISH_RESET } from '../../../constants/Dish/IndianConstants';
import { BiDish } from 'react-icons/bi';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CircularProgress from '@mui/material/CircularProgress';
import { MdOutlineFormatListNumbered } from 'react-icons/md';

const CreateIndianDish = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector(
    (state) => state.createIndianDish
  );

  const [dish, setDish] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState('');

  //   const [category, setCategory] = useState('');
  //   const [subCategory, setSubCategory] = useState('');
  //   const [Stock, setStock] = useState(0);
  //   const [images, setImages] = useState([]);
  //   const [imagesPreview, setImagesPreview] = useState([]);

  //   const categories = ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5'];
  //   const subCategories = [
  //     'SubTest 1',
  //     'SubTest 2',
  //     'SubTest 3',
  //     'SubTest 4',
  //     'SubTest 5',
  //   ];

  // const cate = ['Test - u 1', 'Test-u 2', 'Test-u 3', 'Test-u 4', 'Test-u 5'];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success('Item Created Successfully');
      history.push('/admin/indian-dish');
      dispatch({ type: NEW_INDIAN_DISH_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('dish', dish);
    myForm.set('price', price);
    myForm.set('quantity', quantity);
    myForm.set('description', description);
    // myForm.set('category', category);
    // myForm.set('subCategory', subCategory);
    // myForm.set('Stock', Stock);
    // myForm.set('Test', test);
    // myForm.set('cate', testCate);

    // images.forEach((image) => {
    //   myForm.append('images', image);
    // });
    // imagesPreview.forEach((imageTest) => {
    //   myForm.append('imagesTest', imageTest);
    // });
    // console.log('subMyform---', myForm.subCategory);
    dispatch(createIndianDish(myForm));
  };

  //   const createProductImagesChange = (e) => {
  //     const files = Array.from(e.target.files);

  //     setImages([]);
  //     setImagesPreview([]);

  //     files.forEach((file) => {
  //       const reader = new FileReader();

  //       reader.onload = () => {
  //         if (reader.readyState === 2) {
  //           setImagesPreview((old) => [...old, reader.result]);
  //           setImages((old) => [...old, reader.result]);
  //         }
  //       };

  //       reader.readAsDataURL(file);
  //     });
  //   };

  return (
    <Fragment>
      <MetaData title="Create Indian dish" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Indian Dish</h1>

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

            {/* <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((categorie) => (
                  <option key={categorie} value={categorie}>
                  
                    {categorie}
                  </option>
                ))}
              </select>
            </div> */}

            {/* <div>
              <AccountTreeIcon />
              <select onChange={(e) => setSubCategory(e.target.value)}>
                <option value="">Choose sub Category</option>

                {subCategories.map((subCategorie) => (
                  <option key={subCategorie} value={subCategorie}>
                    
                    {subCategorie}
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
              />
            </div> */}

            {/* <div id="createProductFormFile">
              <UploadIcon className="upload-icon" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div> */}

            {/* <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Item Preview" />
              ))}
            </div> */}

            <Button id="createProductBtn" type="submit">
              {loading ? (
                <CircularProgress color="inherit" size="1.5rem" />
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

export default CreateIndianDish;
