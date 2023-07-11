import React, { Fragment, useEffect, useState } from 'react';
import './Style/newProduct.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, createProduct } from '../../actions/productAction';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import MetaData from '../layout/MetaData';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import DescriptionIcon from '@material-ui/icons/Description';
import StorageIcon from '@material-ui/icons/Storage';
import SideBar from './Sidebar/Sidebar';
import { NEW_PRODUCT_RESET } from '../../constants/productConstants';
import { BiDish } from 'react-icons/bi';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import CircularProgress from '@mui/material/CircularProgress';
import Loader from '../layout/Loader/Loader';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import UploadIcon from '@mui/icons-material/Upload';

const NewProduct = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newProduct);
  // console.log('Succuess----', success);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  // const [test, setTest] = useState('');
  // const [testCate, setTestCate] = useState('');

  const categories = ['Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5'];
  const subCategories = [
    'SubTest 1',
    'SubTest 2',
    'SubTest 3',
    'SubTest 4',
    'SubTest 5',
  ];

  // const cate = ['Test - u 1', 'Test-u 2', 'Test-u 3', 'Test-u 4', 'Test-u 5'];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success('Item Created Successfully');
      history.push('/admin/dashboard');
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('name', name);
    myForm.set('price', price);
    myForm.set('description', description);
    myForm.set('category', category);
    myForm.set('subCategory', subCategory);
    myForm.set('Stock', Stock);
    // myForm.set('Test', test);
    // myForm.set('cate', testCate);

    images.forEach((image) => {
      myForm.append('images', image);
    });
    imagesPreview.forEach((imageTest) => {
      myForm.append('imagesTest', imageTest);
    });
    // console.log('subMyform---', myForm.subCategory);
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      <MetaData title="Create Dish" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Dish</h1>

            <div>
              <BiDish />
              <input
                type="text"
                placeholder="Dish Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              <DescriptionIcon />

              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((categorie) => (
                  <option key={categorie} value={categorie}>
                    {/* {console.log('Cate---', categorie)} */}
                    {categorie}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setSubCategory(e.target.value)}>
                <option value="">Choose sub Category</option>

                {subCategories.map((subCategorie) => (
                  <option key={subCategorie} value={subCategorie}>
                    {/* {console.log('sub----', subCategorie)} */}
                    {subCategorie}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            {/* <div>
              <BiDish />
              <input
                type="text"
                placeholder="Test"
                required
                onChange={(e) => setTest(e.target.value)}
              />
            </div> */}
            {/* 
            <div>
              <DescriptionIcon />
              <select onChange={(e) => setTestCate(e.target.value)}>
                <option value="">Test Cate</option>
                {cate.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div> */}

            <div id="createProductFormFile">
              <UploadIcon className="upload-icon" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Item Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              // disabled={
              //   loading ? true : false
              // }
            >
              {loading ? (
                <CircularProgress style={{ color: '#fff ' }} size="1.5rem" />
              ) : (
                'Create'
              )}
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
