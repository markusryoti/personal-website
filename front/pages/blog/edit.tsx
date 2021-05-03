import React, { useContext, useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

import styles from '../../styles/EditPost.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
import { EditorContext } from '../../context/EditorState';

const DynamicComponentWithNoSSR = dynamic(
  () => import('../../components/TextEditor'),
  { ssr: false, loading: () => <p>Loading...</p> }
);

const editpost = ({ user }) => {
  const router = useRouter();

  const editorContext = useContext(EditorContext);
  const { html, postToEdit, setPostToEdit } = editorContext;

  const handleSubmit = async () => {
    const formData = {
      id: postToEdit.id,
      user_id: user.id,
      title: postToEdit.title,
      body: html,
    };

    console.log(postToEdit);

    try {
      const res = await axios.patch(
        `http://localhost:5001/api/v1/posts/${postToEdit.id}`,
        formData
      );
      if (res.status === 200) {
        router.push('/blog');
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
          <h1 className={styles.heading}>Edit Post</h1>
          <label htmlFor="postname" className={styles.newPostLabel}>
            Post Name
          </label>
          <input
            type="text"
            name="postname"
            id="postname"
            className={styles.postName}
            value={postToEdit.title}
            onChange={e =>
              setPostToEdit({ ...postToEdit, title: e.target.value })
            }
          />
          <DynamicComponentWithNoSSR />
          <input
            type="submit"
            name="submit"
            id="submit"
            value="Update"
            className="btn btn-success"
            onClick={handleSubmit}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default editpost;
