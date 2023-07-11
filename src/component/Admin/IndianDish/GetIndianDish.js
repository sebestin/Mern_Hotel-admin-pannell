import React, { Fragment, useEffect, useState } from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import {
  deleteIndianDish,
  getIndianDish,
  clearErrors,
} from '../../../actions/Dish/indianAction';
import { useAlert } from 'react-alert';
import { Button as MuiButton } from '@material-ui/core';
import MetaData from '../../layout/MetaData';
import DeleteIcon from '@material-ui/icons/Delete';
import SideBar from '../Sidebar/Sidebar';
import { DELETE_INDIAN_RESET } from '../../../constants/Dish/IndianConstants';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const GetIndianDish = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [pageSize, setPageSize] = useState(10);
  const [deleteId, setDeleteId] = useState('');
  const [show, setShow] = useState(false);
  const {
    dish: { data },
    error,
    loading,
  } = useSelector((state) => state.getIndianDish);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteIndianDish
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
      dispatch({ type: DELETE_INDIAN_RESET });
    }

    dispatch(getIndianDish());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const handleClose = () => {
    setShow(false);
  };

  const handleDelete = () => {
    dispatch(deleteIndianDish(deleteId));
    setShow(false);
  };

  const deleteHandler = (id) => {
    setDeleteId(id);
    setShow(true);
  };
  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  };
  const columns = [
    // { field: 'sn', headerName: 'S.No', minWidth: 10, flex: 0.45 },
    { field: 'id', headerName: 'Id', minWidth: 10, flex: 0.3 },

    {
      field: 'dish',
      headerName: 'Dish',
      minWidth: 50,
      flex: 0.6,
    },
    {
      field: 'price',
      headerName: 'Price',
      type: 'number',
      minWidth: 100,
      flex: 0.5,
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      minWidth: 100,
      flex: 0.4,
    },
    {
      field: 'category',
      headerName: 'Category',
      minWidth: 100,
      flex: 0.4,
    },
    {
      field: 'description',
      headerName: 'Description',
      type: 'number',
      minWidth: 100,
      flex: 0.5,
    },

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
              <Link to={`/admin/indian/${params.getValue(params.id, 'id')}`}>
                <MuiButton>
                  <FiEdit className="edit-icon" />
                </MuiButton>
              </Link>

              <MuiButton
                onClick={() => deleteHandler(params.getValue(params.id, 'id'))}
              >
                <DeleteIcon className="delete-icon" />
              </MuiButton>
            </div>
          </div>
        );
      },
    },
  ];

  let rows = [];

  data &&
    data.forEach((item, index) => {
      rows.push({
        id: item._id,
        sn: index + 1,
        dish: item.dish,
        price: item.price,
        quantity: item.quantity,
        category: item.category,
        description: item.description,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL Indian Dish - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">Indian Dish List</h1>

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
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
              loading={loading}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[5, 10, 20, 50]}
              pagination
              // components={{
              //   Toolbar: CustomToolbar,
              // }}
            />
          </div>
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
    </Fragment>
  );
};

export default GetIndianDish;
