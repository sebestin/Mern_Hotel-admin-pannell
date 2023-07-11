import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllTables,
  deleteTable,
  clearErrors,
} from '../../../actions/Dish/TableAction';
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
import { DELETE_TABLE_RESET } from '../../../constants/Dish/TableConstants';

const GetAllTables = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const {
    table: { table },
    loading,
    error,
  } = useSelector((state) => state.getAllTable);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteTable
  );

  const [pageSize, setPageSize] = useState(10);
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState('');

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
      dispatch({ type: DELETE_TABLE_RESET });
    }
    dispatch(getAllTables());
  }, [dispatch, alert, error, deleteError, history, isDeleted]);

  const handleClose = () => {
    setShow(false);
  };
  const handleDelete = () => {
    dispatch(deleteTable(deleteId));
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
    // { field: 'id', headerName: 'Id', minWidth: 10, flex: 0.45 },
    { field: 'sn', headerName: 'S.No', minWidth: 10, flex: 0.45 },
    {
      field: 'tableName',
      headerName: 'Table Name',
      flex: 1,
      minWidth: 150,
    },
    { field: 'tableNumber', headerName: 'Number', flex: 1, minWidth: 150 },

    {
      field: 'action',
      headerName: 'Action',
      minWidth: 150,
      flex: 0.35,
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
              <Link to={`/admin/table/${params.getValue(params.id, 'id')}`}>
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

  table &&
    table.forEach((item, i) => {
      rows.push({
        id: item._id,
        sn: i + 1,
        tableName: item.tableName,
        tableNumber: item.tableNumber,
      });
    });

  return (
    <Fragment>
      <MetaData title={'All Pizza - Admin'} />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">Table List</h1>
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

export default GetAllTables;
