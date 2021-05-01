import React from 'react';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';

import styles from '../../styles/Blog.module.css';

const blog = ({ user }) => {
  return (
    <>
      <Nav user={user} />
      <div className="center-children">
        <div className="container">
          <h1 className={styles.heading}>All posts</h1>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default blog;
