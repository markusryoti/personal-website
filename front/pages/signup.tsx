import axios from 'axios';
import router from 'next/router';
import React, { useState } from 'react';
import Nav from '../components/Nav';

import styles from '../styles/Signup.module.css';

const signup = ({ user, setUser }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e: any) => {
    const { value, name } = e.currentTarget;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };
  const handleSignup = async () => {
    try {
      const res = await axios.post(
        `${process.env.API_URL}/auth/signup/`,
        formData
      );
      if (res.status === 200) {
        setUser(res.data.user);
        localStorage.setItem('token', res.data.token);
        router.push('/');
        return;
      }
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Nav user={user} />
      <div className="center-children">
        <div className="container">
          <form className={styles.form}>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" onChange={handleChange} />
            <label htmlFor="username">Username</label>
            <input type="text" id="username" onChange={handleChange} />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={handleChange} />
            <label htmlFor="token">Register Token</label>
            <input type="text" id="token" onChange={handleChange} />
            <input
              type="submit"
              value="Login"
              className="btn btn-success"
              onClick={handleSignup}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default signup;
