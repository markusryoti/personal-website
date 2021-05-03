import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { EditorContext } from '../context/EditorState';

import styles from '../styles/Post.module.css';

const Post = ({ user, post }) => {
  const router = useRouter();
  const editorContext = useContext(EditorContext);
  const { setPostToEdit } = editorContext;

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${process.env.API_URL}/posts/${post.id}`);
      if (res.status === 200) {
        router.push('/blog');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = () => {
    setPostToEdit(post);
    router.push(`/blog/edit/`);
  };

  return (
    <div className={`center-children ${styles.center}`}>
      <div className="container">
        <div className={styles.postContent}>
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.body }}></div>
        </div>
      </div>
      {user.id === post.user_id && (
        <div className={styles.actionButtonContainer}>
          <input
            type="button"
            value="Edit"
            className="btn btn-info"
            onClick={handleEdit}
          />
          <input
            type="button"
            value="Remove"
            className="btn btn-danger"
            onClick={handleDelete}
          />
        </div>
      )}
    </div>
  );
};

export default Post;
