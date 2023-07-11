import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllPizza,
  clearErrors,
  deletePizza,
} from '../../../actions/Dish/PizzaAction';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';
import { useAlert } from 'react-alert';
import { Button as MuiButton } from '@material-ui/core';
import MetaData from '../../layout/MetaData';
import DeleteIcon from '@material-ui/icons/Delete';
import Sidebar from '../Sidebar/Sidebar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { DELETE_PIZZA_RESET } from '../../../constants/Dish/PizzaConstants';

const AllPizza = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const {
    pizza: { pizza },
    error,
    loading,
  } = useSelector((state) => state.getAllPizza);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deletePizza
  );
  const [deleteId, setDeleteId] = useState('');
  const [show, setShow] = useState(false);
  const [pageSize, setPageSize] = useState(10);

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
      dispatch({ type: DELETE_PIZZA_RESET });
    }
    dispatch(getAllPizza());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const handleClose = () => {
    setShow(false);
  };
  const handleDelete = () => {
    dispatch(deletePizza(deleteId));
    setShow(false);
  };
  const deleteHandler = (id) => {
    setDeleteId(id);
    setShow(true);
  };
  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  }

  const columns = [
    // { field: 'id', headerName: 'Id', minWidth: 10, flex: 0.25 },
    { field: 'sn', headerName: 'S.no', minWidth: 10, flex: 0.25 },
    { field: 'dish', headerName: 'Pizza', minWidth: 50, flex: 0.6 },
    { field: 'price', headerName: 'Price', minWidth: 80, flex: 0.45 },
    { field: 'category', headerName: 'Category', minWidth: 80, flex: 0.45 },
    {
      field: 'description',
      headerName: 'Description',
      minWidth: 80,
      flex: 0.4,
    },
    {
      field: 'action',
      headerName: 'Action',
      minWidth: 100,
      flex: 0.5,
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
              <Link to={`/admin/pizza/${params.getValue(params.id, 'id')}`}>
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

  pizza &&
    pizza.forEach((item, i) => {
      rows.push({
        id: item._id,
        sn: i + 1,
        dish: item.dish,
        price: item.price,
        quantity: item.quantity,
        category: item.category,
        description: item.description,
      });
    });

  return (
    <Fragment>
      <MetaData title={'All Pizza - Admin'} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading"> Pizza</h1>
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

export default AllPizza;
