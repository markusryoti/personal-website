import React from 'react';

import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>markusryoti - 2021</p>
      <div className={styles.container}>
        <a href="#">
          <i className="fab fa-2x fa-linkedin"></i>
        </a>
        <a href="#">
          <i className="fab fa-2x fa-instagram"></i>
        </a>
        <a href="#">
          <i className="fab fa-2x fa-github"></i>
        </a>
        <a href="#">
          <i className="fas fa-2x fa-envelope"></i>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
