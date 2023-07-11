import React, { Fragment, useEffect, useState } from 'react';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllChinese,
  deleteChinese,
  clearErrors,
} from '../../../actions/Dish/ChineseAction';
import { useAlert } from 'react-alert';
import { Button as MuiButton } from '@material-ui/core';
import MetaData from '../../layout/MetaData';
import DeleteIcon from '@material-ui/icons/Delete';
import SideBar from '../Sidebar/Sidebar';
import { DELETE_CHINESE_RESET } from '../../../constants/Dish/ChineseConstants';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const GetAllChinese = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [pageSize, setPageSize] = useState(10);
  const [deleteId, setDeleteId] = useState('');
  const [show, setShow] = useState(false);
  const {
    dish: { data },
    error,
    loading,
  } = useSelector((state) => state.getAllChinese);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteChinese
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
      dispatch({ type: DELETE_CHINESE_RESET });
    }

    dispatch(getAllChinese());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const handleClose = () => {
    setShow(false);
  };

  const handleDelete = () => {
    dispatch(deleteChinese(deleteId));
    setShow(false);
  };

  const handleDeleteItemId = (id) => {
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
              <Link to={`/admin/chinese/${params.getValue(params.id, 'id')}`}>
                <MuiButton>
                  <FiEdit className="edit-icon" />
                </MuiButton>
              </Link>

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

  let rows = [];
  data &&
    data.forEach((item, index) => {
      rows.push({
        id: item._id,
        dish: item.dish,
        price: item.price,
        quantity: item.quantity,
        category: item.category,
        description: item.description,
      });
    });
  console.log('data', data);
  return (
    <Fragment>
      <MetaData title={`ALL Chinese - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">Chinese</h1>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              disableSelectionOnClick
              className="productListTable"
              loading={loading}
              autoHeight
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

export default GetAllChinese;
