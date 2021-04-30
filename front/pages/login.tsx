import React from 'react';
import Nav from '../components/Nav';

import styles from '../styles/Login.module.css';

const login = () => {
  return (
    <>
      <Nav />
      <div className="center-children">
        <div className="container">
          <form className={styles.form}>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" />
            <label htmlFor="password">Password</label>
            <input type="text" id="password" />
            <input type="submit" value="Login" className="btn btn-success" />
          </form>
        </div>
      </div>
    </>
  );
};

export default login;
