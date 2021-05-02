import React, { useContext, useState } from 'react';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';

import dynamic from 'next/dynamic';

import styles from '../../styles/NewPost.module.css';
import { EditorContext } from '../../context/EditorState';
import axios from 'axios';
import router from 'next/router';

const DynamicComponentWithNoSSR = dynamic(
  () => import('../../components/TextEditor'),
  { ssr: false, loading: () => <p>Loading ...</p> }
);

const newpost = ({ user }) => {
  const [postName, setPostName] = useState('');

  const editorContext = useContext(EditorContext);
  const { html } = editorContext;

  const handleSubmit = async () => {
    const formData = { user_id: user.id, title: postName, body: html };

    try {
      const res = await axios.post(
        'http://localhost:5001/api/v1/posts',
        formData
      );
      if (res.status === 200) {
        console.log(res.data);
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Nav user={user} />
      <div className="center-children">
        <div className="container">
          <h1 className={styles.heading}>New Post</h1>
          <label htmlFor="postname" className={styles.newPostLabel}>
            Post Name
          </label>
          <input
            type="text"
            name="postname"
            id="postname"
            className={styles.postName}
            onChange={e => setPostName(e.target.value)}
          />
          <DynamicComponentWithNoSSR />
          <input
            type="submit"
            name="submit"
            id="submit"
            value="Publish"
            className="btn btn-success"
            onClick={handleSubmit}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default newpost;
