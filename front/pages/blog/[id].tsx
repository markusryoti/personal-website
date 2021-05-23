import axios from 'axios';
import Head from 'next/head';
import React from 'react';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';
import Post from '../../components/Post';

const post = ({ user, post }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Nav user={user} />
      {post ? (
        <Post post={post} user={user} />
      ) : (
        <h1 style={{ margin: '5rem 5rem' }}>No such post</h1>
      )}
      <Footer />
    </>
  );
};

export async function getServerSideProps({ params }) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/${params.id}`
  );
  const post = res.data;

  return {
    props: { post },
  };
}

export default post;
