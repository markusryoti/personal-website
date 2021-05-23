import React, { useState } from 'react';
import Nav from '../components/Nav';

import axios from 'axios';

import styles from '../styles/Login.module.css';
import router from 'next/router';

const login = ({ user, setUser }) => {
  const [formValues, setFormValues] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleLogin = async (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login/`,
        formValues
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
      <div className='center-children'>
        <div className='container'>
          <form className={styles.form}>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              id='email'
              name='email'
              onChange={handleChange}
            />
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              onChange={handleChange}
            />
            <input
              type='submit'
              value='Login'
              className='btn btn-success'
              onClick={handleLogin}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default login;
