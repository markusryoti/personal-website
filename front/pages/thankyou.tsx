import React from 'react';
import Footer from '../components/Footer';
import Nav from '../components/Nav';

const thankyou = () => {
  return (
    <>
      <Nav />
      <div className="center-children">
        <div className="container">
          <h1>Thank You for the message, I will we be in touch!</h1>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default thankyou;
