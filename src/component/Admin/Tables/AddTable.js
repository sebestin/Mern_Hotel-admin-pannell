// import React, { Fragment, useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { clearErrors, createPizza } from '../../../actions/Dish/PizzaAction';
// import { useAlert } from 'react-alert';
// import { Button } from '@material-ui/core';
// import MetaData from '../../layout/MetaData';
// import DescriptionIcon from '@material-ui/icons/Description';
// import SideBar from '../Sidebar/Sidebar';
// import { BiDish } from 'react-icons/bi';
// import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
// import CircularProgress from '@mui/material/CircularProgress';
// import { CREATE_PIZZA_RESET } from '../../../constants/Dish/PizzaConstants';
// import { MdOutlineFormatListNumbered } from 'react-icons/md';

// const AddTable = ({ history }) => {
//   const dispatch = useDispatch();
//   const alert = useAlert();

//   const { loading, error, success } = useSelector((state) => state.createPizza);

//   const [dish, setDish] = useState('');
//   const [price, setPrice] = useState();
//   const [quantity, setQuantity] = useState();
//   const [description, setDescription] = useState('');

//   useEffect(() => {
//     if (error) {
//       alert.error(error);
//       dispatch(clearErrors());
//     }
//     if (success) {
//       alert.success('Pizza Created Successfully');
//       history.push('/admin/pizzas');
//       dispatch({ type: CREATE_PIZZA_RESET });
//     }
//   }, [dispatch, alert, error, history, success]);

//   const createDrinkHandler = (e) => {
//     e.preventDefault();

//     const myForm = new FormData();

//     myForm.set('dish', dish);
//     myForm.set('price', price);
//     myForm.set('quantity', quantity);
//     myForm.set('description', description);

//     dispatch(createPizza(myForm));
//   };

//   return (
//     <Fragment>
//       <MetaData title="Add Piza" />
//       <div className="dashboard">
//         <SideBar />
//         <div className="newProductContainer">
//           <form
//             className="createProductForm"
//             encType="multipart/form-data"
//             onSubmit={createDrinkHandler}
//           >
//             <h1>Create Pizza</h1>

//             <div>
//               <BiDish />
//               <input
//                 type="text"
//                 placeholder="Pizza Name"
//                 required
//                 value={dish}
//                 onChange={(e) => setDish(e.target.value)}
//               />
//             </div>
//             <div>
//               <CurrencyRupeeIcon />
//               <input
//                 type="number"
//                 placeholder="Price"
//                 required
//                 // value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//               />
//             </div>
//             <div>
//               <MdOutlineFormatListNumbered />
//               <input
//                 type="number"
//                 placeholder="Quantity"
//                 required
//                 // value={price}
//                 onChange={(e) => setQuantity(e.target.value)}
//               />
//             </div>

//             <div>
//               <DescriptionIcon />

//               <textarea
//                 placeholder="Description"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 cols="30"
//                 rows="1"
//               ></textarea>
//             </div>

//             <Button id="createProductBtn" type="submit">
//               {loading ? (
//                 <CircularProgress color="inherit" size="1.5rem" />
//               ) : (
//                 'Create Pizza'
//               )}
//             </Button>
//           </form>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default AddTable;

import { CircularProgress } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { useAlert } from 'react-alert';
import './Table.css';

import { useSelector, useDispatch } from 'react-redux';
import MetaData from '../../layout/MetaData';
import SideBar from '../Sidebar/Sidebar';
import { Button } from '@material-ui/core';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import { MdOutlineFormatListNumbered } from 'react-icons/md';
import { createTable } from '../../../actions/Dish/TableAction';
import { CREATE_TABLE_RESET } from '../../../constants/Dish/TableConstants';

const AddTable = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.createTable);
  const [tableName, setTableName] = useState('');
  const [tableNumber, setTableNumber] = useState();
  useEffect(() => {
    // if (error) {
    //   alert.error(error);
    //   dispatch(clearErrors());
    // }
    if (success) {
      alert.success('Pizza Created Successfully');
      history.push('/admin/tables');
      dispatch({ type: CREATE_TABLE_RESET });
    }
  }, [dispatch, alert, error, history, success]);

  const createTableHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('tableName', tableName);
    myForm.set('tableNumber', tableNumber);

    dispatch(createTable(myForm));
  };
  return (
    <Fragment>
      <MetaData title="Create Table" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainerTable">
          <form
            className="createProductFormTable"
            encType="multipart/form-data"
            onSubmit={createTableHandler}
          >
            <h1>Add Table</h1>
            <div>
              <TableRestaurantIcon />
              <input
                type="text"
                placeholder="Table name"
                required
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
              />
            </div>
            <div>
              <MdOutlineFormatListNumbered />
              <input
                type="number"
                placeholder="Table number"
                required
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
              />
            </div>
            <Button id="createProductBtn" type="submit">
              {/* {loading ? (
                <CircularProgress color="inherit" size="1.5rem" />
              ) : (
                'Create Pizza'
              )} */}
              Add Table
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AddTable;
