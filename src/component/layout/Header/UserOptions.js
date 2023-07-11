import React, { Fragment, useState } from 'react';
import './Header.css';
import { SpeedDial, SpeedDialAction } from '@material-ui/lab';
import Backdrop from '@material-ui/core/Backdrop';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import profilePng from '../../../images/Profile.png';

import ListAltIcon from '@material-ui/icons/ListAlt';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { confirm } from 'react-bootstrap-confirmation';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const UserOptions = ({ user }) => {
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();
  // const { cartItems } = useSelector((state) => state.cart);
  const profile = profilePng;
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleLogout = () => {
    dispatch(logout());
    alert.success('Logout Successfully');
  };

  function logoutUser() {
    setShow(true);
  }

  const options = [
    { icon: <PersonIcon />, name: 'Profile', func: account },
    // { icon: <ListAltIcon />, name: 'Orders', func: orders },
    // {
    //   icon: (
    //     <ShoppingCartIcon
    //       style={{ color: cartItems.length > 0 ? 'tomato' : 'unset' }}
    //     />
    //   ),
    //   name: `Cart(${cartItems.length})`,
    //   func: cart,
    // },
    { icon: <ExitToAppIcon />, name: 'Logout', func: logoutUser },
  ];

  if (user.role === 'admin') {
    options.unshift({
      icon: <DashboardIcon />,
      name: 'Dashboard',
      func: dashboard,
    });
  }
  // if (user.role === 'user') {
  //   options.unshift({
  //     icon: <ListAltIcon />,
  //     name: 'Orders',
  //     func: orders,
  //   });
  // }
  // if (user.role === 'user') {
  //   options.unshift({
  //     icon: (
  //       <ShoppingCartIcon
  //         style={{ color: cartItems.length > 0 ? 'tomato' : 'unset' }}
  //       />
  //     ),
  //     name: `Cart(${cartItems.length})`,
  //     func: cart,
  //   });
  // }
  function dashboard() {
    history.push('/admin/dashboard');
  }

  // function orders() {
  //   history.push('/orders');
  // }
  function account() {
    history.push('/account');
  }
  // function cart() {
  //   history.push('/cart');
  // }
  function logoutUser() {
    setShow(true);

    // alert.success('Logout Successfully');
  }

  return (
    <Fragment>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to log out ?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      <Backdrop open={open} style={{ zIndex: '100' }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: '110' }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : profile}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
