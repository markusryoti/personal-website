import axios from 'axios';
import React from 'react';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';
import PostPreview from '../../components/PostPreview';

import styles from '../../styles/Blog.module.css';

const blog = ({ posts, user }) => {
  return (
    <>
      <Nav user={user} />
      <div className="center-children">
        <div className={styles.postsContainer}>
          {posts.length > 0 ? (
            posts.map(post => <PostPreview key={post.id} post={post} />)
          ) : (
            <p>No Posts Yet!</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export async function getServerSideProps() {
  const res = await axios.get('http://localhost:5001/api/v1/posts/');
  const posts = res.data;

  return {
    props: { posts },
  };
}

export default blog;
