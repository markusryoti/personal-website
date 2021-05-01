import React from 'react';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';

import dynamic from 'next/dynamic';

import styles from '../../styles/NewPost.module.css';

const DynamicComponentWithNoSSR = dynamic(
  () => import('../../components/TextEditor'),
  { ssr: false, loading: () => <p>Loading ...</p> }
);

const newpost = ({ user }) => {
  return (
    <>
      <Nav user={user} />
      <div>
        <div>
          <h1>New Post</h1>
          <DynamicComponentWithNoSSR />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default newpost;
