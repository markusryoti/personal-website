import axios from 'axios';
import Head from 'next/head';
import React from 'react';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';
import Post from '../../components/Post';

import styles from '../../styles/Post.module.css';

const post = ({ user, post }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Nav user={user} />
      <Post post={post} user={user} />
      <Footer />
    </>
  );
};

export async function getServerSideProps({ params }) {
  const res = await axios.get(`${process.env.API_URL}/posts/${params.id}`);
  const post = res.data;

  return {
    props: { post },
  };
}

export default post;
