import React, { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import './Style/productList.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearErrors,
  getAdminProduct,
  deleteProduct,
} from '../../actions/productAction';
import { useAlert } from 'react-alert';
import { Button as MuiButton } from '@material-ui/core';
import MetaData from '../layout/MetaData';
import DeleteIcon from '@material-ui/icons/Delete';
import SideBar from './Sidebar/Sidebar';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FiEdit } from 'react-icons/fi';
import Loader from '../layout/Loader/Loader';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const ProductList = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [deleteId, setDeleteId] = useState('');
  const [editPath, setEditPath] = useState('');
  const [show, setShow] = useState(false);
  const [showModelEdit, setShowEditModal] = useState(false);

  const { error, products, loading } = useSelector((state) => state.products);
  // console.log('Product', products);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success('Items Deleted Successfully');
      dispatch({ type: DELETE_PRODUCT_RESET });
    }

    dispatch(getAdminProduct());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const handleClose = () => {
    setShow(false);
    setShowEditModal(false);
  };

  const handleDelete = () => {
    dispatch(deleteProduct(deleteId));
    setShow(false);
  };
  const handleEdit = () => {
    history.push(editPath);
    setShowEditModal(false);
  };
  const handleDeleteItemId = (id) => {
    setDeleteId(id);
    setShow(true);
  };

  const handleEditItemId = (path) => {
    setEditPath(path);
    setShowEditModal(true);
  };

  const columns = [
    { field: 'id', headerName: 'Id', minWidth: 10, flex: 0.3 },

    {
      field: 'name',
      headerName: 'Name',
      minWidth: 50,
      flex: 0.6,
    },
    {
      field: 'category',
      headerName: 'Category',

      minWidth: 100,
      flex: 0.4,
    },
    {
      field: 'stock',
      headerName: 'Stock',
      type: 'number',
      minWidth: 10,
      flex: 0.4,
    },
    // {
    //   field: 'Test',
    //   headerName: 'Test',
    //   type: 'number',
    //   minWidth: 10,
    //   flex: 0.3,
    // },

    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      minWidth: 100,
      flex: 0.5,
    },

    // {
    //   field: 'images',
    //   headerName: 'Image',
    //   type: 'number',
    //   minWidth: 10,
    //   flex: 0.3,
    // },

    {
      field: 'actions',
      flex: 0.5,
      headerName: 'Actions',
      minWidth: 100,
      type: 'number',
      sortable: false,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div className="action-icon">
              {/* <Link to={`/admin/product/${params.getValue(params.id, 'id')}`}>
                <FiEdit className="edit-icon" />
              </Link> */}

              <MuiButton
                onClick={() =>
                  handleEditItemId(
                    `/admin/product/${params.getValue(params.id, 'id')}`
                  )
                }
              >
                <FiEdit className="edit-icon" />
              </MuiButton>

              <MuiButton
                onClick={() =>
                  handleDeleteItemId(params.getValue(params.id, 'id'))
                }
              >
                <DeleteIcon className="delete-icon" />
              </MuiButton>
            </div>
          </div>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item, index) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
        images: item.images.url,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL ITEMS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ITEMS</h1>
          <Link to="/admin/product" className="add-link-item">
            <MuiButton
              className="btn-add-item"
              color="primary"
              variant="contained"
              startIcon={<AddIcon />}
            >
              Add Items
            </MuiButton>
          </Link>
          {/* <input
            type="text"
            placeholder="Search Item"
            className="search-input"
            onChange={(event) => setQuery(event.target.value)}
          />
          {Data.filter((post) => {
            if (query === '') {
              return post;
            } else if (post.title.toLowerCase().includes(query.toLowerCase())) {
              return post;
            }
          }).map((post, index) => (
            <div className="box" key={index}>
              <p>{post.title}</p>
              <p>{post.author}</p>
            </div>
          ))} */}

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
            loading={loading}
            // loading={rows.length === 0 ? 'Now recode' : ''}
          />
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this ?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModelEdit} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to update this ?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleEdit}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default ProductList;

// import React, {
//   Fragment,
//   useEffect,
//   useState,
//   useMemo,
//   useCallback,
// } from 'react';
// import Pagination from './Pagination';
// import { DataGrid } from '@material-ui/data-grid';
// import './productList.css';
// import { useSelector, useDispatch } from 'react-redux';
// import {
//   clearErrors,
//   getAdminProduct,
//   deleteProduct,
// } from '../../actions/productAction';
// import { Link } from 'react-router-dom';
// import { useAlert } from 'react-alert';
// import { Avatar, Button, ImageList } from '@material-ui/core';
// import MetaData from '../layout/MetaData';
// import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from '@material-ui/icons/Delete';
// import SideBar from './Sidebar';
// import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';
// import AddIcon from '@mui/icons-material/Add';
// import Loader from '../layout/Loader/Loader';
// import ReactPaginate from 'react-paginate';

// import MyVerticallyCenteredModal from 'react-bootstrap/Container';
// import './style.scss';
// import { Button as ReactButton, Modal } from 'react-bootstrap';

// const ProductList = (props) => {
//   const [modalShow, setModalShow] = useState(false);
//   const dispatch = useDispatch();
//   const { error, products, loading } = useSelector((state) => state.products);
//   const { error: deleteError, isDeleted } = useSelector(
//     (state) => state.product
//   );

//   const alert = useAlert();

//   const [query, setQuery] = useState('');

//   const deleteProductHandler = (id) => {
//     dispatch(deleteProduct(id));
//   };

//   // -----------------------------------------------------------------------------------------------------------------------------------------
//   let itemsPerPage = 10;
//   const [currentItems, setCurrentItems] = useState([]);
//   const [pageCount, setPageCount] = useState(0);
//   // Here we use item offsets; we could also use page offsets
//   // following the API or data you're working with.
//   const [itemOffset, setItemOffset] = useState(0);

//   useEffect(() => {
//     // Fetch items from another resources.
//     const endOffset = itemOffset + itemsPerPage;
//     console.log(`Loading items from ${itemOffset} to ${endOffset}`);
//     setCurrentItems(products.slice(itemOffset, endOffset));
//     setPageCount(Math.ceil(products.length / itemsPerPage));
//   }, [itemOffset, itemsPerPage]);

//   // Invoke when user click to request another page.
//   const handlePageClick = (event) => {
//     const newOffset = (event.selected * itemsPerPage) % products.length;
//     console.log(
//       `User requested page number ${event.selected}, which is offset ${newOffset}`
//     );
//     setItemOffset(newOffset);
//   };

//   // -----------------------------------------------------------------------------------------------------------------------------------------

//   // const handleEditButton = () => {
//   //   alert.success('Edit Successfully');
//   // };
//   const deleteItem = (id) => {
//     dispatch(deleteProduct(id));
//   };
//   useEffect(() => {
//     if (error) {
//       alert.error(error);
//       dispatch(clearErrors());
//     }

//     if (deleteError) {
//       alert.error(deleteError);
//       dispatch(clearErrors());
//     }

//     if (isDeleted) {
//       alert.success('Items Deleted Successfully');
//       dispatch({ type: DELETE_PRODUCT_RESET });
//     }

//     dispatch(getAdminProduct());
//   }, []);
//   const [imageUrl, setImageUrl] = useState('');

//   const handleImagePreview = (url) => {
//     setImageUrl(url);
//     setModalShow(true);
//   };
//   function MyVerticallyCenteredModal(props) {
//     return (
//       <Modal
//         {...props}
//         size="lg"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title id="contained-modal-title-vcenter">
//             Image Preview
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <img src={imageUrl} alt="" className="preview-image" />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button onClick={props.onHide}>Close</Button>
//         </Modal.Footer>
//       </Modal>
//     );
//   }

//   return (
//     <Fragment>
//       <MetaData title={`ALL ITEMS - Admin`} />

//       <div className="dashboard">
//         <div className="sidebar-div">
//           <SideBar />
//         </div>
//         <div className="productListContainer">
//           <h1 id="productListHeading">ALL ITEMS</h1>
//           {/* <Link to="/admin/product" className="add-link-item">
//             <Button
//               className="btn-add-item"
//               color="primary"
//               variant="contained"
//               startIcon={<AddIcon />}
//             >
//               Add Items
//             </Button>
//           </Link> */}
//           <input
//             type="text"
//             placeholder="Search Item"
//             className="search-input"
//             onChange={(event) => setQuery(event.target.value)}
//           />
//           <table>
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Name</th>
//                 <th>Price</th>
//                 <th>Image</th>
//                 <th>Stock</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             {currentItems
//               .filter((post) => {
//                 if (query == '') {
//                   return post;
//                 } else if (
//                   post.name.toLowerCase().includes(query.toLowerCase())
//                 ) {
//                   return post;
//                 }
//               })
//               .map((post, index) => {
//                 return (
//                   <tbody>
//                     <tr>
//                       <td>{index + 1}</td>
//                       <td>{post.name}</td>
//                       <td>{post.price}</td>

//                       <td>
//                         <Avatar
//                           className="avatarImage"
//                           alt="Remy Sharp"
//                           src={post.images[0].url}
//                           onClick={() => handleImagePreview(post.images[0].url)}
//                         />
//                       </td>
//                       <td>{post.Stock}</td>
//                       <td>
//                         {<EditIcon />}
//                         {<DeleteIcon onClick={() => deleteItem(post._id)} />}
//                       </td>
//                     </tr>
//                   </tbody>
//                 );
//               })}
//           </table>
//           {/* <ReactButton variant="primary" onClick={() => setModalShow(true)}>
//             Launch vertically centered modal
//           </ReactButton> */}
//           <MyVerticallyCenteredModal
//             show={modalShow}
//             onHide={() => setModalShow(false)}
//           />

//           <div className="pagination-div">
//             <ReactPaginate
//               previousLabel={'prev'}
//               nextLabel={'next'}
//               breakLabel={'...'}
//               breakClassName={'break-me'}
//               pageCount={pageCount}
//               marginPagesDisplayed={2}
//               pageRangeDisplayed={5}
//               onPageChange={handlePageClick}
//               containerClassName={'pagination'}
//               subContainerClassName={'pages pagination'}
//               activeClassName={'active'}
//             />
//           </div>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default ProductList;
