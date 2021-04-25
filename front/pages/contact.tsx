import React from 'react';
import Footer from '../components/Footer';
import Nav from '../components/Nav';

import styles from '../styles/Contact.module.css';

const contact = () => {
  return (
    <>
      <Nav />
      <div className="center-children">
        <div className="container">
          <h1>Let's get in touch.</h1>
          <form action="#" className={styles.form}>
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <input type="text" placeholder="Subject" />
            <select>
              <option>Say Hi!</option>
              <option>Business</option>
              <option>Coding</option>
              <option>Cars</option>
              <option>Other</option>
            </select>
            <textarea placeholder="Message"></textarea>
            <input type="submit" value="Send" className="btn btn-success" />
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default contact;
