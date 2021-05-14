import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import Editor from '../../components/editor/Editor';
import { initialValue } from '../../components/editor/InitialValue';
import { parseS3Links } from '../../components/editor/parseS3Links';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';
import { EditorContext } from '../../context/EditorState';

import styles from '../../styles/NewPost.module.css';

const newpost = ({ user }) => {
  const router = useRouter();
  const [postName, setPostName] = useState('');
  const [description, setDescription] = useState('');
  const [postImage, setPostImage] = useState('');
  const { postContent } = useContext(EditorContext);

  const onPostSubmit = async () => {
    try {
      const s3Links = postContent
        .map((p) => parseS3Links(p))
        .filter((arr) => arr.length > 0)
        .filter((item) => item.includes(process.env.S3_BUCKET_NAME));

      const res = await axios.post(`${process.env.API_URL}/posts/`, {
        content: JSON.stringify(postContent),
        title: postName,
        description,
        image_url: postImage,
        s3Links,
      });

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
            onChange={(e) => setDescription(e.target.value)}
          />
          <Editor initialValue={initialValue} />
          <input
            type='button'
            className='btn btn-success'
            value='Submit'
            onClick={onPostSubmit}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default newpost;
