import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import Editor from '../../components/editor/Editor';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';
import { EditorContext } from '../../context/EditorState';

import styles from '../../styles/NewPost.module.css';

const newpost = ({ user }) => {
  const router = useRouter();
  const [postName, setPostName] = useState('');
  const { postContent } = useContext(EditorContext);

  const onPostSubmit = async () => {
    try {
      const res = await axios.post(`${process.env.API_URL}/posts/`, {
        content: JSON.stringify(postContent),
        title: postName,
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
          <Editor />
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
