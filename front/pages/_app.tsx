import Head from 'next/head';
import { useEffect, useState } from 'react';

import axios from 'axios';

import '../styles/globals.css';
import { useRouter } from 'next/router';
import EditorState from '../context/EditorState';

export interface IUser {
  id: number;
  username: string;
  email: string;
}

function setAuthToken(token: string) {
  if (token) {
    axios.defaults.headers.common['authorization'] = token;
  } else {
    delete axios.defaults.headers.common['authorization'];
  }
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !user) {
      axios
        .get('http://localhost:5001/api/v1/auth/load-user', {
          headers: {
            Authorization: token,
          },
        })
        .then(res => {
          if (res.status === 200) {
            const user = res.data;
            setUser(user);
            setAuthToken(token);
            router.push('/');
          }
          // Invalid token
          setAuthToken('');
        })
        .catch(err => console.log(err));
    }
  }, []);

  return (
    <>
      <Head>
        <title>markusryoti.io</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EditorState>
        <Component {...pageProps} user={user} setUser={setUser} />
      </EditorState>
    </>
  );
}

export default MyApp;
