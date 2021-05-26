import axios from 'axios';
import Head from 'next/head';
import React from 'react';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';
import Post from '../../components/Post';

const post = ({ post }) => {
  return (
    <>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Nav />
      {post ? (
        <Post post={post} />
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
