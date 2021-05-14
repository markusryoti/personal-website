import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import Editor from '../../components/editor/Editor';
import { parseS3Links } from '../../components/editor/parseS3Links';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';
import { EditorContext } from '../../context/EditorState';

import styles from '../../styles/EditPost.module.css';

const edit = ({ user }) => {
  const router = useRouter();
  const { postToEdit, postContent } = useContext(EditorContext);
  const [postName, setPostName] = useState(postToEdit.title);
  const [postImage, setPostImage] = useState('');
  const [description, setDescription] = useState(postToEdit.description);

  const onPostSubmit = async (e) => {
    e.preventDefault();

    const s3Links = postContent
      .map((p) => parseS3Links(p))
      .filter((arr) => arr.length > 0)
      .filter((item) => item.includes(process.env.S3_BUCKET_NAME));

    const editedPost = {
      ...postToEdit,
      content: JSON.stringify(postContent),
      title: postName,
      image_url: postImage,
      description,
      s3Links,
    };

    try {
      const res = await axios.patch(
        `${process.env.API_URL}/posts/${postToEdit.id}`,
        editedPost
      );

      if (res.status === 200) {
        router.push('/blog');
        return;
      }
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

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
            value={postName}
            onChange={(e) => setPostName(e.target.value)}
          />
          <label htmlFor='postimage'>Main Post Image</label>
          <input
            type='text'
            id='postimage'
            name='postimage'
            className={styles.postImage}
            onChange={(e) => setPostImage(e.target.value)}
          />
          <label htmlFor='description'>Description</label>
          <input
            type='text'
            name='description'
            id='description'
            className={styles.description}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Editor initialValue={postToEdit.content} />
          <input
            type='button'
            className='btn btn-success'
            value='Update'
            onClick={onPostSubmit}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default edit;
