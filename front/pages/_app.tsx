import Head from 'next/head';
import React, { useEffect, useState } from 'react';

import '../styles/globals.css';
import EditorState from '../context/EditorState';
import UserState from '../context/UserState';
import axios from 'axios';
import setAuthToken from '../lib/setAuthToken';

export interface IUser {
  id: number;
  username: string;
  email: string;
}

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !user) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/load-user`, {
          headers: {
            Authorization: token,
          },
        })
        .then(res => {
          if (res.status === 200) {
            const user = res.data;
            setUser(user);
            setAuthToken(token);
            return;
          }
          // Invalid token
          setAuthToken('');
        })
        .catch(err => console.log(err));
    }
    setUser(null);
  }, []);

  return (
    <>
      <Head>
        <title>markusryoti.com | Markus Ryöti</title>
        <meta
          name="description"
          content="I talk about coding and life in general"
        />
        <meta
          name="keywords"
          content="programming, coding, software engineering, development, testing"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UserState user={user}>
        <EditorState>
          <Component {...pageProps} />
        </EditorState>
      </UserState>
    </>
  );
}

export default MyApp;
