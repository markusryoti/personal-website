import { useRouter } from 'next/router';
import React from 'react';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';

import styles from '../../styles/Post.module.css';

const post = () => {
  const router = useRouter();
  const postId = router.query.id;

  return (
    <>
      <Nav />
      <div className="center-children">
        <div className="container">
          <h1 className={styles.heading}>This is post {postId}</h1>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default post;
