import React, { useState } from 'react';
import './sidebar.css';
// import logo from '../../images/logo.png';
import { Link } from 'react-router-dom';
import { TreeView, TreeItem } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PostAddIcon from '@material-ui/icons/PostAdd';
import AddIcon from '@material-ui/icons/Add';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ListAltIcon from '@material-ui/icons/ListAlt';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import RateReviewIcon from '@material-ui/icons/RateReview';
import LoginIcon from '@mui/icons-material/Login';
import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../../../actions/userAction';
import { logout } from '../../../actions/userAction';
import { useAlert } from 'react-alert';
// import waiter from '../../images/waiter.png';
import { confirm } from 'react-bootstrap-confirmation';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import BrunchDiningIcon from '@mui/icons-material/BrunchDining';
import { GiWaterBottle, GiFrenchFries } from 'react-icons/gi';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { CgPlayListAdd } from 'react-icons/cg';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';

const Sidebar = ({ histroy }) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const alert = useAlert();

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

  return (
    <div className="sidebar">
      <Link to="/">{/* <img src="" alt="Castle View" /> */}</Link>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>

      <Link>
        <TreeView
          className="item-tree"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<AddIcon />}
        >
          <TreeItem nodeId="1" label="Add Dish">
            {/* <Link to="/admin/products">
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link> */}
            <Link to="/admin/snack">
              <TreeItem nodeId="2" label="Snacks" icon={<GiFrenchFries />} />
            </Link>
            <Link to="/admin/indian">
              <TreeItem nodeId="3" label="Indian" icon={<BrunchDiningIcon />} />
            </Link>
            <Link to="/admin/chinese">
              <TreeItem nodeId="4" label="Chinese" icon={<RamenDiningIcon />} />
            </Link>
            <Link to="/admin/drink">
              <TreeItem nodeId="5" label="Drinks" icon={<GiWaterBottle />} />
            </Link>
            <Link to="/admin/pizza">
              <TreeItem nodeId="6" label="Pizza" icon={<LocalPizzaIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      {/* <Link>
        <p>
          <PostAddIcon />
          Items
        </p>
      </Link> */}

      <Link>
        <TreeView
          className="item-tree"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Table">
            <Link to="/admin/table">
              <TreeItem nodeId="2" label="Add Table" icon={<AddIcon />} />
            </Link>
            <Link to="/admin/tables">
              <TreeItem
                nodeId="2"
                label="All Tables"
                icon={<AiOutlineUnorderedList />}
              />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link>
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link>
        <p>
          {/* <img src={waiter} alt="waiter" /> */}
          <PeopleIcon />
          Waiters
        </p>
      </Link>
      {/* <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link> */}

      <Link onClick={logoutUser}>
        <p>
          <LoginIcon />
          Logout
        </p>
      </Link>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Sidebar;
