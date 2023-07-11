import React from 'react';
import './Contact.css';
import { Button } from '@material-ui/core';

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:test@test.com">
        <Button>Contact Us</Button>
      </a>
    </div>
  );
};

export default Contact;
