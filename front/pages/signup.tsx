import React from 'react';
import Nav from '../components/Nav';

import styles from '../styles/Signup.module.css';

const signup = ({ user }) => {
  return (
    <>
      <Nav user={user} />
      <div className="center-children">
        <div className="container">
          <form className={styles.form}>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" />
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />
            <label htmlFor="password">Password</label>
            <input type="text" id="password" />
            <label htmlFor="token">Register Token</label>
            <input type="text" id="token" />
            <input type="submit" value="Login" className="btn btn-success" />
          </form>
        </div>
      </div>
    </>
  );
};

export default signup;
