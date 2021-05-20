import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { EditorContext } from '../context/EditorState';

import styles from '../styles/Post.module.css';
import serialize from './serialize/serialize';

const Post = ({ user, post }) => {
  const router = useRouter();
  const editorContext = useContext(EditorContext);
  const { setPostToEdit } = editorContext;

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`${process.env.API_URL}/posts/${post.id}`);
      if (res.status === 200) {
        router.push('/blog');
        return;
      }
      console.log(res.data);
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
      <div className='container'>
        <div className={styles.postContent}>
          <div className={styles.postHeader}>
            <h1>{post.title}</h1>
            <h4>{post.description}</h4>
            <h5>
              Published:{' '}
              <em>{new Date(post.created_at).toLocaleDateString()}</em>
            </h5>
            {post.image_url && <img src={post.image_url} alt='image' />}
          </div>
          <div
            className={styles.postBody}
            dangerouslySetInnerHTML={{
              __html: post.content.map((post) => serialize(post)).join(''),
            }}
          ></div>
        </div>
      </div>
      {user && user.id === post.user_id && (
        <div className={styles.actionButtonContainer}>
          <input
            type='button'
            value='Edit'
            className='btn btn-info'
            onClick={handleEdit}
          />
          <input
            type='button'
            value='Remove'
            className='btn btn-danger'
            onClick={handleDelete}
          />
        </div>
      )}
    </div>
  );
};

export default Post;
