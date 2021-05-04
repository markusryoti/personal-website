import React, { useState } from 'react';
import Editor from '../../components/editor/Editor';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';

import styles from '../../styles/NewPost.module.css';

const newpost = ({ user }) => {
  const [postName, setPostName] = useState('');

  return (
    <>
      <Nav user={user} />
      <div className='center-children'>
        <div className='container'>
          <h1 className={styles.heading}>New Post</h1>
          <label htmlFor='postname' className={styles.newPostLabel}>
            Post Name
          </label>
          <input
            type='text'
            name='postname'
            id='postname'
            className={styles.postName}
            onChange={(e) => setPostName(e.target.value)}
          />
          <label htmlFor='editor'>Post</label>
          <Editor />
          <input type='button' className='btn btn-success' value='Submit' />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default newpost;
