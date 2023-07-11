import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { Button, CircularProgress } from '@material-ui/core';
import MetaData from '../../layout/MetaData';
import SideBar from '../Sidebar/Sidebar';
import { MdOutlineFormatListNumbered } from 'react-icons/md';
import {
  getSingleTable,
  clearErrors,
  updateTable,
} from '../../../actions/Dish/TableAction';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import { UPDATE_TABLE_RESET } from '../../../constants/Dish/TableConstants';

const UpdateTable = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const id = match.params.id;
  const { table, error } = useSelector((state) => state.singleTable);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.updateTable);

  const [tableName, setTableName] = useState('');
  const [tableNumber, setTableNumber] = useState();

  const updateTableHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('tableName', tableName);
    myForm.set('tableNumber', tableNumber);

    dispatch(updateTable(id, myForm));
  };

  useEffect(() => {
    if (table && table._id !== id) {
      dispatch(getSingleTable(id));
    } else {
      setTableName(table.tableName);
      setTableNumber(table.tableNumber);
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
      alert.success('Table updated Successfully');
      history.push('/admin/tables');
      dispatch({ type: UPDATE_TABLE_RESET });
    }
  }, [dispatch, alert, history, isUpdated, table]);

  return (
    <Fragment>
      <MetaData title="Create Table" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainerTable">
          <form
            className="createProductFormTable"
            encType="multipart/form-data"
            onSubmit={updateTableHandler}
          >
            <h1>Update Table</h1>
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
              {loading ? (
                <CircularProgress color="inherit" size="1.5rem" />
              ) : (
                'Update Table'
              )}
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateTable;
