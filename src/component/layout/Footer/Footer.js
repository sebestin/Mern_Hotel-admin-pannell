// import React from "react";
// import playStore from "../../../images/playstore.png";
// import appStore from "../../../images/Appstore.png";
// import "./Footer.css";

// const Footer = () => {
//   return (
//     <footer id="footer">
//       <div className="leftFooter">
//         <h4>DOWNLOAD OUR APP</h4>
//         <p>Download App for Android and IOS mobile phone</p>
//         <img src={playStore} alt="playstore" />
//         <img src={appStore} alt="Appstore" />
//       </div>

//       <div className="midFooter">
//         <h1>Castle View.</h1>
//         <p>High Quality is our first priority</p>

//         <p>Copyrights 2022 &copy; Castle View</p>
//       </div>

//       <div className="rightFooter">
//         <h4>Follow Us</h4>
//         <a href="#">Instagram</a>
//         <a href="#">Youtube</a>
//         <a href="#">Facebook</a>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React from 'react';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';

const Footer = () => {
  const { loading } = useSelector((state) => state.user);
  return <div>{loading ? <Loader /> : null}</div>;
};

export default Footer;
